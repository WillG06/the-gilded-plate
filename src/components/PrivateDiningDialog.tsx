import type { ReactNode } from "react";
import { SITE } from "@/data/site";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PrivateDiningForm } from "./PrivateDiningForm";

/**
 * Private dining enquiry, available anywhere as a trigger instead of a page.
 * Pass `variant="solid"` for a filled wine button.
 */
export function PrivateDiningDialog({
  label = "Private dining enquiry",
  variant = "outline",
  className = "",
  children,
}: {
  label?: string;
  variant?: "outline" | "solid" | "bare";
  className?: string;
  children?: ReactNode;
}) {
  const base = "inline-flex items-center justify-center text-[0.68rem] tracking-[0.24em] uppercase transition-colors";
  const styles =
    variant === "solid"
      ? "btn btn--arch btn--wine"
      : variant === "bare"
        ? `${base} underline underline-offset-4`
        : "btn btn--arch btn--outline";

  return (
    <Dialog>
      <DialogTrigger className={`${styles} ${className}`}>
        <span>{children ?? label}</span>
      </DialogTrigger>
      <DialogContent className="max-h-[88vh] overflow-y-auto border-border bg-card sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl">Private dining</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Our back room seats {SITE.privateDining.backRoomCapacity}, while the front dining
            area hosts {SITE.privateDining.frontRoomCapacity}. Tell us about the occasion and
            we'll reply within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <PrivateDiningForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
