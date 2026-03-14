import React, { useState, useEffect } from "react";
import categoriesData from "../../data/categories.json"; // adjust path accordingly
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryMegaMenu = ({ isDark = false }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate()

  return (
    <div className="relative ">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <ul className="flex items-center justify-center gap-2 px-5 py-4 ">
          {categoriesData.map((level1) => (
            <li
              key={level1.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredCategory(level1)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div
                  className={"flex items-center gap-1 px-3 py-3 rounded-xl transition-all duration-300 hover:scale-105 " + (isDark ? "hover:bg-white/5" : "hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:shadow-lg hover:shadow-pink-100/50")}
                >
                <span
                  className="font-semibold text-sm tracking-wide group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300"
                  style={{ color: isDark ? 'rgba(255,255,255,0.75)' : '#374151' }}
                >
                  {level1.name}
                </span>
                <svg 
                  className="w-4 h-4 transition-all duration-300 transform group-hover:rotate-180 group-hover:scale-110 group-hover:text-pink-500" 
                  style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#9ca3af' }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></div>

              {hoveredCategory?.id === level1.id && (
                <div
                  className="absolute left-0 right-0 transform -translate-x-1/2 top-full pt-2 z-[9999] "
                  onMouseEnter={() => setHoveredCategory(level1)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className={"w-screen max-w-3xl backdrop-blur-xl shadow-2xl rounded-2xl border p-8 animate-in fade-in slide-in-from-top-4 duration-300 max-h-[70vh] overflow-y-auto hide-scrollbar " + (isDark ? "bg-[#150d18] border-pink-900/40" : "bg-white/95 border-pink-100/50")} style={{scrollbarWidth:"none",msOverflowStyle:"none"}}>
                    
                    <div className={"absolute inset-0 rounded-2xl " + (isDark ? "bg-gradient-to-br from-pink-900/10 via-transparent to-purple-900/10" : "bg-gradient-to-br from-pink-50/30 via-white/50 to-purple-50/30")}></div>
                    
                    
                    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {level1.children.map((level2) => (
                        <div key={level2.id} className="group/section">
                          
                          <div className={"mb-4 pb-2 border-b relative " + (isDark ? "border-pink-900/50" : "border-pink-200/40")}>
                            <h3 className={"text-sm font-bold transition-all duration-300 flex items-center gap-2 group-hover/section:text-pink-500 " + (isDark ? "text-white/80" : "text-gray-800")}>
                              <span className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-60 group-hover/section:opacity-100 transition-all duration-300"></span>
                              {level2.name}
                            </h3>
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-500 group-hover/section:w-full rounded-full"></div>
                          </div>

                          <ul className="space-y-1">
                            {level2.children?.length > 0 ? (
                              level2.children.map((level3) => (
                                <li key={level3.id} >
                                  <div
                                    onClick={()=>navigate(`/products/${level3.id}`)}
                                    className={"group/item flex items-center gap-2 px-1 py-2 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:shadow-lg hover:scale-105 transition-all duration-300 text-xs " + (isDark ? "text-white/50" : "text-gray-600")}
                                  >
                                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-0 group-hover/item:opacity-100 group-hover/item:bg-white transition-all duration-300"></span>
                                    <span className="group-hover/item:translate-x-1 transition-transform duration-300 font-medium text-sm">
                                      {level3.name}
                                    </span>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li>
                                <a
                                  href={`/category/${level2.id}`}
                                  className="group/item flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 italic hover:text-white hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 hover:shadow-lg transition-all duration-300 text-sm"
                                >
                                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-0 group-hover/item:opacity-100 group-hover/item:bg-white transition-all duration-300"></span>
                                  <span className="group-hover/item:translate-x-1 transition-transform duration-300 font-medium">
                                    View All
                                  </span>
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                    
                    <div className="absolute top-4 right-8 w-32 h-32 bg-gradient-to-br from-pink-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-4 left-8 w-24 h-24 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-2xl"></div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryMegaMenu;