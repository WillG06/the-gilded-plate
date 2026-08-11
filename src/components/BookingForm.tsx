// Previous server-side implementation retained as comments.
// import { useState, type FormEvent } from "react";
// import { useServerFn } from "@tanstack/react-start";
// import { sendEnquiry } from "@/lib/email.functions";
// import { DateField, GuestsField, TimeField } from "@/components/BookingFields";
//
// const inputClass =
//   "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-foreground focus:border-wine focus:outline-none";
// const labelClass = "eyebrow block";
//
// /** Custom reservation form (feature 13). */
// export function BookingForm() {
//   const send = useServerFn(sendEnquiry);
//   const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
//
//   async function onSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
//     setStatus("sending");
//     try {
//       await send({ data: { subject: "New table reservation", fields: data } });
//       setStatus("done");
//       form.reset();
//     } catch {
//       setStatus("error");
//     }
//   }
//
//   return (
//     <div id="book" className="mx-auto grid max-w-[1200px] gap-16 px-6 py-24 md:px-16 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
//       <div>
//         <p className="eyebrow">Reservations</p>
//         <h2 className="mt-4 font-display text-5xl">Book a table</h2>
//         <p className="mt-6 max-w-prose leading-relaxed text-muted-foreground">
//           We hold a handful of tables for walk-ins, but weekends fill fast. Tell us when you'd
//           like to come and we'll confirm by email. For parties of more than twelve, please use
//           our private dining enquiry form.
//         </p>
//       </div>
//
//       <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
//         <DateField id="b-date" name="date" />
//         <GuestsField name="guests" />
//         <div className="sm:col-span-2">
//           <TimeField name="time" />
//         </div>
//         <div>
//           <label className={labelClass} htmlFor="b-name">
//             Name
//           </label>
//           <input className={inputClass} id="b-name" name="name" required maxLength={100} />
//         </div>
//         <div>
//           <label className={labelClass} htmlFor="b-email">
//             Email
//           </label>
//           <input className={inputClass} id="b-email" name="email" type="email" required maxLength={255} />
//         </div>
//         <div>
//           <label className={labelClass} htmlFor="b-phone">
//             Phone
//           </label>
//           <input className={inputClass} id="b-phone" name="phone" type="tel" required maxLength={30} />
//         </div>
//         <div className="sm:col-span-2">
//           <label className={labelClass} htmlFor="b-notes">
//             Special requests
//           </label>
//           <textarea className={inputClass} id="b-notes" name="requests" rows={4} maxLength={1000} />
//         </div>
//
//         <button
//           type="submit"
//           disabled={status === "sending"}
//           className="btn btn--outline justify-self-start disabled:opacity-50 sm:col-span-2"
//         >
//           <span>{status === "sending" ? "Sending…" : "Request table"}</span>
//         </button>
//
//         {status === "done" && (
//           <p role="status" className="text-sm text-wine sm:col-span-2">
//             Grazie — your request is in. We'll confirm by email shortly.
//           </p>
//         )}
//         {status === "error" && (
//           <p role="alert" className="text-sm text-destructive sm:col-span-2">
//             Something went wrong. Please call us on 0121 384 3075.
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }
//
import { useState, type FormEvent } from "react";
import { sendEnquiry } from "@/lib/email.functions";
import { DateField, GuestsField, TimeField } from "@/components/BookingFields";

const inputClass =
  "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-foreground focus:border-wine focus:outline-none";
const labelClass = "eyebrow block";

/** Custom reservation form (feature 13). */
export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      await sendEnquiry({ subject: "New table reservation", fields: data });
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="book" className="mx-auto grid max-w-[1200px] gap-16 px-6 py-24 md:px-16 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
      <div>
        <p className="eyebrow">Reservations</p>
        <h2 className="mt-4 font-display text-5xl">Book a table</h2>
        <p className="mt-6 max-w-prose leading-relaxed text-muted-foreground">
          We hold a handful of tables for walk-ins, but weekends fill fast. Tell us when you'd
          like to come and we'll confirm by email. For parties of more than twelve, please use
          our private dining enquiry form.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
        <DateField id="b-date" name="date" />
        <GuestsField name="guests" />
        <div className="sm:col-span-2">
          <TimeField name="time" />
        </div>
        <div>
          <label className={labelClass} htmlFor="b-name">
            Name
          </label>
          <input className={inputClass} id="b-name" name="name" required maxLength={100} />
        </div>
        <div>
          <label className={labelClass} htmlFor="b-email">
            Email
          </label>
          <input className={inputClass} id="b-email" name="email" type="email" required maxLength={255} />
        </div>
        <div>
          <label className={labelClass} htmlFor="b-phone">
            Phone
          </label>
          <input className={inputClass} id="b-phone" name="phone" type="tel" required maxLength={30} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="b-notes">
            Special requests
          </label>
          <textarea className={inputClass} id="b-notes" name="requests" rows={4} maxLength={1000} />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn--outline justify-self-start disabled:opacity-50 sm:col-span-2"
        >
          <span>{status === "sending" ? "Sending…" : "Request table"}</span>
        </button>

        {status === "done" && (
          <p role="status" className="text-sm text-wine sm:col-span-2">
            Grazie — your request is in. We'll confirm by email shortly.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="text-sm text-destructive sm:col-span-2">
            Something went wrong. Please call us on 0121 384 3075.
          </p>
        )}
      </form>
    </div>
  );
}
