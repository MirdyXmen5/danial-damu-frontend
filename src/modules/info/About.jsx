import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About = () => {
  const { t } = useTranslation();
  const paragraphs = t('about.paragraphs', { returnObjects: true }) || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16 max-w-4xl"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-[#FFC107] [-webkit-text-stroke:1px_#C2282A] mb-8">
        {t('about.title')}
      </h1>
      <div className="space-y-6 text-brand-text-secondary text-lg leading-relaxed">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </motion.div>
  );
};

export default About;
