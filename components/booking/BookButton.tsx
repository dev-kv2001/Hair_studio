"use client";

import { useBooking } from "@/components/booking/BookingProvider";
import { BOOKING_SECTION_ID } from "@/components/booking/constants";
import type { ServiceId } from "@/types/content";

type BookButtonProps = {
  children: React.ReactNode;
  className?: string;
  serviceId?: ServiceId;
  onNavigate?: () => void;
};

/** A real link to the booking section (works without JS) that also preselects a service. */
export function BookButton({ children, className, serviceId, onNavigate }: BookButtonProps) {
  const { requestBooking } = useBooking();

  return (
    <a
      href={`#${BOOKING_SECTION_ID}`}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onNavigate?.();
        requestBooking(serviceId);
      }}
    >
      {children}
    </a>
  );
}
