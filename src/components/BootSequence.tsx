import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "INITIALIZING DEVELOPER PROFILE...", delay: 0 },
  { text: "LOADING SYSTEM MODULES...", delay: 600 },
  { text: "CONNECTING TO GITHUB...", delay: 1200 },
  { text: "ANALYZING PROBLEM SOLVING DATA...", delay: 1800 },
  { text: "LOADING PROJECT SYSTEMS...", delay: 2400 },
  { text: "CALIBRATING SKILLS NETWORK...", delay: 3000 },
  { text: "ALL SYSTEMS OPERATIONAL.", delay: 3600, highlight: true },
  { text: "WELCOME, VISITOR.", delay: 4200, highlight: true },
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
    });

    setTimeout(() => {
      setComplete(true);
      setTimeout(onComplete, 800);
    }, 4800);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="scan-line fixed inset-0 pointer-events-none opacity-30" />
          <div className="max-w-lg w-full px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <div className="font-mono text-xs text-muted-foreground mb-4 tracking-widest">
                ADITYA.OS v2.0
              </div>
              <div className="h-px bg-border mb-6" />
            </motion.div>

            <div className="space-y-3 font-mono text-sm">
              {bootLines.slice(0, visibleLines).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <span className={`glow-dot flex-shrink-0 ${line.highlight ? '' : 'opacity-50'}`} />
                  <span className={line.highlight ? "neon-text font-semibold" : "text-muted-foreground"}>
                    {line.text}
                  </span>
                  {index === visibleLines - 1 && !line.highlight && (
                    <span className="typing-cursor text-primary" />
                  )}
                </motion.div>
              ))}
            </div>

            {visibleLines > 0 && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "hsl(var(--primary))" }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${(visibleLines / bootLines.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
