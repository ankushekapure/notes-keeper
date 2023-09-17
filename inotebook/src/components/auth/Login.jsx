import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Login(props) {
    const history = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost/api/auth/login", {method: "POST", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: credentials.email, password: credentials.password}) })

    const json = await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem("token", json.jwttoken)
        history("/");
        props.showAlert("Login Sucessful", "success")
    }
    else{
        props.showAlert("Invalid Credentials", "danger")
    }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className='mt-3'>
      <h2>Login To Continue</h2>
      <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="Email" className="form-label">Email address</label>
      <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" name="email" onChange={onChange} value={credentials.email}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="Password" className="form-label">Password</label>
      <input type="password" className="form-control" id="Password" name="password" onChange={onChange} value={credentials.password}/>
    </div>
    <button type="submit" className="btn btn-primary" >Submit</button>
  </form></div>
  )
}

export default Login