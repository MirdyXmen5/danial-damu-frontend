import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Apple, Tag, Layers, MapPin } from 'lucide-react';

const Advantages = () => {
  const { t } = useTranslation();

  const cards = [
    { id: 'card1', icon: Apple, color: 'text-brand-accent-green', bg: 'bg-green-100' },
    { id: 'card2', icon: Tag, color: 'text-brand-accent-red', bg: 'bg-red-100' },
    { id: 'card3', icon: Layers, color: 'text-brand-primary', bg: 'bg-brand-bg-softBlue' },
    { id: 'card4', icon: MapPin, color: 'text-brand-accent-orange', bg: 'bg-orange-100' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#FFC107] [-webkit-text-stroke:1px_#C2282A] mb-12">
          {t('advantages.title')}
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div 
                key={card.id}
                variants={itemVariants}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-brand-bg-light shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${card.bg}`}>
                  <Icon className={`w-8 h-8 ${card.color}`} />
                </div>
                <h3 className="text-xl font-bold text-brand-text-primary mb-3">
                  {t(`advantages.${card.id}.title`)}
                </h3>
                <p className="text-brand-text-muted">
                  {t(`advantages.${card.id}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Advantages;
