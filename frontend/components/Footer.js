// components/Footer.js
export default function Footer() {
    return (
      <footer className="border-t bg-white">
        <div className="container py-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} MBDCreations
        </div>
      </footer>
    );
  }