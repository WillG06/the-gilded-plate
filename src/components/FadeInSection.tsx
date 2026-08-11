import type { ReactNode } from "react";
import { motion } from "motion/react";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string | undefined;
  id?: string | undefined;
  delay?: number | undefined;
}

/** Reusable scroll-triggered reveal (feature 4). */
export function FadeInSection({ children, className, id, delay = 0 }: FadeInSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}
