import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Shield, Loader2, CheckCircle2 } from "lucide-react";
import { useRegisterMember } from "@workspace/api-client-react";
import { useState } from "react";
import { Link } from "wouter";

const schema = z.object({
  walletAddress: z.string().min(10, "Valid wallet address is required"),
  discordHandle: z.string().optional(),
  twitterHandle: z.string().optional(),
  referralCode: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterMember() {
  const [isSuccess, setIsSuccess] = useState(false);
  const registerMutation = useRegisterMember();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    registerMutation.mutate({ data }, {
      onSuccess: () => setIsSuccess(true),
    });
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex items-center justify-center py-24 px-4">
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg-form.jpeg')` }}
      />
      <div className="fixed inset-0 z-0 bg-background/80 backdrop-blur-sm" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="glass-panel rounded-xl overflow-hidden shadow-2xl shadow-black">
          <div className="p-8 border-b border-white/5 bg-white/5">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-display font-bold text-center text-white mb-2 tracking-wide">
              Enlist as Citizen
            </h1>
            <p className="text-center text-gray-400 text-sm">
              Verify your wallet. If you hold NFTs from a partnered collection, you will automatically join their Guild ranks.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-10 text-center flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h3 className="text-2xl font-display text-white font-bold mb-4">Oath Accepted</h3>
              <p className="text-gray-400 mb-8">
                Your wallet has been verified. Welcome to the warfront. You have been assigned your rank based on your holdings.
              </p>
              <Link 
                href="/leaderboard"
                className="px-6 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded transition hover:bg-primary/90"
              >
                View Leaderboards
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex flex-col gap-6">
              {registerMutation.isError && (
                <div className="p-4 bg-destructive/20 border border-destructive/50 text-destructive rounded-md text-sm">
                  Failed to register. The servers may be under heavy load from raid activity.
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Wallet Address *</label>
                <input 
                  {...register("walletAddress")}
                  placeholder="0x..."
                  className="w-full bg-black/40 border border-white/10 text-white rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 font-mono text-sm"
                />
                {errors.walletAddress && <span className="text-destructive text-xs">{errors.walletAddress.message}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Discord Handle</label>
                  <input 
                    {...register("discordHandle")}
                    placeholder="username#0000"
                    className="w-full bg-black/40 border border-white/10 text-white rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Twitter Handle</label>
                  <input 
                    {...register("twitterHandle")}
                    placeholder="@username"
                    className="w-full bg-black/40 border border-white/10 text-white rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Referral Code (Optional)</label>
                <input 
                  {...register("referralCode")}
                  placeholder="Enter code"
                  className="w-full bg-black/40 border border-white/10 text-white rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 text-sm uppercase"
                />
              </div>

              <button 
                type="submit"
                disabled={registerMutation.isPending}
                className="mt-4 w-full bg-gradient-to-r from-primary/80 to-primary text-primary-foreground font-display font-bold uppercase tracking-widest py-4 rounded-md shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {registerMutation.isPending ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Swearing Oath...</>
                ) : (
                  "Swear Fealty"
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
