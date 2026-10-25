// Each lid follows the eye contour of its original pose; no image is replaced.
const eyes = {
  resting: {
    box:'0 0 1050 1498', skin:'#eabdA8',
    shapes:[
      ['M330 304 Q352 290 379 300 L381 324 Q360 342 340 329 Z','M333 310 Q353 333 377 315'],
      ['M427 282 Q455 265 493 270 L490 299 Q462 319 435 306 Z','M432 290 Q462 310 490 284'],
    ],
  },
  singing: {
    box:'0 0 1050 1498', skin:'#edbda5',
    shapes:[
      ['M422 274 Q445 256 481 259 L488 282 Q463 304 435 294 Z','M427 279 Q454 300 483 274'],
      ['M532 243 Q550 228 577 235 L580 258 Q560 279 538 266 Z','M535 250 Q556 270 577 246'],
    ],
  },
  aftermath: {
    box:'0 0 1051 1497', skin:'#eec2b0',
    shapes:[
      ['M328 319 Q349 307 374 318 L375 337 Q353 346 337 334 Z','M332 323 Q352 340 372 326'],
      ['M416 299 Q444 281 474 287 L470 311 Q444 329 422 317 Z','M420 306 Q445 324 470 300'],
    ],
  },
  avatar: {
    box:'0 0 1312 1199', skin:'#e3c0af',
    shapes:[
      ['M448 412 Q498 395 554 405 L556 431 Q502 447 452 431 Z','M450 419 Q503 443 552 416'],
      ['M630 379 Q676 361 726 370 L728 396 Q680 418 632 401 Z','M632 387 Q680 410 724 382'],
    ],
  },
};
export default function BlinkEyes({ pose }) {
  const eye=eyes[pose];
  return <svg className={`blink-eyes blink-${pose}`} viewBox={eye.box} aria-hidden="true">
    {eye.shapes.map(([cover,lash],i)=><g className="blink-lid" key={i}><path d={cover} fill={eye.skin}/><path d={lash} className="closed-lash" /></g>)}
  </svg>;
}
