type ButtonVariant = "solid" | "outline" | "light" | "ghost";

const base =
  "group/button inline-flex min-h-13 items-center justify-center gap-3 px-7 text-small font-medium tracking-[0.01em] transition-[background-color,color,box-shadow,transform] duration-200 ease-out-quint active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  // Copper is the page's one accent: it marks the action and nothing decorative.
  solid: "bg-rose text-ink hover:bg-rose-deep hover:text-paper",
  outline: "bg-transparent text-ink ring-2 ring-inset ring-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-ink hover:bg-blush",
  // For a second action set on a photograph.
  ghost: "bg-transparent text-paper ring-2 ring-inset ring-paper/70 hover:bg-paper hover:text-ink hover:ring-paper",
};

/** Shared class list so links and buttons share one shape: square, flat, 52px tall, with a short press. */
export function buttonClass(variant: ButtonVariant = "solid", extra = "") {
  return `${base} ${variants[variant]} ${extra}`.trim();
}
