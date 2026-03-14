import { useGetLeaderboard } from "@workspace/api-client-react";
import { Shield, Trophy, Users, Activity, Crown, Skull } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Leaderboard() {
  const { data: leaderboard, isLoading, isError } = useGetLeaderboard();

  return (
    <div className="w-full min-h-[100dvh] pt-24 pb-12 px-4 relative">
      {/* Background visual elements specific to leaderboard */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background to-black pointer-events-none" />
      <div className="fixed top-0 inset-x-0 h-[500px] z-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex justify-center mb-6"
          >
            <Trophy className="w-16 h-16 text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-black text-white mb-4 tracking-wider"
          >
            GLOBAL <span className="gold-text-gradient">RANKINGS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto font-light"
          >
            The season is underway. Guilds rise and fall based on their collective strength and performance in weekly raids. Only one will claim the crown.
          </motion.p>
        </div>

        {/* Top 3 Podium (if data exists) */}
        {!isLoading && !isError && leaderboard && leaderboard.length >= 3 && (
          <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mb-16 px-4">
            {/* Rank 2 */}
            <PodiumCard entry={leaderboard[1]} rank={2} color="silver" height="h-[280px]" delay={0.4} />
            {/* Rank 1 */}
            <PodiumCard entry={leaderboard[0]} rank={1} color="gold" height="h-[340px]" delay={0.3} />
            {/* Rank 3 */}
            <PodiumCard entry={leaderboard[2]} rank={3} color="bronze" height="h-[240px]" delay={0.5} />
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="glass-panel rounded-xl overflow-hidden shadow-2xl border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/40">
                  <th className="p-5 font-display font-bold text-gray-400 tracking-wider w-20 text-center">Rank</th>
                  <th className="p-5 font-display font-bold text-gray-400 tracking-wider">Guild</th>
                  <th className="p-5 font-display font-bold text-gray-400 tracking-wider text-right">Strength</th>
                  <th className="p-5 font-display font-bold text-gray-400 tracking-wider text-right hidden sm:table-cell">Forces</th>
                  <th className="p-5 font-display font-bold text-gray-400 tracking-wider text-right">Weekly Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse bg-white/5">
                      <td className="p-5"><div className="h-6 w-8 bg-white/10 rounded mx-auto"></div></td>
                      <td className="p-5"><div className="h-6 w-48 bg-white/10 rounded"></div></td>
                      <td className="p-5 text-right"><div className="h-6 w-24 bg-white/10 rounded ml-auto"></div></td>
                      <td className="p-5 text-right hidden sm:table-cell"><div className="h-6 w-16 bg-white/10 rounded ml-auto"></div></td>
                      <td className="p-5 text-right"><div className="h-6 w-24 bg-white/10 rounded ml-auto"></div></td>
                    </tr>
                  ))
                ) : isError ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-destructive flex flex-col items-center gap-3">
                      <Skull className="w-10 h-10" />
                      <p>The ravens bring no news. Failed to fetch rankings.</p>
                    </td>
                  </tr>
                ) : leaderboard?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-gray-500">
                      The realm is quiet. No guilds have registered yet.
                    </td>
                  </tr>
                ) : (
                  leaderboard?.map((entry, index) => (
                    <motion.tr 
                      key={entry.guildId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(index * 0.05, 0.5) }}
                      className={cn(
                        "group hover:bg-white/5 transition-colors cursor-default",
                        index < 3 ? "bg-black/20" : ""
                      )}
                    >
                      <td className="p-5 text-center">
                        {index === 0 ? (
                          <Crown className="w-6 h-6 text-primary mx-auto drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                        ) : index === 1 ? (
                          <span className="font-display font-bold text-xl text-gray-300 drop-shadow-md">2</span>
                        ) : index === 2 ? (
                          <span className="font-display font-bold text-xl text-amber-700 drop-shadow-md">3</span>
                        ) : (
                          <span className="font-mono text-gray-500 font-bold">{entry.rank}</span>
                        )}
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded border flex items-center justify-center bg-black/50 shadow-inner",
                            index === 0 ? "border-primary text-primary" : "border-white/10 text-gray-400 group-hover:border-primary/50 group-hover:text-primary transition-colors"
                          )}>
                            <Shield className="w-5 h-5" />
                          </div>
                          <div>
                            <div className={cn(
                              "font-bold text-lg tracking-wide",
                              index === 0 ? "gold-text-gradient" : "text-gray-200"
                            )}>
                              {entry.guildName}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
                              Guild #{entry.guildId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-2 text-white font-mono text-lg">
                          {entry.strength.toLocaleString()} <Activity className="w-4 h-4 text-accent" />
                        </div>
                      </td>
                      <td className="p-5 text-right hidden sm:table-cell">
                        <div className="flex items-center justify-end gap-2 text-gray-300">
                          {entry.memberCount} <Users className="w-4 h-4 text-gray-500" />
                        </div>
                      </td>
                      <td className="p-5 text-right">
                        <div className={cn(
                          "inline-block px-3 py-1 rounded bg-black/40 border border-white/5 font-mono font-bold",
                          entry.weeklyPoints > 0 ? "text-green-400" : "text-gray-500"
                        )}>
                          +{entry.weeklyPoints.toLocaleString()}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function PodiumCard({ entry, rank, color, height, delay }: { entry: any, rank: number, color: string, height: string, delay: number }) {
  const getStyle = () => {
    switch(color) {
      case 'gold': return 'from-primary/20 to-primary/5 border-primary/50 text-primary shadow-[0_0_30px_rgba(212,175,55,0.2)]';
      case 'silver': return 'from-gray-300/20 to-gray-300/5 border-gray-300/50 text-gray-300 shadow-[0_0_30px_rgba(209,213,219,0.1)]';
      case 'bronze': return 'from-amber-700/20 to-amber-700/5 border-amber-700/50 text-amber-600 shadow-[0_0_30px_rgba(180,83,9,0.1)]';
      default: return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={cn(
        "w-full md:w-1/3 flex flex-col items-center justify-end rounded-t-xl border-t border-x bg-gradient-to-b backdrop-blur-md relative p-6",
        getStyle(),
        height
      )}
    >
      <div className="absolute -top-10 flex flex-col items-center">
        {rank === 1 && <Crown className="w-12 h-12 mb-2 text-primary drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" />}
        <div className={cn(
          "w-16 h-16 rounded-full border-2 flex items-center justify-center bg-background shadow-xl",
          color === 'gold' ? 'border-primary text-primary' : color === 'silver' ? 'border-gray-300 text-gray-300' : 'border-amber-700 text-amber-600'
        )}>
          <span className="font-display font-black text-2xl">{rank}</span>
        </div>
      </div>
      
      <h3 className="font-display font-bold text-xl text-center text-white mt-8 truncate w-full">{entry.guildName}</h3>
      <div className="flex items-center gap-1 mt-2 font-mono font-bold">
        {entry.strength.toLocaleString()} <Activity className="w-4 h-4 opacity-70" />
      </div>
      <div className="text-xs uppercase tracking-widest opacity-60 mt-1">Strength</div>
    </motion.div>
  );
}
