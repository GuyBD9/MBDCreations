// components/Badge.js
export default function Badge({ children, tone = "default" }) {
    const tones = {
      default: "bg-gray-900 text-white",
      warning: "bg-yellow-500 text-black",
      danger: "bg-red-600 text-white",
      success: "bg-green-600 text-white"
    };
    return (
      <span className={`inline-block text-xs px-2 py-1 rounded ${tones[tone] || tones.default}`}>
        {children}
      </span>
    );
  }