import React, {useState} from 'react';
import Base from "../core/Base";
import {Redirect} from 'react-router-dom';

import {signin, isAuthenticated, storeCredentials} from '../auth/helper';

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });

    const {email, password, error, loading, didRedirect} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: "", [name]: event.target.value});
    }

    const submitForm = event => {
        event.preventDefault();
        console.log(values);
        setValues({ ...values, error: "", loading: true });
        signin({email, password})
            .then(data => {
                if(data.error) {
                    setValues({...values, error: data.error.error, loading: false});
                } else {
                    storeCredentials(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        });
                    });
                }
            })
            .catch(err => console.log('signin request failed!! Plaese Try again later'));
    }

    const performRedirect = () => {
        if(didRedirect) {
            if(user && user.role === 1) {
                return <Redirect to="/admin/dashboard"/>
            } else {
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()) {
            return <Redirect to="/"/>
        }
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };

    const signInForm = () => {
        return (
            <div className="w-50 mx-auto">
                <div className="row mt-5">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <form>
                            <div className="form-group">
                                <label className="text-light">Email</label>
                                <input className="form-control" onChange={handleChange("email")} type="email" />
                            </div>

                            <div className="form-group">
                                <label className="text-light">Password</label>
                                <input className="form-control" onChange={handleChange("password")} type="password" />
                            </div>
                            <button className="btn btn-success btn-block" onClick={submitForm}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Base>
            <h1 className="text-white text-center display-4 mt-5">Sign In</h1>
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    );
};

export default Signin;
