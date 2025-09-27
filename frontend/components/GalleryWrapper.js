// frontend/components/GalleryWrapper.js
import { useEffect, useRef, memo } from 'react';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lg-thumbnail';
import lgZoom from 'lg-zoom';

function GalleryWrapper({ children }) {
  const galleryRef = useRef(null);

  useEffect(() => {
    let gallery;
    if (galleryRef.current) {
      gallery = lightGallery(galleryRef.current, {
        plugins: [lgThumbnail, lgZoom],
        speed: 500,
        download: false,
        licenseKey: '0000-0000-000-0000', // Add a license key if you have one, otherwise it might show a popup.
      });
    }

    // Cleanup function to destroy the gallery instance when the component unmounts.
    return () => {
      if (gallery) {
        gallery.destroy();
      }
    };
  }, []); // Empty dependency array ensures this runs only once.

  return <div ref={galleryRef}>{children}</div>;
}

// Using memo to prevent re-renders, which can be useful with external libraries.
export default memo(GalleryWrapper);