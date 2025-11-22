// src/components/StripeCheckout.tsx — REFINED 2025 LUXURY EDITION
import { useState } from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Lock, Sparkles, Check, Loader2, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';
import { useCartStore } from '../store/useCartStore';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export default function StripeCheckout() {
  const { cartItems: items, getTotalPrice, toggleCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const subtotal = getTotalPrice();
  const discount = appliedDiscount;
  const total = subtotal - discount;

  const handleApplyCode = () => {
    if (discountCode.toUpperCase() === 'VELTRIX2025') {
      setAppliedDiscount(subtotal * 0.20);
      toast.success('🎉 20% VIP discount applied!', { duration: 4000 });
      setDiscountCode('');
    } else if (discountCode.trim()) {
      toast.error('Invalid discount code');
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);

    try {
      // Fake delay for demo (remove in prod)
      await new Promise(resolve => setTimeout(resolve, 1800));

      setShowConfetti(true);
      toast.success('Payment successful! Welcome to the family 🎉');

      setTimeout(() => {
        toggleCart();
        setShowConfetti(false);
        // clearCart() or redirect in real app
      }, 6000);

      // REAL STRIPE FLOW (uncomment when ready)
      // const res = await fetch('/api/create-checkout-session', { method: 'POST', body: JSON.stringify({ items }) });
      // const { id } = await res.json();
      // const stripe = await stripePromise;
      // const { error } = await stripe!.redirectToCheckout({ sessionId: id });
      // if (error) throw error;
    } catch (err) {
      toast.error('Payment failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.12}
          colors={['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B']}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl w-full"
        >
          <div className="bg-white/10 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 p-8 text-center">
              <motion.h1
                initial={{ y: -30 }}
                animate={{ y: 0 }}
                className="text-4xl md:text-5xl font-black text-white flex items-center justify-center gap-3"
              >
                <Lock className="w-10 h-10 md:w-12 md:h-12" />
                Secure Checkout
              </motion.h1>
              <p className="text-white/80 text-lg mt-2">Your order is almost complete</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left: Order Summary */}
              <div className="p-8 space-y-8 text-white">
                <h2 className="text-2xl font-bold">Order Summary</h2>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-4 bg-white/10 rounded-2xl p-5 backdrop-blur-xl border border-white/10"
                    >
                      <img
                        src={`https://picsum.photos/seed/${item.id}/160/160`}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover shadow-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{item.name}</h4>
                        <p className="text-white/70 text-sm">Qty: {item.quantity}</p>
                        <p className="text-xl font-bold mt-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Discount Input */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCode()}
                    className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleApplyCode}
                    className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold flex items-center gap-2 shadow-lg"
                  >
                    <Tag className="w-5 h-5" />
                    Apply
                  </motion.button>
                </div>

                {/* Totals */}
                <div className="pt-6 border-t border-white/20 space-y-4">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-between text-lg text-emerald-400 font-bold"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        VIP Discount (VELTRIX2025)
                      </span>
                      <span>-${discount.toFixed(2)}</span>
                    </motion.div>
                  )}
                  <div className="flex justify-between text-2xl font-black pt-4 border-t border-white/30">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Payment */}
              <div className="bg-white/5 p-8 flex flex-col justify-between">
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-white">Payment</h2>

                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center">
                    <CreditCard className="w-16 h-16 mx-auto text-white/70 mb-4" />
                    <p className="text-white/80">All major cards accepted</p>
                    <div className="flex justify-center gap-4 mt-6">
                      {['visa', 'mastercard', 'amex'].map((brand) => (
                        <div key={brand} className="bg-white/20 backdrop-blur border border-white/20 rounded-lg w-14 h-10 flex items-center justify-center">
                          <span className="text-xs font-bold text-white/70 uppercase">{brand}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 text-white/70 text-sm">
                    <p className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400" />
                      256-bit SSL Encryption
                    </p>
                    <p className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400" />
                      No card details stored
                    </p>
                    <p className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400" />
                      Instant delivery after payment
                    </p>
                  </div>
                </div>

                {/* REFINED HERO PAY BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  disabled={isLoading || items.length === 0}
                  className="relative w-full py-6 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-bold text-xl rounded-2xl shadow-2xl overflow-hidden group flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 -skew-x-12"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />

                  {isLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    <>
                      <span>Pay ${total.toFixed(2)}</span>
                      <Sparkles className="w-7 h-7" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-white/60 text-xs mt-6">
                  By completing your purchase, you agree to our Terms • 30-day returns • Instant access
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}