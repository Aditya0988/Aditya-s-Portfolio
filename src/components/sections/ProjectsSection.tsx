import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, Cpu, Ship, Luggage, CircuitBoard } from "lucide-react";

const projects = [
  {
    id: "os-monitor",
    title: "AI-Powered OS Monitor",
    subtitle: "SYSTEM INTELLIGENCE",
    icon: Cpu,
    description:
      "A desktop monitoring system that analyzes CPU, memory, and system performance and detects anomalies using machine learning.",
    tech: ["Python", "scikit-learn", "psutil", "Flask", "React"],
    github: "https://github.com/Aditya0988/os-monitor",
    details: [
      "Real-time system metrics collection",
      "ML-based anomaly detection pipeline",
      "Interactive dashboard with live charts",
      "Automated alerting system",
    ],
  },
  {
    id: "ship-trajectory",
    title: "Ship Trajectory Anomaly Detection",
    subtitle: "MARITIME AI",
    icon: Ship,
    description:
      "An AI model that analyzes AIS ship tracking data to detect unusual maritime behavior patterns.",
    tech: ["Python", "TensorFlow", "Pandas", "GeoPandas", "Matplotlib"],
    github: "https://github.com/Aditya0988/ship-trajectory",
    details: [
      "AIS data preprocessing pipeline",
      "Trajectory clustering & classification",
      "Anomaly scoring algorithm",
      "Geospatial visualization",
    ],
  },
  {
    id: "packing-list",
    title: "AI Packing List Generator",
    subtitle: "NLP APPLICATION",
    icon: Luggage,
    description:
      "A web application that uses natural language input and weather data to generate optimized travel packing lists.",
    tech: ["Python", "Flask", "OpenAI API", "Weather API", "Tailwind CSS"],
    github: "https://github.com/Aditya0988/packing-list",
    details: [
      "Natural language trip parsing",
      "Weather-aware suggestions",
      "Optimized packing algorithms",
      "Shareable packing lists",
    ],
  },
  {
    id: "line-robot",
    title: "ESP32 Line Following Robot",
    subtitle: "EMBEDDED SYSTEMS",
    icon: CircuitBoard,
    description:
      "A robotics project using ESP32, QTR sensors, and PID control to build a fast and precise line-following robot.",
    tech: ["C++", "ESP32", "QTR Sensors", "PID Control", "Arduino"],
    github: "https://github.com/Aditya0988/line-robot",
    details: [
      "PID tuning for precision navigation",
      "QTR-8 sensor array integration",
      "Real-time motor control",
      "Bluetooth telemetry dashboard",
    ],
  },
];

const ProjectsSection = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-8">
          <div className="font-mono text-xs text-muted-foreground tracking-widest mb-2">
            MODULE: PROJECT SYSTEMS
          </div>
          <h2 className="text-3xl font-bold">
            Active <span className="neon-text">Projects</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-5 cursor-pointer hover:border-primary/30 transition-all duration-300"
              onClick={() =>
                setExpanded(expanded === project.id ? null : project.id)
              }
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <project.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{project.title}</h3>
                    <div className="font-mono text-[10px] text-primary/70 tracking-widest">
                      {project.subtitle}
                    </div>
                  </div>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded hover:bg-muted transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-muted-foreground" />
                </a>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <AnimatePresence>
                {expanded === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-border/50">
                      <div className="font-mono text-[10px] text-primary tracking-widest mb-2">
                        TECHNICAL BREAKDOWN
                      </div>
                      <ul className="space-y-1.5">
                        {project.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-center gap-2 text-sm text-secondary-foreground"
                          >
                            <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;
