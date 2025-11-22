// src/components/CartDrawer.tsx — REFINED 2025 LUXURY EDITION
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, Zap, CreditCard, Sparkles, Lock } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CartDrawer() {
  const navigate = useNavigate();

  const {
    cartItems: items,
    isCartOpen: isOpen,
    toggleCart,
    updateQuantity,
    removeFromCart: removeItem,
    getTotalPrice,
    getTotalItems,
    user,
    isLoadingAuth,
    openAuth,
  } = useCartStore();

  const subtotal = getTotalPrice();
  const discount = subtotal > 500 ? subtotal * 0.15 : 0;
  const finalTotal = subtotal - discount;

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  const handleRemove = (id: number, name: string) => {
    removeItem(id);
    toast.success(`${name} removed`, { icon: '🗑️' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-950 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="relative border-b border-gray-200 dark:border-gray-800 p-6">
              <button
                onClick={toggleCart}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pr-12">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Your Cart
                </h2>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-24"
                  >
                    <div className="text-8xl mb-6">🛒</div>
                    <p className="text-xl font-semibold text-gray-500">Cart is empty</p>
                    <p className="text-gray-400 mt-2">Discover something amazing!</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, i) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.05 }}
                        key={item.id}
                        className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800"
                      >
                        <div className="flex gap-4">
                          <img
                            src={`https://picsum.photos/seed/${item.id}/120/120`}
                            alt={item.name}
                            className="w-20 h-20 rounded-xl object-cover shadow-md"
                          />

                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.category}</p>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-md transition"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-bold w-10 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow hover:shadow-lg transition"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="text-right">
                                <p className="font-bold text-lg">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <button
                                  onClick={() => handleRemove(item.id, item.name)}
                                  className="text-red-500 hover:text-red-600 mt-1"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Checkout Summary */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-base">
                      <span>Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex justify-between text-green-600 dark:text-green-400 font-medium"
                      >
                        <span className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          15% VIP Discount
                        </span>
                        <span>-${discount.toFixed(2)}</span>
                      </motion.div>
                    )}
                    <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-200 dark:border-gray-800">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* REFINED HERO CHECKOUT BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (!user && !isLoadingAuth) {
                        openAuth();
                        toast("🔐 Sign in to continue", { icon: "⚡" });
                      } else if (isLoadingAuth) {
                        toast("Loading your profile...", { icon: "⏳" });
                      } else {
                        handleCheckout();
                      }
                    }}
                    className="relative w-full py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-xl overflow-hidden group"
                  >
                    {/* Animated shine */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="relative flex items-center justify-center gap-3">
                      {user ? (
                        <>
                          <CreditCard className="w-6 h-6" />
                          <span>Proceed to Checkout</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-6 h-6" />
                          <span>Sign In to Checkout</span>
                        </>
                      )}
                      <Sparkles className="w-6 h-6" />
                    </div>

                    {/* Bottom badge */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-xl px-5 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border border-white/20">
                      <Lock className="w-3.5 h-3.5" />
                      {user ? "Instant & Secure" : "Secure Login"}
                    </div>
                  </motion.button>

                  <p className="text-center text-xs text-gray-500">
                    Free shipping • 30-day returns • SSL Secured
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}