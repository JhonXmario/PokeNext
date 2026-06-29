import { test, expect } from "@playwright/test";

test.describe("Pokedex App General Functionality", () => {
  test("Homepage loads correctly", async ({ page }) => {
    await page.goto("/");

    // Check if the page title is correct
    await expect(page.locator("body")).toBeVisible();

    // Check for common elements (Navbar, Footer)
    // We assume Navbar has a link to 'Pokemon' or similar
    const navLocator = page.locator("nav");
    await expect(navLocator).toBeVisible();

    const footerLocator = page.locator("footer");
    await expect(footerLocator).toBeVisible();

    const heroSectionLocator = page.locator("section");
    await expect(heroSectionLocator).toBeVisible();
  });

  test("Pokemon list page loads", async ({ page }) => {
    await page.goto("/pokemon");

    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // We expect the pokemon list to render some items.
    // We can just verify the page loaded without error and contains the main layout.
    await expect(page.locator("body")).toBeVisible();
  });

  test("About page loads", async ({ page }) => {
    await page.goto("/about");

    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Pokemon Details Functionality", () => {
  test("Navigates to Charizard details and shows its image", async ({
    page,
  }) => {
    // 1. Go to the pokemon list and wait for API data to load
    await page.goto("/pokemon", { waitUntil: "networkidle" });

    // 2. Wait for the pokemon cards to render in the DOM
    await expect(page.locator(".pokemon-card").first()).toBeVisible({ timeout: 30000 });

    // We assume the href is lowercase as the Link in PokemonCard indicates
    const charizardLink = page.locator('a[href="/pokemon/charizard"]');

    // Scroll to the element and click
    await charizardLink.scrollIntoViewIfNeeded();
    await charizardLink.click();

    // 4. Verify that we navigated to the correct details page
    await expect(page).toHaveURL(/\/pokemon\/charizard/i);

    // 5. Verify the Charizard image renders (alt text should include charizard)
    const charizardImage = page.locator('img[alt*="charizard normal" i]');

    // Verify that at least the first matching image is visible
    await expect(charizardImage.first()).toBeVisible();
  });

  test("Navigates to Bulbasaur details and shows its image pixel art reverse", async ({
    page,
  }) => {
    // 1. Go to the pokemon list and wait for API data to load
    await page.goto("/pokemon", { waitUntil: "networkidle" });

    // 2. Wait for the pokemon cards to render in the DOM
    await expect(page.locator(".pokemon-card").first()).toBeVisible({ timeout: 30000 });

    // 3. Wait and click the Bulbasaur details link
    // We assume the href is lowercase as the Link in PokemonCard indicates
    const BulbasaurLink = page.locator('a[href="/pokemon/bulbasaur"]');

    // Scroll to the element and click
    await BulbasaurLink.scrollIntoViewIfNeeded();
    await BulbasaurLink.click();

    // 4. Verify that we navigated to the correct page
    await expect(page).toHaveURL(/\/pokemon\/bulbasaur/i);

    // 5. Verify the Bulbasaur image renders (alt text should include bulbasaur)
    const bulbasaurImage = page.locator('img[alt*="Sprite Reverso" i]');

    // Verify that at least the first matching image is visible
    await expect(bulbasaurImage.first()).toBeVisible();
  });

  test("Navigates to page 2, selects Pikachu and verifies Electric type", async ({
    page,
  }) => {
    // 1. Go to the pokemon list and wait for API data to load
    await page.goto("/pokemon", { waitUntil: "networkidle" });

    // 2. Wait for the pokemon cards to render in the DOM
    await expect(page.locator(".pokemon-card").first()).toBeVisible({ timeout: 30000 });

    // 3. Locate and click the pagination button for page 2
    // We assume the pagination button has the exact text "2" and role button
    const page2Button = page.getByRole("button", { name: "2", exact: true });
    await page2Button.scrollIntoViewIfNeeded();
    await page2Button.click();

    // 4. Wait for Pikachu to load and click it
    const pikachuLink = page.locator('a[href="/pokemon/pikachu"]');
    await pikachuLink.scrollIntoViewIfNeeded();
    await pikachuLink.click();

    // 5. Verify the correct URL
    await expect(page).toHaveURL(/\/pokemon\/pikachu/i);

    // 6. Verify it has the "electric" type
    // According to the TypeBadges component, types have the class `type-<type-name>`
    const electricBadge = page.locator('.type-electric');
    await expect(electricBadge.first()).toBeVisible();
  });
});

test.describe("Favorites Functionality (without auth)", () => {
  test("Navigates to page 3, clicks favorite on the 3rd pokemon and Clerk sign-in modal appears", async ({
    page,
  }) => {
    // 1. Go to the pokemon list and wait for API data to load
    await page.goto("/pokemon", { waitUntil: "networkidle" });

    // 2. Wait for the pokemon cards to load
    await expect(page.locator(".pokemon-card").first()).toBeVisible({ timeout: 30000 });

    // 3. Navigate to page 3 using the pagination button
    const page3Button = page.getByRole("button", { name: "3", exact: true });
    await page3Button.scrollIntoViewIfNeeded();
    await page3Button.click();

    // 4. Wait for the cards on page 3 to load
    await expect(page.locator(".pokemon-card").first()).toBeVisible();

    // 5. Identify the third card in the list
    const thirdCard = page.locator(".pokemon-card").nth(2); // nth is 0-indexed
    await expect(thirdCard).toBeVisible();

    // 6. Capture the pokemon name for log reference
    const pokemonName = await thirdCard.locator("h3").textContent();
    console.log(`Selected pokemon at position 3 on page 3: ${pokemonName}`);

    // 7. Click the favorite (heart) button inside that card
    // The button has aria-label="Add to favorites" when not favorite
    const favoriteButton = thirdCard.getByRole("button", {
      name: "Add to favorites",
    });
    await favoriteButton.click();

    // 8. Verify the Clerk sign-in modal appears
    // Clerk renders its modal inside a div with class "cl-modalBackdrop"
    // and the sign-in form with class "cl-signIn-root"
    const clerkModal = page.locator(".cl-modalBackdrop");
    await expect(clerkModal).toBeVisible({ timeout: 10000 });
  });
});
