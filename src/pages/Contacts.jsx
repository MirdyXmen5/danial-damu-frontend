import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contacts = () => {
  const { t } = useTranslation();

  const contactsInfo = [
    { icon: Phone, title: t('contacts.phone'), value: t('contacts.phoneVal') },
    { icon: Mail, title: t('contacts.email'), value: t('contacts.emailVal') },
    { icon: MapPin, title: t('contacts.address'), value: t('contacts.addressVal') },
    { icon: Clock, title: t('contacts.hours'), value: t('contacts.hoursVal') }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-12">
        {t('contacts.title')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {contactsInfo.map((info, idx) => {
          const Icon = info.icon;
          return (
            <div key={idx} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-brand-bg-softBlue rounded-full flex items-center justify-center flex-shrink-0 text-brand-brightBlue">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-brand-text-primary mb-1">{info.title}</h3>
                <p className="text-brand-text-secondary">{info.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  );
};

export default Contacts;
