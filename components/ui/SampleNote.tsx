type SampleNoteProps = {
  children: React.ReactNode;
  className?: string;
  /** "dark" for notes set on the taupe and ash fields. */
  tone?: "light" | "dark";
};

/** A plain, readable flag that marks fictional or example content. */
export function SampleNote({ children, className = "", tone = "light" }: SampleNoteProps) {
  return <p className={`text-small ${tone === "dark" ? "text-paper-soft" : "text-ink-soft"} ${className}`}>{children}</p>;
}
