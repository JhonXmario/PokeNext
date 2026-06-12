import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Cualquier ruta que coincida con estos patrones será protegida.
const isProtectedRoute = createRouteMatcher([
  "/favorites(.*)",
  "/teams(.*)",
  // "/profile(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Si la ruta está protegida, exige que el usuario tenga una sesión iniciada.
  // Si no hay sesión, Clerk redirige automáticamente a la página de inicio de sesión.
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Ejecuta el middleware en todas las rutas excepto en los archivos internos
    // de Next.js y los archivos estáticos, salvo que se incluyan en parámetros de búsqueda.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Ejecuta siempre el middleware en las rutas de la API.
    "/(api|trpc)(.*)",
  ],
};
