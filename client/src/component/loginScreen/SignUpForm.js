import { useState } from "react";

function SignUpForm({setSignUp}) {
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
    password_confirmation: ""
  })

  console.log(formInput)

  function onFormChange(e) {
    const newInput = {
      ...formInput,
      [e.target.name]: e.target.value
    }
    setFormInput(newInput)
  }

  function handleSignUp(e) {
    e.preventDefault();
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInput),
    })
      .then((res) => res.json())
      .then(console.log);
  }

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

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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