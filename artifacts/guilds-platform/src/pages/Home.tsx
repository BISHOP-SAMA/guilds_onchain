import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Swords, Trophy, Crown, ArrowRight, Skull } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const features = [
    {
      title: "Weekly Raids",
      description: "Plunder rival guilds for points. Coordinate attacks with your allies to dominate the landscape.",
      icon: Swords,
      color: "text-accent",
      bg: "bg-accent/10",
      border: "border-accent/20"
    },
    {
      title: "Strategic Alliances",
      description: "Diplomacy matters. Form pacts with other communities, share the spoils of war, or betray them at the critical moment.",
      icon: Shield,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20"
    },
    {
      title: "Global Leaderboards",
      description: "Climb the ranks. Guild strength dictates your position. Only the strongest survive the season.",
      icon: Trophy,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20"
    }
  ];

  const hierarchies = [
    { role: "President", req: "Guild Owner", desc: "Leads the guild, dictates diplomacy and raid targets.", icon: Crown },
    { role: "Military", req: "5+ NFTs", desc: "The vanguard. Provides massive defense and attack multipliers.", icon: Swords },
    { role: "Citizen", req: "1+ NFTs", desc: "The foundation. Contributes baseline strength through events.", icon: UsersIcon }
  ];

  return (
    <div className="relative w-full min-h-[100dvh]">
      {/* Background Layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg-home.jpeg')` }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background/80 via-background/60 to-background/95" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
      
      {/* Magical Flare Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/magical-flare.png')` }}
      />

      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              <Skull className="w-4 h-4" />
              Season 1 Live
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-500 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] leading-none mb-6">
              FORGE YOUR <br className="hidden md:block"/>
              <span className="gold-text-gradient drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">LEGEND</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md">
              A competitive ecosystem where NFT collections become Guilds. 
              Compete, strategize, raid, and conquer the chain.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Link 
                href="/register/member"
                className="group w-full sm:w-auto relative px-8 py-4 bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest overflow-hidden rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative flex items-center justify-center gap-2">
                  Enlist as Citizen <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link 
                href="/register/guild"
                className="group w-full sm:w-auto relative px-8 py-4 bg-transparent border-2 border-primary/50 text-primary font-display font-bold uppercase tracking-widest overflow-hidden rounded-sm transition-all duration-300 hover:border-primary hover:bg-primary/10"
              >
                <span className="relative flex items-center justify-center gap-2">
                  Found a Guild
                </span>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 bg-background/50 backdrop-blur-sm border-y border-primary/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold gold-text-gradient mb-4">The Art of War</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Master the mechanics of the realm to lead your community to eternal glory.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className={cn(
                    "glass-panel p-8 rounded-lg relative overflow-hidden group hover:-translate-y-2 transition-all duration-500",
                    f.border
                  )}
                >
                  <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[50px] -mr-16 -mt-16 rounded-full", f.bg)} />
                  <div className={cn("w-14 h-14 rounded-full flex items-center justify-center mb-6 border", f.bg, f.color, f.border)}>
                    <f.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hierarchy Section */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-16">
              Guild <span className="gold-text-gradient">Hierarchy</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hierarchies.map((h, i) => (
                <div key={i} className="flex flex-col items-center p-6 border border-border/50 rounded-lg bg-secondary/30 relative">
                  {i !== 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] bg-border z-10" />
                  )}
                  <h.icon className="w-12 h-12 text-primary mb-4 opacity-80" />
                  <h3 className="text-2xl font-display font-bold text-gray-200 mb-1">{h.role}</h3>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider mb-4 px-2 py-1 bg-primary/10 rounded">{h.req}</span>
                  <p className="text-sm text-gray-400">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
                    }
