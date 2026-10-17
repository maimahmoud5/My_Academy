import { BookTrialButton, WhatsAppButton } from "@/components/WhatsAppButton";

export function TrialCTA({
  title = "Ready to start?",
  text = "Book a free trial class and meet your teacher — or message us on WhatsApp with any questions.",
  whatsappKey = "default",
}: {
  title?: string;
  text?: string;
  whatsappKey?: string;
}) {
  return (
    <section className="border-y border-border bg-teal text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-2 text-white/85">{text}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <BookTrialButton className="!bg-white !text-teal hover:!bg-cream" />
          <WhatsAppButton messageKey={whatsappKey} variant="secondary" />
        </div>
      </div>
    </section>
  );
}
