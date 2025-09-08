import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, Clock, DollarSign, Globe, Settings, Users, CreditCard, BarChart3, Shield, LogOut, Eye, UserCheck, Package } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kjnbfsgbvcaxuwqwbomu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqbmJmc2didmNheHV3cXdib211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMzA2MDcsImV4cCI6MjA3MjkwNjYwN30.utdLMJP13dGdqpeBiHa99wQ5M6Q-_FSydoWP6GdVT1U';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Stripe Configuration
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_...';

// Mock API functions with Supabase integration
const mockAPI = {
  async fetchForexData(symbol, interval) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const basePrice = symbol === 'EUR/USD' ? 1.0850 : symbol === 'GBP/USD' ? 1.2650 : 145.50;
    const data = [];
    
    for (let i = 99; i >= 0; i--) {
      const time = new Date(Date.now() - i * 15 * 60 * 1000);
      const volatility = 0.001 + Math.random() * 0.003;
      const change = (Math.random() - 0.5) * volatility;
      const price = basePrice + change * (100 - i);
      
      data.push({
        datetime: time.toISOString(),
        open: price - Math.random() * 0.001,
        high: price + Math.random() * 0.002,
        low: price - Math.random() * 0.002,
        close: price,
        volume: Math.floor(Math.random() * 1000000)
      });
    }
    
    return { values: data, meta: { symbol } };
  },
  
  async fetchNews(query) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      articles: [
        {
          title: `${query} Rises on Strong Economic Data`,
          publishedAt: new Date().toISOString(),
          source: { name: 'Reuters' },
          description: 'Currency pair shows bullish momentum...',
          sentiment: 'positive'
        },
        {
          title: 'Federal Reserve Policy Impact on USD',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: { name: 'Bloomberg' },
          description: 'Central bank decisions affect currency markets...',
          sentiment: 'neutral'
        }
      ]
    };
  },
  
  async analyzeWithAI(data) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const sessions = ['London', 'New York', 'NY-London Overlap', 'Asian/Off'];
    const currentSession = sessions[Math.floor(Math.random() * sessions.length)];
    const direction = Math.random() > 0.5 ? 'Buy' : 'Sell';
    const confidence = ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)];
    
    return {
      session: currentSession,
      analysis: `[SESSION ANALYSIS]\nCurrent Session: ${currentSession}\nSession Strength: Strong\n\n[PRICE ACTION]\nTrend Direction: ${direction === 'Buy' ? 'Bullish' : 'Bearish'}\nKey Levels:\n- Support: ${(1.0820).toFixed(4)}\n- Resistance: ${(1.0880).toFixed(4)}\n\n[TRADE SETUP]\nPair: ${data.symbol}\nDirection: ${direction}\nEntry Zone: ${(1.0845).toFixed(4)}\nStop Loss: ${(1.0825).toFixed(4)}\nTake Profit: ${(1.0885).toFixed(4)}\nRR Ratio: 1:2\nConfidence: ${confidence}`,
      recommendation: {
        pair: data.symbol,
        direction,
        entry: '1.0845',
        stopLoss: '1.0825',
        takeProfit: '1.0885',
        rrRatio: '1:2',
        confidence
      }
    };
  },

  // Mock admin data
  async fetchAdminAnalytics() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      totalUsers: 1247,
      activeUsers: 892,
      totalRevenue: 45780,
      monthlyRevenue: 12340,
      subscriptions: {
        starter: 524,
        professional: 298,
        enterprise: 70
      },
      revenueByPlan: [
        { plan: 'Starter', revenue: 9960, users: 524 },
        { plan: 'Professional', revenue: 20706, users: 298 },
        { plan: 'Enterprise', revenue: 13230, users: 70 }
      ],
      monthlyGrowth: [
        { month: 'Jan', users: 156, revenue: 8420 },
        { month: 'Feb', users: 234, revenue: 9180 },
        { month: 'Mar', users: 298, revenue: 10340 },
        { month: 'Apr', users: 367, revenue: 11200 },
        { month: 'May', users: 445, revenue: 11980 },
        { month: 'Jun', users: 524, revenue: 12340 }
      ]
    };
  }
};

// Subscription plans with reduced prices
const subscriptionPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    originalPrice: 29,
    stripePriceId: 'price_starter_19',
    paypalPlanId: 'P-starter-19',
    features: [
      '5 currency pairs',
      '100 analyses per month',
      'Email support',
      'Basic indicators'
    ],
    limits: { pairs: 5, analyses: 100 }
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 69,
    originalPrice: 79,
    stripePriceId: 'price_professional_69',
    paypalPlanId: 'P-professional-69',
    features: [
      '15 currency pairs',
      '1000 analyses per month',
      'Priority support',
      'Advanced indicators',
      'Historical data access'
    ],
    limits: { pairs: 15, analyses: 1000 },
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 189,
    originalPrice: 199,
    stripePriceId: 'price_enterprise_189',
    paypalPlanId: 'P-enterprise-189',
    features: [
      'Unlimited currency pairs',
      'Unlimited analyses',
      '24/7 phone support',
      'Custom indicators',
      'API access',
      'Team collaboration'
    ],
    limits: { pairs: Infinity, analyses: Infinity }
  }
];

// Authentication Component
const AuthComponent = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        onAuthSuccess(data.user);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              subscription_plan: 'starter',
              subscription_status: 'trial'
            }
          }
        });
        if (error) throw error;
        onAuthSuccess(data.user);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <TrendingUp className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to ForexAI Pro' : 'Create your account'}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign in' : 'Sign up')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-500"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Payment Integration Component
const PaymentComponent = ({ plan, onSuccess, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [processing, setProcessing] = useState(false);

  const handleStripePayment = async () => {
    setProcessing(true);
    try {
      // In production, call your backend to create Stripe checkout session
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceId: plan.stripePriceId,
          successUrl: window.location.origin + '/success',
          cancelUrl: window.location.origin + '/cancel'
        })
      });
      
      const { sessionUrl } = await response.json();
      window.location.href = sessionUrl;
    } catch (error) {
      console.error('Stripe payment failed:', error);
      alert('Payment failed. Please try again.');
    }
    setProcessing(false);
  };

  const handlePayPalPayment = async () => {
    setProcessing(true);
    try {
      // In production, integrate PayPal SDK
      // For demo, simulate success
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSuccess({ method: 'paypal', planId: plan.id });
    } catch (error) {
      console.error('PayPal payment failed:', error);
      alert('Payment failed. Please try again.');
    }
    setProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Complete your subscription</h3>
        <div className="mb-6">
          <h4 className="font-medium">{plan.name} Plan</h4>
          <p className="text-2xl font-bold text-blue-600">${plan.price}/month</p>
          <p className="text-sm text-gray-500">
            <span className="line-through">${plan.originalPrice}</span> Save $10/month!
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  checked={paymentMethod === 'stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <span>Credit Card (Stripe)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <span>PayPal</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={paymentMethod === 'stripe' ? handleStripePayment : handlePayPalPayment}
              disabled={processing}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? 'Processing...' : `Pay with ${paymentMethod === 'stripe' ? 'Stripe' : 'PayPal'}`}
            </button>
            <button
              onClick={onCancel}
              disabled={processing}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ onLogout }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await mockAPI.fetchAdminAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{analytics.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">{analytics.activeUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">${analytics.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">${analytics.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#3B82F6" name="Users" />
                  <Bar dataKey="revenue" fill="#10B981" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Subscription Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.revenueByPlan}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="users"
                    label={({ plan, users }) => `${plan}: ${users}`}
                  >
                    {analytics.revenueByPlan.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Subscription Plans Performance</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analytics.revenueByPlan.map((planData, index) => (
                <div key={planData.plan} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{planData.plan}</h4>
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-1">{planData.users}</p>
                  <p className="text-sm text-gray-600">subscribers</p>
                  <p className="text-lg font-semibold text-green-600 mt-2">
                    ${planData.revenue.toLocaleString()}/month
                  </p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${(planData.users / analytics.totalUsers) * 100}%`}}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {((planData.users / analytics.totalUsers) * 100).toFixed(1)}% of total users
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Trading Dashboard Component
const TradingDashboard = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPair, setSelectedPair] = useState('EUR/USD');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forexData, setForexData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const currencyPairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD'];

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const [data15m, data5m, data1h, news] = await Promise.all([
        mockAPI.fetchForexData(selectedPair, '15min'),
        mockAPI.fetchForexData(selectedPair, '5min'),
        mockAPI.fetchForexData(selectedPair, '1h'),
        mockAPI.fetchNews(selectedPair.replace('/', ' '))
      ]);

      const chartData = data15m.values.slice(-20).map((item, index) => ({
        time: new Date(item.datetime).toLocaleTimeString(),
        price: parseFloat(item.close),
        volume: item.volume
      }));
      
      setForexData(chartData);
      setNewsData(news.articles);

      const aiAnalysis = await mockAPI.analyzeWithAI({ symbol: selectedPair });
      setAnalysis(aiAnalysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    runAnalysis();
  }, [selectedPair]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      // Update user subscription in Supabase
      const { error } = await supabase.auth.updateUser({
        data: {
          subscription_plan: selectedPlan.id,
          subscription_status: 'active',
          payment_method: paymentData.method
        }
      });
      
      if (error) throw error;
      
      setShowPayment(false);
      setSelectedPlan(null);
      alert('Subscription activated successfully!');
    } catch (error) {
      console.error('Subscription update failed:', error);
      alert('Subscription activation failed. Please contact support.');
    }
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setSelectedPlan(null);
  };

  // Navigation Component
  const Navigation = () => (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-6">
      <div className="flex items-center mb-8">
        <TrendingUp className="h-8 w-8 text-blue-400 mr-3" />
        <h1 className="text-xl font-bold">ForexAI Pro</h1>
      </div>
      
      <div className="mb-6 p-3 bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-300">Welcome back,</p>
        <p className="font-medium truncate">{user.email}</p>
      </div>
      
      <nav className="space-y-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'analysis', label: 'Live Analysis', icon: TrendingUp },
          { id: 'billing', label: 'Billing', icon: CreditCard },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );

  // Dashboard View
  const DashboardView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Trading Dashboard</h2>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {currencyPairs.map(pair => (
              <option key={pair} value={pair}>{pair}</option>
            ))}
          </select>
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Session</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analysis?.session || 'Loading...'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Signal</p>
              <p className={`text-2xl font-semibold ${
                analysis?.recommendation?.direction === 'Buy' ? 'text-green-600' : 'text-red-600'
              }`}>
                {analysis?.recommendation?.direction || '---'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Confidence</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analysis?.recommendation?.confidence || '---'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Current Price</p>
              <p className="text-2xl font-semibold text-gray-900">
                {forexData.length > 0 ? forexData[forexData.length - 1].price.toFixed(4) : '---'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Price Chart</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forexData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={['dataMin - 0.001', 'dataMax + 0.001']} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Volume</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forexData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="volume" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">AI Analysis</h3>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 p-4 rounded">
              {analysis.analysis}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Market News</h3>
            <div className="space-y-3">
              {newsData.map((article, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">{article.title}</h4>
                  <p className="text-sm text-gray-600">{article.source.name} • {new Date(article.publishedAt).toLocaleTimeString()}</p>
                  <p className="text-sm mt-1">{article.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Billing View with enhanced payment integration
  const BillingView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Billing & Subscription</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
          <p className="text-blue-800">
            <strong>Limited Time Offer:</strong> Save $10/month on all plans! Original prices shown with strikethrough.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map(plan => (
          <div key={plan.id} className={`bg-white p-6 rounded-lg shadow-md border-2 ${
            plan.popular ? 'border-blue-500 relative' : 'border-gray-200'
          }`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="mb-4">
              <p className="text-3xl font-bold text-blue-600">
                ${plan.price}
                <span className="text-sm text-gray-500">/month</span>
              </p>
              <p className="text-sm text-gray-500">
                <span className="line-through">${plan.originalPrice}/month</span>
                <span className="text-green-600 font-medium ml-2">Save $10!</span>
              </p>
            </div>
            
            <ul className="space-y-2 mb-6">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handlePlanSelect(plan)}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                plan.popular 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>

      {/* Current Subscription Status */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Current Subscription</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Plan</p>
            <p className="font-medium">
              {user?.user_metadata?.subscription_plan || 'Starter'} Plan
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className={`font-medium ${
              user?.user_metadata?.subscription_status === 'active' ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {user?.user_metadata?.subscription_status || 'Trial'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Next Billing</p>
            <p className="font-medium">
              {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Settings View
  const SettingsView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">TwelveData API Key</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your TwelveData API key" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">NewsAPI Key</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your NewsAPI key" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Gemini API Key</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your Google Gemini API key" 
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save API Keys
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Trading Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency Pairs</label>
            <div className="space-y-2">
              {currencyPairs.map(pair => (
                <label key={pair} className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span>{pair}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Conservative</option>
              <option>Moderate</option>
              <option>Aggressive</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Navigation />
      <main className="flex-1 p-8">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'analysis' && <DashboardView />}
        {currentView === 'settings' && <SettingsView />}
        {currentView === 'billing' && <BillingView />}
      </main>
      
      {showPayment && selectedPlan && (
        <PaymentComponent
          plan={selectedPlan}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        // Check if user is admin (you can set this in Supabase user metadata)
        setIsAdmin(session.user.email === 'admin@forexai.pro' || session.user.user_metadata?.role === 'admin');
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setIsAdmin(session.user.email === 'admin@forexai.pro' || session.user.user_metadata?.role === 'admin');
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = (user) => {
    setUser(user);
    setIsAdmin(user.email === 'admin@forexai.pro' || user.user_metadata?.role === 'admin');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthComponent onAuthSuccess={handleAuthSuccess} />;
  }

  if (isAdmin) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return <TradingDashboard user={user} onLogout={handleLogout} />;
};

export default App;