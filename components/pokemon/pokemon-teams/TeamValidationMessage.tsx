"use client";

interface TeamValidationMessageProps {
  title: string;
  description?: string;
  type?: "error" | "success";
}

export function TeamValidationMessage({
  title,
  description,
  type = "error",
}: TeamValidationMessageProps) {
  const isError = type === "error";

  return (
    <div
      role="alert"
      className={`mb-4 rounded-2xl border px-4 py-3 ${
        isError
          ? "border-red-500/20 bg-red-500/10 text-red-200"
          : "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
      }`}
    >
      <div className="flex items-start gap-2">
        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${isError ? "bg-red-500/20 text-red-300" : "bg-emerald-500/20 text-emerald-300"}`}>
          {isError ? "!" : "✓"}
        </span>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
        </div>
      </div>
    </div>
  );
}
