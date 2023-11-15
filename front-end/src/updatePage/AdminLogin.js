import React, { useState, useEffect } from "react"

function AdminLogin({ toggleLogin }) {
    const initialAdminData = {
        admin_name: '',
        password: ''
      }
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginCreds, setLoginCreds] = useState(initialAdminData)

    function handleAdminInputChange(event) {
        event.preventDefault();
        setLoginCreds({
          ...loginCreds,
          [event.target.name]: event.target.value,
        });
      }
  //   function handleAdminInputChange(event) {
  //     event.preventDefault();
  //     const { name, value } = event.target;
  //     setLoginCreds({
  //         ...loginCreds,
  //         [name]: value,
  //     });
  // }
  
    function handleLoginSubmit(event){
        const adminName = 'fipo580'
        const adminPassword = 'temp_password'
        event.preventDefault()
        console.log(loginCreds)
        if(loginCreds.admin_name === adminName && loginCreds.password === adminPassword){
            toggleLogin()
        }
    }
    return (
        <div className="card">
            <div className="card-header">
                Admin Log In
            </div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="admin_name">Admin</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="admin_name"
                            name="admin_name"
                            aria-describedby="emailHelp"
                            placeholder="Enter Admin Username"
                            value={loginCreds.admin_name}
                            onChange={handleAdminInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="password" 
                            name="password"
                            placeholder="Password"
                            value={loginCreds.password}
                            onChange={handleAdminInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleLoginSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin