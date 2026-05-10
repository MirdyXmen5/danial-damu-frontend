import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Briefcase, Clock, ExternalLink, MapPin } from 'lucide-react';

const VACANCIES_URL = 'https://taraz.hh.kz/employer/11696079?hhtmFrom=vacancy_search_list&tab=VACANCIES';

const Vacancies = () => {
  const { t } = useTranslation();
  const requirements = t('vacancies.requirements.items', { returnObjects: true });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-[#FFC107] [-webkit-text-stroke:1px_#C2282A] mb-8">
        {t('vacancies.title')}
      </h1>
      <div className="max-w-3xl space-y-6 text-brand-text-secondary text-lg">
        <p>{t('vacancies.desc')}</p>

        <div className="space-y-5 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-bg-softBlue text-brand-primary">
                <Briefcase size={20} />
              </div>
              <h2 className="text-xl font-bold text-brand-text-primary">
                {t('vacancies.requirements.title')}
              </h2>
            </div>
            <ul className="list-disc space-y-2 pl-14">
              {requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-bg-softBlue text-brand-primary">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="font-bold text-brand-text-primary">{t('vacancies.interview.title')}</h3>
              <p>{t('vacancies.interview.address')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-bg-softBlue text-brand-primary">
              <Clock size={20} />
            </div>
            <div>
              <p>{t('vacancies.schedule.weekdays')}</p>
              <p>{t('vacancies.schedule.weekend')}</p>
            </div>
          </div>
        </div>

        <a
          href={VACANCIES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-[#A91F21] focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
        >
          {t('vacancies.cta')}
          <ExternalLink size={18} />
        </a>
      </div>
    </motion.div>
  );
};

export default Vacancies;
