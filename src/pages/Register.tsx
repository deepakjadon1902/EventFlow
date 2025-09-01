
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Calendar, CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BubbleAnimation from '../components/BubbleAnimation';

const motivationalQuotes = [
  "“Great things never come from comfort zones.”",
  "“Dream it. Wish it. Do it.”",
  "“Don’t wait for opportunity. Create it.”",
  "“Push yourself, because no one else is going to do it for you.”",
];

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: '',
    dateOfBirth: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { error } = await signUp(formData.email, formData.password, formData);
      if (error) {
        setError(error.message);
      } else {
        setShowSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-16">
        <BubbleAnimation />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="bg-[#1a1a1a] p-10 rounded-2xl text-white text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
            <p className="mb-6">
              Welcome to EventFlow! Your account has been created successfully.
            </p>
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-white/60">Redirecting to login page...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-16 pb-8">
      <BubbleAnimation />
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

        {/* Left: Welcome Message */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1a1a1a] p-10 rounded-2xl flex flex-col justify-center"
        >
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Welcome to EventFlow 👋
          </h1>
          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            Join the premier community for exclusive events. Discover, connect, and celebrate like royalty.
          </p>
          <div className="bg-black/30 rounded-lg px-6 py-5">
            <ul className="space-y-4 text-white text-lg font-medium list-disc list-inside">
              {motivationalQuotes.map((quote, index) => (
                <li key={index}>{quote}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right: Form Container */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1a1a1a] p-10 rounded-2xl text-white"
        >
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold">Create Account</h2>
            <p className="text-white/70 text-lg">Fill in the form to get started</p>
          </div>

          {error && (
            <div className="bg-red-600/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: "name", type: "text", icon: User, placeholder: "Full Name" },
              { id: "email", type: "email", icon: Mail, placeholder: "Email Address" },
              { id: "phone", type: "tel", icon: Phone, placeholder: "Phone Number" },
              { id: "address", type: "text", icon: MapPin, placeholder: "Address" },
              { id: "dateOfBirth", type: "date", icon: Calendar, placeholder: "Date of Birth" }
            ].map(({ id, type, icon: Icon, placeholder }) => (
              <div key={id} className="relative">
                <Icon className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  id={id}
                  name={id}
                  type={type}
                  required
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-3 py-3 rounded-lg bg-black/30 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-royal-blue"
                />
              </div>
            ))}

            {/* Password */}
            {[
              { id: "password", show: showPassword, setShow: setShowPassword, label: "Password" },
              { id: "confirmPassword", show: showConfirmPassword, setShow: setShowConfirmPassword, label: "Confirm Password" }
            ].map(({ id, show, setShow, label }) => (
              <div key={id} className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  id={id}
                  name={id}
                  type={show ? "text" : "password"}
                  required
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  placeholder={label}
                  className="w-full pl-10 pr-10 py-3 rounded-lg bg-black/30 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-royal-blue"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            ))}

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-lg bg-royal-blue text-white font-semibold hover:bg-royal-light transition disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-white/70 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-royal-light font-medium hover:underline">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
