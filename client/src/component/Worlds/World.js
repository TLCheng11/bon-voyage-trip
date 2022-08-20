import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

function World({selectLocationProps, country, setCountry}) {
  const globeEl = useRef();
  const {setCountryName} = selectLocationProps
  const [rotate, setRotate] = useState(true)
  const [countries, setCountries] = useState({ features: []});
  const [countryList, setCountryList] = useState({})
  const [altitude, setAltitude] = useState(0.02);
  const [color, setColor] = useState(() => feat => 'rgba(88, 88, 192, 0.6)')
  const [transitionDuration, setTransitionDuration] = useState(1000);

  // const countryList = countries.features.map(feat => feat.properties.ADMIN)
  // console.log(countryList.slice(99))

  // console.log(countries)

  useEffect(() => {
    const newList = {}
    countries.features.forEach(feat => {
      const country = feat.properties.ADMIN
      const longitude = (feat.bbox[0] + feat.bbox[2]) / 2
      const latitude = (feat.bbox[1] + feat.bbox[3]) / 2
      const coordinates = [longitude, latitude]
      newList[country] = coordinates
    })
    setCountryList(newList)
  }, [countries]);

  useEffect(() => {
    // load data
    fetch('./datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(countries=> {
        setCountries(countries);

        setTimeout(() => {
          setTransitionDuration(1000);
          setAltitude(0.02);
        }, 1000);
      });
  }, []);

  useEffect(() => {
    // Auto-rotate
    globeEl.current.controls().autoRotate = rotate;
    globeEl.current.controls().autoRotateSpeed = 0.5;

    globeEl.current.pointOfView({ altitude: 3 }, 2000);
  }, []);

  useEffect(() => {
    globeEl.current.controls().autoRotate = rotate;
  }, [rotate])

  useEffect(() => {
    if(countryList[country]) {
      setRotate(false)
      setCountryName(country)
      setAltitude(() => feat => country === feat.properties.ADMIN ? 0.1 : 0.02)
      setColor(() => feat => country === feat.properties.ADMIN ? 'rgba(5, 152, 5, 0.8)' :'rgba(88, 88, 192, 0.6)')
      const coo = globeEl.current.getCoords(countryList[country][1], countryList[country][0], 1)
      globeEl.current.controls().position0 = {x: coo.x, y: coo.y, z: coo.z}
      globeEl.current.controls().reset()
      // console.log(globeEl.current.controls())
      // console.log(globeEl.current.controls().position0)
      // console.log(coo)
      // console.log(countryList[country])
    }
  }, [country]);

  // const [places, setPlaces] = useState([]);

  // useEffect(() => {
  //   // load data
  //   fetch('./datasets/ne_110m_populated_places_simple.geojson')
  //     .then(res => res.json())
  //     .then(({ features }) => setPlaces(features));
  // }, []);

  // console.log(places)

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
    onPolygonClick={({ properties: d }) => {
      setCountry(d.ADMIN)
    }}
    onPolygonHover={(e) => {
      setColor(() => feat => {
        if (country === feat.properties.ADMIN) {
          return 'rgba(5, 152, 5, 0.8)'
        } else {
          return e.properties.ADMIN === feat.properties.ADMIN ? 'rgba(5, 152, 5, 0.8)' :'rgba(88, 88, 192, 0.6)'
        }
      })
    }}
    // labelsData={places}
    // labelLat={d => d.properties.latitude}
    // labelLng={d => d.properties.longitude}
    // labelText={d => d.properties.name}
    // labelSize={d => Math.sqrt(d.properties.pop_max) * 4e-4}
    // labelDotRadius={d => Math.sqrt(d.properties.pop_max) * 4e-4}
    // labelColor={() => 'rgba(255, 165, 0, 0.75)'}
    // labelResolution={2}
  />;
}

export default World;