import {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import {Navigate} from "react-router-dom";

function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loginError,setLoginError] = useState(false);
  const [navigate,setNavigate] = useState(false);

  const user = useContext(UserContext);

  /* Upon form submission attempt to log in user with provided information */
  function loginUser(e) {
    e.preventDefault();

    const data = {email,password};
    axios.post('/login', data, {withCredentials:true})
      .then(response => {
        user.setEmail(response.data.email);
        user.setName(response.data.name);
        setEmail('');
        setPassword('');
        setLoginError(false);
        setNavigate(true);
      })
      .catch(() => {
        setLoginError(true);
      });
  }

  //If user has logged in, redirect to home page now that they have credentials stored in the context
  if (navigate) {
    return <div>{<Navigate to={"/"}/>}</div>
  }

  return (
    <form action="" onSubmit={e => loginUser(e)}>
      {/* If there was an invalid login attempt, display error message */}
      {loginError && (
        <div className="redText">Could not log in. Wrong email or password. Please try again or create an account.</div>
      )}
      <input className="form-control" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/><br />
      <input className="form-control"  type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/><br />
      <button className="btn btn-primary" type="submit">Log in</button>
    </form>
  );
}

export default Login;