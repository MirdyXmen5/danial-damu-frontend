import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-brand-darkBlue text-gray-300 py-8 border-t-4 border-brand-accent-orange">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex-shrink-0 flex items-center bg-white/10 p-2 rounded-lg">
            <img src="/logo.png" alt="DANIYAL DAMU" className="h-10 md:h-12 w-auto object-contain" />
          </Link>
          
          <p className="text-sm text-center md:text-right">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
