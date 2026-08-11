// Previous server-side implementation retained as comments.
// import { useState, type FormEvent } from "react";
// import { useServerFn } from "@tanstack/react-start";
// import { sendEnquiry } from "@/lib/email.functions";
// import { DateField, GuestsField } from "@/components/BookingFields";
//
// const inputClass = "w-full border border-input bg-card px-4 py-3 text-sm";
// const labelClass = "eyebrow block";
//
// /** Private dining enquiry form (feature 11). */
// export function PrivateDiningForm() {
//   const send = useServerFn(sendEnquiry);
//   const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
//
//   async function onSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
//     setStatus("sending");
//     try {
//       await send({ data: { subject: "Private dining enquiry", fields: data } });
//       setStatus("done");
//       form.reset();
//     } catch {
//       setStatus("error");
//     }
//   }
//
//   return (
//     <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
//       <div>
//         <label className={labelClass} htmlFor="p-name">
//           Name
//         </label>
//         <input className={inputClass} id="p-name" name="name" required maxLength={100} />
//       </div>
//       <div>
//         <label className={labelClass} htmlFor="p-email">
//           Email
//         </label>
//         <input className={inputClass} id="p-email" name="email" type="email" required maxLength={255} />
//       </div>
//       <div>
//         <label className={labelClass} htmlFor="p-phone">
//           Phone
//         </label>
//         <input className={inputClass} id="p-phone" name="phone" type="tel" required maxLength={30} />
//       </div>
//       <div>
//         <label className={labelClass} htmlFor="p-occasion">
//           Occasion
//         </label>
//         <select className={inputClass} id="p-occasion" name="occasion" defaultValue="Birthday">
//           <option>Birthday</option>
//           <option>Corporate</option>
//           <option>Celebration</option>
//           <option>Wedding party</option>
//           <option>Other</option>
//         </select>
//       </div>
//       <DateField id="p-date" name="date" label="Preferred date" />
//       <GuestsField name="guests" min={8} max={40} defaultValue={12} label="Number of guests" />
//       <div className="sm:col-span-2">
//         <label className={labelClass} htmlFor="p-diet">
//           Dietary requirements
//         </label>
//         <input className={inputClass} id="p-diet" name="dietary" maxLength={500} />
//       </div>
//       <div className="sm:col-span-2">
//         <label className={labelClass} htmlFor="p-message">
//           Message
//         </label>
//         <textarea className={inputClass} id="p-message" name="message" rows={5} maxLength={1000} />
//       </div>
//
//       <button
//         type="submit"
//         disabled={status === "sending"}
//         className="btn btn--wine sm:col-span-2"
//       >
//         <span>{status === "sending" ? "Sending…" : "Send enquiry"}</span>
//       </button>
//
//       {status === "done" && (
//         <p role="status" className="text-sm text-wine sm:col-span-2">
//           Thank you — we'll be in touch within 24 hours.
//         </p>
//       )}
//       {status === "error" && (
//         <p role="alert" className="text-sm text-destructive sm:col-span-2">
//           Something went wrong. Please email welcome@panevino.uk.
//         </p>
//       )}
//     </form>
//   );
// }
//
import { useState, type FormEvent } from "react";
import { sendEnquiry } from "@/lib/email.functions";
import { DateField, GuestsField } from "@/components/BookingFields";

const inputClass = "w-full border border-input bg-card px-4 py-3 text-sm";
const labelClass = "eyebrow block";

/** Private dining enquiry form (feature 11). */
export function PrivateDiningForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      await sendEnquiry({ subject: "Private dining enquiry", fields: data });
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label className={labelClass} htmlFor="p-name">
          Name
        </label>
        <input className={inputClass} id="p-name" name="name" required maxLength={100} />
      </div>
      <div>
        <label className={labelClass} htmlFor="p-email">
          Email
        </label>
        <input className={inputClass} id="p-email" name="email" type="email" required maxLength={255} />
      </div>
      <div>
        <label className={labelClass} htmlFor="p-phone">
          Phone
        </label>
        <input className={inputClass} id="p-phone" name="phone" type="tel" required maxLength={30} />
      </div>
      <div>
        <label className={labelClass} htmlFor="p-occasion">
          Occasion
        </label>
        <select className={inputClass} id="p-occasion" name="occasion" defaultValue="Birthday">
          <option>Birthday</option>
          <option>Corporate</option>
          <option>Celebration</option>
          <option>Wedding party</option>
          <option>Other</option>
        </select>
      </div>
      <DateField id="p-date" name="date" label="Preferred date" />
      <GuestsField name="guests" min={8} max={40} defaultValue={12} label="Number of guests" />
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor="p-diet">
          Dietary requirements
        </label>
        <input className={inputClass} id="p-diet" name="dietary" maxLength={500} />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor="p-message">
          Message
        </label>
        <textarea className={inputClass} id="p-message" name="message" rows={5} maxLength={1000} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn--wine sm:col-span-2"
      >
        <span>{status === "sending" ? "Sending…" : "Send enquiry"}</span>
      </button>

      {status === "done" && (
        <p role="status" className="text-sm text-wine sm:col-span-2">
          Thank you — we'll be in touch within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm text-destructive sm:col-span-2">
          Something went wrong. Please email welcome@panevino.uk.
        </p>
      )}
    </form>
  );
}
