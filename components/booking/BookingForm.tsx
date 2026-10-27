"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { BOOKING_FIRST_FIELD_ID } from "@/components/booking/constants";
import { buttonClass } from "@/components/ui/button";
import { services } from "@/data/services";
import { formatPrice } from "@/lib/format";
import type { ServiceId } from "@/types/content";

const timeSlots = ["Morning (9–12)", "Afternoon (12–16)", "Evening (16–20)"];

type FieldErrors = Partial<Record<"name" | "contact" | "service" | "date", string>>;

type Request = { name: string; service: string; date: string; time: string };

type BookingFormProps = {
  variant?: "dark" | "light";
};

const getFieldClass = (variant: "dark" | "light") =>
  variant === "light"
    ? "mt-2 block w-full min-h-12 bg-ivory px-4 py-3 text-body text-ink outline-none ring-1 ring-ink/10 transition-[box-shadow,background-color] duration-200 placeholder:text-ink-soft hover:bg-ivory focus-visible:ring-2 focus-visible:ring-ink aria-[invalid=true]:ring-[#d9485f]"
    : "mt-2 block w-full min-h-12 bg-ash px-4 py-3 text-body text-paper outline-none ring-2 ring-transparent transition-[box-shadow,background-color] duration-200 [color-scheme:dark] placeholder:text-paper-soft hover:bg-taupe focus-visible:ring-paper aria-[invalid=true]:ring-[#f08a9a]";

const getLabelClass = (variant: "dark" | "light") =>
  variant === "light" ? "block text-small font-medium text-ink" : "block text-small font-medium text-paper";

const getErrorClass = (variant: "dark" | "light") =>
  variant === "light" ? "mt-2 text-small text-[#b82d43]" : "mt-2 text-small text-[#f4b6bf]";

function todayIso() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
}

const subscribeNever = () => () => {};

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!String(data.get("name") ?? "").trim()) errors.name = "Add a name so the demo can address you.";
  const contact = String(data.get("contact") ?? "").trim();
  if (!contact) errors.contact = "Add an email or phone number.";
  else if (!/@|\d{6,}/.test(contact.replace(/\s/g, ""))) errors.contact = "That doesn’t look like an email or phone number. Check it and try again.";
  if (!data.get("service")) errors.service = "Choose a service.";
  const date = String(data.get("date") ?? "");
  if (!date) errors.date = "Pick a preferred day.";
  else if (date < todayIso()) errors.date = "Pick today or a later day.";
  return errors;
}

export function BookingForm({ variant = "dark" }: BookingFormProps = {}) {
  const { serviceId, setServiceId } = useBooking();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [request, setRequest] = useState<Request | null>(null);
  // Today's date is only known in the browser, so the server renders no minimum (no hydration mismatch).
  const minDate = useSyncExternalStore(subscribeNever, todayIso, () => undefined);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const formId = useId();

  const fieldClass = getFieldClass(variant);
  const labelClass = getLabelClass(variant);
  const errorClass = getErrorClass(variant);

  useEffect(() => {
    if (request) confirmationRef.current?.focus();
  }, [request]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const service = services.find((item) => item.id === data.get("service"));
    setRequest({
      name: String(data.get("name")).trim(),
      service: service?.name ?? "",
      date: new Date(`${data.get("date")}T12:00`).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
      time: String(data.get("time")),
    });
  }

  if (request) {
    return (
      <div role="status" className="bg-ivory p-6 text-ink sm:p-10">
        <h3 ref={confirmationRef} tabIndex={-1} className="text-head outline-none">
          Demo request noted
        </h3>
        <p className="mt-6 max-w-[46ch]">
          Thanks, {request.name}. You asked for <strong className="font-medium">{request.service}</strong> on{" "}
          {request.date}, {request.time.toLowerCase()}.
        </p>
        <p className="mt-4 max-w-[46ch] font-medium">
          This is a demo website: no appointment has been booked and nothing was sent anywhere.
        </p>
        <button
          type="button"
          className={buttonClass("solid", "mt-8")}
          onClick={() => {
            setRequest(null);
            setServiceId("");
          }}
        >
          Start a new demo request
        </button>
      </div>
    );
  }

  const describe = (field: keyof FieldErrors) => (errors[field] ? `${formId}-${field}-error` : undefined);

  return (
    <form noValidate onSubmit={handleSubmit} aria-describedby={`${formId}-notice`} className="grid gap-6 sm:grid-cols-2">
      <p id={`${formId}-notice`} className={`text-small sm:col-span-2 ${variant === "light" ? "text-ink-soft" : "text-paper-soft"}`}>
        Demo form: nothing you enter leaves this page.
      </p>

      <div>
        <label htmlFor={BOOKING_FIRST_FIELD_ID} className={labelClass}>
          Your name
        </label>
        <input
          id={BOOKING_FIRST_FIELD_ID}
          name="name"
          autoComplete="name"
          className={fieldClass}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describe("name")}
        />
        {errors.name && <p id={describe("name")} className={errorClass}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor={`${formId}-contact`} className={labelClass}>
          Email or phone
        </label>
        <input
          id={`${formId}-contact`}
          name="contact"
          type="text"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="you@example.com…"
          className={fieldClass}
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={describe("contact")}
        />
        {errors.contact && <p id={describe("contact")} className={errorClass}>{errors.contact}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={`${formId}-service`} className={labelClass}>
          Service
        </label>
        <select
          id={`${formId}-service`}
          name="service"
          value={serviceId}
          onChange={(event) => setServiceId(event.target.value as ServiceId | "")}
          className={fieldClass}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={describe("service")}
        >
          <option value="">Choose a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} (sample price from {formatPrice(service.samplePrice)})
            </option>
          ))}
        </select>
        {errors.service && <p id={describe("service")} className={errorClass}>{errors.service}</p>}
      </div>

      <div>
        <label htmlFor={`${formId}-date`} className={labelClass}>
          Preferred day
        </label>
        <input
          id={`${formId}-date`}
          name="date"
          type="date"
          min={minDate}
          className={fieldClass}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={describe("date")}
        />
        {errors.date && <p id={describe("date")} className={errorClass}>{errors.date}</p>}
      </div>

      <div>
        <label htmlFor={`${formId}-time`} className={labelClass}>
          Time of day
        </label>
        <select id={`${formId}-time`} name="time" defaultValue={timeSlots[0]} className={fieldClass}>
          {timeSlots.map((slot) => (
            <option key={slot}>{slot}</option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className={buttonClass(variant === "light" ? "copper" : "light", "w-full sm:w-auto")}
        >
          Send demo request
        </button>
      </div>
    </form>
  );
}
