import { useEffect, useState } from "react";

function CountriesSelectionBox({selectLocationProps, country, setCountry}) {
  const {setNextCountry, setNextCity} = selectLocationProps
  const [city, setCity] = useState("")
  const [cityList, setCityList] = useState([])

  const countryList = ['Afghanistan', 'Angola', 'Albania', 'United Arab Emirates', 'Argentina', 'Armenia', 'Antarctica', 'French Southern and Antarctic Lands', 'Australia', 'Austria', 'Azerbaijan', 'Burundi', 'Belgium', 'Benin', 'Burkina Faso', 'Bangladesh', 'Bulgaria', 'The Bahamas', 'Bosnia and Herzegovina', 'Belarus', 'Belize', 'Bolivia', 'Brazil', 'Brunei', 'Bhutan', 'Botswana', 'Central African Republic', 'Canada', 'Switzerland', 'Chile', 'China', 'Ivory Coast', 'Cameroon', 'Democratic Republic of the Congo', 'Republic of the Congo', 'Colombia', 'Costa Rica', 'Cuba', 'Northern Cyprus', 'Cyprus', 'Czechia', 'Germany', 'Djibouti', 'Denmark', 'Dominican Republic', 'Algeria', 'Ecuador', 'Egypt', 'Eritrea', 'Spain', 'Estonia', 'Ethiopia', 'Finland', 'Fiji', 'Falkland Islands', 'France', 'Gabon', 'United Kingdom', 'Georgia', 'Ghana', 'Guinea', 'Gambia', 'Guinea-Bissau', 'Equatorial Guinea', 'Greece', 'Greenland', 'Guatemala', 'Guyana', 'Honduras', 'Croatia', 'Haiti', 'Hungary', 'Indonesia', 'India', 'Ireland', 'Iran', 'Iraq', 'Iceland', 'Israel', 'Italy', 'Jamaica', 'Jordan', 'Japan', 'Kazakhstan', 'Kenya', 'Kyrgyzstan', 'Cambodia', 'South Korea', 'Kosovo', 'Kuwait', 'Laos', 'Lebanon', 'Liberia', 'Libya', 'Sri Lanka', 'Lesotho', 'Lithuania', 'Luxembourg', 'Latvia', 'Morocco', 'Moldova', 'Madagascar', 'Mexico', 'Macedonia', 'Mali', 'Myanmar', 'Montenegro', 'Mongolia', 'Mozambique', 'Mauritania', 'Malawi', 'Malaysia', 'Namibia', 'New Caledonia', 'Niger', 'Nigeria', 'Nicaragua', 'Netherlands', 'Norway', 'Nepal', 'New Zealand', 'Oman', 'Pakistan', 'Panama', 'Peru', 'Philippines', 'Papua New Guinea', 'Poland', 'Puerto Rico', 'North Korea', 'Portugal', 'Paraguay', 'Palestine', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Western Sahara', 'Saudi Arabia', 'Sudan', 'South Sudan', 'Senegal', 'Solomon Islands', 'Sierra Leone', 'El Salvador', 'Somaliland', 'Somalia', 'Republic of Serbia', 'Suriname', 'Slovakia', 'Slovenia', 'Sweden', 'Swaziland', 'Syria', 'Chad', 'Togo', 'Thailand', 'Tajikistan', 'Turkmenistan', 'East Timor', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Taiwan', 'United Republic of Tanzania', 'Uganda', 'Ukraine', 'Uruguay', 'United States of America', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Vanuatu', 'Yemen', 'South Africa', 'Zambia', 'Zimbabwe']

  const countryOptions = countryList.map(country => <option key={country} value={country}>{country}</option>)
  const cityOptions = cityList.sort((a, b) => {
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    } else {
      return 0
    }
  }).map(city => <option key={city} value={city}>{city}</option>)

  useEffect(() => {
    if (country) {
      setNextCountry(country)
      const searchCountry = country === "United States of America" ? "United States" : country
      fetch("https://countriesnow.space/api/v0.1/countries/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "country": searchCountry
        })
      })
        .then(res => res.json())
        .then(data => {
          if(data.data) {
            setCityList(data.data)
          } else {
            setCityList([])
          }
        })
        .catch(console.error)
    } else {
      setCityList([])
    }
  }, [country]);

  useEffect(() => {
    setNextCity(city)
  }, [city]);

  return (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <select 
          className="form-select form-select-lg mb-3
            appearance-none
            block
            w-full
            px-4
            py-2
            text-xl
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-lg example"
          value={country} onChange={e => setCountry(e.target.value)}
        >
          <option value="">Select a destination country</option>
          {countryOptions}
        </select>

        <select 
          className="form-select form-select-sm
            appearance-none
            block
            w-full
            px-2
            py-1
            text-sm
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-sm example"
          value={city} onChange={e => setCity(e.target.value)}
        >
          <option value="">Select a destination city</option>
          {cityOptions}
        </select>
      </div>
    </div>
  );
}

export default CountriesSelectionBox;