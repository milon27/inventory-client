import Alert from './../layout/Alert';
import Loading from './../layout/Loading';

export default function LoginForm({ onSubmit, onChangeEmail, onChangePassword, email, password }) {

    return (
        <>
            <div className="bg-gradient-primary vh-100" >
                <div className="container ">
                    {/* <!-- Outer Row --> */}
                    <div className="row">
                        <div className="col-md-11">
                            <h1 className="text-primary text-center mt-5">Login Now</h1>

                        </div>
                        {/* <div className="col-md-1">
                            <button className="btn btn-outline-light mt-5" onClick={goToDbSetup}>Config</button>
                        </div> */}
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    {/* <!-- Nested Row within Card Body --> */}
                                    <div className="row">
                                        {/* <div className="col-lg-6 d-none d-lg-block bg-login-image"></div> */}
                                        <div className="col-lg-12">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                                    <Alert />
                                                    <Loading color="primary" />
                                                </div>
                                                <form className="user" onSubmit={onSubmit} method="POST">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control form-control-user"
                                                            name="email" onChange={onChangeEmail} value={email}
                                                            placeholder="Enter Email Address..." />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" className="form-control form-control-user"
                                                            name="password" onChange={onChangePassword} value={password}
                                                            placeholder="Password" />
                                                    </div>

                                                    {/* <div className="form-group">
                                                        <div className="small">
                                                            <p >Demo Email: admin@g.com</p>
                                                            <p>Demo Password: 1234567</p>
                                                        </div>
                                                    </div> */}

                                                    <input type="submit" value="Login Now" className="btn btn-primary btn-user btn-block" />
                                                    {/* <button className="mt-3 btn btn-secondary btn-user btn-block" >Sign Up</button> */}
                                                    {/* <hr /> */}
                                                    {/* <div className="text-center">
                                          <a className="small" href="forgot-password.html">Forgot Password?</a>
                                       </div>
                                       <div className="text-center">
                                          <a className="small" href="register.html">Create an Account!</a>
                                       </div> */}
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/* row end here */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- end outer row --> */}
                </div>
            </div>
        </>
    )
}
