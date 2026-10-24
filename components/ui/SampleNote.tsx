type SampleNoteProps = {
  children: React.ReactNode;
  className?: string;
};

/** A plain, readable flag that marks fictional or example content. */
export function SampleNote({ children, className = "" }: SampleNoteProps) {
  return <p className={`text-small text-taupe ${className}`}>{children}</p>;
}
