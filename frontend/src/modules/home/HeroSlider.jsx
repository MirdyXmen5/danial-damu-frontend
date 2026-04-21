import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axios';

const HeroSlider = () => {
  const { t } = useTranslation();
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/images/');
        const heroes = response.data.filter(img => img.category === 'hero');
        const formatted = heroes.map(img => ({
          id: img.id,
          title: img.title || 'Banner',
          imageUrl: img.image,
        }));
        setBanners(formatted);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (isLoading) {
    return (
      <div className="w-full h-64 md:h-[500px] bg-gray-200 animate-pulse flex items-center justify-center">
        <p className="text-gray-500 font-medium">{t('hero.loading')}</p>
      </div>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section className="relative w-full h-64 md:h-[500px] overflow-hidden bg-brand-bg-softBlue">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={banners[currentSlide].imageUrl} 
            alt={banners[currentSlide].title} 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-brand-accent-orange' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
