import { BOOKING_SECTION_ID } from "@/components/booking/constants";
import { BookingForm } from "@/components/booking/BookingForm";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function Appointment() {
  return (
    <section id={BOOKING_SECTION_ID} aria-labelledby="appointment-title" className="bg-charcoal py-24 text-paper lg:py-40">
      <div className="frame grid gap-14 lg:grid-cols-12 lg:gap-x-8">
        <Reveal className="lg:col-span-5">
          <h2 id="appointment-title" className="text-head">
            Book an appointment
          </h2>
          <p className="mt-8 max-w-[32ch] text-lead leading-[1.3]">
            Tell us what you have in mind and when suits you. The studio would confirm a time with you.
          </p>
          <p className="mt-6 max-w-[40ch] text-small text-paper-soft">
            This is a frontend demo: the form does not book anything or contact {site.name}. Prefer to talk? The
            sample number is {site.phone.display}.
          </p>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-6 lg:col-start-7 lg:pt-3">
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
