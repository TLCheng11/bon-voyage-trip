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
    <div className="fixed z-50 w-full flex justify-center bg-gray-500 -top-5 transition-all duration-300 ease-in hover:top-0"
      style={{clipPath: "polygon(10% 0, 90% 0, 88% 100%, 12% 100%)"}}
    >
      <button onClick={() => navigate("/")}>Dashboard</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default MenuBar;