// frontend/components/GalleryWrapper.js
import { useEffect, useRef } from 'react';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lg-thumbnail';
import lgZoom from 'lg-zoom';

// This component wraps our grid and initializes lightGallery.
export default function GalleryWrapper({ children }) {
  const galleryRef = useRef(null);

  useEffect(() => {
    if (galleryRef.current) {
      // Initialize lightGallery
      const gallery = lightGallery(galleryRef.current, {
        plugins: [lgThumbnail, lgZoom],
        speed: 500,
        download: false, // Optional: disable the download button
      });

      // Cleanup function to destroy the gallery on component unmount
      return () => {
        if (gallery) {
          gallery.destroy();
        }
      };
    }
  }, []); // The empty dependency array ensures this runs only once on mount.

  return <div ref={galleryRef}>{children}</div>;
}