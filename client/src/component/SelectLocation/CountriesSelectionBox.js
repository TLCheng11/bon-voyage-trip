import { useEffect, useState } from "react";

function CountriesSelectionBox({selectLocationProps}) {
  const {nextCountry, setNextCountry, setNextCity} = selectLocationProps
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [cityList, setCityList] = useState([])
  const [cityOptions, setCityOptions] = useState([])

  // unsorted country list
  // const countryList = ['Afghanistan', 'Angola', 'Albania', 'United Arab Emirates', 'Argentina', 'Armenia', 'Antarctica', 'French Southern and Antarctic Lands', 'Australia', 'Austria', 'Azerbaijan', 'Burundi', 'Belgium', 'Benin', 'Burkina Faso', 'Bangladesh', 'Bulgaria', 'The Bahamas', 'Bosnia and Herzegovina', 'Belarus', 'Belize', 'Bolivia', 'Brazil', 'Brunei', 'Bhutan', 'Botswana', 'Central African Republic', 'Canada', 'Switzerland', 'Chile', 'China', 'Ivory Coast', 'Cameroon', 'Democratic Republic of the Congo', 'Republic of the Congo', 'Colombia', 'Costa Rica', 'Cuba', 'Northern Cyprus', 'Cyprus', 'Czechia', 'Germany', 'Djibouti', 'Denmark', 'Dominican Republic', 'Algeria', 'Ecuador', 'Egypt', 'Eritrea', 'Spain', 'Estonia', 'Ethiopia', 'Finland', 'Fiji', 'Falkland Islands', 'France', 'Gabon', 'United Kingdom', 'Georgia', 'Ghana', 'Guinea', 'Gambia', 'Guinea-Bissau', 'Equatorial Guinea', 'Greece', 'Greenland', 'Guatemala', 'Guyana', 'Honduras', 'Croatia', 'Haiti', 'Hungary', 'Indonesia', 'India', 'Ireland', 'Iran', 'Iraq', 'Iceland', 'Israel', 'Italy', 'Jamaica', 'Jordan', 'Japan', 'Kazakhstan', 'Kenya', 'Kyrgyzstan', 'Cambodia', 'South Korea', 'Kosovo', 'Kuwait', 'Laos', 'Lebanon', 'Liberia', 'Libya', 'Sri Lanka', 'Lesotho', 'Lithuania', 'Luxembourg', 'Latvia', 'Morocco', 'Moldova', 'Madagascar', 'Mexico', 'Macedonia', 'Mali', 'Myanmar', 'Montenegro', 'Mongolia', 'Mozambique', 'Mauritania', 'Malawi', 'Malaysia', 'Namibia', 'New Caledonia', 'Niger', 'Nigeria', 'Nicaragua', 'Netherlands', 'Norway', 'Nepal', 'New Zealand', 'Oman', 'Pakistan', 'Panama', 'Peru', 'Philippines', 'Papua New Guinea', 'Poland', 'Puerto Rico', 'North Korea', 'Portugal', 'Paraguay', 'Palestine', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Western Sahara', 'Saudi Arabia', 'Sudan', 'South Sudan', 'Senegal', 'Solomon Islands', 'Sierra Leone', 'El Salvador', 'Somaliland', 'Somalia', 'Republic of Serbia', 'Suriname', 'Slovakia', 'Slovenia', 'Sweden', 'Swaziland', 'Syria', 'Chad', 'Togo', 'Thailand', 'Tajikistan', 'Turkmenistan', 'East Timor', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Taiwan', 'United Republic of Tanzania', 'Uganda', 'Ukraine', 'Uruguay', 'United States of America', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Vanuatu', 'Yemen', 'South Africa', 'Zambia', 'Zimbabwe']

  const countryList = ['Afghanistan', 'Albania', 'Algeria', 'Angola', 'Antarctica', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Fiji', 'Finland', 'France', 'French Southern and Antarctic Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Greenland', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Mali', 'Mauritania', 'Mexico', 'Moldova', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Northern Cyprus', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Republic of Serbia', 'Republic of the Congo', 'Romania', 'Russia', 'Rwanda', 'Saudi Arabia', 'Senegal', 'Sierra Leone', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'Somaliland', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 'The Bahamas', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United Republic of Tanzania', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe']

  const countryOptions = countryList.map(country => <option key={country} value={country}>{country}</option>)

  useEffect(() => {
    const options = cityList.sort().map(city => <option key={city} value={city}>{city}</option>)
    setCityOptions(options)
  }, [cityList]);

  useEffect(() => {
    setNextCountry(country)
    if (country) {
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
            setCityList([country])
          }
        })
        .catch(error => {
          console.error(error)
          setCityList([country])
        })
    } else {
      setCityList([])
      setCity("")
    }
  }, [country]);

  useEffect(() => {
    setNextCity(city)
  }, [city]);

  useEffect(() => {
    setCountry(nextCountry)
    setCity("")
  }, [nextCountry]);

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
          <option value="">Select a country</option>
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
          <option value="">Select a city</option>
          {cityOptions}
        </select>
      </div>
    </div>
  );
}

export default CountriesSelectionBox;