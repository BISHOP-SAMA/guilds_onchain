import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Shield, Swords, Trophy, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "The Realm", icon: Shield },
    { href: "/leaderboard", label: "Leaderboards", icon: Trophy },
    { href: "/register/member", label: "Enlist", icon: Users },
    { href: "/register/guild", label: "Found Guild", icon: Swords },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-primary/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2"
            : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src={`${import.meta.env.BASE_URL}images/logo-crest.png`} 
              alt="Guilds Logo" 
              className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-display font-bold text-2xl tracking-widest gold-text-gradient uppercase">
              Guilds
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:text-primary relative group",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                  <span 
                    className={cn(
                      "absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300",
                      isActive ? "w-full shadow-[0_0_8px_rgba(212,175,55,0.8)]" : "w-0 group-hover:w-full opacity-50"
                    )} 
                  />
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-4 flex flex-col gap-4 border-b border-primary/20 md:hidden"
          >
            {navLinks.map((link) => {
              const isActive = location === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-4 text-lg font-display tracking-wider uppercase p-4 rounded-lg border",
                    isActive 
                      ? "bg-primary/10 border-primary/30 text-primary shadow-[inset_0_0_20px_rgba(212,175,55,0.1)]" 
                      : "border-transparent text-muted-foreground hover:bg-secondary/50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow flex flex-col relative w-full pt-16 md:pt-0">
        {children}
      </main>
      
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground text-sm flex flex-col items-center gap-4">
          <img 
            src={`${import.meta.env.BASE_URL}images/logo-crest.png`} 
            alt="Crest" 
            className="w-8 h-8 opacity-50 grayscale"
          />
          <p className="font-display tracking-widest uppercase text-xs">© {new Date().getFullYear()} Guilds Onchain Platform. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
                  }
