// src/App.tsx
import { motion, AnimatePresence } from 'framer-motion';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';           // ← ADDED
import StripeCheckout from './components/StripeCheckout';
import { Toaster } from 'react-hot-toast';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Home */}
        <Route
          path="/"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Hero />
              <ProductGrid />
            </motion.div>
          }
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
            >
              <StripeCheckout />
            </motion.div>
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="min-h-screen flex items-center justify-center text-6xl md:text-8xl font-black bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent text-center px-8"
            >
              About Page Coming Soon<br />You’re Already Hired 🔥
            </motion.div>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <motion.div
              initial={{ opacity: 0, rotateY: 180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              className="min-h-screen flex items-center justify-center text-6xl font-black text-red-500"
            >
              404 – Lost in the Metaverse
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">
        {/* GLOBAL OVERLAYS — Always on top */}
        <Header />
        <CartDrawer />
        <AuthModal />                     {/* ← GLOBAL, NO PROPS, POWERED BY ZUSTAND */}

        {/* Animated Page Content */}
        <AnimatedRoutes />

        {/* Toasts */}
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(0, 0, 0, 0.92)',
              color: '#fff',
              backdropFilter: 'blur(16px)',
              borderRadius: '20px',
              padding: '16px 28px',
              fontWeight: 'bold',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            success: { icon: '✨' },
          }}
        />

        {/* Footer */}
        <footer className="py-20 text-center border-t border-gray-200 dark:border-gray-800 mt-32">
          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-pink-600">
            © 2025 VELTRIX • Built with Framer Motion, Firebase, Stripe & Zero Chill
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}