import { Link } from "react-router-dom";
import "./styles/login.css";

const ForgetPassword = () => {
  return (
    <div class="f-body">
      <div class="row align-items-center justify-content-center min-vh-100 gx-0">
        <div class="col-12 col-md-5 col-lg-3">
          <div style={{backgroundColor: "#ffffff",color: "rgb(27, 27, 27)", borderRadius: "14px", padding: "20px 24px"}} class="card-shadow border-0">
            <div class="card-body" style={{margin:"0px -10px"}}>
              <div class="row g-6">
                <div class="col-12">
                  <div class="text-center">
                    <h3 class="fw-bold mb-2">Password Reset</h3>
                    <p color="#ebf1f7">Enter your email to reset password</p>
                  </div>
                </div>

                <div style={{ margin: "16px 0px 0px"}}>
                  <div class="form-floating">
                    <input
                    style={{backgroundColor: "#ebf1f7", border: "none", borderRadius: "8px"}}
                      type="email"
                      class="form-control input"
                      id="resetpassword-email"
                      placeholder="Email"
                    />
                    <label for="resetpassword-email">Email</label>
                  </div>
                </div>

                <div style={{ margin: "16px 0px 0px"}}>
                  <button
                  style={{color: "#ffffff", backgroundColor: "#2787f4", padding: "14px 18px", fontSize: "1.3rem", borderRadius: "0.6rem"}}
                    class="btn btn-block btn-lg btn-primary w-100"
                    type="submit"
                  >
                    Send Reset Link
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Text --> */}
          <div class="text-center mt-8 pt-4">
            <p class="text-dark">
              Already have an account?{" "}
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
export default ForgetPassword;
