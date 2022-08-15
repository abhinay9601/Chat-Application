import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import './styles/login.css';
import axios from 'axios';

const initialState = {
  name: '',
  password: '',
  email: '',
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  // const [password,setPassword]=useState('');
  // const [email,setEmail]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if(formData!=""){
    await axios.post('http://localhost:3000/register', formData);
    setFormData(initialState);
    navigate('/register');
  }};
  // useEffect(()=>{

  // },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div class="f-body">
      <div class="row align-items-center justify-content-center min-vh-100 gx-0">
        <div class="col-12 col-md-5 col-lg-3">
          <form onSubmit={handleSubmit}>
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
                      <h3 class="fw-bold mb-2">Sign Up</h3>
                      <p>Follow the easy steps</p>
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
                        type="text"
                        class="form-control input"
                        id="signup-name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={formData.name}
                        name="name"
                      />
                      <label for="signup-name">Name</label>
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
                        class="form-control input"
                        id="signup-email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formData.email}
                        name="email"
                      />
                      <label for="signup-email">Email</label>
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
                        type="password"
                        class="form-control input"
                        id="signup-password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={formData.password}
                        name="password"
                      />
                      <label for="signup-password">Password</label>
                    </div>
                  </div>

                  <div style={{ margin: '16px 0px 0px' }}>
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
                      Create Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* <!-- Text --> */}
          <div class="text-center mt-8 pt-4">
            <p class="text-dark">
              Already have an account?{' '}
              <Link class="text-decoration-none" to="/">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* <!-- / .row --> */}
    </div>
  );
};
export default Login;
