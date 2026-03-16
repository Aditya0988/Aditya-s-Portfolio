import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import NetworkBackground from "@/components/NetworkBackground";
import SystemSidebar from "@/components/SystemSidebar";
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProblemSolvingSection from "@/components/sections/ProblemSolvingSection";
import GitHubSection from "@/components/sections/GitHubSection";
import ContactSection from "@/components/sections/ContactSection";

const sections: Record<string, React.ComponentType<any>> = {
  home: HomeSection,
  about: AboutSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  problemsolving: ProblemSolvingSection,
  github: GitHubSection,
  contact: ContactSection,
};

const Index = () => {
  const [booted, setBooted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  const ActiveComponent = sections[activeSection];

  return (
    <div className="min-h-screen bg-background relative">
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      {booted && (
        <>
          <NetworkBackground />

          <SystemSidebar
            activeSection={activeSection}
            onNavigate={setActiveSection}
          />

          {/* Main content area */}
          <main className="ml-16 lg:ml-56 min-h-screen relative z-10">
            <div className="max-w-5xl mx-auto px-6 lg:px-10">
              {/* Top bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="sticky top-0 z-20 py-3 flex items-center justify-between font-mono text-[10px] text-muted-foreground tracking-widest bg-background/50 backdrop-blur-md border-b border-border/30"
              >
                <span>
                  SYS:{activeSection.toUpperCase()} — ADITYA.OS v2.0
                </span>
                <div className="flex items-center gap-3">
                  <span className="hidden md:inline">UTC {new Date().toISOString().slice(11, 19)}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === "home" ? (
                    <ActiveComponent onNavigate={setActiveSection} />
                  ) : (
                    <ActiveComponent />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Index;
