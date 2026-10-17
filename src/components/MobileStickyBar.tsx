"use client";

import { BookTrialButton, WhatsAppButton } from "@/components/WhatsAppButton";

export function MobileStickyBar({ whatsappKey = "default" }: { whatsappKey?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-cream/95 p-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <BookTrialButton variant="bar" label="Book Free Trial" />
        <WhatsAppButton variant="bar" messageKey={whatsappKey} label="WhatsApp" />
      </div>
    </div>
  );
}
