import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Supermarkets from './pages/Supermarkets';
import Contacts from './pages/Contacts';
import Partners from './pages/Partners';
import Vacancies from './pages/Vacancies';

function App() {
  return (
    <Router basename="/danial-damu-frontend/">
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/supermarkets" element={<Supermarkets />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/vacancies" element={<Vacancies />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
