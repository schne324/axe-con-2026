export default function HeroBanner() {
  // Use Vite's base URL so asset paths work on GitHub Pages subpaths
  const src = `${import.meta.env.BASE_URL}hero-banner.svg`;
  return <img src={src} className="w-full" alt="Book Your Journey" />;
}
