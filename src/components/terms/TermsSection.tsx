import { TermsSectionProps } from "@/types/terms";

export function TermsSection({ title, children }: TermsSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-neutral-900">{title}</h2>
      <p className="text-neutral-700">{children}</p>
    </section>
  );
}
