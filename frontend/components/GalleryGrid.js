// components/GalleryGrid.js
export default function GalleryGrid({ children }) {
    return (
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {children}
      </div>
    );
  }