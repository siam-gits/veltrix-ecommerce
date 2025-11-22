// src/components/ProductCard.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Zap, Star, Plus } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';  // ← Correct store
import { Product } from '../data/products';
import { useState } from 'react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  // ← CORRECT: use addToCart from the new merged store
  const addToCart = useCartStore((state) => state.addToCart);
  const [isQuickAdding, setIsQuickAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);                    // ← Now this works!
    setIsQuickAdding(true);
    setTimeout(() => setIsQuickAdding(false), 600);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ y: -16, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative"
    >
      {/* Card Container */}
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
        
        {/* HOT Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 left-4 z-10"
        >
          <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
            <Zap className="w-3 h-3" />
            HOT
          </div>
        </motion.div>

        {/* Image + Quick Add */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
          <motion.img
            src={`https://picsum.photos/seed/${product.id}/800/800`}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.8 }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-gray-900 font-bold py-4 px-10 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-3 text-lg"
          >
            <ShoppingCart className="w-6 h-6" />
            Quick Add
          </motion.button>

          {/* Flying + icon */}
          <AnimatePresence>
            {isQuickAdding && (
              <motion.div
                initial={{ scale: 0, y: 0 }}
                animate={{ scale: 1.5, y: -100 }}
                exit={{ scale: 0, y: -150 }}
                transition={{ type: "spring", stiffness: 600, damping: 15 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                <div className="bg-green-500 text-white p-6 rounded-full shadow-2xl">
                  <Plus className="w-10 h-10" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.category}</p>
          </div>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="text-sm text-gray-500 ml-2">(4.8)</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-black text-primary">${product.price}</span>
              <span className="text-sm text-gray-400 line-through ml-2">${product.price + 50}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="p-4 bg-primary text-white rounded-2xl shadow-lg"
            >
              <ShoppingCart className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Glow border */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-30 blur-xl" />
        </motion.div>
      </div>
    </motion.div>
  );
}