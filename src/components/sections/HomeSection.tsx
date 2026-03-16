import { motion } from "framer-motion";
import { ArrowRight, Github, Download } from "lucide-react";
import profileImg from "@/assets/profile-placeholder.png";

interface HomeSectionProps {
  onNavigate: (section: string) => void;
}

const HomeSection = ({ onNavigate }: HomeSectionProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-center relative py-12">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 flex-1"
        >
          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <div className="glow-dot" />
            <span className="tracking-widest">
              SYSTEM ONLINE — ALL MODULES ACTIVE
            </span>
          </div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl lg:text-8xl font-bold tracking-tight"
            >
              <span className="text-foreground">Aditya</span>
              <br />
              <span className="neon-text">Sharma</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 font-mono text-base text-muted-foreground"
            >
              <span className="text-primary">▸</span>
              <span>Developer</span>
              <span className="text-border">•</span>
              <span>AI Systems</span>
              <span className="text-border">•</span>
              <span>Robotics</span>
              <span className="text-border">•</span>
              <span>Web Development</span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-secondary-foreground max-w-lg text-lg leading-relaxed"
          >
            Building intelligent systems that monitor, analyze, and automate
            real-world processes. Focused on the intersection of AI, embedded
            systems, and software engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <button
              onClick={() => onNavigate("projects")}
              className="glass-panel-glow px-5 py-2.5 font-mono text-xs tracking-wider text-primary flex items-center gap-2 hover:bg-primary/10 transition-colors"
            >
              VIEW PROJECTS <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href="https://github.com/Aditya0988"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel px-5 py-2.5 font-mono text-xs tracking-wider text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> GITHUB
            </a>

            <button className="glass-panel px-5 py-2.5 font-mono text-xs tracking-wider text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors">
              <Download className="w-3.5 h-3.5" /> RESUME
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-4 pt-8 max-w-md"
          >
            {[
              { label: "PROJECTS", value: "10+" },
              { label: "TECHNOLOGIES", value: "15+" },
              { label: "PROBLEMS SOLVED", value: "200+" },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel p-3 text-center">
                <div className="text-xl font-bold neon-text">{stat.value}</div>
                <div className="font-mono text-[10px] text-muted-foreground tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE — PROFILE PANEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex-shrink-0 w-full max-w-xs lg:max-w-sm lg:mt-8"
        >
          <div className="holo-panel group relative perspective-1000">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative glass-panel-glow p-6 rounded-xl transition-transform duration-300 group-hover:[transform:rotateY(3deg)_rotateX(-3deg)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/50 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/50 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/50 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/50 rounded-br-xl" />

              <div className="font-mono text-[10px] tracking-[0.3em] text-primary/70 text-center mb-5">
                <span className="inline-flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  DEVELOPER IDENTITY
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                </span>
              </div>

              {/* PROFILE IMAGE */}
              <div className="flex justify-center mb-5">
                <div className="relative">

                  {/* rings */}
                  <div className="absolute -inset-4 rounded-full holo-ring" />
                  <div className="absolute -inset-7 rounded-full holo-ring-outer" />

                  {/* glow */}
                  <div className="absolute -inset-3 rounded-full bg-primary/10 blur-2xl" />

                  {/* larger image */}
                  <div className="relative w-52 h-52 rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_25px_hsl(var(--primary)/0.35)]">
                    <img
                      src={profileImg}
                      alt="Aditya Sharma"
                      className="w-full h-full object-cover scale-105"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center space-y-3">
                <h3 className="text-lg font-bold tracking-wider neon-text">
                  ADITYA SHARMA
                </h3>

                <div className="flex items-center justify-center gap-2">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50" />
                </div>

                <div className="font-mono text-[10px] space-y-1.5 text-muted-foreground">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-primary/60">STATUS</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--terminal-green))] animate-pulse" />
                      <span className="text-[hsl(var(--terminal-green))]">
                        ONLINE
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between px-2">
                    <span className="text-primary/60">NODE</span>
                    <span className="text-foreground/80">ACTIVE</span>
                  </div>

                  <div className="flex items-center justify-between px-2">
                    <span className="text-primary/60">ROLE</span>
                    <span className="text-foreground/80">
                      AI SYSTEMS ENGINEER
                    </span>
                  </div>

                  <div className="flex items-center justify-between px-2">
                    <span className="text-primary/60">UPTIME</span>
                    <span className="text-foreground/80">99.9%</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/30">
                <div className="flex justify-between font-mono text-[8px] text-muted-foreground/50 tracking-widest">
                  <span>SYS.ID: 0988</span>
                  <span>v2.0.4</span>
                  <span>SEC: HIGH</span>
                </div>
              </div>

              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                <div className="scan-line w-full h-8 absolute" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeSection;