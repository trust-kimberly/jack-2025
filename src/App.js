import React from 'react';
import ImageGallery from './components/ImageGallery';

function App() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen relative">
      <header className="fixed top-0 left-0 right-0 flex justify-between px-2 sm:px-3 py-2 bg-transparent z-50">
        <div className="text-xs md:text-sm cursor-pointer hover-glow" onClick={scrollToTop}>
          Jack Hallenbeck
        </div>
        <div className="mr-1 sm:mr-0">
          <a href="mailto:jackhallenbeck@gmail.com" className="text-xs md:text-sm hover-glow">
            Contact
          </a>
        </div>
      </header>

      <main className="pt-16 pb-16 md:pt-20 md:pb-20">
        <ImageGallery />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 flex justify-between px-2 sm:px-3 py-2 bg-transparent z-50">
        <div className="text-xs md:text-sm">Based in Los Angeles</div>
        <div className="mr-1 sm:mr-0">
          <a
            href="https://open.spotify.com/playlist/1tmjGYDGkrL57Itgg8IBRI?si=d8613ce2c2c14918&nd=1&dlsi=7e83256f42e04118"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm hover-glow"
          >
            Listen
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
