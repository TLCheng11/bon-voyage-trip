import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import WorldArcs from "../Worlds/WorldArcs";

function LoginPage() {
  const [signUp, setSignUp] = useState(false)

  return ( 
    <div className="w-screen h-screen flex items-center justify-center">
      <WorldArcs />
      {
        !signUp ? (
          <LoginForm setSignUp={setSignUp}/>
        ) : (
          <SignUpForm setSignUp={setSignUp}/>
        )
      }
    </div>  
  );
}

export default LoginPage;