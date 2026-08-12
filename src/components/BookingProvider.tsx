"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import BookingModal from "./BookingModal";

/**
 * One booking dialog for the whole page.
 *
 * Every "Book" CTA - header, hero, offer band, audience, footer, sticky mobile
 * bar - opens the same modal through this context. The alternative, a
 * `useState` and a <BookingModal> inside each component, would mount six
 * dialogs, six focus traps and six scroll locks, and two could be opened at
 * once from the sticky bar and the header.
 *
 * `source` records which CTA opened it, so the existing data-cta analytics
 * story survives the change from links to buttons.
 */
type BookingContext = {
  open: (source?: string) => void;
  close: () => void;
  isOpen: boolean;
};

const Ctx = createContext<BookingContext | null>(null);

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useBooking must be used inside <BookingProvider>");
  }
  return ctx;
}

export default function BookingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string>();

  const open = useCallback((from?: string) => {
    setSource(from);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ open, close, isOpen }),
    [open, close, isOpen]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <BookingModal open={isOpen} onClose={close} source={source} />
    </Ctx.Provider>
  );
}
