import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Bot, Code2, ChevronRight } from "lucide-react";

const modules = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    icon: Brain,
    description:
      "Developing anomaly detection systems, predictive models, and intelligent automation pipelines. Expertise in scikit-learn, TensorFlow, and data-driven decision making.",
    tags: ["Anomaly Detection", "Predictive Models", "Data Pipelines"],
  },
  {
    id: "systems",
    title: "Systems Engineering",
    icon: Cpu,
    description:
      "Building real-time monitoring tools, performance analyzers, and system-level software. Deep understanding of OS internals, process management, and resource optimization.",
    tags: ["OS Monitoring", "Performance Analysis", "System Design"],
  },
  {
    id: "robotics",
    title: "Robotics & Embedded",
    icon: Bot,
    description:
      "Creating autonomous robotic systems using ESP32, sensor fusion, and PID control algorithms. Bridging hardware and software for real-world automation.",
    tags: ["ESP32", "PID Control", "Sensor Fusion"],
  },
  {
    id: "algorithms",
    title: "Algorithmic Problem Solving",
    icon: Code2,
    description:
      "Consistently solving complex algorithmic challenges on competitive platforms. Strong foundations in data structures, graph theory, and dynamic programming.",
    tags: ["Data Structures", "Graph Theory", "Dynamic Programming"],
  },
];

const AboutSection = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="font-mono text-xs text-muted-foreground tracking-widest mb-2">
            MODULE: IDENTITY
          </div>
          <h2 className="text-3xl font-bold">
            System <span className="neon-text">Modules</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg text-sm">
            Aditya focuses on developing intelligent software systems that combine
            machine learning, real-time monitoring, and automation.
          </p>
        </div>

        {/* Modules grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod, index) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() =>
                  setActiveModule(activeModule === mod.id ? null : mod.id)
                }
                className={`w-full text-left glass-panel p-5 transition-all duration-300 ${
                  activeModule === mod.id
                    ? "neon-border"
                    : "hover:border-border"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      <mod.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{mod.title}</h3>
                      <div className="font-mono text-[10px] text-muted-foreground tracking-wider mt-0.5">
                        MODULE ACTIVE
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      activeModule === mod.id ? "rotate-90" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {activeModule === mod.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-border/50">
                        <p className="text-sm text-secondary-foreground leading-relaxed">
                          {mod.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {mod.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] px-2 py-1 rounded bg-primary/10 text-primary tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;
