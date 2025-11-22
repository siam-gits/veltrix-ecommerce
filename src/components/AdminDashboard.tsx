// src/components/AdminDashboard.tsx
"use client";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-900 to-pink-900">
      <div className="container mx-auto px-6">
        <h1 className="text-7xl font-black text-white text-center mb-20">Admin Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/20">
            <h3 className="text-7xl font-black text-white">$48,291</h3>
            <p className="text-3xl text-white/80 mt-6">Total Revenue</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/20">
            <h3 className="text-7xl font-black text-white">1,284</h3>
            <p className="text-3xl text-white/80 mt-6">Total Orders</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/20">
            <h3 className="text-7xl font-black text-white">892</h3>
            <p className="text-3xl text-white/80 mt-6">Active Users</p>
          </div>
        </div>
      </div>
    </div>
  );
}