const mechs = [
  {
    name: "Thanatos",
    id: "01",
    crop: "750 165 860 190",
    source: "/assets/draedon-lab-exo-monitors.png",
    wide: true,
  },
  {
    name: "Ares",
    id: "02",
    crop: "0 0 1536 1024",
    source: "/assets/trace-exo.png",
  },
  {
    name: "Artemis",
    id: "03",
    crop: "795 405 240 165",
    source: "/assets/draedon-lab-exo-monitors.png",
  },
  {
    name: "Apollo",
    id: "04",
    crop: "1220 405 250 170",
    source: "/assets/draedon-lab-exo-monitors.png",
  },
];
export default function DraedonLab() {
  return (
    <div className="draedon-lab" aria-hidden="true">
      <img
        className="lab-room"
        src="/assets/draedon-lab.png"
        alt=""
        width="1672"
        height="941"
        fetchPriority="high"
      />
      <div className="lab-monitor-bank">
        {mechs.map((mech) => (
          <div
            className={`mech-monitor ${mech.wide ? "mech-monitor-wide" : ""}`}
            key={mech.name}
          >
            <div className="mech-monitor-heading">
              <span>{mech.name.toUpperCase()}</span>
              <span>EXO / {mech.id}</span>
            </div>
            <div className="mech-viewport">
              <svg
                className="mech-drawing"
                viewBox={mech.crop}
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <image
                  href={mech.source}
                  width={mech.name === "Ares" ? 1536 : 1672}
                  height={mech.name === "Ares" ? 1024 : 941}
                />
              </svg>
              <i className="lab-scan" />
              <i className="lab-crosshair" />
              <i className="mech-reactor-pulse" />
            </div>
            <div className="lab-build-status">
              <span>FRAME SYNC</span>
              <i />
              <span>ONLINE</span>
            </div>
          </div>
        ))}
      </div>
      <div className="lab-status">
        <i /> REACTOR ONLINE <span>OBSERVATION NEVER ENDS.</span>
      </div>
    </div>
  );
}
