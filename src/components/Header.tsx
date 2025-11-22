// src/components/Header.tsx — FINAL WITH LOGOUT
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Moon,
  Sun,
  Menu,
  X,
  Search,
  User,
  LogIn,
  LogOut,
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from 'react-hot-toast';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false); // ← NEW: Controls logout dropdown

  const {
    getTotalItems,
    toggleCart,
    openAuth,
    user,
    isLoadingAuth,
  } = useCartStore();

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully 👋");
    setShowLogout(false);
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'VIP';

  const navItems = ['Home', 'Shop', 'About', 'Contact'];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 dark:bg-gray-900/90 shadow-2xl backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative">
                <h1 className="text-3xl font-black bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  VELTRIX
                </h1>
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-primary to-pink-600 rounded-lg blur-lg opacity-70"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={`relative px-5 py-3 rounded-xl text-lg font-medium transition-all ${
                      location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`)
                        ? 'text-primary'
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary'
                    }`}
                  >
                    {item}
                    {location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-primary/10 rounded-xl"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode */}
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleDarkMode} className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hidden sm:block">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              <motion.button whileHover={{ scale: 1.05 }} className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hidden sm:block">
                <Search className="w-5 h-5" />
              </motion.button>

              {/* PROFILE: Click name → show Logout */}
              {isLoadingAuth ? (
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              ) : user ? (
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowLogout(!showLogout)}
                    className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 cursor-pointer"
                  >
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Avatar" className="w-9 h-9 rounded-full" />
                    ) : (
                      <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                        {displayName[0].toUpperCase()}
                      </div>
                    )}
                    <span className="font-medium hidden sm:block">{displayName}</span>
                  </motion.div>

                  {/* Logout Dropdown */}
                  <AnimatePresence>
                    {showLogout && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                      >
                        <button
                          onClick={handleLogout}
                          className="w-full px-6 py-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-3 text-red-500 font-medium transition"
                        >
                          <LogOut className="w-5 h-5" />
                          Log Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={openAuth}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hidden sm:block"
                >
                  <User className="w-5 h-5" />
                </motion.button>
              )}

              {/* CART */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleCart}
                className="relative p-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg"
                animate={getTotalItems() > 0 ? { scale: [1, 1.05, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ShoppingBag className="w-6 h-6" />
                <AnimatePresence>
                  {getTotalItems() > 0 && (
                    <motion.span
                      initial={{ scale: 0, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0, y: -10 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-xl"
                    >
                      {getTotalItems()}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-3">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {navItems.map((item, i) => (
                  <motion.div key={item} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="block py-4 text-2xl font-medium text-gray-800 dark:text-gray-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Profile */}
                {user ? (
                  <div className="mt-10 space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Avatar" className="w-12 h-12 rounded-full" />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {displayName[0].toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Signed in as</p>
                        <p className="font-bold">{displayName}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-3"
                    >
                      <LogOut className="w-6 h-6" />
                      Log Out
                    </button>
                  </div>
                ) : (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => {
                      openAuth();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full mt-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl flex items-center justify-center gap-3 text-xl"
                  >
                    <LogIn className="w-6 h-6" />
                    Sign In
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-20" />
    </>
  );
}