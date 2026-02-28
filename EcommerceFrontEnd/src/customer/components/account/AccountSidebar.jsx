import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AccountSidebar({menuItems}){
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item)=>navigate(item.itemPath)
    return (
        <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-6">
                {/* User Profile */}
                <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    AS
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Ashok Kumar</h3>
                  </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = item.itemPath === location.pathname;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={()=>handleClick(item)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 hover:scale-102'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent size={20} className={`transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.count && (
                          <div className={`min-w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {item.count}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
        </div>
    )
}