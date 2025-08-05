import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import ImageGallery from './components/ImageGallery';
import Info from './components/Info';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNameClick = () => {
    // Close modal if it's open
    if (window.closeModalFunction) {
      window.closeModalFunction();
    }

    if (location.pathname !== '/') {
      navigate('/');
    } else {
      // Scroll to top if already on home page
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between px-2 sm:px-3 py-2 backdrop-blur-md bg-white bg-opacity-80 md:backdrop-blur-none md:bg-transparent z-50">
      <button
        onClick={handleNameClick}
        className="text-xl md:text-md font-medium cursor-pointer hover-glow text-left"
      >
        Jack Hallenbeck
      </button>
      <div className="mr-1 sm:mr-0 flex items-center space-x-3">
        <Link to="/info" className="text-sm hover-glow">
          Info
        </Link>
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        <Header />

        <main className="pt-16 pb-16 md:pt-20 md:pb-20">
          <Routes>
            <Route path="/" element={<ImageGallery />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 flex justify-between px-2 sm:px-3 py-2 backdrop-blur-md bg-white bg-opacity-80 md:backdrop-blur-none md:bg-transparent z-50">
          <div className="text-sm">Based in Los Angeles</div>
          <div className="mr-1 sm:mr-0">
            <a
              href="https://open.spotify.com/playlist/1tmjGYDGkrL57Itgg8IBRI?si=d8613ce2c2c14918&nd=1&dlsi=7e83256f42e04118"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover-glow"
            >
              Listen
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
