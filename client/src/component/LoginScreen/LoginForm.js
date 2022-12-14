import { useState } from "react"
import logo from "../../images/logo.png"

function LoginForm({loginScreenProps, setSignUp}) {
  const {setCurrentUser} = loginScreenProps
  const [formInput, setFormInput] = useState({
    username: "",
    password: ""
  })
  
  function onFormChange(e) {
    const newInput = {
      ...formInput,
      [e.target.name]: e.target.value
    }
    setFormInput(newInput)
  }

  function handleLogin(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInput),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then(data => {
            setCurrentUser(data)
          })
        } else {
          res.json().then(e => alert(e.error))
        }
      })
      .catch(console.error)
  }

  return (
    <div className="text-bg-sky-500 bg-gradient-to-r from-white/90 to-gray-500/80 rounded-lg flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-blue-300">
            <img className="opacity-90 rounded-xl" src={logo}/>
          </h1>
          <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-blue-700">
            Continue Your Adventure
          </h2>
        </div>
        <form 
          className="mt-8 space-y-6" action="#" method="POST"
          onSubmit={handleLogin}  
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formInput.password}
                onChange={onFormChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-base text-gray-600 ">
          Not a member yet?{' '}
          <a href="#" className="font-medium text-indigo-700 hover:text-indigo-500" onClick={() => setSignUp(true)}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;