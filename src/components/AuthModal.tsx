// src/components/AuthModal.tsx — FIXED & CENTERED PREMIUM VERSION
"use client";
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";
import { X, Chrome, Github, Sparkles, Mail, Loader2 } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";
import { useState } from "react";
import { useCartStore } from "../store/useCartStore";

export default function AuthModal() {
  const { isAuthOpen, closeAuth } = useCartStore();
  const [isLoading, setIsLoading] = useState<"google" | "github" | null>(null);
const signInGoogle = async () => {
  setIsLoading("google");
  try {
    const result = await signInWithPopup(auth, googleProvider);
    toast.success(`Welcome ${result.user.displayName || 'VIP'}! 🎉`);
    closeAuth();
  } catch (err: any) {
    console.error("Firebase error:", err.code, err.message);
    if (err.code === 'auth/popup-blocked') {
      toast.error("Popup blocked! Please allow popups for localhost:5173", { duration: 8000 });
    } else if (err.code === 'auth/popup-closed-by-user') {
      // User closed popup manually — do nothing
    } else {
      toast.error("Sign in failed. Please try again!");
    }
  } finally {
    setIsLoading(null);
  }
};
  const signInGithub = async () => {
    setIsLoading("github");
    try {
      await signInWithPopup(auth, githubProvider);
      closeAuth();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(null);
    }
  };

  if (!isAuthOpen) return null;

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <>
          {/* FIXED: Full-screen centered backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuth}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20" />
            
            {/* STOP PROPAGATION + CENTERED MODAL */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotateX: -30 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotateX: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-md mx-4"  // ← mx-4 for mobile padding
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-white/10 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                {/* Floating Orbs */}
                <motion.div
                  animate={{ x: [-100, 100, -100], y: [-100, 100, -100] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{ x: [100, -100, 100], y: [100, -100, 100] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
                />

                <div className="relative z-10 p-12">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeAuth}
                    className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-xl transition"
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>

                  <div className="text-center mb-12">
                    <motion.h2
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-6xl font-black text-white mb-4"
                    >
                      Join Veltrix
                    </motion.h2>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl text-white/80 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                      Unlock premium shopping experience
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </motion.p>
                  </div>

                  <div className="space-y-5">
                    <motion.button
                      whileHover={{ scale: 1.02, x: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={signInGoogle}
                      disabled={!!isLoading}
                      className="w-full py-6 bg-white text-black rounded-2xl font-bold text-xl flex items-center justify-center gap-4 shadow-2xl hover:shadow-purple-500/50 transition-all relative overflow-hidden group disabled:opacity-70"
                    >
                      {isLoading === "google" ? (
                        <Loader2 className="w-9 h-9 animate-spin" />
                      ) : (
                        <Chrome className="w-9 h-9" />
                      )}
                      Continue with Google
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={signInGithub}
                      disabled={!!isLoading}
                      className="w-full py-6 bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-4 shadow-2xl hover:shadow-purple-500/50 transition-all border border-white/10 relative overflow-hidden group disabled:opacity-70"
                    >
                      {isLoading === "github" ? (
                        <Loader2 className="w-9 h-9 animate-spin" />
                      ) : (
                        <Github className="w-9 h-9" />
                      )}
                      Continue with GitHub
                    </motion.button>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      className="text-center text-white/60 pt-6"
                    >
                      <p className="flex items-center justify-center gap-2">
                        <Mail className="w-5 h-5" />
                        Email magic link coming soon...
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}