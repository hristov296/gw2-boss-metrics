import React, { useContext } from "react";
import { Context } from "../../state/Store"

const Profile = props => {
  const [state, dispatch] = useContext(Context);

  const onClickLogout = () => {
    dispatch({ type: 'LOGOUT_USER' });
    localStorage.removeItem('currentUser',)
    window.location.href = "./";
  }

  return <div className="container max-w-screen-lg shadow-xl mt-8 bg-gray-50 rounded-xl p-10">
    <p>Logged in as {state.username}</p>
    <button onClick={onClickLogout}>Log out</button>
  </div>
}

export default Profile;