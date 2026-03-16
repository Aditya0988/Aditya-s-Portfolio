import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitBranch, Star, ExternalLink, Loader2 } from "lucide-react";

const GITHUB_USERNAME = "Aditya0988";

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
}

const GitHubSection = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heatmapData, setHeatmapData] = useState<number[][]>([]);

  useEffect(() => {
    fetchRepos();
    fetchHeatmap();
  }, []);

  const fetchRepos = async () => {
    try {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=20`
      );

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("GitHub API error");
      }

      const topRepos = data
        .sort((a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);

      setRepos(topRepos);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch repositories");
    } finally {
      setLoading(false);
    }
  };

  const fetchHeatmap = async () => {
    try {
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`
      );

      const data = await res.json();

      const today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setDate(today.getDate() - 365);

      // Filter only last 365 days
      const lastYearContributions = data.contributions.filter((day: any) => {
        const d = new Date(day.date);
        return d >= oneYearAgo && d <= today;
      });

      const weeks: number[][] = [];

      lastYearContributions.forEach((day: any, i: number) => {
        const weekIndex = Math.floor(i / 7);

        if (!weeks[weekIndex]) weeks[weekIndex] = [];

        weeks[weekIndex].push(day.count);
      });

      setHeatmapData(weeks);
    } catch (err) {
      console.error("Heatmap fetch failed");
    }
  };

  const getColor = (val: number) => {
    if (val === 0) return "hsl(var(--muted))";
    if (val < 3) return "hsl(185,80%,35%)";
    if (val < 6) return "hsl(185,80%,45%)";
    if (val < 10) return "hsl(185,80%,55%)";
    return "hsl(185,80%,65%)";
  };

  return (
    <div className="min-h-screen py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-8">
          <div className="font-mono text-xs text-muted-foreground tracking-widest mb-2">
            MODULE: VERSION CONTROL
          </div>

          <h2 className="text-3xl font-bold">
            GitHub <span className="neon-text">Activity</span>
          </h2>
        </div>

        {/* Heatmap */}
        <div className="glass-panel p-5 mb-6">
          <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-4">
            CONTRIBUTION GRAPH — LAST 12 MONTHS
          </div>

          <div className="flex gap-[3px] overflow-x-auto pb-2">
            {heatmapData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((val, di) => (
                  <div
                    key={di}
                    className="w-2.5 h-2.5 rounded-[2px]"
                    style={{
                      background: getColor(val),
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Repositories */}
        <div className="space-y-3">
          <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-2">
            TOP REPOSITORIES — LIVE FROM GITHUB API
          </div>

          {loading && (
            <div className="glass-panel p-6 flex items-center gap-2 text-muted-foreground">
              <Loader2 className="animate-spin w-4 h-4" />
              <span className="font-mono text-xs">
                Fetching repositories...
              </span>
            </div>
          )}

          {error && (
            <div className="glass-panel p-4 text-red-400 text-sm font-mono">
              {error}
            </div>
          )}

          {!loading &&
            repos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-panel p-4 flex items-center justify-between hover:border-primary/30 transition-all block"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <GitBranch className="w-4 h-4 text-primary shrink-0" />

                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">
                      {repo.name}
                    </div>

                    <div className="text-xs text-muted-foreground truncate">
                      {repo.description || "No description"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground shrink-0 ml-3">
                  {repo.language && (
                    <span className="font-mono text-xs">{repo.language}</span>
                  )}

                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span className="font-mono text-xs">
                      {repo.stargazers_count}
                    </span>
                  </div>

                  <ExternalLink className="w-3 h-3" />
                </div>
              </motion.a>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GitHubSection;