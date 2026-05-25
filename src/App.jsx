import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './shared/layout/Header';
import Footer from './shared/layout/Footer';
import Home from './modules/home/Home';
import About from './modules/info/About';
import Supermarkets from './modules/info/Supermarkets';
import Contacts from './modules/info/Contacts';
import Vacancies from './modules/info/Vacancies';
import AdminLogin from './modules/admin/AdminLogin';
import AdminImages from './modules/admin/AdminImages';
import ProtectedRoute from './shared/layout/ProtectedRoute';
import AnimatedBackground from './shared/layout/AnimatedBackground';

function App() {
  return (
    <Router 
      basename={window.location.hostname.includes('github.io') ? '/danial-damu-frontend/' : '/'} 
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div className="flex flex-col min-h-screen relative">
        <AnimatedBackground />
        <Header />
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/supermarkets" element={<Supermarkets />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/vacancies" element={<Vacancies />} />
            
            {/* Admin Routes */}
            <Route path="/panel/login" element={<AdminLogin />} />
            <Route path="/panel/images" element={
              <ProtectedRoute>
                <AdminImages />
              </ProtectedRoute>
            } />
            <Route path="/panel/*" element={<Navigate to="/panel/login" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
