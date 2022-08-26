import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

function World({country, setCountry, city, setCity}) {
  const globeEl = useRef();
  const [rotate, setRotate] = useState(true)
  const [countries, setCountries] = useState({ features: []});
  const [countryList, setCountryList] = useState({})
  const [altitude, setAltitude] = useState(0.02);
  const [color, setColor] = useState(() => feat => 'rgba(88, 88, 192, 0.6)')
  const [transitionDuration, setTransitionDuration] = useState(1000);
  const [place, setPlace] = useState([{name: null, lat: 0, lng: 0, alt: 0, size: 0, radius: 0}]);

  // const countryList = countries.features.map(feat => feat.properties.ADMIN)
  // console.log(countryList.slice(99))
  // console.log(countries)
  console.log(place)

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
    if (!city) {
      setPlace([{name: null, lat: 0, lng: 0, alt: 0, size: 0, radius: 0}])
    }

    if (country !== city && city) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${country.split(" ").join("+")}+${city.split(" ").join("+")}&key=${process.env. REACT_APP_GOOGLE_MAP_API_KEY}`)
        .then(res => res.json())
        .then(data => {
          console.log(data.results[0].geometry.location)
          setPlace([{
            name: city,
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
            alt: 0.1,
            size: 1.2,
            radius: 0.5
          }])
          const coo = globeEl.current.getCoords(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng, 0.8)
          globeEl.current.controls().position0 = {x: coo.x, y: coo.y, z: coo.z}
          globeEl.current.controls().reset()
        })
    }
  }, [city])

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
      setAltitude(() => feat => country === feat.properties.ADMIN ? 0.1 : 0.02)
      setColor(() => feat => country === feat.properties.ADMIN ? 'rgba(5, 152, 5, 0.8)' :'rgba(88, 88, 192, 0.6)')
      const coo = globeEl.current.getCoords(countryList[country][1], countryList[country][0], 0.8)
      globeEl.current.controls().position0 = {x: coo.x, y: coo.y, z: coo.z}
      globeEl.current.controls().reset()
      
      // console.log(globeEl.current.controls())
      // console.log(globeEl.current.controls().position0)
      // console.log(coo)
      // console.log(countryList[country])
      
      //try to pause animation for improve preformance
        // const intervalIds = []
        // intervalIds.push(setTimeout(() => {
        //   globeEl.current.pauseAnimation()
        // }, 1000))
        // intervalIds.push(setTimeout(() => {
        //   globeEl.current.resumeAnimation()
        // }, 3000))
      // return (() => intervalIds.forEach(id => clearInterval(id)))

    }
  }, [country]);

  return <Globe
    ref={globeEl}
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"

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
          return 'rgba(199, 35, 62, 0.8)'
        } else {
          return e.properties.ADMIN === feat.properties.ADMIN ? 'rgba(5, 152, 5, 0.8)' :'rgba(88, 88, 192, 0.6)'
        }
      })
    }}

    // city label
    labelsData={place}
    labelLat={d => d.lat}
    labelLng={d => d.lng}
    labelAltitude={d => d.alt}
    labelText={d => d.name}
    labelSize={d => d.size}
    labelDotRadius={d => d.radius}
    labelColor={() => 'rgba(255, 165, 0, 0.75)'}
    labelResolution={2}
  />;
}

export default World;