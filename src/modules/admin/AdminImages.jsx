import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Trash2, LogOut, Upload, Image, Star } from 'lucide-react';

const CATEGORIES = [
  { value: 'hero', label: 'Главный баннер (Hero Slider)' },
  { value: 'promo', label: 'Акция (Promotions)' },
];

const AdminImages = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('promo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchImages = async () => {
    try {
      const response = await api.get('/images/');
      const data = Array.isArray(response.data) ? response.data : response.data.results || [];
      setImages(data);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Ошибка при получении списка изображений');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/panel/login');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Файл слишком большой. Выберите изображение размером до 5 МБ.');
      return;
    }

    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', category);

    try {
      await api.post('/images/', formData);
      setFile(null);
      setTitle('');
      setCategory('promo');
      fetchImages();
    } catch (err) {
      const status = err.response?.status;
      const msg =
        status === 413
          ? 'Сервер отклонил файл из-за размера запроса. Перезапустите контейнеры после обновления конфигурации и попробуйте снова.'
          : status === 401 || status === 403
            ? err.response?.data?.detail || 'Сессия авторизации недействительна. Войдите в админ-панель заново.'
            : err.response?.data?.image?.[0] || err.response?.data?.detail || 'Ошибка загрузки файла. Убедитесь, что размер менее 5 МБ и формат корректен.';
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы точно хотите удалить это изображение?')) return;
    try {
      await api.delete(`/images/${id}/`);
      fetchImages();
    } catch (err) {
      console.error('Error deleting image:', err);
      alert('Ошибка при удалении');
    }
  };

  const heroes = images.filter(img => img.category === 'hero');
  const promos = images.filter(img => img.category === 'promo');
  const other  = images.filter(img => img.category !== 'hero' && img.category !== 'promo');

  const ImageCard = ({ img }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
      <div className="h-48 w-full relative overflow-hidden bg-gray-100">
        <img
          src={img.image}
          alt={img.title || 'Изображение'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full ${img.category === 'hero' ? 'bg-[#FFC107] text-gray-900' : 'bg-red-600 text-white'}`}>
          {img.category === 'hero' ? 'Баннер' : 'Акция'}
        </span>
      </div>
      <div className="p-4 flex justify-between items-center bg-white">
        <div className="truncate pr-4 flex-1">
          <h3 className="font-medium text-brand-text-primary text-sm truncate">
            {img.title || 'Без названия'}
          </h3>
          <p className="text-xs text-brand-text-muted mt-1 truncate">ID: {img.id}</p>
        </div>
        <button
          onClick={() => handleDelete(img.id)}
          className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
          title="Удалить"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );

  const Section = ({ title: sectionTitle, icon: Icon, items, emptyText }) => (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={20} className="text-[#FFC107]" />
        <h2 className="text-lg font-semibold text-brand-text-primary">{sectionTitle}</h2>
        <span className="ml-1 text-sm text-brand-text-muted">({items.length})</span>
      </div>
      {items.length === 0 ? (
        <p className="text-brand-text-muted text-sm py-4 pl-1">{emptyText}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(img => <ImageCard key={img.id} img={img} />)}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-bg-light p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-[#FFC107] [-webkit-text-stroke:1px_#C2282A]">Управление Изображениями</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-brand-text-secondary hover:text-red-600 transition-colors"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Выйти</span>
          </button>
        </div>

        {/* Upload Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-brand-text-primary">Загрузить новое изображение</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-end flex-wrap">
            {/* Category Selector */}
            <div className="w-full md:w-64">
              <label className="block text-sm font-medium text-brand-text-secondary mb-2">Тип изображения</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none bg-white"
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="flex-1 min-w-[160px]">
              <label className="block text-sm font-medium text-brand-text-secondary mb-2">Название (опционально)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none"
                placeholder="Акция на выпечку"
              />
            </div>

            {/* File */}
            <div className="flex-1 min-w-[160px]">
              <label className="block text-sm font-medium text-brand-text-secondary mb-2">Файл изображения</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-4 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-primary hover:file:bg-blue-100 transition-all cursor-pointer"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !file}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primaryHover disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors h-[42px]"
            >
              <Upload size={18} />
              {loading ? 'Загрузка...' : 'Загрузить'}
            </button>
          </form>
        </div>

        {/* Images by category */}
        <Section
          title="Главные баннеры (Hero Slider)"
          icon={Star}
          items={heroes}
          emptyText="Баннеры ещё не загружены. Выберите тип «Главный баннер» при загрузке."
        />
        <Section
          title="Акции (Promotions)"
          icon={Image}
          items={promos}
          emptyText="Акции ещё не загружены. Выберите тип «Акция» при загрузке."
        />
        {other.length > 0 && (
          <Section
            title="Прочие"
            icon={Image}
            items={other}
            emptyText=""
          />
        )}
      </div>
    </div>
  );
};

export default AdminImages;
