import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';

const Info = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 gap-8 md:gap-12 items-start">
        {/* Image Section */}
        <div className="">
          <img
            src={`${process.env.PUBLIC_URL}/jack-profile.jpg`}
            alt="Jack Hallenbeck"
            className="w-full shadow-lg"
            onError={(e) => {
              e.target.alt = 'Jack Hallenbeck';
            }}
          />
        </div>

        {/* Bio Section */}
        <div className="order-1 md:order-2">
          <div className="space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              Jack Hallenbeck is a producer, engineer and songwriter based in Los Angeles,
              California.
            </p>

            <p>
              He is signed to Mastor Projects, a joint-venture between Sony Music Publishing and
              Rostam Batmanglij.
            </p>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-md md:text-base mb-3">Contact</h2>
            <div className="space-y-2 text-sm md:text-base">
              <a
                href="mailto:jackhallenbeck@gmail.com"
                className="text-md hover-glow flex items-center gap-2 w-fit"
              >
                <Mail size={20} strokeWidth={1} />
                lilliana@foretellmgmt.xyz
              </a>
              <a
                href="https://www.instagram.com/jackhallenbeck"
                target="_blank"
                rel="noopener noreferrer"
                className="text-md hover-glow flex items-center gap-2 w-fit"
              >
                <Instagram size={20} strokeWidth={1} />
                @jackhallenbeck
              </a>
            </div>
          </div>

          {/* Back to Gallery */}
          <div className="mt-12 mb-6 flex justify-between">
            <Link to="/" className="inline-block text-sm hover-glow">
              ← Back to Selected Works
            </Link>
            <a
              href="https://open.spotify.com/playlist/1tmjGYDGkrL57Itgg8IBRI?si=d8613ce2c2c14918&nd=1&dlsi=7e83256f42e04118"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover-glow"
            >
              Listen to Selected Works →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
