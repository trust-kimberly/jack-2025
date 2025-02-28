import React, { useState, useEffect } from 'react';
import ColorThief from 'colorthief';

const ImageGallery = () => {
  const [dominantColors, setDominantColors] = useState({});
  const [textColors, setTextColors] = useState({});
  const [loadedImages, setLoadedImages] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const images = [
    {
      url: '/maggie.jpg',
      role: 'Producer, Songwriter, Engineer',
      album: 'Heard It In A Past Life',
      artist: 'Maggie Rogers',
      year: '2019',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
    {
      url: '/dgtym.jpeg',
      role: 'Producer, Songwriter, Engineer',
      album: 'DGTYM',
      artist: 'Topaz Jones',
      year: '2020',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
    {
      url: '/tired.jpeg',
      role: 'Producer, Songwriter, Engineer',
      album: 'Tired of Love',
      artist: 'Scott James',
      year: '2021',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
    {
      url: '/girlpool.jpg',
      role: 'Producer, Songwriter, Engineer',
      album: 'Girlpool',
      artist: 'Girlpool',
      year: '2022',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
    {
      url: '/fubt.jpg',
      role: 'Producer, Songwriter, Engineer',
      album: 'FUBT',
      artist: 'FUBT',
      year: '2023',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
    {
      url: '/fun.jpg',
      role: 'Producer, Songwriter, Engineer',
      album: 'Fun',
      artist: 'Fun',
      year: '2024',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
    {
      url: '/kate.jpg',
      role: 'Producer, Songwriter, Engineer',
      album: 'Kate',
      artist: 'Kate Bush',
      year: '2024',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
    {
      url: '/un.jpg',
      role: 'Producer, Songwriter, Engineer',
      album: 'Un',
      artist: 'Un',
      year: '2024',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
    {
      url: '/nectar.jpg',
      role: 'Producer, Songwriter, Engineer',
      album: 'Nectar',
      artist: 'Nectar',
      year: '2024',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
    {
      url: '/zoom.jpg',
      role: 'Producer, Songwriter, Engineer',
      album: 'Zoom',
      artist: 'Zoom',
      year: '2024',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
    {
      url: '/rogers.jpg',
      role: 'Producer, Songwriter, Engineer',
      album: 'Rogers',
      artist: 'Rogers',
      year: '2024',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
    {
      url: '/shelter.jpg',
      role: 'Producer, Songwriter, Engineer',
      album: 'Shelter',
      artist: 'Shelter',
      year: '2024',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
    {
      url: '/one.jpg',
      role: 'Producer, Songwriter, Engineer',
      album: 'One',
      artist: 'One',
      year: '2024',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
    {
      url: '/voice.jpg',
      role: 'Producer, Songwriter, Engineer',
      album: 'Voice',
      artist: 'Voice',
      year: '2024',
      link: 'https://open.spotify.com/album/5AHWNPo3gllDmixgAoFru4?si=RHouPPdURjuvJ_c3NO6VWQ',
    },
  ];

  // Calculate contrasting text color
  const getContrastColor = (r, g, b) => {
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  useEffect(() => {
    const colorThief = new ColorThief();

    images.forEach((image, index) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = image.url;

      img.onload = () => {
        const color = colorThief.getColor(img);
        const [r, g, b] = color;
        setDominantColors((prev) => ({
          ...prev,
          [index]: `rgb(${color.join(',')})`,
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
    document.body.style.backgroundColor = dominantColors[index] || 'white';
    document.body.style.transition = 'background-color 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    document.body.style.backgroundColor = 'white';
    setHoveredIndex(null);
  };

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-5 p-2 md:p-5 max-w-7xl mx-auto">
      {images.map((image, index) => (
        <div
          key={index}
          className="text-left cursor-pointer flex flex-col"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <a href={image.link} target="_blank" rel="noopener noreferrer" className="no-underline">
            <div
              className={`hover-glow inline-block w-full transition-opacity duration-400 ease-in-out
              ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : 'opacity-100'}`}
            >
              <img
                src={image.url}
                alt={image.album}
                className="w-full aspect-square object-cover shadow-md"
              />
            </div>
            <p
              className={`my-1.5 md:mt-2.5 text-xs md:text-sm lg:text-base transition-all duration-400 ease-in-out
              ${
                hoveredIndex !== null && hoveredIndex !== index
                  ? 'opacity-30 text-gray-800'
                  : 'opacity-100'
              }`}
              style={hoveredIndex === index ? { color: textColors[index] } : {}}
            >
              {image.role}
              <br />
              {image.artist}, <em>{image.album}</em>, {image.year}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
