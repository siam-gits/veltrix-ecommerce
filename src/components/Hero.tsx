import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const floatingProducts = [
  { id: 1, name: "AirPods Pro", delay: 0 },
  { id: 2, name: "Smart Watch", delay: 0.2 },
  { id: 3, name: "Leather Bag", delay: 0.4 },
  { id: 4, name: "Keyboard", delay: 0.6 },
  { id: 5, name: "Shoes", delay: 0.8 },
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const fullText = "Unmatched Quality • Cutting-Edge Design • Premium Experience";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(smoothY, [-300, 300], [15, -15]);
  const rotateY = useTransform(smoothX, [-300, 300], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      const x = e.clientX - rect.width / 2;
      const y = e.clientY - rect.height / 2;
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Dynamic Gradient Background that follows mouse */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(circle 800px at ${mousePosition.x + window.innerWidth / 2}px ${mousePosition.y + window.innerHeight / 2}px, #6366f1 0%, #8b5cf6 30%, #ec4899 60%, #000000 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-pink-900/50" />
      </div>

      {/* Animated Blob Background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl"
      />

      {/* Floating 3D Products */}
      <motion.div
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="absolute inset-0 pointer-events-none"
      >
        {floatingProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: product.delay, duration: 1 }}
            whileHover={{ scale: 1.3, z: 100 }}
            className="absolute"
            style={{
              top: `${20 + (product.id * 15)}%`,
              left: product.id % 2 === 0 ? '10%' : '70%',
              transform: `translate(-50%, -50%) translateZ(${Math.sin(product.id) * 100}px)`,
            }}
          >
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-white/60" />
              </div>
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-3xl blur-xl scale-0 group-hover:scale-110 transition-transform"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-tight">
            VELTRIX
            <span className="block text-4xl md:text-6xl lg:text-7xl font-light text-white/80 mt-4">
              The Future of Shopping
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-12 h-20"
        >
          <p className="text-xl md:text-3xl text-white/90 font-light tracking-wider">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <a
            href="#shop"
            className="group relative px-12 py-6 text-xl font-bold text-white overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-purple-600 shadow-2xl"
          >
            <span className="relative z-10">Explore Collection</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </a>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-6 text-white border-2 border-white/50 backdrop-blur-xl rounded-2xl hover:bg-white/10 transition"
          >
            Watch Demo
          </motion.button>
        </motion.div>
      </div>

      {/* Custom Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="relative">
          <ArrowDown className="w-8 h-8 text-white/70" />
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 blur-xl"
            style={{ color: '#6366f1' }}
          >
            <ArrowDown className="w-8 h-8" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}