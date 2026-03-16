import { motion } from "framer-motion";
import {
  Home,
  User,
  FolderKanban,
  Network,
  BarChart3,
  GitBranch,
  Terminal,
} from "lucide-react";

const navItems = [
  { id: "home", label: "HOME", icon: Home },
  { id: "about", label: "ABOUT", icon: User },
  { id: "projects", label: "PROJECTS", icon: FolderKanban },
  { id: "skills", label: "SKILLS", icon: Network },
  { id: "problemsolving", label: "ANALYTICS", icon: BarChart3 },
  { id: "github", label: "GITHUB", icon: GitBranch },
  { id: "contact", label: "TERMINAL", icon: Terminal },
];

interface SystemSidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const SystemSidebar = ({ activeSection, onNavigate }: SystemSidebarProps) => {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed left-0 top-0 h-screen w-16 lg:w-56 z-40 flex flex-col border-r border-border/50 bg-sidebar/80 backdrop-blur-xl"
    >
      {/* Logo */}
      <div className="p-3 lg:p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="glow-dot flex-shrink-0" />
          <span className="hidden lg:block font-mono text-xs tracking-widest text-primary">
            ADITYA.OS
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-2 lg:px-3 py-2.5 rounded-md transition-all duration-200 group relative ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r bg-primary"
                  style={{
                    boxShadow: "0 0 8px hsl(var(--primary) / 0.6)",
                  }}
                />
              )}
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden lg:block font-mono text-[11px] tracking-wider">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Status */}
      <div className="p-3 lg:p-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
          <span className="hidden lg:block font-mono text-[10px] text-muted-foreground tracking-wider">
            SYSTEM ACTIVE
          </span>
        </div>
      </div>
    </motion.aside>
  );
};

export default SystemSidebar;
