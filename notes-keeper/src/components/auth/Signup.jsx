import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function Signup(props) {
    const history = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost/api/auth/createuser", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name: formData.name, email: formData.email, password: formData.password })
        })

        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem("token", json.jwttoken)
            history("/");
            props.showAlert("Signup Sucessful", "success")
        }
        else{
            props.showAlert("Enter Correct Details", "danger")

        }
    };
    return (
        <div className="container mt-3">
      <h2>Signup To Continue</h2>            
      <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default Signup;
