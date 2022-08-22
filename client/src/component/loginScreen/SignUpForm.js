import { useEffect, useState } from "react";
import CountriesSelectionBox from "../SelectLocation/CountriesSelectionBox";

function SignUpForm({loginScreenProps, setSignUp}) {
  const {setCurrentUser, selectLocationProps} = loginScreenProps
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
    home_country: "",
    home_city: "",
    password_confirmation: ""
  })
  const [disable, setDisable] = useState({
    class: "cursor-not-allowed disabled:opacity-25",
    disable: true
  })

  const conditions = {
    first: formInput.username.match(/^.{3,18}$/g),
    second: formInput.username.match(/^[\w]*$/g) && formInput.username.match(/^[A-Za-z]/g),
    third: formInput.password.match(/^.{8,18}$/g),
    fourth: formInput.password.match(/(?=.*[a-z])(?=.*[A-Z])/g),
    fifth: formInput.password.match(/^[\w\d~!@#$%^&*-=+?]+$/g),
    sixth: formInput.password === formInput.password_confirmation && formInput.password.length > 0,
    seventh: formInput.home_country && formInput.home_city
  }
  
  useEffect(() => {
    if (conditions.first && conditions.second && conditions.third && conditions.fourth && conditions.fifth && conditions.sixth && conditions.seventh) {
      setDisable({class: "", disable: false})
    } else {
      if (!disable.disable) {
        setDisable({
          class: "cursor-not-allowed disabled:opacity-25",
          disable: true
        })
      }
    }
  }, [formInput]);

  useEffect(() => {
    setFormInput({...formInput, home_country: country})
  }, [country]);

  useEffect(() => {
    setFormInput({...formInput, home_city: city})
  }, [city]);

  function onFormChange(e) {
    const newInput = {
      ...formInput,
      [e.target.name]: e.target.value
    }
    setFormInput(newInput)
  }

  // comment out this for heroku depolyment testing
  function handleSignUp(e) {
    e.preventDefault();
    if (city) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city.split(" ").join("+")}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          fetch("/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formInput,
              home_city_lat: data.results[0].geometry.location.lat,
              home_city_lng: data.results[0].geometry.location.lng
            }),
          })
            .then((res) => {
              if (res.ok) {
                res.json().then(data => {
                  console.log(data)
                  setCurrentUser(data)
                })
              } else {
                res.json().then(e => alert(e.errors))
              }
            })
            .catch(console.error)
        })
        .catch(console.error)
    }
  }

  // uncomment this for heroku depolyment testing
  // function handleSignUp(e) {
  //   e.preventDefault();
  //   fetch("/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       ...formInput,
  //       home_city_lat: 40.7127753,
  //       home_city_lng: -74.0059728
  //     }),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         res.json().then(data => {
  //           console.log(data)
  //           setCurrentUser(data)
  //         })
  //       } else {
  //         res.json().then(e => alert(e.errors))
  //       }
  //     })
  //     .catch(console.error)
  // }
  

  return (  
    <div className="bg-gradient-to-r from-white/90 to-gray-500/80 rounded-lg flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-blue-300">Our Website Icon will be here</h1>
          <h2 className="mt-6 mx-10 text-center text-3xl tracking-tight font-bold text-blue-700">
            Start Your Journey
          </h2>
        </div>
        <form 
          className="mt-8 space-y-6" action="#" method="POST"
          onSubmit={handleSignUp}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={formInput.username}
                onChange={onFormChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formInput.password}
                onChange={onFormChange}
              />
            </div>
            <div>
              <label htmlFor="password_confirmation" className="sr-only">
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Comfirm password"
                value={formInput.password_confirmation}
                onChange={onFormChange}
              />
            </div>
          </div>

          <CountriesSelectionBox selectLocationProps={selectLocationProps} country={country} setCountry={setCountry} city={city} setCity={setCity} />

          <div className="font-bold">
            <p className={conditions.first ? "text-green-600" : "text-red-600"}>* username must be between 3 - 20 charaters</p>
            <p className={conditions.second ? "text-green-600" : "text-red-600"}>* username must start with a letter and cannot have space</p>
            <p className={conditions.third ? "text-green-600" : "text-red-600"}>* password must be between 8 - 20 charaters</p>
            <p className={conditions.fourth ? "text-green-600" : "text-red-600"}>* password must contain at least one Uppercase and lowercase letter</p>
            <p className={conditions.fifth ? "text-green-600" : "text-red-600"}>* password can only include alphabet letters, numbers, one of this special charater ~!@#$%^&*-=+?_ and cannot have space</p>
            <p className={conditions.sixth ? "text-green-600" : "text-red-600"}>* please confirm your password</p>
            <p className={conditions.seventh ? "text-green-600" : "text-red-600"}>* please select your home city</p>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${disable.class}`}
              disabled={disable.disable}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              </span>
              Join
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
            Alreadly a member?{' '}
            <a href="#" className="font-medium text-indigo-700 hover:text-indigo-500" onClick={() => setSignUp(false)}>
              Login
            </a>
          </p>
      </div>
    </div>
  );
}

export default SignUpForm;