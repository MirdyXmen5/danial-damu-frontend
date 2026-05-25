import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Briefcase } from 'lucide-react';

const Contacts = () => {
  const { t } = useTranslation();

  const officeInfo = [
    { icon: Phone, title: t('contacts.phone'), value: t('contacts.phoneVal'), href: `tel:${t('contacts.phoneVal')}` },
    { icon: Mail, title: t('contacts.email'), value: t('contacts.emailVal'), href: `mailto:${t('contacts.emailVal')}` },
    { icon: MapPin, title: t('contacts.address'), value: t('contacts.addressVal'), href: null },
    { icon: Clock, title: t('contacts.hours'), value: t('contacts.hoursVal'), href: null }
  ];

  const members = t('contacts.members', { returnObjects: true }) || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16 max-w-6xl"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-[#FFC107] [-webkit-text-stroke:1px_#C2282A] mb-12">
        {t('contacts.title')}
      </h1>

      {/* Main Office Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {officeInfo.map((info, idx) => {
          const Icon = info.icon;
          const content = (
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full">
              <div className="w-12 h-12 bg-brand-bg-softBlue rounded-xl flex items-center justify-center flex-shrink-0 text-brand-primary">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-brand-text-primary mb-1 text-xs uppercase tracking-wider">{info.title}</h3>
                <p className="text-brand-text-secondary text-sm font-medium break-all">{info.value}</p>
              </div>
            </div>
          );
          return info.href ? (
            <a key={idx} href={info.href} className="block transition-transform hover:-translate-y-1">
              {content}
            </a>
          ) : (
            <div key={idx}>{content}</div>
          );
        })}
      </div>

      {/* Specific Channels (Office Link & Wholesale Orders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Office Contact */}
        <div className="p-6 md:p-8 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-brand-primary mb-3 flex items-center gap-2">
              <Briefcase size={22} />
              {t('contacts.office_title')}
            </h3>
            <p className="text-brand-text-primary font-semibold text-lg mb-2">
              {t('contacts.office_member')}
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <a 
              href={`mailto:${t('contacts.emailVal')}`}
              className="flex items-center gap-2 text-brand-text-secondary hover:text-brand-primary transition-colors text-base"
            >
              <Mail size={18} />
              {t('contacts.emailVal')}
            </a>
            <a 
              href={`tel:${t('contacts.phoneVal')}`}
              className="flex items-center gap-2 text-brand-text-secondary hover:text-brand-primary transition-colors text-base font-medium"
            >
              <Phone size={18} />
              {t('contacts.phoneVal')}
            </a>
          </div>
        </div>

        {/* Wholesale Contact */}
        <div className="p-6 md:p-8 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-brand-primary mb-3 flex items-center gap-2">
              <Briefcase size={22} />
              {t('contacts.wholesale_title')}
            </h3>
            <p className="text-brand-text-primary font-semibold text-lg mb-2">
              {t('contacts.wholesale_member')}
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <a 
              href={`tel:${t('contacts.wholesale_phone')}`}
              className="flex items-center gap-2 text-brand-text-secondary hover:text-brand-primary transition-colors text-base font-medium"
            >
              <Phone size={18} />
              {t('contacts.wholesale_phone')}
            </a>
          </div>
        </div>
      </div>

      {/* Management Team */}
      <div>
        <h2 className="text-3xl font-bold text-brand-text-primary mb-8 border-b-2 border-brand-primary/10 pb-3">
          {t('contacts.management_title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, idx) => (
            <div 
              key={idx} 
              className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="mb-4">
                <span className="inline-block text-xs font-semibold text-brand-primary bg-brand-bg-softBlue px-3 py-1 rounded-full mb-3">
                  {member.role}
                </span>
                <h4 className="text-lg font-bold text-brand-text-primary leading-snug">
                  {member.name}
                </h4>
              </div>
              <a 
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-primary transition-colors text-sm font-medium mt-2"
              >
                <Mail size={16} />
                {member.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Contacts;
