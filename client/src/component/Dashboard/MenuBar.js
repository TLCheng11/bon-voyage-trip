import { useNavigate } from "react-router-dom";

function MenuBar({setCurrentUser}) {
  let navigate = useNavigate()

  function logout(){
    fetch("/logout", {
      method: "POST"
    })
      .then(res => res.json())
      .then(console.log)
    setCurrentUser({})
  }

  return (
      <div className="Dashboardbg1 absolute w-full pb-3 shadow-md flex space-x-2 justify-center -top-11 transition-all delay-900 ease-in hover:top-0"
      >
        <button 
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => navigate("/")}>Dashboard</button>
        <button 
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={logout}>Logout</button>
      </div>
  );
}

export default MenuBar;