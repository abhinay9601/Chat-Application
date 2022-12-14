import Search from "./Search";

const SidebarSupport=()=>{
  return<div>
    <div class="d-flex flex-column h-100">
    <div class="hide-scrollbar">
        <div class="container py-8">

            {/* <!-- Title --> */}
            <div class="mb-8">
                <h2 class="fw-bold m-0">Support</h2>
            </div>

            {/* <!-- Search --> */}
            <div class="mb-6">
                {/* @@include("../components/search.html") */}
                <Search></Search>
            </div>

            {/* <!-- Docs --> */}
            <div class="card border-0">
                <div class="card-body">

                    <div class="row align-items-center gx-5">
                        <div class="col-auto text-primary">
                            {/* @@include("../../assets/img/brand/brand.svg") */}
                        </div>

                        <div class="col">
                            <h4 class="mb-1">Documentation</h4>
                            <p>Setup and build tools</p>
                        </div>

                        <div class="col-auto">
                            <a href="docs/index.html" class="btn btn-sm btn-icon btn-primary rounded-circle">
                                {/* @@include("../../assets/img/icons/chevron-right.svg") */}
                            </a>
                        </div>
                    </div>

                </div>
            </div>
            {/* <!-- Docs --> */}

            {/* <!-- Demos --> */}
            <div class="card-list mt-8">
                <div class="d-flex align-items-center mb-4 px-6">
                    <small class="text-muted me-auto">Demos</small>
                </div>

                <div class="card border-0">
                    <img src="assets/img/demos/light.jpg" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <div class="row align-items-center gx-0">
                            <div class="col">
                                <h4 class="mb-1">Light</h4>
                                <p>Classic light theme</p>
                            </div>
                            <div class="col-auto">
                                <a href="./light/" class="btn btn-sm btn-icon btn-primary rounded-circle">
                                    {/* @@include("../../assets/img/icons/chevron-right.svg") */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card border-0">
                    <img src="assets/img/demos/dark.jpg" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <div class="row align-items-center gx-0">
                            <div class="col">
                                <h4 class="mb-1">Dark</h4>
                                <p>Classic dark theme</p>
                            </div>
                            <div class="col-auto">
                                <a href="./dark/" class="btn btn-sm btn-icon btn-primary rounded-circle">
                                    {/* @@include("../../assets/img/icons/chevron-right.svg") */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Demos --> */}

            {/* <!-- Account Pages --> */}
            <div class="card-list mt-8">
                <div class="d-flex align-items-center mb-4 px-6">
                    <small class="text-muted me-auto">Pages</small>
                </div>

                <div class="card border-0">
                    <div class="card-body">
                        <div class="row align-items-center gx-0">
                            <div class="col">
                                <h4 class="mb-1">Sign In</h4>
                                <p>Sign in Page</p>
                            </div>
                            <div class="col-auto">
                                <a href="signin.html" class="btn btn-sm btn-icon btn-primary rounded-circle">
                                    {/* @@include("../../assets/img/icons/chevron-right.svg") */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card border-0">
                    <div class="card-body">
                        <div class="row align-items-center gx-0">
                            <div class="col">
                                <h4 class="mb-1">Sign Up</h4>
                                <p>Sign Up Page</p>
                            </div>
                            <div class="col-auto">
                                <a href="signup.html" class="btn btn-sm btn-icon btn-primary rounded-circle">
                                    {/* @@include("../../assets/img/icons/chevron-right.svg") */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card border-0">
                    <div class="card-body">
                        <div class="row align-items-center gx-0">
                            <div class="col">
                                <h4 class="mb-1">Password Reset</h4>
                                <p>Password Reset Page</p>
                            </div>
                            <div class="col-auto">
                                <a href="password-reset.html" class="btn btn-sm btn-icon btn-primary rounded-circle">
                                    {/* @@include("../../assets/img/icons/chevron-right.svg") */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card border-0">
                    <div class="card-body">
                        <div class="row align-items-center gx-0">
                            <div class="col">
                                <h4 class="mb-1">Lock screen</h4>
                                <p>Lock screen Page</p>
                            </div>
                            <div class="col-auto">
                                <a href="lockscreen.html" class="btn btn-sm btn-icon btn-primary rounded-circle">
                                    {/* @@include("../../assets/img/icons/chevron-right.svg") */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Account Pages --> */}
        </div>
    </div>
</div>
  </div>
}
export default SidebarSupport;