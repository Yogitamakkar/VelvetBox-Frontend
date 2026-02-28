import React from "react";
import { User } from "lucide-react"; // Or any default icon you use

export default function ComingSoonCard({ icon: Icon = User, label = "This" }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
      <div className="p-12 text-center">
        <div className="mb-6">
          <Icon size={80} className="text-gray-300 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {label} Section
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          This section is under development. Stay tuned for updates!
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
          Coming Soon
        </button>
      </div>
    </div>
  );
}
