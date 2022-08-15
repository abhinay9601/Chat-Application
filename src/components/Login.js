import React, { useState, useEffect } from 'react';
// import "./styles/Register/template.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './styles/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialState = {
  name: '',
  password: '',
  email: '',
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.email!="" && formData.password!=""){
    const userData = await axios.post('http://localhost:3000/login', formData);

    localStorage.setItem('userData', JSON.stringify(userData.data.user));
    setFormData(initialState);
    navigate('/dashboard');
  }};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div class="f-body">
      <form onSubmit={handleSubmit}>
        <div class="row align-items-center justify-content-center min-vh-100 gx-0">
          <div class="col-12 col-md-4 col-lg-3">
            <div
              style={{
                backgroundColor: '#ffffff',
                color: 'rgb(27, 27, 27)',
                borderRadius: '14px',
                padding: '20px 24px',
              }}
              class="card-shadow border-0"
            >
              <div class="card-body" style={{ margin: '0px -10px' }}>
                <div class="row g-6">
                  <div class="col-12">
                    <div class="text-center">
                      <h3 class="fw-bold mb-2">Sign In</h3>
                      <p>Login to your account</p>
                    </div>
                  </div>

                  <div style={{ margin: '16px 0px 0px' }}>
                    <div class="form-floating">
                      <input
                        style={{
                          backgroundColor: '#ebf1f7',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                        type="email"
                        class="form-control inputinput"
                        id="signin-email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <label for="signin-email">Email</label>
                    </div>
                  </div>

                  <div style={{ padding: '16px 12px' }}>
                    <div class="form-floating">
                      <input
                        style={{
                          backgroundColor: '#ebf1f7',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                        type="password"
                        class="form-control inputinput"
                        id="signin-password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <label for="signin-password">Password</label>
                    </div>
                  </div>

                  <div class="col-12">
                    {' '}
                    <button
                      style={{
                        color: '#ffffff',
                        backgroundColor: '#2787f4',
                        padding: '14px 18px',
                        fontSize: '1.3rem',
                        borderRadius: '0.6rem',
                      }}
                      class="btn btn-block btn-lg btn-primary w-100"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center mt-8 pt-4">
              <p>
                Don't have an account yet?{' '}
                <Link class="text-decoration-none" to="/">
                  Sign up
                </Link>
              </p>
              <p>
                <Link class="text-decoration-none" to="/forget-password">
                  Forgot Password?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>

      {/* <!-- / .row --> */}
    </div>
  );
};
export default Register;
