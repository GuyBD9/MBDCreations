// components/GalleryGrid.js
export default function GalleryGrid({children}) {
    return (
      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))',
        gap:'1rem'
      }}>
        {children}
      </div>
    );
  }