// components/Logo.js
export default function Logo({ className = '' }) {
    // Data URI של הלוגו (מוקטנת לרוחב 512 פיקסלים)
    const logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AADa1ElEQVR4nOzddZxdxdnA..." // העתק/הדבק מהקובץ logo_base64.txt
  
    return (
      <img src={logo} alt="MBD Creations logo" className={className} />
    );
  }