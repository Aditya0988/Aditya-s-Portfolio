import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const skills = [
  { id: "python", label: "Python", x: 50, y: 30, size: 1.3, group: "core" },
  { id: "ml", label: "Machine Learning", x: 25, y: 20, size: 1.2, group: "ai" },
  { id: "flask", label: "Flask", x: 75, y: 25, size: 0.9, group: "web" },
  { id: "esp32", label: "ESP32", x: 20, y: 55, size: 1, group: "embedded" },
  { id: "cpp", label: "C++", x: 15, y: 40, size: 1, group: "core" },
  { id: "apis", label: "APIs", x: 80, y: 50, size: 0.9, group: "web" },
  { id: "monitoring", label: "System Monitoring", x: 60, y: 60, size: 1.1, group: "systems" },
  { id: "data", label: "Data Analysis", x: 40, y: 70, size: 1, group: "ai" },
  { id: "git", label: "Git", x: 70, y: 75, size: 0.8, group: "tools" },
  { id: "linux", label: "Linux", x: 35, y: 45, size: 1, group: "systems" },
];

const connections = [
  ["python", "ml"], ["python", "flask"], ["python", "data"], ["python", "monitoring"],
  ["ml", "data"], ["esp32", "cpp"], ["flask", "apis"], ["monitoring", "linux"],
  ["git", "linux"], ["data", "monitoring"], ["cpp", "esp32"], ["apis", "data"],
];

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getConnectedSkills = (skillId: string) => {
    return connections
      .filter((c) => c.includes(skillId))
      .flat()
      .filter((s) => s !== skillId);
  };

  return (
    <div className="min-h-screen py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-8">
          <div className="font-mono text-xs text-muted-foreground tracking-widest mb-2">
            MODULE: SKILLS NETWORK
          </div>
          <h2 className="text-3xl font-bold">
            Neural <span className="neon-text">Network</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Hover over nodes to explore skill connections
          </p>
        </div>

        <div
          ref={containerRef}
          className="glass-panel relative w-full aspect-[16/9] overflow-hidden"
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full">
            {connections.map(([from, to], i) => {
              const fromSkill = skills.find((s) => s.id === from)!;
              const toSkill = skills.find((s) => s.id === to)!;
              const isHighlighted =
                hoveredSkill &&
                (from === hoveredSkill || to === hoveredSkill);

              return (
                <line
                  key={i}
                  x1={`${fromSkill.x}%`}
                  y1={`${fromSkill.y}%`}
                  x2={`${toSkill.x}%`}
                  y2={`${toSkill.y}%`}
                  stroke={
                    isHighlighted
                      ? "hsl(185, 80%, 55%)"
                      : "hsl(200, 15%, 15%)"
                  }
                  strokeWidth={isHighlighted ? 1.5 : 0.5}
                  strokeOpacity={isHighlighted ? 0.8 : 0.4}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Skill nodes */}
          {skills.map((skill) => {
            const isHovered = hoveredSkill === skill.id;
            const isConnected =
              hoveredSkill && getConnectedSkills(hoveredSkill).includes(skill.id);
            const isDimmed = hoveredSkill && !isHovered && !isConnected;

            return (
              <motion.div
                key={skill.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.15 }}
              >
                <div
                  className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
                    isDimmed ? "opacity-20" : "opacity-100"
                  }`}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isHovered
                        ? "bg-primary shadow-[0_0_15px_hsl(185,80%,55%,0.5)]"
                        : isConnected
                        ? "bg-primary/60"
                        : "bg-primary/30"
                    }`}
                    style={{
                      width: `${12 * skill.size}px`,
                      height: `${12 * skill.size}px`,
                    }}
                  />
                  <span
                    className={`font-mono text-[10px] tracking-wider whitespace-nowrap transition-colors duration-300 ${
                      isHovered
                        ? "text-primary"
                        : isConnected
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {skill.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsSection;
