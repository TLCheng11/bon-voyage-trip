import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

function World({setCountryName}) {
  const globeEl = useRef();
  const [rotate, setRotate] = useState(true)
  const [countries, setCountries] = useState({ features: []});
  const [altitude, setAltitude] = useState(0.1);
  const [color, setColor] = useState(() => feat => 'rgba(88, 88, 192, 0.6)')
  const [transitionDuration, setTransitionDuration] = useState(1000);

  const countryList = countries.features.map(feat => feat.properties.ADMIN)
  console.log(countryList)

  useEffect(() => {
    // load data
    fetch('./datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(countries=> {
        console.log(countries)
        setCountries(countries);

        setTimeout(() => {
          setTransitionDuration(3000);
          setAltitude(0.1);
        }, 2000);
      });
  }, []);

  useEffect(() => {
    // Auto-rotate
    globeEl.current.controls().autoRotate = rotate;
    globeEl.current.controls().autoRotateSpeed = 0.3;

    globeEl.current.pointOfView({ altitude: 3 }, 5000);
  }, []);

  useEffect(() => {
    globeEl.current.controls().autoRotate = rotate;
    globeEl.current.controls().autoRotateSpeed = 0.3;
    if (!rotate) {
      const id = setTimeout(() => {
        setRotate(true)
      }, 5000)

      return (() => {
        clearInterval(id)
      })
    }
  }, [rotate])

  return <Globe
    ref={globeEl}
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"

    polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
    polygonAltitude={altitude}
    polygonCapColor={color}
    polygonSideColor={() => 'rgba(0, 100, 0, 0.35)'}
    polygonLabel={({ properties: d }) => `
      <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
    `}
    polygonsTransitionDuration={transitionDuration}
    onPolygonClick={({ __id: id, properties: d }) => {
      setCountryName(d.ADMIN)
      setAltitude(() => feat => id === feat.__id ? 0.3 : 0.1)
      setRotate(false)
    }}
    onPolygonHover={(e) => {
      setColor(() => feat => e.__id === feat.__id ? 'rgba(5, 152, 5, 0.8)' :'rgba(88, 88, 192, 0.6)')
    }}
  />;
}

export default World;