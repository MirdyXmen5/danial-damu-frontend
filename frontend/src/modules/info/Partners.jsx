import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Partners = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-[#FFC107] [-webkit-text-stroke:1px_#C2282A] mb-8">
        {t('partners.title')}
      </h1>
    </motion.div>
  );
};

export default Partners;
