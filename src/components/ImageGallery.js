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
      url: `${process.env.PUBLIC_URL}/D4VD_WITHERED.png`,
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
      url: `${process.env.PUBLIC_URL}/HAIM_IQUIT.png`,
      album: 'i quit',
      artist: 'HAIM',
      year: '2025',
      role: 'Songwriter, Additional Production',
      tracks: ['Million Years'],
    },
    {
      url: `${process.env.PUBLIC_URL}/MAGGIE_HIIAPL.png`,
      album: 'Heard it in a Past Life',
      artist: 'Maggie Rogers',
      year: '2019',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['Say It'],
    },
    {
      url: `${process.env.PUBLIC_URL}/TOPAZ_DGTYM.jpg`,
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
      url: `${process.env.PUBLIC_URL}/ARCANE.jpeg`,
      album: 'Arcane League of Legends: Season 2',
      artist: 'Various Artists',
      year: '2024',
      role: 'Producer, Songwriter',
      tracks: ['Remember Me by d4vd'],
    },
    {
      url: `${process.env.PUBLIC_URL}/DANNY_DISINTEGRATION.jpg`,
      album: 'Disintegration',
      artist: 'Daniel Noah Miller',
      year: '2024',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['Entire LP'],
    },
    {
      url: `${process.env.PUBLIC_URL}/SCOTT_SHELTERISLAND.jpg`,
      album: 'Shelter Island Heights',
      artist: 'Scott James',
      year: '2017',
      role: 'Producer, Songwriter, Engineer, Mixer',
      tracks: ['Belvedere', 'Park Music'],
    },
    {
      url: `${process.env.PUBLIC_URL}/TIFFANY_LTF.png`,
      album: 'LOVER TOFU FRUIT',
      artist: 'Tiffany Day',
      year: '2024',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['FAR AWAY', 'KANSAS', 'LOVER TOFU FRUIT'],
    },
    {
      url: `${process.env.PUBLIC_URL}/D4VD_WITHERING.png`,
      album: 'Withering',
      artist: 'd4vd',
      year: '2024',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['Entire EP'],
    },
    {
      url: `${process.env.PUBLIC_URL}/RAHUL_DBMIC.jpg`,
      album: 'DEPRESSED BUT MAKE IT COOL',
      artist: 'Rahul',
      year: '2022',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['ANECDOTE', 'LONDON FOG', 'DIRTY CHAI'],
    },
    {
      url: `${process.env.PUBLIC_URL}/JULIET_PLAYPEN.png`,
      album: 'playpen',
      artist: 'Juliet Ivy',
      year: '2023',
      role: 'Producer, Songwriter, Engineer, Mixer',
      tracks: ['wet nose'],
    },
    {
      url: `${process.env.PUBLIC_URL}/D4VD_HOUSE.png`,
      album: 'My House is not a Home',
      artist: 'd4vd',
      year: '2024',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['My House is not a Home'],
    },
    {
      url: `${process.env.PUBLIC_URL}/HAIM_WIMPIII.png`,
      album: 'Women in Music Pt. III',
      artist: 'HAIM',
      year: '2021',
      role: 'Synthesizer',
      tracks: ['FUBT'],
    },
    {
      url: `${process.env.PUBLIC_URL}/JULIET_TINYBUTSCARY.png`,
      album: 'tiny but scary',
      artist: 'Juliet Ivy',
      year: '2024',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['kid'],
    },
    {
      url: `${process.env.PUBLIC_URL}/BARBIE.jpg`,
      album: 'Barbie The Album',
      artist: 'Various Artists',
      year: '2023',
      role: 'Synthesizer',
      tracks: ['Home by HAIM'],
    },
    {
      url: `${process.env.PUBLIC_URL}/MAGGIE_NOWLIGHT.jpg`,
      album: 'Now that the Light is Fading',
      artist: 'Maggie Rogers',
      year: '2017',
      role: 'Engineer',
      tracks: ['Color Song'],
    },
    {
      url: `${process.env.PUBLIC_URL}/SCOTT_UN.jpg`,
      album: 'Un',
      artist: 'Scott James',
      year: '2019',
      role: 'Producer, Songwriter, Engineer, Mixer',
      tracks: ['Ballet', 'W'],
    },
    {
      url: `${process.env.PUBLIC_URL}/ROSTAM_CHANGEPHOBIA.jpg`,
      album: 'Changephobia',
      artist: 'Rostam',
      year: '2021',
      role: 'Synthesizer, Engineer',
      tracks: ['These Kids We Knew'],
    },
    {
      url: `${process.env.PUBLIC_URL}/SCOTT_FUN.jpg`,
      album: 'Fun',
      artist: 'Scott James',
      year: '2020',
      role: 'Producer, Songwriter, Engineer',
      tracks: ['Bridge Vision', 'Staring Contest'],
    },
    {
      url: `${process.env.PUBLIC_URL}/SANTIGOLD.jpg`,
      album: 'Spirituals',
      artist: 'Santigold',
      year: '2022',
      role: 'Producer, Songwriter',
      tracks: ['Ushers of the New World'],
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
        try {
          const color = colorThief.getColor(img);
          const [r, g, b] = color;
          const rgbColor = `rgb(${color.join(',')})`;
          setDominantColors((prev) => ({
            ...prev,
            [index]: rgbColor,
          }));
          setTextColors((prev) => ({
            ...prev,
            [index]: getContrastColor(r, g, b),
          }));
        } catch (error) {
          console.warn(`Failed to extract color for image ${index}:`, error);
          // Set a fallback color if color extraction fails
          setDominantColors((prev) => ({
            ...prev,
            [index]: 'rgb(128, 128, 128)',
          }));
          setTextColors((prev) => ({
            ...prev,
            [index]: '#ffffff',
          }));
        }
        setLoadedImages((prev) => prev + 1);
      };

      img.onerror = () => {
        console.error(`Failed to load image ${index}:`, image.url);
        setLoadedImages((prev) => prev + 1);
      };
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (!isMobile) {
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
            <div className={`hover-glow inline-block w-full duration-400 ease-in-out relative`}>
              <img
                src={image.url}
                alt={image.album}
                className="w-full aspect-square object-cover shadow-md"
                loading="lazy"
              />
              <div
                className={`absolute inset-0 flex flex-col justify-end p-3 bg-black bg-opacity-25 transition-all duration-600 ease-in-out ${
                  isTextVisible(index) ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ color: 'white' }}
              >
                <p className="text-md font-semibold">
                  <em>{image.album}</em>
                </p>
                <p className="text-sm font-semibold">{image.artist}</p>
                <p className="text-sm font-medium">{image.year}</p>
              </div>
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
    </>
  );
};

export default ImageGallery;
