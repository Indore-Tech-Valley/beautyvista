import React, { useState, useEffect } from 'react';
import { Heart, Leaf, Sun, Droplets, Sparkles, Apple, Brain, Shield, Calendar, ChevronRight } from 'lucide-react';
import BreadcrumbBanner from '../../components/BreadcrumbBanner/BreadcrumbBanner';

const BeautyWellnessPage = () => {
  const [activeSection, setActiveSection] = useState('nutrition');
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id^="section-"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const [scrollDirection, setScrollDirection] = useState('up');

useEffect(() => {
  let lastScrollY = window.scrollY;

  const updateScrollDirection = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setScrollDirection('down');
    } else if (currentScrollY < lastScrollY) {
      setScrollDirection('up');
    }
    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', updateScrollDirection);

  return () => {
    window.removeEventListener('scroll', updateScrollDirection);
  };
}, []);


  const sections = [
    { id: 'nutrition', name: 'Nutrition & Diet', icon: Apple },
    { id: 'mindfulness', name: 'Mind-Body Wellness', icon: Brain },
    { id: 'skincare', name: 'Skin Health', icon: Droplets },
    // { id: 'prevention', name: 'Beauty Problems', icon: Shield },
    { id: 'ayurveda', name: 'Ayurvedic Tips', icon: Leaf },
    { id: 'events', name: 'Wellness Events', icon: Calendar }
  ];

  const nutritionTips = [
    { food: 'Avocados', benefit: 'Rich in healthy fats for glowing skin', icon: '🥑' },
    { food: 'Berries', benefit: 'Antioxidants for anti-aging', icon: '🫐' },
    { food: 'Nuts & Seeds', benefit: 'Vitamin E for hair strength', icon: '🥜' },
    { food: 'Green Tea', benefit: 'Detoxifies and hydrates', icon: '🍵' },
    { food: 'Fatty Fish', benefit: 'Omega-3 for skin elasticity', icon: '🐟' },
    { food: 'Sweet Potatoes', benefit: 'Beta-carotene for natural glow', icon: '🍠' }
  ];

  const ayurvedicTips = [
    { ingredient: 'Turmeric', benefit: 'Anti-inflammatory face mask', recipe: 'Mix with honey and milk' },
    { ingredient: 'Neem', benefit: 'Antibacterial for acne treatment', recipe: 'Boil leaves, use as face wash' },
    { ingredient: 'Aloe Vera', benefit: 'Soothes and moisturizes skin', recipe: 'Apply fresh gel directly' },
    { ingredient: 'Coconut Oil', benefit: 'Deep hair conditioning', recipe: 'Warm and massage into scalp' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">

         <BreadcrumbBanner
        title="Beauty & Wellness"
        path="Home"
        image="https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg"
      />

      {/* Hero Section */}
      {/* <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-repeat bg-center" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm">
              <Heart className="w-10 h-10 text-pink-200" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              Beauty & Wellness
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              Nurture your inner radiance through holistic wellness practices
            </p>
            <div className="flex justify-center gap-4 text-sm flex-wrap">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Natural Beauty
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Leaf className="w-4 h-4" />
                Ayurvedic Care
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Sun className="w-4 h-4" />
                Holistic Wellness
              </span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Navigation */}
     {/* <div className={`sticky ${scrollDirection === 'down' ? 'top-0' : 'top-20'} z-50 bg-white border-b border-purple-100 transition-all duration-300`}>

        <div className=" container mx-auto px-6 py-4">
          <div className="flex justify-center overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
  key={section.id}
  onClick={() => {
    setActiveSection(section.id);
    document.getElementById(`section-${section.id}`)?.scrollIntoView({ behavior: 'smooth' });
  }}
  className={`flex items-center gap-2 px-4 py-2 my-1 rounded-full transition-all duration-300 whitespace-nowrap ${
    activeSection === section.id
      ? 'bg-rose-700 text-white  transform scale-105'
      : 'text-gray-600 hover:text-rose-800 hover:bg-rose-50'
  }`}
>
  <Icon className="w-4 h-4" />
  <span className="text-sm font-medium">{section.name}</span>
</button>
                );
              })}
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 w-full">
        {/* Nutrition Section */}
        <div
          id="section-nutrition"
          className={`mb-20 transition-all duration-1000 max-w-7xl mx-auto ${
            isVisible['section-nutrition'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nutrition for Natural Beauty
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Feed your skin and hair from within with these nutrient-rich foods
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nutritionTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{tip.food}</h3>
                <p className="text-gray-600">{tip.benefit}</p>
                <div className="mt-4 flex items-center text-rose-700 group-hover:text-rose-800 transition-colors">
                  <span className="text-sm font-medium">Learn more</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mind-Body Wellness */}
        <div
          id="section-mindfulness"
          className={`mb-20 transition-all duration-1000 max-w-7xl mx-auto ${
            isVisible['section-mindfulness'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-rose-700 rounded-3xl p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Mind-Body Wellness</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Stress Management</h3>
                      <p className="text-white/90">Chronic stress affects skin health and hair growth. Practice daily meditation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Morning Routine</h3>
                      <p className="text-white/90">Start with 5 minutes of deep breathing and gratitude practice.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Self-Care Rituals</h3>
                      <p className="text-white/90">Regular self-care boosts confidence and overall well-being.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors">
                  <h3 className="text-xl font-semibold mb-4">Quick Meditation</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Find a quiet space</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Close your eyes and breathe deeply</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Focus on your breath for 5 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Notice how your skin feels more relaxed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skin Health Section */}
        <div
          id="section-skincare"
          className={`mb-20 transition-all duration-1000 max-w-7xl mx-auto ${
            isVisible['section-skincare'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Daily Skin Health Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple habits for radiant, healthy skin every day
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <Droplets className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Hydration</h3>
              <p className="text-gray-600">Drink 8 glasses of water daily and use a hydrating moisturizer twice daily.</p>
            </div>
            
            <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100">
              <Sun className="w-8 h-8 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sun Protection</h3>
              <p className="text-gray-600">Apply SPF 30+ sunscreen daily, even indoors. Reapply every 2 hours.</p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <Leaf className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Gentle Cleansing</h3>
              <p className="text-gray-600">Use mild, pH-balanced cleanser twice daily. Avoid harsh scrubbing.</p>
            </div>
          </div>
        </div>

        {/* Ayurvedic Tips */}
        <div
          id="section-ayurveda"
          className={`mb-20 transition-all duration-1000  max-w-7xl mx-auto ${
            isVisible['section-ayurveda'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Ayurvedic Beauty Secrets
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ancient wisdom for modern beauty - time-tested natural remedies
            </p>
          </div>
          
       <div className="grid md:grid-cols-2 gap-6">
  {ayurvedicTips.map((tip, index) => (
    <div
      key={index}
      className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Leaf
            className={`w-6 h-6 ${
              tip.ingredient === 'Turmeric'
                ? 'text-yellow-500'
                : tip.ingredient === 'Neem'
                ? 'text-green-600'
                : tip.ingredient === 'Aloe Vera'
                ? 'text-emerald-800'
                : tip.ingredient === 'Coconut Oil'
                ? 'text-amber-600'
                : 'text-gray-500'
            }`}
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{tip.ingredient}</h3>
      </div>
      <p className="text-gray-600 mb-4">{tip.benefit}</p>
      <div className="bg-white/50 rounded-lg p-3">
        <p className="text-sm font-medium text-green-700">How to use:</p>
        <p className="text-sm text-gray-600 mt-1">{tip.recipe}</p>
      </div>
    </div>
  ))}
</div>


        </div>

        {/* Wellness Events */}
        <div
          id="section-events"
          className={`mb-20 transition-all duration-1000  max-w-7xl mx-auto ${
            isVisible['section-events'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Upcoming Wellness Events
              </h2>
              <p className="text-lg text-gray-600">
                Join our community for holistic beauty and wellness workshops
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-rose-700 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6" />
                  <span className="text-sm font-medium">July 20, 2025</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Ayurvedic Skincare Workshop</h3>
                <p className="text-white/90 mb-4">Learn to create natural face masks and oils using traditional recipes.</p>
                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  Register Now
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6" />
                  <span className="text-sm font-medium">August 5, 2025</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Mindful Beauty Meditation</h3>
                <p className="text-white/90 mb-4">Discover how mindfulness enhances your natural radiance.</p>
                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white  max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Start Your Wellness Journey Today</h2>
          <p className="text-lg mb-8 opacity-90">
            Book a consultation to create your personalized beauty and wellness plan
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
              Book Consultation
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautyWellnessPage;