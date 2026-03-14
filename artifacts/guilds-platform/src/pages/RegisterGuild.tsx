import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Swords, Loader2, CheckCircle2 } from "lucide-react";
import { useRegisterGuild } from "@workspace/api-client-react";
import { useState } from "react";
import { Link } from "wouter";

const schema = z.object({
  name: z.string().min(3, "Guild name is required"),
  collectionAddress: z.string().min(10, "Valid contract address is required"),
  ownerWallet: z.string().min(10, "Owner wallet is required"),
  collectionName: z.string().optional(),
  description: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitter: z.string().optional(),
  discord: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterGuild() {
  const [isSuccess, setIsSuccess] = useState(false);
  const registerMutation = useRegisterGuild();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    // filter out empty strings for optional URL fields
    const payload = {
      ...data,
      website: data.website || undefined
    };
    registerMutation.mutate({ data: payload }, {
      onSuccess: () => setIsSuccess(true),
    });
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex items-center justify-center py-24 px-4">
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg-form.jpeg')` }}
      />
      <div className="fixed inset-0 z-0 bg-background/85 backdrop-blur-md" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="glass-panel rounded-xl overflow-hidden shadow-2xl shadow-black border border-primary/20">
          <div className="p-8 border-b border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-14 h-14 rounded-lg bg-black/50 border border-primary/30 flex items-center justify-center shadow-[inset_0_0_15px_rgba(212,175,55,0.2)]">
                <Swords className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-white tracking-wide">
                  Found a Guild
                </h1>
                <p className="text-primary/80 text-sm font-semibold tracking-widest uppercase">
                  Register Partner Collection
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm relative z-10">
              Establish your collection's presence on the platform. As President, you will guide your holders through weekly raids and global events.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-12 text-center flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 border border-primary/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
              >
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>
              <h3 className="text-3xl font-display text-white font-bold mb-4 gold-text-gradient">Guild Established</h3>
              <p className="text-gray-400 mb-8 max-w-md">
                Your guild banner has been planted. Inform your holders to enlist as citizens to build your initial strength.
              </p>
              <Link 
                href="/leaderboard"
                className="px-8 py-4 bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest rounded-sm transition hover:bg-primary/90 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              >
                View Global Ranks
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex flex-col gap-6 bg-black/20">
              {registerMutation.isError && (
                <div className="p-4 bg-destructive/20 border border-destructive/50 text-destructive rounded-md text-sm">
                  Failed to establish guild. Verify contract address and try again.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Guild Name *</label>
                  <input 
                    {...register("name")}
                    placeholder="e.g. The Obsidian Order"
                    className="w-full bg-black/60 border border-white/10 text-white rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 text-sm"
                  />
                  {errors.name && <span className="text-destructive text-xs">{errors.name.message}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Collection Name</label>
                  <input 
                    {...register("collectionName")}
                    placeholder="NFT Project Name"
                    className="w-full bg-black/60 border border-white/10 text-white rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">NFT Contract Address *</label>
                <input 
                  {...register("collectionAddress")}
                  placeholder="0x..."
                  className="w-full bg-black/60 border border-white/10 text-white rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 font-mono text-sm"
                />
                {errors.collectionAddress && <span className="text-destructive text-xs">{errors.collectionAddress.message}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">President Wallet Address *</label>
                <input 
                  {...register("ownerWallet")}
                  placeholder="0x... (Will receive President Role)"
                  className="w-full bg-black/60 border border-white/10 text-white rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 font-mono text-sm"
                />
                {errors.ownerWallet && <span className="text-destructive text-xs">{errors.ownerWallet.message}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">Guild Lore / Description</label>
                <textarea 
                  {...register("description")}
                  placeholder="Tell the realm about your community..."
                  rows={3}
                  className="w-full bg-black/60 border border-white/10 text-white rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Website</label>
                  <input 
                    {...register("website")}
                    placeholder="https://"
                    className="w-full bg-black/40 border border-white/5 text-gray-300 rounded px-3 py-2 focus:border-primary focus:outline-none text-xs"
                  />
                  {errors.website && <span className="text-destructive text-xs block mt-1">{errors.website.message}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Twitter</label>
                  <input 
                    {...register("twitter")}
                    placeholder="@"
                    className="w-full bg-black/40 border border-white/5 text-gray-300 rounded px-3 py-2 focus:border-primary focus:outline-none text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Discord</label>
                  <input 
                    {...register("discord")}
                    placeholder="Invite Link"
                    className="w-full bg-black/40 border border-white/5 text-gray-300 rounded px-3 py-2 focus:border-primary focus:outline-none text-xs"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={registerMutation.isPending}
                className="mt-6 w-full bg-transparent border-2 border-primary text-primary font-display font-bold uppercase tracking-widest py-4 rounded-md hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-primary flex items-center justify-center gap-2"
              >
                {registerMutation.isPending ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Forging Alliance...</>
                ) : (
                  "Plant Banner"
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
