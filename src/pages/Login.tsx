
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BubbleAnimation from '../components/BubbleAnimation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000e1f] via-[#001e3c] to-[#001730] flex items-center justify-center px-4 pt-20 text-white">
      <BubbleAnimation />

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Left Info Block */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center p-8 rounded-2xl bg-black/20 border border-white/10"
        >
          <Sparkles className="h-12 w-12 text-white mb-4 animate-pulse" />
          <h2 className="text-3xl font-bold mb-4">Welcome to EventFlow</h2>
          <p className="mb-6 text-lg leading-relaxed">
            Unlock the experience of effortless event management. Dive into a world of premium tools, where every click is a step toward success.
          </p>
          <blockquote className="italic border-l-4 pl-4 border-white">
            "Luxury is not a privilege — it’s a mindset. Step in like you own the show."
          </blockquote>
        </motion.div>

        {/* Right Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl bg-black/20 border border-white/10"
        >
          <div className="text-center mb-8">
            <Sparkles className="h-10 w-10 text-white mx-auto mb-3" />
            <h2 className="text-3xl font-bold">Sign In</h2>
            <p className="mt-1 text-white text-sm">Enter your credentials to access the royal dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#2541b2] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-white">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#2541b2] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-white" />
                  ) : (
                    <Eye className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-white">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#2541b2] mr-2 rounded border-white/20 bg-black/30"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-white underline hover:text-gray-300 transition"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.95 }}
              className="w-full flex justify-center py-3 px-4 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-[#2541b2] to-[#3e64ff] hover:from-[#1e3c8b] hover:to-[#577aff] focus:outline-none focus:ring-2 focus:ring-[#3e64ff] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white">
              New to EventFlow?{' '}
              <Link
                to="/register"
                className="font-semibold text-white underline hover:text-gray-300 transition"
              >
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
