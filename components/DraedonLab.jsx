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
      <div className="lab-live-monitor">
        <span>EXO / ASSEMBLY SEQUENCE</span>
        <div className="lab-exo-display">
          <img src="/assets/trace-exo.png" alt="" width="1536" height="1024" />
          <i className="lab-scan" />
          <i className="lab-crosshair" />
        </div>
        <div className="lab-build-status">
          <span>FRAME ALIGNMENT</span>
          <i />
          <span>SYNC</span>
        </div>
      </div>
      <div className="lab-status">
        <i /> REACTOR ONLINE <span>OBSERVATION NEVER ENDS.</span>
      </div>
    </div>
  );
}
