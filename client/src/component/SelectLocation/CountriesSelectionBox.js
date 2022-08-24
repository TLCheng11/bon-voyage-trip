import { useEffect, useState } from "react";

function CountriesSelectionBox({country, setCountry, city, setCity}) {
  const [cityList, setCityList] = useState([])
  const [cityOptions, setCityOptions] = useState([])

  const countryList = ['Afghanistan', 'Albania', 'Algeria', 'Angola', 'Antarctica', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Fiji', 'Finland', 'France', 'French Southern and Antarctic Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Greenland', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Mali', 'Mauritania', 'Mexico', 'Moldova', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Northern Cyprus', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Republic of Serbia', 'Republic of the Congo', 'Romania', 'Russia', 'Rwanda', 'Saudi Arabia', 'Senegal', 'Sierra Leone', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'Somaliland', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 'The Bahamas', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United Republic of Tanzania', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe']

  const countryOptions = countryList.map(country => <option key={country} value={country}>{country}</option>)

  useEffect(() => {
    const options = cityList.sort().map(city => <option key={city} value={city}>{city}</option>)
    setCityOptions(options)
    setCity("")
  }, [cityList]);

  useEffect(() => {
    const id = setTimeout(() => {
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
    }, 100)

    return (() => clearInterval(id))
  }, [country]);

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
          value={country} onChange={e => {
            setCountry(e.target.value)
          }}
          required
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
          required
        >
          <option value="">Select a city</option>
          {cityOptions}
        </select>
      </div>
    </div>
  );
}

export default CountriesSelectionBox;