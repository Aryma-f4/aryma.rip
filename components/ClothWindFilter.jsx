// A neutral displacement map keeps the face still; noise fades into the cloak.
const cloakMask = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="cloth" x1="0" y1="0" x2="0" y2="1"><stop offset="35%" stop-color="white" stop-opacity="0"/><stop offset="62%" stop-color="white" stop-opacity="1"/></linearGradient></defs><rect width="100" height="100" fill="url(#cloth)"/></svg>');
export default function ClothWindFilter() {
  return <svg className="filters" aria-hidden="true"><defs>
    <filter id="cloth-wind" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.009 0.012" numOctaves="1" seed="5" result="wind-noise">
        <animate attributeName="baseFrequency" dur="9s" values="0.009 0.012;0.012 0.008;0.009 0.012" repeatCount="indefinite" />
      </feTurbulence>
      <feImage href={cloakMask} x="0%" y="0%" width="100%" height="100%" preserveAspectRatio="none" result="cloth-mask" />
      <feComposite in="wind-noise" in2="cloth-mask" operator="in" result="cloth-noise" />
      <feFlood floodColor="#808080" result="neutral" />
      <feComposite in="neutral" in2="cloth-mask" operator="out" result="still-map" />
      <feComposite in="cloth-noise" in2="still-map" operator="arithmetic" k2="1" k3="1" result="wind-map" />
      <feDisplacementMap in="SourceGraphic" in2="wind-map" scale="3" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs></svg>;
}
