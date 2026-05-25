import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Briefcase, Clock, ExternalLink, MapPin } from 'lucide-react';

const VACANCIES_URL = 'https://taraz.hh.kz/employer/11696079?hhtmFrom=vacancy_search_list&tab=VACANCIES';

const Vacancies = () => {
  const { t } = useTranslation();
  const requirements = t('vacancies.requirements.items', { returnObjects: true }) || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col"
    >
      {/* Responsive Top Banner */}
      <div className="w-full relative h-[180px] sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden select-none border-b border-gray-100">
        <picture>
          <source media="(min-width: 768px)" srcSet="/banner-vacancies-pc.jpeg" />
          <img 
            src="/banner-vacancies-mobile.png" 
            alt="Vacancies Banner" 
            className="w-full h-full object-cover"
          />
        </picture>
      </div>

      {/* Main Page Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[#FFC107] [-webkit-text-stroke:1px_#C2282A] mb-8 text-center md:text-left">
          {t('vacancies.title')}
        </h1>
        
        <div className="space-y-8 text-brand-text-secondary text-lg">
          <p className="leading-relaxed">{t('vacancies.desc')}</p>

          <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-bg-softBlue text-brand-primary">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-xl font-bold text-brand-text-primary">
                  {t('vacancies.requirements.title')}
                </h2>
              </div>
              <ul className="list-disc space-y-2 pl-16">
                {requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <hr className="border-gray-100" />

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-bg-softBlue text-brand-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-brand-text-primary mb-1">{t('vacancies.interview.title')}</h3>
                <p className="text-brand-text-secondary">{t('vacancies.interview.address')}</p>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-bg-softBlue text-brand-primary">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-brand-text-primary mb-1">Время работы</h3>
                <p className="text-brand-text-secondary">{t('vacancies.schedule.weekdays')}</p>
                <p className="text-brand-text-secondary">{t('vacancies.schedule.weekend')}</p>
              </div>
            </div>
          </div>

          {/* Strictly Centered Button at the very bottom */}
          <div className="flex justify-center pt-6">
            <a
              href={VACANCIES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-8 py-4 font-semibold text-white transition-all shadow-md hover:shadow-lg hover:bg-[#A91F21] focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            >
              {t('vacancies.cta')}
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Vacancies;
