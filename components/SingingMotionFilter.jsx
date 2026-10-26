// Displace only the raised arm and the outer cloak. One continuous drawing is
// sampled, so moving a wrist cannot expose a second arm or a duplicate silhouette.
function map(axis,region) {
  const color=axis==='x'?'rgb(100%,50%,0%)':'rgb(50%,100%,0%)';
  const ellipse=region==='arm'?'cx="90" cy="18" rx="28" ry="35"':'cx="87" cy="71" rx="25" ry="26"';
  return 'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><radialGradient id="field"><stop offset="0" stop-color="${color}"/><stop offset=".28" stop-color="${color}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs><rect width="100" height="100" fill="rgb(50%,50%,0%)"/><ellipse ${ellipse} fill="url(#field)"/></svg>`);
}
export default function SingingMotionFilter() {
  return <svg className="filters" aria-hidden="true"><defs>
    <filter id="singing-motion" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB" primitiveUnits="objectBoundingBox">
      <feImage href={map('x','arm')} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="arm-x-map" />
      <feDisplacementMap data-motion-arm-x in="SourceGraphic" in2="arm-x-map" scale="0" xChannelSelector="R" yChannelSelector="G" result="arm-x" />
      <feImage href={map('y','arm')} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="arm-y-map" />
      <feDisplacementMap data-motion-arm-y in="arm-x" in2="arm-y-map" scale="0" xChannelSelector="R" yChannelSelector="G" result="arm-xy" />
      <feImage href={map('x','cloth')} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="cloak-map" />
      <feDisplacementMap data-motion-cloth in="arm-xy" in2="cloak-map" scale="0" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs></svg>;
}
