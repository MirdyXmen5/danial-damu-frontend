import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Vacancies = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-8">
        {t('vacancies.title')}
      </h1>
      <div className="max-w-3xl space-y-6 text-brand-text-secondary text-lg">
        <p>{t('vacancies.desc')}</p>
      </div>
    </motion.div>
  );
};

export default Vacancies;
