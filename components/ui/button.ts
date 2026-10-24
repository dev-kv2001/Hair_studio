type ButtonVariant = "solid" | "outline" | "light";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 px-6 text-small font-medium transition-[background-color,color,transform] duration-200 ease-out active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  solid: "bg-charcoal text-ivory hover:bg-[#3a332d]",
  outline: "bg-transparent text-charcoal ring-2 ring-inset ring-charcoal hover:bg-charcoal hover:text-ivory",
  light: "bg-ivory text-charcoal hover:bg-cream",
};

/** Shared class list so links and buttons share one shape: square, flat, 48px tall. */
export function buttonClass(variant: ButtonVariant = "solid", extra = "") {
  return `${base} ${variants[variant]} ${extra}`.trim();
}
