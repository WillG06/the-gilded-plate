import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { assetUrl } from "@/lib/utils";
const inkWine = assetUrl("/img/ink-wine.png");
const inkGrapes = assetUrl("/img/ink-grapes.png");
const inkBread = assetUrl("/img/ink-bread.png");

const IMAGES = [inkWine, inkGrapes, inkBread];

/**
 * Intro loader: "PANE" & "VINO" split apart around a cycling ink drawing,
 * then a solid wine curtain wipes downward to present the page.
 */
export function Loader() {
  const [index, setIndex] = useState(0);
  const [wiping, setWiping] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const cycle = window.setInterval(() => {
      setIndex((i) => {
        if (i === IMAGES.length - 1) {
          window.clearInterval(cycle);
          setWiping(true);
          window.setTimeout(() => setDone(true), 1100);
          return i;
        }
        return i + 1;
      });
    }, 520);
    return () => window.clearInterval(cycle);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <div key="loader" className="pointer-events-none fixed inset-0 z-[9998]" aria-hidden>
          {/* Paper stage with the wordmark */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-paper"
            animate={{ opacity: wiping ? 0 : 1 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-center gap-4">
              <motion.span
                className="font-display text-[8vw] leading-none tracking-tight md:text-[5vw]"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                PANE
              </motion.span>

              <motion.img
                key={index}
                src={IMAGES[index]}
                alt=""
                width={512}
                height={512}
                className="h-[8vw] w-auto object-contain md:h-[5vw]"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />

              <motion.span
                className="font-display text-[8vw] leading-none tracking-tight md:text-[5vw]"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                VINO
              </motion.span>
            </div>
          </motion.div>

          {/* Solid colour curtain: drops down over the stage, then lifts away
              downward to reveal the first screen. */}
          <motion.div
            className="absolute inset-x-0 top-0 h-full bg-wine-deep"
            initial={{ y: "-100%" }}
            animate={wiping ? { y: ["-100%", "0%", "0%", "100%"] } : { y: "-100%" }}
            transition={{ duration: 1.1, times: [0, 0.4, 0.55, 1], ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
