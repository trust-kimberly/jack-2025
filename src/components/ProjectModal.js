import React from 'react';
import { X } from 'lucide-react';

const ProjectModal = ({
  project,
  dominantColor,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft' && hasPrevious) {
      onPrevious();
    } else if (e.key === 'ArrowRight' && hasNext) {
      onNext();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, hasPrevious, hasNext]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-25 flex items-center justify-center md:p-4 transition-colors duration-800 ease-in-out backdrop-blur-md"
      style={{
        backgroundColor: dominantColor
          ? dominantColor.replace('rgb(', 'rgba(').replace(')', ', 0.8)') // Convert rgb to rgba with 0.9 opacity
          : 'rgba(0, 0, 0, 0.9)', // Fallback to black with transparency
      }}
    >
      <div className="bg-white w-full md:max-w-6xl h-full md:h-fit md:max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Side - Image */}
          <div className="relative">
            <img
              src={project.url}
              alt={project.album}
              className="w-full aspect-square object-cover mt-16 md:mt-0"
            />
          </div>

          {/* Right Side - Details */}
          <div className="p-4 md:p-8 lg:p-12 flex flex-col justify-between relative">
            <div>
              {/* Close button - positioned in upper right corner of left column */}
              <button
                onClick={onClose}
                className="hidden md:block absolute top-4 right-4 bg-gray-400 bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all z-10"
              >
                <X size={20} />
              </button>
              {/* Project Title */}
              <h1 className="text-xl font-semibold">
                <em>{project.album}</em>
                <br />
                {project.artist}
              </h1>
              <span className="text-lg font-medium">{project.year}</span>

              {/* Project Details */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-xs font-medium mt-8 mb-2">Credits</h2>
                  <p className="text-md font-medium text-gray-700">{project.role}</p>
                </div>

                {project.tracks && project.tracks.length > 0 && (
                  <div>
                    <h2 className="text-xs font-medium mb-2">Tracks</h2>
                    <div className="flex flex-wrap gap-1">
                      {project.tracks.map((track, index) => (
                        <span key={index} className="text-md bg-gray-100 px-2 py-1 rounded">
                          {track}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.description && (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">About</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-10 pt-4 pb-16 md:pb-0 border-t border-gray-200 md:bottom-0">
              <div className="flex justify-between items-center">
                <button onClick={onClose} className="text-sm hover-glow">
                  ← Back to Discography
                </button>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={onPrevious}
                    disabled={!hasPrevious}
                    className={`text-sm hover-glow ${
                      !hasPrevious && 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    prev
                  </button>
                  <span className="text-sm text-gray-400">/</span>
                  <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className={`text-sm hover-glow ${
                      !hasNext && 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
