import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classnames from "classnames";

async function registerUser(credentials) {
  return fetch('https://gw2api.irithyll.com/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(async response => ({ status: response.ok, response: await response.json() }))
    .catch(e => console.log(e))
}

const Register = () => {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPass] = useState();
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await registerUser({
      username,
      password,
      confirmPassword,
      rememberMe
    });

    if (!res.status) {
      setErrors(res.response);
    } else {
      setErrors({});

      localStorage.setItem('currentUser', res.response.token);
      history.push('/');
    }
  }

  return <div className="container max-w-xl mt-8">
    <div className="bg-white shadow-xl rounded-xl py-8 px-8">
      <h1 className="text-2xl mb-3 text-center">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-5 text-sm">
          <label htmlFor="username" className="block text-black">Username</label>
          <input type="text" id="username" name="username" className={classnames("rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full", { 'border-red-400': errors.username })} placeholder="Username" onChange={e => setUsername(e.target.value)} />
          <span className="text-red-600">{errors.username}</span>
        </div>
        <div className="my-5 text-sm">
          <label htmlFor="password" className="block text-black">Password</label>
          <input type="password" id="password" name="password" className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <span className="text-red-600">{errors.password}</span>
        </div>
        <div className="my-5 text-sm">
          <label htmlFor="confirm-password" className="block text-black">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirmPassword" className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder="Confirm Password" onChange={e => setConfirmPass(e.target.value)} />
          <span className="text-red-600">{errors.confirmPassword}</span>
        </div>
        <div className="my-5 text-sm flex items-center space-x-3">
          <input type="checkbox" name="remember-me" id="remember-me" className="h-6 rounded-md w-6" onChange={e => setRememberMe(e.target.checked)} checked={rememberMe} />
          <label htmlFor="remember-me" className="block text-black">Remember me</label>
        </div>
        <button className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full">Register</button>
      </form>
      <p className="mt-12 text-xs text-center font-light text-gray-400">Already have an account?
        <Link to="../auth" className="text-black font-medium"> Login instead</Link>
      </p>
    </div>
  </div>
}
export default Register;