import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Truck,
  Calendar,
  Shield,
  Zap,
  Star,
  Award,
  Check,
} from "lucide-react";

const SkipSelector = () => {
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [skipsData, setSkipsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
    )
      .then((response) => response.json())
      .then((data) => {
        setSkipsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching skips:", error);
        setLoading(false);
      });
  }, []);

  const calculateFinalPrice = (priceBeforeVat, vat) => {
    return Math.round(priceBeforeVat * (1 + vat / 100));
  };

  const handleSkipSelection = (skip) => {
    if (selectedSkip?.id === skip.id) {
      // Désélectionner si c'est déjà sélectionné
      setSelectedSkip(null);
    } else {
      // Sélectionner le nouveau skip
      setSelectedSkip(skip);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent mb-4"></div>
          <div className="text-white text-xl font-medium">
            Loading your perfect skip...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-60 h-60 bg-indigo-600/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center pt-16 pb-12 px-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3 mb-8">
            <Zap className="text-blue-400" size={18} />
            <span className="text-blue-200 font-medium">
              Premium Skip Hire Service
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-6 leading-tight">
            Choose Your Skip Size
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            Select the skip size that perfectly matches your project needs
          </p>
        </div>

        {/* Skip Cards Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skipsData.map((skip, index) => {
              const isSelected = selectedSkip?.id === skip.id;
              const finalPrice = calculateFinalPrice(
                skip.price_before_vat,
                skip.vat
              );
              const isPopular = skip.popularity > 70;
              const isMostPopular = skip.popularity > 90;

              return (
                <div
                  key={skip.id}
                  className={`group relative cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                    isSelected ? "scale-105" : ""
                  }`}
                  onClick={() => handleSkipSelection(skip)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Popularity Badge */}
                  {isMostPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-2xl flex items-center gap-2 animate-bounce">
                        <Star size={14} fill="currentColor" />
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  {isPopular && !isMostPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
                        <Award size={14} />
                        RECOMMENDED
                      </div>
                    </div>
                  )}

                  {/* Main Card */}
                  <div
                    className={`relative bg-gray-800/40 backdrop-blur-xl border rounded-3xl overflow-hidden transition-all duration-500 ${
                      isSelected
                        ? "border-blue-400 shadow-2xl shadow-blue-500/25 bg-gray-800/60"
                        : "border-gray-700/50 hover:border-gray-600/70 hover:shadow-xl hover:shadow-gray-900/50"
                    }`}
                  >
                    {/* Skip Visual Container */}
                    <div className="relative h-56 bg-gradient-to-br from-gray-700/30 to-gray-800/50 flex items-center justify-center overflow-hidden">
                      {/* Size Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg">
                          {skip.size} Yards
                        </div>
                      </div>

                      {/* 3D Skip Visualization */}
                      <div className="relative transform-gpu perspective-1000">
                        {/* Main Skip Body */}
                        <div className="relative w-40 h-24 transform rotateX-12 rotateY-6">
                          {/* Skip Container */}
                          <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-t-2xl shadow-2xl relative overflow-hidden">
                            {/* Brand Logo */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-blue-900 font-black text-sm mb-0.5">
                                  WE
                                </div>
                                <div className="text-blue-900 font-black text-sm mb-0.5">
                                  WANT
                                </div>
                                <div className="text-blue-900 font-black text-sm">
                                  WASTE
                                </div>
                              </div>
                            </div>

                            {/* Skip Handles */}
                            <div className="absolute -left-2 top-3 w-3 h-6 bg-yellow-600 rounded-l-lg shadow-lg"></div>
                            <div className="absolute -right-2 top-3 w-3 h-6 bg-yellow-600 rounded-r-lg shadow-lg"></div>
                            <div className="absolute -left-2 bottom-6 w-3 h-6 bg-yellow-600 rounded-l-lg shadow-lg"></div>
                            <div className="absolute -right-2 bottom-6 w-3 h-6 bg-yellow-600 rounded-r-lg shadow-lg"></div>

                            {/* Top Edge Highlight */}
                            <div className="absolute top-0 left-2 right-2 h-1 bg-yellow-300 rounded-full"></div>
                          </div>

                          {/* Skip Base/Shadow */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-44 h-6 bg-yellow-700 rounded-b-xl opacity-80"></div>

                          {/* Ground Shadow */}
                          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-36 h-3 bg-black/30 rounded-full blur-md"></div>
                        </div>

                        {/* Floating Particles */}
                        <div className="absolute -top-3 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
                        <div
                          className="absolute -top-1 -left-3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce opacity-60"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div
                          className="absolute top-2 right-8 w-1 h-1 bg-indigo-400 rounded-full animate-bounce opacity-50"
                          style={{ animationDelay: "1s" }}
                        ></div>
                      </div>

                      {/* Road Restriction Warning */}
                      {!skip.allowed_on_road && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-yellow-500 text-black px-3 py-2 rounded-xl text-xs font-bold shadow-lg">
                          <AlertTriangle size={14} />
                          Not Allowed On The Road
                        </div>
                      )}

                      {/* Selection Glow Effect */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm rounded-t-3xl"></div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      {/* Header */}
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {skip.size} Yard Skip
                        </h3>
                      </div>

                      {/* Features */}
                      <div className="items-center text-sm">
                        <div className="grid grid-cols-2">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                              <Calendar size={14} className="text-blue-400" />
                            </div>
                            <span className="text-gray-300">
                              {skip.hire_period_days} day hire period
                            </span>
                          </div>

                          {skip.allows_heavy_waste && (
                            <div className="flex items-center">
                              <div className="p-2 bg-purple-500/20 rounded-lg">
                                <Shield size={14} className="text-purple-400" />
                              </div>
                              <span className="text-gray-300">
                                Heavy waste accepted
                              </span>
                            </div>
                          )}
                        </div>
                        {skip.allowed_on_road && (
                          <div className="flex items-center justify-center">
                            <div className="p-2 bg-emerald-500/20 rounded-lg">
                              <Truck size={14} className="text-emerald-400" />
                            </div>
                            <span className="text-gray-300">
                              Road placement allowed
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Pricing */}
                      <div className="text-center pt-2">
                        <div className="text-4xl font-bold text-blue-400 mb-2">
                          £{finalPrice}
                        </div>
                        <div className="text-xs text-gray-500">
                          Including VAT
                        </div>
                      </div>

                      {/* Selection Button */}
                      <button
                        className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                          isSelected
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                            : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/60 hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSkipSelection(skip);
                        }}
                      >
                        {isSelected ? (
                          <>
                            <Check size={18} />
                            SELECTED
                          </>
                        ) : (
                          <>
                            Select This Skip
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Selection Border Glow */}
                    {isSelected && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-75 -z-10 animate-pulse"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Action Bar */}
        {selectedSkip && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-2xl border-t border-gray-700/50 z-50">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  {/* Skip Preview */}
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center font-bold text-blue-900 text-xl shadow-xl">
                    {selectedSkip.size}
                  </div>

                  {/* Selection Details */}
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-1">
                      {selectedSkip.size} Yard Skip - {selectedSkip.category}
                    </h4>
                    <div className="flex items-center gap-4 text-gray-400">
                      <span className="font-bold text-blue-400 text-lg">
                        £
                        {calculateFinalPrice(
                          selectedSkip.price_before_vat,
                          selectedSkip.vat
                        )}
                      </span>
                      <span>•</span>
                      <span>{selectedSkip.ideal}</span>
                      <span>•</span>
                      <span>{selectedSkip.capacity}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Calendar size={14} className="text-blue-400" />
                    </div>
                    <span className="text-gray-300">
                      {selectedSkip.hire_period_days} day hire period
                    </span>
                  </div>

                  {selectedSkip.allowed_on_road && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/20 rounded-lg">
                        <Truck size={14} className="text-emerald-400" />
                      </div>
                      <span className="text-gray-300">
                        Road placement allowed
                      </span>
                    </div>
                  )}

                  {selectedSkip.allows_heavy_waste && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Shield size={14} className="text-purple-400" />
                      </div>
                      <span className="text-gray-300">
                        Heavy waste accepted
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    className="px-8 py-4 bg-gray-700/50 hover:bg-gray-600/60 text-white rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 border border-gray-600/50"
                    onClick={() => setSelectedSkip(null)}
                  >
                    Deselect
                  </button>

                  <button className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 shadow-xl">
                    Continue
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkipSelector;
