import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, MapPin, Send, ExternalLink } from "lucide-react";

const commands: Record<string, string> = {
  help: `Available commands:
  contact    → Show contact information
  email      → Send an email
  github     → Open GitHub profile
  linkedin   → Open LinkedIn profile  
  resume     → Download resume
  projects   → List active projects
  clear      → Clear terminal`,
  contact: `📧 Email: dittu2004@gmail.com
📱 Phone: +91-8091705662
🔗 LinkedIn: linkedin.com/in/aditya-yu
🔗 GitHub: github.com/Aditya0988`,
  email: "📧 dittu2004@gmail.com — Opening mail client...",
  github: "🔗 https://github.com/Aditya0988 — Opening...",
  linkedin: "🔗 https://linkedin.com/in/aditya-yu — Opening...",
  resume: "📄 Downloading resume.pdf...",
  projects: `Active Project Systems:
  [1] AI-Powered OS Monitor
  [2] Ship Trajectory Anomaly Detection
  [3] AI Packing List Generator
  [4] ESP32 Line Following Robot`,
};

const contactInfo = [
  {
    icon: Mail,
    label: "EMAIL",
    value: "dittu2004@gmail.com",
    href: "mailto:dittu2004@gmail.com",
  },
  {
    icon: Phone,
    label: "PHONE",
    value: "+91-8091705662",
    href: "tel:+918091705662",
  },
  {
    icon: Linkedin,
    label: "LINKEDIN",
    value: "linkedin.com/in/aditya-yu",
    href: "https://www.linkedin.com/in/aditya-yu/",
  },
  {
    icon: Github,
    label: "GITHUB",
    value: "github.com/Aditya0988",
    href: "https://github.com/Aditya0988",
  },
];

const ContactSection = () => {
  const [history, setHistory] = useState<{ input: string; output: string }[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = currentInput.trim().toLowerCase();

    if (cmd === "clear") {
      setHistory([]);
      setCurrentInput("");
      return;
    }

    const output = commands[cmd] || `Command not found: "${cmd}". Type "help" for available commands.`;

    if (cmd === "github") {
      window.open("https://github.com/Aditya0988", "_blank");
    } else if (cmd === "linkedin") {
      window.open("https://www.linkedin.com/in/aditya-yu/", "_blank");
    } else if (cmd === "email") {
      window.open("mailto:dittu2004@gmail.com", "_blank");
    }

    setHistory((prev) => [...prev, { input: currentInput, output }]);
    setCurrentInput("");
  };

  return (
    <div className="min-h-screen py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-8">
          <div className="font-mono text-xs text-muted-foreground tracking-widest mb-2">
            MODULE: CONTACT
          </div>
          <h2 className="text-3xl font-bold">
            Contact <span className="neon-text">Interface</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Reach out through any channel or use the terminal below
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {contactInfo.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel-glow p-5 group hover:border-primary/40 transition-all cursor-pointer block"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
                    {item.value}
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground/30 group-hover:text-primary/50 transition-colors flex-shrink-0 mt-1" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Location / Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-4 mb-8 flex flex-wrap items-center gap-6"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary/60" />
            <span className="font-mono text-xs text-muted-foreground">India</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--terminal-green))] animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground">Available for opportunities</span>
          </div>
          <div className="flex items-center gap-2">
            <Send className="w-3.5 h-3.5 text-primary/60" />
            <span className="font-mono text-xs text-muted-foreground">Response time: &lt; 24 hours</span>
          </div>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="font-mono text-xs text-muted-foreground tracking-widest mb-3">
            INTERACTIVE TERMINAL
          </div>
          <div
            className="glass-panel-glow overflow-hidden"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-muted/30">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--terminal-green))]/60" />
              <span className="font-mono text-[10px] text-muted-foreground ml-2 tracking-wider">
                aditya@portfolio ~ /contact
              </span>
            </div>

            {/* Terminal body */}
            <div ref={scrollRef} className="p-4 h-64 overflow-y-auto font-mono text-sm">
              {/* Welcome */}
              <div className="text-muted-foreground mb-4 text-xs">
                <div className="text-primary mb-1">Welcome to Aditya's Terminal v2.0</div>
                <div>Type "help" to see available commands.</div>
              </div>

              {/* History */}
              {history.map((entry, i) => (
                <div key={i} className="mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-primary text-xs">❯</span>
                    <span className="text-foreground text-xs">{entry.input}</span>
                  </div>
                  <pre className="text-muted-foreground text-xs mt-1 whitespace-pre-wrap pl-4">
                    {entry.output}
                  </pre>
                </div>
              ))}

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-primary text-xs">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground text-xs caret-primary"
                  autoFocus
                  spellCheck={false}
                />
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactSection;
