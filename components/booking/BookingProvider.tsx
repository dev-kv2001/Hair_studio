"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { BOOKING_FIRST_FIELD_ID, BOOKING_SECTION_ID } from "@/components/booking/constants";
import type { ServiceId } from "@/types/content";

type BookingContextValue = {
  serviceId: ServiceId | "";
  setServiceId: (id: ServiceId | "") => void;
  /** Preselects a service, scrolls to the booking form and focuses its first field. */
  requestBooking: (id?: ServiceId) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [serviceId, setServiceId] = useState<ServiceId | "">("");

  const requestBooking = useCallback((id?: ServiceId) => {
    if (id) setServiceId(id);
    document.getElementById(BOOKING_SECTION_ID)?.scrollIntoView({ block: "start" });
    // Focus without a second jump; the smooth scroll above carries the viewport.
    document.getElementById(BOOKING_FIRST_FIELD_ID)?.focus({ preventScroll: true });
    history.replaceState(null, "", `#${BOOKING_SECTION_ID}`);
  }, []);

  const value = useMemo(() => ({ serviceId, setServiceId, requestBooking }), [serviceId, requestBooking]);

  return <BookingContext value={value}>{children}</BookingContext>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside <BookingProvider>");
  return context;
}
