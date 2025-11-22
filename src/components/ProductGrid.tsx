import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { Search, Grid3X3, List } from 'lucide-react';

const categories = ['All', 'Electronics', 'Fashion', 'Accessories'];

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <section id="shop" className="py-20 px-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Shop the Collection
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
            {filteredProducts.length} premium products curated for you
          </p>
        </motion.div>

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative w-full lg:w-96"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 transition"
            />
          </motion.div>

          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className="relative px-8 py-3 rounded-full font-medium transition"
              >
                {cat}
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="categoryUnderline"
                    className="absolute inset-0 bg-primary/20 rounded-full"
                  />
                )}
                {selectedCategory === cat && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full"
                    layoutId="activeDot"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-200 dark:bg-gray-800 p-1 rounded-xl">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition ${viewMode === 'grid' ? 'bg-white dark:bg-gray-900 shadow-lg' : ''}`}
            >
              <Grid3X3 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition ${viewMode === 'list' ? 'bg-white dark:bg-gray-900 shadow-lg' : ''}`}
            >
              <List className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Product Grid / List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode + selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                : 'space-y-8'
            }
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 100,
                }}
                layout
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-9xl mb-8">😢</div>
            <h3 className="text-3xl font-bold mb-4">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search term</p>
          </motion.div>
        )}

        {/* Load More Button (fake) */}
        {filteredProducts.length > 0 && (
          <div className="flex justify-center mt-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-primary text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-primary/50 transition"
            >
              Load More Products
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}