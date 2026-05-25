import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'kk' ? 'ru' : 'kk';
    i18n.changeLanguage(newLang);
  };

  const menuItems = [
    { key: 'about', path: '/about' },
    { key: 'supermarkets', path: '/supermarkets' },
    { key: 'contacts', path: '/contacts' },
    { key: 'vacancies', path: '/vacancies' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img src="/logo.png" alt="DANIYAL DAMU" className="h-24 md:h-28 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className="text-brand-text-secondary hover:text-brand-primary font-medium transition-colors"
              >
                {t(`header.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Right Section (Lang + Mobil Menu Toggle) */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-brand-text-secondary hover:text-brand-primary transition-colors font-medium px-2 py-1 rounded-md"
            >
              <Globe size={20} />
              <span className="uppercase">{i18n.language}</span>
            </button>

            <button
              className="md:hidden text-brand-text-secondary p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 overflow-hidden bg-white"
          >
            <div className="px-4 pt-2 pb-4 space-y-1 shadow-inner">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="block px-3 py-3 rounded-md text-base font-medium text-brand-text-secondary hover:text-brand-primary hover:bg-brand-bg-softBlue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`header.${item.key}`)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
