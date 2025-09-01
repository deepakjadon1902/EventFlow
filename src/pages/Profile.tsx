
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Save, Bell, Shield, Edit3, Lock, Trash2, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import BubbleAnimation from '../components/BubbleAnimation';
import GlassCard from '../components/GlassCard';

interface Profile {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  date_of_birth: string;
  role: string;
  avatar_url: string | null;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !user) return;

    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          phone: profile.phone,
          address: profile.address,
          date_of_birth: profile.date_of_birth,
        })
        .eq('id', user.id);

      if (error) throw error;
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof Profile, value: string) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-black dark:via-slate-900 dark:to-slate-800 flex items-center justify-center pt-16">
        <BubbleAnimation />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl max-w-md mx-4"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Authentication Required
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Please sign in to access your profile dashboard and manage your account settings.
            </p>
            <motion.a
              href="/login"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign In to Continue
            </motion.a>
          </div>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-black dark:via-slate-900 dark:to-slate-800 flex items-center justify-center pt-16">
        <BubbleAnimation />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-red-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 mt-6 font-medium">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  const tabConfig = [
    { 
      key: 'profile', 
      label: 'Personal Info', 
      icon: User, 
      color: 'from-blue-500 to-blue-600',
      description: 'Manage your personal details'
    },
    { 
      key: 'notifications', 
      label: 'Preferences', 
      icon: Bell, 
      color: 'from-red-500 to-red-600',
      description: 'Control your notifications'
    },
    { 
      key: 'security', 
      label: 'Security', 
      icon: Shield, 
      color: 'from-slate-700 to-slate-800',
      description: 'Secure your account'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-black dark:via-slate-900 dark:to-slate-800">
      <BubbleAnimation />
      
      {/* Header Section */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl mb-6 shadow-2xl">
              <Settings className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Account <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Settings</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Take control of your account. Update your information, customize preferences, and enhance security.
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-2 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {tabConfig.map((tab, index) => (
                  <motion.button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-6 rounded-2xl font-semibold transition-all duration-300 ${
                      activeTab === tab.key
                        ? 'bg-gradient-to-r ' + tab.color + ' text-white shadow-xl transform scale-105'
                        : 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-black/30'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-3 rounded-xl mb-3 ${
                        activeTab === tab.key 
                          ? 'bg-white/20' 
                          : 'bg-slate-100 dark:bg-slate-800'
                      }`}>
                        <tab.icon className="w-6 h-6" />
                      </div>
                      <span className="text-lg font-bold mb-1">{tab.label}</span>
                      <span className={`text-sm ${
                        activeTab === tab.key 
                          ? 'text-white/80' 
                          : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {tab.description}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'profile' && profile && (
              <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="flex items-center mb-8">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mr-4">
                    <Edit3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Personal Information</h2>
                    <p className="text-slate-600 dark:text-slate-300">Update your personal details and contact information</p>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Full Name */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="block w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          value={profile.email}
                          disabled
                          className="block w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-500 dark:text-slate-400 cursor-not-allowed text-lg"
                        />
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 flex items-center">
                        <Lock className="w-4 h-4 mr-1" />
                        Email address cannot be modified for security reasons
                      </p>
                    </div>

                    {/* Phone Number */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="block w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                          required
                        />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          type="date"
                          value={profile.date_of_birth}
                          onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                          className="block w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address - Full Width */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                        required
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-6">
                    <motion.button
                      type="submit"
                      disabled={saving}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                    >
                      {saving ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      ) : (
                        <Save className="w-5 h-5 mr-3" />
                      )}
                      {saving ? 'Saving Changes...' : 'Save Changes'}
                    </motion.button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="flex items-center mb-8">
                  <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mr-4">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Notification Preferences</h2>
                    <p className="text-slate-600 dark:text-slate-300">Customize how and when you receive notifications</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[
                    { 
                      id: 'event-reminders', 
                      label: 'Event Reminders', 
                      description: 'Receive timely notifications about your upcoming events and bookings',
                      category: 'Essential'
                    },
                    { 
                      id: 'booking-confirmations', 
                      label: 'Booking Confirmations', 
                      description: 'Get instant confirmation when you successfully book an event',
                      category: 'Essential'
                    },
                    { 
                      id: 'event-updates', 
                      label: 'Event Updates', 
                      description: 'Stay informed about any changes to your booked events',
                      category: 'Important'
                    },
                    { 
                      id: 'promotional', 
                      label: 'Promotional Updates', 
                      description: 'Discover new events, special offers, and exclusive deals',
                      category: 'Marketing'
                    },
                  ].map((setting, index) => (
                    <motion.div
                      key={setting.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group p-6 bg-white/40 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-white/60 dark:hover:bg-black/30 transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative mt-1">
                          <input
                            type="checkbox"
                            id={setting.id}
                            defaultChecked={setting.category !== 'Marketing'}
                            className="w-5 h-5 text-red-500 bg-white border-2 border-slate-300 rounded-lg focus:ring-red-500 focus:ring-2 transition-colors"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <label htmlFor={setting.id} className="text-lg font-semibold text-slate-900 dark:text-white cursor-pointer group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                              {setting.label}
                            </label>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              setting.category === 'Essential' 
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : setting.category === 'Important'
                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                              {setting.category}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {setting.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end pt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                  >
                    <Save className="w-5 h-5 mr-3" />
                    Save Preferences
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="flex items-center mb-8">
                  <div className="p-4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl mr-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Security Settings</h2>
                    <p className="text-slate-600 dark:text-slate-300">Protect your account with advanced security features</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Change Password */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-2xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                          Update Password
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                          Keep your account secure by regularly updating your password with a strong, unique combination.
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Change Password
                        </motion.button>
                      </div>
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                        <Lock className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Two-Factor Authentication */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 border border-green-200 dark:border-green-800 rounded-2xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                          Add an extra layer of security to your account with SMS or authenticator app verification.
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-md"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Enable 2FA
                        </motion.button>
                      </div>
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Danger Zone */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 bg-gradient-to-r from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-800/20 border border-red-200 dark:border-red-800 rounded-2xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-red-900 dark:text-red-400 mb-2">
                          Danger Zone
                        </h3>
                        <p className="text-red-700 dark:text-red-300 mb-4 leading-relaxed">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-md"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </motion.button>
                      </div>
                      <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                        <Trash2 className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;