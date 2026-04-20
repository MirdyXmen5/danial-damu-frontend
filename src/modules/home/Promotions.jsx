import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../api/axios';

const Promotions = () => {
  const { t } = useTranslation();
  const [promos, setPromos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // Responsive handler for visible items count
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    
    // Initial call
    updateCount();
    
    // Resize listener
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  // Fetch Promos from API
  useEffect(() => {
    const fetchPromos = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/images/');
        const promosData = response.data.filter(img => img.category === 'promo');
        
        // Mapping Django model names to frontend fields (if API returns 'image' for URL)
        const formattedPromos = promosData.map(img => ({
          id: img.id,
          imageUrl: img.image,
          title: img.title || 'Изображение'
        }));
        setPromos(formattedPromos);
      } catch (err) {
        console.error('Error fetching promos:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPromos();
  }, []);

  const totalItems = promos.length;
  const maxIndex = Math.max(0, totalItems - visibleCount);

  // Auto-scroll interval (every 3 seconds)
  useEffect(() => {
    if (totalItems <= visibleCount) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [totalItems, visibleCount, maxIndex]);

  // Adjust index horizontally cleanly if resizing shrinks `maxIndex` out of range
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const SkeletonCards = () => (
    <div className="flex gap-4 overflow-hidden py-4">
      {Array.from({ length: visibleCount }).map((_, i) => (
        <div key={i} className="flex-none px-2" style={{ width: `${100 / visibleCount}%` }}>
          <div className="w-full h-48 md:h-[300px] bg-gray-200 animate-pulse rounded-2xl shadow-sm"></div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="promotions" className="py-16 bg-brand-bg-light overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#FFC107] [-webkit-text-stroke:1px_#C2282A] mb-10">
          {t('promotions.title')}
        </h2>

        {isLoading ? (
          <SkeletonCards />
        ) : promos.length > 0 ? (
          <div className="relative group mx-2">
            
            {/* Slider container track */}
            <div className="overflow-hidden py-4">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
              >
                {promos.map((promo) => (
                  <div 
                    key={promo.id} 
                    className="flex-none px-2 focus:outline-none"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    <div className="relative w-full h-48 md:h-[300px] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 bg-white group/card">
                      <img 
                        src={promo.imageUrl} 
                        alt={promo.title} 
                        className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Optional Overlay when hovering on desktop */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {totalItems > visibleCount && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute top-1/2 -left-2 sm:-left-6 md:-left-8 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 text-brand-text-secondary hover:text-brand-primary transition-colors z-20"
                  aria-label="Предыдущий слайд"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute top-1/2 -right-2 sm:-right-6 md:-right-8 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 text-brand-text-secondary hover:text-brand-primary transition-colors z-20"
                  aria-label="Следующий слайд"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Pagination Dots */}
            {totalItems > visibleCount && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx 
                        ? 'w-8 bg-brand-accent-orange' 
                        : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Перейти к слайду ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-brand-text-muted text-lg">{t('promotions.error')}</p>
        )}
      </div>
    </section>
  );
};

export default Promotions;
