import { BOOKING_SECTION_ID } from "@/components/booking/constants";
import { BookingForm } from "@/components/booking/BookingForm";
import { site } from "@/data/site";

export function Appointment() {
  return (
    <section id={BOOKING_SECTION_ID} aria-labelledby="appointment-title" className="bg-moss py-24 text-moss-ink lg:py-36">
      <div className="frame grid gap-14 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5">
          <h2 id="appointment-title" className="text-head text-ivory">
            Book an appointment
          </h2>
          <p className="mt-6 max-w-[38ch] text-lead">
            Tell us what you have in mind and when suits you. The studio would confirm a time with you.
          </p>
          <p className="mt-6 max-w-[40ch] text-small">
            This is a frontend demo: the form does not book anything or contact {site.name}. Prefer to talk? The
            sample number is {site.phone.display}.
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
