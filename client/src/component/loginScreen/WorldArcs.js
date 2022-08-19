import { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

function WorldArcs() {
  const globeEl = useRef();
  const N = 30;
  const arcsData = [...Array(N).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [['red', 'yellow', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'yellow', 'blue', 'green'][Math.round(Math.random() * 3)]]
  }));

  useEffect(() => {
    // Auto-rotate
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 2;

    globeEl.current.pointOfView({ altitude: 2 }, 2000);
  }, []);

  return (  
    <div className='fixed -z-10'>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        arcsData={arcsData}
        arcColor={'color'}
        arcDashLength={() => Math.random()}
        arcDashGap={() => Math.random()}
        arcDashAnimateTime={() => Math.random() * 4000 + 500}
      />
    </div>
  );
}

export default WorldArcs;