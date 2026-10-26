// Quiet, code-native marks echo the hero's moon, brimstone and rain.
export default function HomeOrnaments({ variant = 'letter' }) {
  return <div className={`home-ornaments ornaments-${variant}`} aria-hidden="true">
    <div className="ornament-haze" />
    <div className="ornament-dust">{Array.from({length:18},(_,i)=><i key={i} style={{'--seed':i}} />)}</div>
    {variant === 'letter' ? <>
      <svg className="brimstone-memory" viewBox="0 0 520 640" fill="none" focusable="false">
        <circle cx="260" cy="270" r="190" strokeDasharray="240 35 90 30 210 80" />
        <circle cx="260" cy="270" r="170" strokeDasharray="2 12" />
        <path d="M260 35v55m0 360v55M25 270h55m360 0h55M101 111l35 35m248 248 35 35M101 429l35-35m248-248 35-35" />
        <path d="m260 165 66 105-66 117-66-117 66-105Z" />
        <path d="M260 211c18 35 46 48 27 82 2-25-12-30-20-42 6 35-37 37-28 67-39-27-26-52-3-73-4 21 5 23 9 27 17-21 0-36 15-61Z" />
        <path d="m260 64-7 15 7 15 7-15-7-15Zm0 382-7 15 7 15 7-15-7-15Z" />
        <path d="M130 500c54 21 206 21 260 0m-240 22c72 14 148 14 220 0m-188 20c54 8 102 8 156 0" />
        <path d="m118 56-7 18m310 90-9 21m-49 356-8 20m-267-152-9 21" />
      </svg>
      <svg className="rain-margin" viewBox="0 0 160 600" fill="none" focusable="false">
        <path d="m94 15-9 48m45 29-13 72m-66-37-8 44m45 49-14 82m65-4-10 53m-71 10-12 72m47 48-9 48m-51-8-8 49" />
        <path d="m78 180 4 10-4 10-4-10 4-10Zm40 238 4 10-4 10-4-10 4-10Z" />
      </svg>
    </> : <>
      <svg className="quiet-orbit" viewBox="0 0 1000 650" fill="none" focusable="false">
        <path d="M126 438a390 390 0 0 1 748 0M166 438a350 350 0 0 1 668 0" />
        <path d="M139 385a385 385 0 0 1 722 0" strokeDasharray="1 15" />
        <path d="M500 10v42m-18-20h36M205 123l18 27m554 0 18-27" />
        <path d="m164 375 7 13-7 13-7-13 7-13Zm672 0 7 13-7 13-7-13 7-13Z" />
        <path d="M500 69c-24 15-13 56 15 55-36 20-66-23-40-51 6-6 15-8 25-4Z" />
        <path d="M85 504c150-24 258-5 415 0s265 23 415 0M130 523c124-18 220-1 370 0s246 16 370 0" />
      </svg>
      <svg className="quiet-horizon" viewBox="0 0 1400 200" preserveAspectRatio="none" focusable="false">
        <path d="M0 152 60 135 120 144 190 112 260 135 330 119 400 143 490 124 580 150 680 141 780 154 890 120 980 138 1060 110 1150 132 1240 105 1330 134 1400 120V200H0Z" />
        <path d="m65 147 26-43-12 3 18-32-9 2 12-24 12 24-9-2 18 32-12-3 26 43Zm1118-4 20-35-9 2 14-25-7 2 10-21 10 21-7-2 14 25-9-2 20 35Z" />
      </svg>
    </>}
  </div>;
}
