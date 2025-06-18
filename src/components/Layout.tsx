
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Leaf, BarChart, Camera, MessageCircle, Clock, Info } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: BarChart, label: 'Dashboard' },
    { path: '/disease-detection', icon: Camera, label: 'Disease Detection' },
    { path: '/chatbot', icon: MessageCircle, label: 'Chatbot' },
    { path: '/history', icon: Clock, label: 'History' },
    { path: '/about', icon: Info, label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-200/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-teal-200/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-200/20 rounded-full animate-bounce delay-700"></div>
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full animate-pulse">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Smart Plant Guardian 2.0
                </h1>
                <p className="text-green-700 text-xs">🌱📷 AI-Powered Plant Health & Disease Detection</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'text-green-700 hover:bg-green-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex justify-between mt-4 bg-white/90 rounded-lg p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-green-500 text-white'
                      : 'text-green-700 hover:bg-green-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 mt-16 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-6 w-6" />
            <span className="text-xl font-semibold">Smart Plant Guardian 2.0</span>
          </div>
          <p className="text-green-200 mb-4">🌿 Made by Prerana Iyengar</p>
          <div className="inline-block bg-white/10 text-green-100 border border-green-300 px-3 py-1 rounded-full text-sm">
            Built with Bolt.new ❤️
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
