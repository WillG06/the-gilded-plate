import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays, Minus, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const fieldLabel = "eyebrow block";
const fieldBase =
  "flex w-full items-center justify-between border-0 border-b border-border bg-transparent px-0 py-3 text-left text-sm transition-colors hover:border-wine focus:outline-none focus-visible:border-wine";

/** Calendar date field — no native picker chrome. */
export function DateField({
  name,
  label = "Date",
  id,
}: {
  name: string;
  label?: string;
  id: string;
}) {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <label className={fieldLabel} htmlFor={id}>
        {label}
      </label>
      <input type="hidden" name={name} value={date ? format(date, "yyyy-MM-dd") : ""} required />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger id={id} type="button" className={fieldBase}>
          <span className={date ? "" : "text-muted-foreground"}>
            {date ? format(date, "EEEE d MMMM yyyy") : "Choose a date"}
          </span>
          <CalendarDays aria-hidden className="h-4 w-4 text-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto border-border bg-card p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setOpen(false);
            }}
            disabled={{ before: new Date() }}
            initialFocus
            className={cn("pointer-events-auto p-3")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

const SERVICE_TIMES = {
  Lunch: ["12:00", "12:30", "13:00", "13:30", "14:00"],
  Dinner: ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
} as const;

/** Time chips grouped by service. */
export function TimeField({ name, defaultValue = "19:00" }: { name: string; defaultValue?: string }) {
  const [time, setTime] = useState(defaultValue);

  return (
    <div>
      <span className={fieldLabel}>Time</span>
      <input type="hidden" name={name} value={time} />
      <div className="mt-3 space-y-4">
        {(Object.keys(SERVICE_TIMES) as (keyof typeof SERVICE_TIMES)[]).map((service) => (
          <div key={service}>
            <p className="text-[0.6rem] tracking-[0.24em] uppercase text-muted-foreground">
              {service}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SERVICE_TIMES[service].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  aria-pressed={time === t}
                  className={`border px-3 py-1.5 text-xs tracking-[0.12em] transition-colors ${
                    time === t
                      ? "border-wine bg-wine text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-wine hover:text-wine"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Guest stepper with a hairline frame. */
export function GuestsField({
  name,
  min = 1,
  max = 12,
  defaultValue = 2,
  label = "Guests",
}: {
  name: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  label?: string;
}) {
  const [guests, setGuests] = useState(defaultValue);
  const step = (d: number) => setGuests((g) => Math.min(max, Math.max(min, g + d)));

  return (
    <div>
      <span className={fieldLabel}>{label}</span>
      <input type="hidden" name={name} value={guests} />
      <div className="mt-3 flex w-full max-w-[220px] items-center justify-between border border-border">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={guests <= min}
          aria-label="Fewer guests"
          className="px-4 py-3 text-muted-foreground transition-colors hover:text-wine disabled:opacity-30"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="font-display text-2xl tabular-nums">{guests}</span>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={guests >= max}
          aria-label="More guests"
          className="px-4 py-3 text-muted-foreground transition-colors hover:text-wine disabled:opacity-30"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {guests >= max && (
        <p className="mt-2 text-xs text-muted-foreground">
          For larger parties, use our private dining enquiry.
        </p>
      )}
    </div>
  );
}
