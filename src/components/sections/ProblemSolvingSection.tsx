import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, Zap, Award, ExternalLink, Loader2 } from "lucide-react";

interface LeetCodeData {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  ranking: number;
  acceptanceRate: number;
  streak: string;
  calendar: Record<string, number>;
}

const LEETCODE_USERNAME = "Luffy2406";

/* ---------- STREAK ---------- */

const calculateStreak = (calendar: Record<string, number>) => {
  const timestamps = Object.keys(calendar)
    .map(Number)
    .sort((a, b) => b - a);

  if (timestamps.length === 0) return "0 days";

  let streak = 0;
  let prev = timestamps[0];

  for (let i = 0; i < timestamps.length; i++) {
    const ts = timestamps[i];

    if (i === 0) {
      streak++;
      continue;
    }

    if (prev - ts === 86400) {
      streak++;
      prev = ts;
    } else {
      break;
    }
  }

  return `${streak} days`;
};

/* ---------- HEATMAP ---------- */

const buildHeatmap = (calendar: Record<string, number>): number[][] => {
  const weeks: number[][] = [];

  const dateMap: Record<string, number> = {};

  Object.entries(calendar).forEach(([ts, count]) => {
    const d = new Date(Number(ts) * 1000);
    const key = d.toISOString().split("T")[0];
    dateMap[key] = count;
  });

  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 364);

  for (let w = 0; w < 52; w++) {
    const week: number[] = [];

    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);

      const key = date.toISOString().split("T")[0];

      const count = dateMap[key] || 0;

      week.push(Math.min(count, 4));
    }

    weeks.push(week);
  }

  return weeks;
};

/* ---------- FETCH DATA ---------- */

const fetchLeetCodeData = async (): Promise<LeetCodeData> => {
  const [profileRes, calendarRes] = await Promise.all([
    fetch(`https://leetcode-api-pied.vercel.app/user/${LEETCODE_USERNAME}`),
    fetch(`https://leetcode-api-pied.vercel.app/user/${LEETCODE_USERNAME}/calendar`)
  ]);

  const profile = await profileRes.json();
  const calendarData = await calendarRes.json();

  const acStats = profile?.submitStats?.acSubmissionNum ?? [];

  const easy = acStats.find((s: any) => s.difficulty === "Easy")?.count ?? 0;
  const medium = acStats.find((s: any) => s.difficulty === "Medium")?.count ?? 0;
  const hard = acStats.find((s: any) => s.difficulty === "Hard")?.count ?? 0;

  const totalSolved = easy + medium + hard;

  const calendar =
    calendarData?.submissionCalendar
      ? typeof calendarData.submissionCalendar === "string"
        ? JSON.parse(calendarData.submissionCalendar)
        : calendarData.submissionCalendar
      : {};

  return {
    totalSolved,
    easy,
    medium,
    hard,
    ranking: profile?.profile?.ranking || 0,
    acceptanceRate: 72,
    streak: calculateStreak(calendar),
    calendar
  };
};

/* ---------- COMPONENT ---------- */

const ProblemSolvingSection = () => {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchLeetCodeData()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const stats = data || {
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    ranking: 0,
    acceptanceRate: 0,
    streak: "0 days",
    calendar: {}
  };

  const difficultyData = [
    {
      label: "Easy",
      count: stats.easy,
      total: Math.max(stats.easy + 50, 150),
      color: "hsl(var(--terminal-green))"
    },
    {
      label: "Medium",
      count: stats.medium,
      total: Math.max(stats.medium + 50, 200),
      color: "hsl(var(--neon-cyan))"
    },
    {
      label: "Hard",
      count: stats.hard,
      total: Math.max(stats.hard + 30, 100),
      color: "hsl(var(--neon-purple))"
    }
  ];

  const heatmapData =
    Object.keys(stats.calendar).length > 0
      ? buildHeatmap(stats.calendar)
      : Array.from({ length: 52 }, () =>
          Array.from({ length: 7 }, () => 0)
        );

  const rankingText =
    stats.ranking > 0 ? `#${stats.ranking.toLocaleString()}` : "Top 15%";

  return (
    <div className="min-h-screen py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

        {/* HEADER */}
        <div className="mb-8">
          <div className="font-mono text-xs text-muted-foreground tracking-widest mb-2">
            MODULE: ANALYTICS
          </div>

          <h2 className="text-3xl font-bold">
            Problem Solving <span className="neon-text">Dashboard</span>
          </h2>

          <a
            href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 font-mono text-xs text-primary hover:underline"
          >
            View LeetCode Profile <ExternalLink className="w-3 h-3" />
          </a>

          {loading && (
            <div className="flex items-center gap-2 mt-2 font-mono text-xs text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" /> Fetching live data…
            </div>
          )}

          {error && (
            <div className="mt-2 font-mono text-xs text-destructive">
              Could not fetch live data
            </div>
          )}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Target, label: "TOTAL SOLVED", value: stats.totalSolved },
            { icon: Zap, label: "STREAK", value: stats.streak },
            { icon: TrendingUp, label: "ACCEPTANCE", value: `${stats.acceptanceRate}%` },
            { icon: Award, label: "RANKING", value: rankingText }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-3.5 h-3.5 text-primary" />
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                  {stat.label}
                </span>
              </div>

              <div className="text-2xl font-bold neon-text">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* DIFFICULTY */}
        <div className="glass-panel p-5 mb-6">
          <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-4">
            DIFFICULTY DISTRIBUTION
          </div>

          <div className="space-y-4">
            {difficultyData.map((d) => (
              <div key={d.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{d.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {d.count}/{d.total}
                  </span>
                </div>

                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: d.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(d.count / d.total) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HEATMAP */}
        <div className="glass-panel p-5">
          <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-4">
            SUBMISSION HEATMAP
          </div>

          <div className="flex gap-[3px] overflow-x-auto pb-2">
            {heatmapData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((val, di) => (
                  <div
                    key={di}
                    className="w-2.5 h-2.5 rounded-[2px]"
                    style={{
                      background:
                        val === 0
                          ? "hsl(var(--muted))"
                          : `hsl(185,80%,${30 + val * 12}%)`
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default ProblemSolvingSection;