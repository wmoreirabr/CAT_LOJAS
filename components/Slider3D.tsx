
import React, { useState } from 'react';
import { SlideImage } from '../types';

interface Slider3DProps {
  images: SlideImage[];
}

/**
 * A 3D Slider component that displays images in a stacked carousel with depth and rotation.
 */
const Slider3D: React.FC<Slider3DProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-[500px] flex flex-col items-center justify-center">
      {/* Container with perspective for 3D effect */}
      <div 
        className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]" 
        style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
      >
        {images.map((img, idx) => {
          const offset = idx - activeIndex;
          const rotateY = offset * 35;
          const translateZ = Math.abs(offset) * -200;
          const translateX = offset * 80;
          const opacity = Math.abs(offset) > 3 ? 0 : 1 - Math.abs(offset) * 0.25;
          const zIndex = images.length - Math.abs(offset);
          const isCenter = idx === activeIndex;

          return (
            <div
              key={img.id}
              className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out border-4 ${
                isCenter ? 'border-blue-500/50 shadow-blue-500/20' : 'border-white/10'
              }`}
              style={{
                transform: `translateX(${translateX}px) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                opacity,
                zIndex,
                backgroundImage: `url(${img.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Overlay with title and description */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white truncate drop-shadow-lg">{img.title}</h3>
                <p className="text-sm text-slate-300 line-clamp-2 mt-1 drop-shadow-md">{img.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex gap-10 mt-16 z-10">
        <button
          onClick={prev}
          aria-label="Previous image"
          className="group bg-white/5 hover:bg-white/10 p-5 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg active:scale-95"
        >
          <svg className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="group bg-white/5 hover:bg-white/10 p-5 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg active:scale-95"
        >
          <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Visual Pagination Indicators */}
      <div className="mt-8 flex gap-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === activeIndex ? 'bg-blue-500 w-10' : 'bg-slate-700 w-3 hover:bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider3D;
