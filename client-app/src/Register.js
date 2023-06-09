import {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import {Navigate} from "react-router-dom";

function Register() {

  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [navigate,setNavigate] = useState(false);
  const [registerError,setRegisterError] = useState(false);

  const user = useContext(UserContext);

  /* Upon form submission attempt to register user with provided information */
  function registerUser(e) {
    e.preventDefault();
    const data = {name,email,password};
    axios.post("/register", data, {withCredentials:true})
      .then(response => {
        user.setName(response.data.name);
        user.setEmail(response.data.email);
        setName('');
        setEmail('');
        setPassword('');
        setRegisterError(false);
        setNavigate(true);
      })
      .catch((e)=>{
        setRegisterError(true);
        console.log(e);
      });
  }

  //If user has registered, redirect to home page now that they have credentials stored in the context
  if (navigate) {
    return <Navigate to={'/'} />
  }

  return (
    <form action="" onSubmit={e => registerUser(e)}>
      {/* If there was an invalid registration attempt, display error message */}
      {registerError && (
        <div className="redText"> Email already registered. Please log in or use a new email</div>
      )}
      <input className='form-control' type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/><br />
      <input className='form-control' type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/><br />
      <input className='form-control' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/><br />
      <button className='btn btn-primary' type="submit">Register</button>
    </form>
  );
}

export default Register;