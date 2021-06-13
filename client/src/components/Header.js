import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { Context } from "../state/Store"

const Header = props => {
  const [state, dispatch] = useContext(Context);

  return <header className="py-5 bg-gray-200 text-center">
    <div className="container max-w-screen-lg flex justify-between">
      <div className=""><Link to="/">GW2BE</Link></div>
      <p>Sticky eader</p>
      <div className="">
        {state.username ? <Link to="/profile">Welcome, {state.username}</Link> :
          <Link to="/auth">Login / Signup</Link>}
      </div>
    </div>
  </header>
}

export default Header;