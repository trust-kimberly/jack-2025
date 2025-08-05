import React, { useState, useEffect } from 'react';
import ColorThief from 'colorthief';
import ProjectModal from './ProjectModal';

const ImageGallery = () => {
  const [dominantColors, setDominantColors] = useState({});
  const [textColors, setTextColors] = useState({});
  const [loadedImages, setLoadedImages] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  const images = [
    {
      url: `${process.env.PUBLIC_URL}/maggie.jpg`,
      album: 'WITHERED',
      artist: 'd4vd',
      year: '2025',
      role: 'Producer, Songwriter, Engineer',
      tracks: [
        'Atomic Land',
        'Sky',
        'Say it Back',
        'Friend Again',
        'Somewhere in the Middle',
        'Invisible String Theory',
        'Ghost',
        'Afterlife',
      ],
    },
    {
      url: `${process.env.PUBLIC_URL}/dgtym.jpeg`,
      album: 'i quit',
      artist: 'HAIM',
      year: '2025',
      role: 'Songwriter, Additional Production',
      tracks: ['Million Years'],
    },
    {
      url: `${process.env.PUBLIC_URL}/tired.jpeg`,
      album: 'Heard it in a Past Life',
      artist: 'Maggie Rogers',
      year: '2019',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['Say It'],
    },
    {
      url: `${process.env.PUBLIC_URL}/girlpool.jpg`,
      album: "Don't Go Tellin' Your Momma",
      artist: 'Topaz Jones',
      year: '2021',
      role: 'Producer, Songwriter, Engineer',
      tracks: [
        'Mirror',
        'Herringbone',
        'Black Tame',
        'Baba 70s',
        'Sourbelts',
        'Gold',
        'Rich',
        'Buggin',
      ],
    },
    {
      url: `${process.env.PUBLIC_URL}/fubt.jpg`,
      album: 'Arcane League of Legends: Season 2',
      artist: 'Various Artists',
      year: '2024',
      role: 'Producer, Songwriter',
      tracks: [],
      description: 'Remember Me by d4vd',
    },
    {
      url: `${process.env.PUBLIC_URL}/fun.jpg`,
      album: 'Disintegration',
      artist: 'Daniel Noah Miller',
      year: '2024',
      role: 'Producer, Songwriter, Engineer',
      tracks: [],
      description: 'Entire LP',
    },
    {
      url: `${process.env.PUBLIC_URL}/kate.jpg`,
      album: 'Shelter Island Heights',
      artist: 'Scott James',
      year: '2017',
      role: 'Producer, Songwriter, Engineer, Mixer',
      tracks: ['Belvedere', 'Park Music'],
    },
    {
      url: `${process.env.PUBLIC_URL}/un.jpg`,
      album: 'LOVER TOFU FRUIT',
      artist: 'Tiffany Day',
      year: '2024',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['FAR AWAY', 'KANSAS', 'LOVER TOFU FRUIT'],
    },
    {
      url: `${process.env.PUBLIC_URL}/nectar.jpg`,
      album: 'Withering',
      artist: 'd4vd',
      year: '2024',
      role: 'Producer, Songwriter, Engineer',
      tracks: [],
      description: 'Entire EP',
    },
    {
      url: `${process.env.PUBLIC_URL}/zoom.jpg`,
      album: 'DEPRESSED BUT MAKE IT COOL',
      artist: 'Rahul',
      year: '2022',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['ANECDOTE', 'LONDON FOG', 'DIRTY CHAI'],
    },
    {
      url: `${process.env.PUBLIC_URL}/rogers.jpg`,
      album: 'playpen',
      artist: 'Juliet Ivy',
      year: '2023',
      role: 'Producer, Songwriter, Engineer, Mixer',
      tracks: ['wet nose'],
    },
    {
      url: `${process.env.PUBLIC_URL}/shelter.jpg`,
      album: 'My House is not a Home',
      artist: 'd4vd',
      year: '2024',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['My House is not a Home'],
    },
    {
      url: `${process.env.PUBLIC_URL}/one.jpg`,
      album: 'Women in Music Pt. III',
      artist: 'HAIM',
      year: '2021',
      role: 'Synthesizer',
      tracks: [],
      description: 'FUBT',
    },
    {
      url: `${process.env.PUBLIC_URL}/voice.jpg`,
      album: 'Fun',
      artist: 'Scott James',
      year: '2020',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['Bridge Vision', 'Staring Contest'],
    },
    {
      url: `${process.env.PUBLIC_URL}/maggie.jpg`,
      album: 'tiny but scary',
      artist: 'Juliet Ivy',
      year: '2024',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['kid'],
    },
    {
      url: `${process.env.PUBLIC_URL}/dgtym.jpeg`,
      album: 'Now that the Light is Fading',
      artist: 'Maggie Rogers',
      year: '2017',
      role: 'Engineer',
      tracks: ['Color Song'],
    },
    {
      url: `${process.env.PUBLIC_URL}/tired.jpeg`,
      album: 'Un',
      artist: 'Scott James',
      year: '2019',
      role: 'Producer, Songwriter, Engineer, Mixer',
      tracks: ['Ballet', 'W'],
    },
    {
      url: `${process.env.PUBLIC_URL}/girlpool.jpg`,
      album: 'Spirituals',
      artist: 'Santigold',
      year: '2022',
      role: 'Producer, Songwriter',
      tracks: ['Ushers of the New World'],
    },
    {
      url: `${process.env.PUBLIC_URL}/fubt.jpg`,
      album: 'Barbie The Album',
      artist: 'Various Artists',
      year: '2023',
      role: 'Synthesizer',
      tracks: [],
      description: 'Home by HAIM',
    },
    {
      url: `${process.env.PUBLIC_URL}/fun.jpg`,
      album: 'Changephobia',
      artist: 'Rostam',
      year: '2021',
      role: 'Synthesizer, Engineer',
      tracks: ['These Kids We Knew'],
    },
  ];

  // Calculate contrasting text color
  const getContrastColor = (r, g, b) => {
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const colorThief = new ColorThief();

    images.forEach((image, index) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = image.url;

      img.onload = () => {
        const color = colorThief.getColor(img);
        const [r, g, b] = color;
        const rgbColor = `rgb(${color.join(',')})`;
        console.log(`Image ${index} dominant color:`, rgbColor);
        setDominantColors((prev) => ({
          ...prev,
          [index]: rgbColor,
        }));
        setTextColors((prev) => ({
          ...prev,
          [index]: getContrastColor(r, g, b),
        }));
        setLoadedImages((prev) => prev + 1);
      };
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (!isMobile) {
      document.body.style.backgroundColor = dominantColors[index] || 'white';
      document.body.style.transition = 'background-color 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      document.body.style.backgroundColor = 'white';
      setHoveredIndex(null);
    }
  };

  const handleClick = (index) => {
    setSelectedProjectIndex(index);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProjectIndex(null);
  };

  // Register the close function globally so Header can access it
  React.useEffect(() => {
    // @ts-ignore
    window.closeModalFunction = handleModalClose;
    return () => {
      // @ts-ignore
      window.closeModalFunction = null;
    };
  }, []);

  const handlePrevious = () => {
    if (selectedProjectIndex > 0) {
      setSelectedProjectIndex(selectedProjectIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedProjectIndex < images.length - 1) {
      setSelectedProjectIndex(selectedProjectIndex + 1);
    }
  };

  const isTextVisible = (index) => {
    if (isMobile) {
      return clickedIndex === index;
    } else {
      return hoveredIndex === index;
    }
  };

  const isImageDimmed = (index) => {
    if (isMobile) {
      return clickedIndex !== null && clickedIndex !== index;
    } else {
      return hoveredIndex !== null && hoveredIndex !== index;
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 p-2 md:p-5 max-w-7xl mx-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="text-left cursor-pointer flex flex-col"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          >
            <div
              className={`hover-glow inline-block w-full transition-opacity duration-400 ease-in-out relative
              ${isImageDimmed(index) ? 'opacity-20' : 'opacity-100'}`}
            >
              <img
                src={image.url}
                alt={image.album}
                className="w-full aspect-square object-cover shadow-md"
              />
              {isTextVisible(index) && (
                <div
                  className="absolute inset-0 flex flex-col justify-end p-3 bg-black bg-opacity-40 transition-all duration-400 ease-in-out"
                  style={{ color: 'white' }}
                >
                  <p className="text-xs md:text-sm lg:text-base font-bold">{image.role}</p>
                  <p className="text-xs md:text-sm lg:text-base font-semibold">
                    {image.artist}, <em>{image.album}</em>, {image.year}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        project={selectedProjectIndex !== null ? images[selectedProjectIndex] : null}
        dominantColor={selectedProjectIndex !== null ? dominantColors[selectedProjectIndex] : null}
        isOpen={modalOpen}
        onClose={handleModalClose}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={selectedProjectIndex > 0}
        hasNext={selectedProjectIndex < images.length - 1}
      />
      {/* Debug: log the selected project and its dominant color */}
      {selectedProjectIndex !== null && (
        <div style={{ display: 'none' }}>
          Debug: Project {selectedProjectIndex}, Color: {dominantColors[selectedProjectIndex]}
        </div>
      )}
    </>
  );
};

export default ImageGallery;
