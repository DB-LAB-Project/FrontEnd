import React from "react";
import "../styles.css"
import "./home.css"
import BG from "../assets/BG.png"
import chat from "../assets/chat.png"
import Base from "./Base";

const Home = () => {

    const styleObj = {
        backgroundImage: `url(${BG})`,
    }

    return (
        <Base className="px-0">
            <div className="home" style={styleObj}>
                <h1 className="text-white display-4 w-100 text-center" style={{zIndex: "2", opacity: "1", fontSize: "7rem", fontFamily: "Niconne"}}>Learning Management System</h1>
                <p className="w-100 text-center text-white d-block" style={{zIndex: "2", opacity: "1", marginTop: "-600px"}}>One stop solution to manage all your classes and assignments online</p>
            </div>
            {/*<div className="container-fluid d-flex m-5">*/}
            {/*    <div className="card text-center" style={{width: "100px"}}>*/}
            {/*        <img src={chat} alt="chat image" className="d-block w-25 mx-auto" style={{width: "100px", height:"100px"}}/>*/}
            {/*        <h3 className="card-header">*/}
            {/*            Simplified Communication*/}
            {/*        </h3>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*    <div className='container-fluid'>*/}
            {/*    <div id="myCarousel" className="carousel slide" data-ride="carousel">*/}
            {/*        <ol className="carousel-indicators">*/}
            {/*            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>*/}
            {/*            <li data-target="#myCarousel" data-slide-to="1" className=""></li>*/}
            {/*            <li data-target="#myCarousel" data-slide-to="2" className=""></li>*/}
            {/*        </ol>*/}
            {/*        <div className="carousel-inner">*/}
            {/*            <div className="carousel-item active">*/}
            {/*                <svg className="bd-placeholder-img" width="100%" height="100%"*/}
            {/*                     xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"*/}
            {/*                     focusable="false" role="img">*/}
            {/*                    <rect width="100%" height="100%" fill="#777"></rect>*/}
            {/*                </svg>*/}
            {/*                <div className="container">*/}
            {/*                    <div className="carousel-caption text-left">*/}
            {/*                        <h1>Example headline.</h1>*/}
            {/*                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi*/}
            {/*                            porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id*/}
            {/*                            elit.</p>*/}
            {/*                        <p><a className="btn btn-lg btn-primary" href="#" role="button">Sign up today</a>*/}
            {/*                        </p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="carousel-item">*/}
            {/*                <svg className="bd-placeholder-img" width="100%" height="100%"*/}
            {/*                     xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"*/}
            {/*                     focusable="false" role="img">*/}
            {/*                    <rect width="100%" height="100%" fill="#777"></rect>*/}
            {/*                </svg>*/}
            {/*                <div className="container">*/}
            {/*                    <div className="carousel-caption">*/}
            {/*                        <h1>Another example headline.</h1>*/}
            {/*                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi*/}
            {/*                            porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id*/}
            {/*                            elit.</p>*/}
            {/*                        <p><a className="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="carousel-item">*/}
            {/*                <svg className="bd-placeholder-img" width="100%" height="100%"*/}
            {/*                     xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"*/}
            {/*                     focusable="false" role="img">*/}
            {/*                    <rect width="100%" height="100%" fill="#777"></rect>*/}
            {/*                </svg>*/}
            {/*                <div className="container">*/}
            {/*                    <div className="carousel-caption text-right">*/}
            {/*                        <h1>One more for good measure.</h1>*/}
            {/*                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi*/}
            {/*                            porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id*/}
            {/*                            elit.</p>*/}
            {/*                        <p><a className="btn btn-lg btn-primary" href="#" role="button">Browse gallery</a>*/}
            {/*                        </p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">*/}
            {/*            <span className="carousel-control-prev-icon" aria-hidden="true"></span>*/}
            {/*            <span className="sr-only">Previous</span>*/}
            {/*        </a>*/}
            {/*        <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">*/}
            {/*            <span className="carousel-control-next-icon" aria-hidden="true"></span>*/}
            {/*            <span className="sr-only">Next</span>*/}
            {/*        </a>*/}
            {/*    </div>*/}


            {/*    <div className="container marketing">*/}


            {/*        <div className="row">*/}
            {/*            <div className="col-lg-4">*/}
            {/*                <svg className="bd-placeholder-img rounded-circle" width="140" height="140"*/}
            {/*                     xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"*/}
            {/*                     focusable="false" role="img" aria-label="Placeholder: 140x140">*/}
            {/*                    <title>Placeholder</title>*/}
            {/*                    <rect width="100%" height="100%" fill="#777"></rect>*/}
            {/*                    <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>*/}
            {/*                </svg>*/}
            {/*                <h2>Heading</h2>*/}
            {/*                <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id*/}
            {/*                    nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum*/}
            {/*                    at eros. Praesent commodo cursus magna.</p>*/}
            {/*                <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>*/}
            {/*            </div>*/}

            {/*            <div className="col-lg-4">*/}
            {/*                <svg className="bd-placeholder-img rounded-circle" width="140" height="140"*/}
            {/*                     xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"*/}
            {/*                     focusable="false" role="img" aria-label="Placeholder: 140x140">*/}
            {/*                    <title>Placeholder</title>*/}
            {/*                    <rect width="100%" height="100%" fill="#777"></rect>*/}
            {/*                    <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>*/}
            {/*                </svg>*/}
            {/*                <h2>Heading</h2>*/}
            {/*                <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem*/}
            {/*                    nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac*/}
            {/*                    cursus commodo, tortor mauris condimentum nibh.</p>*/}
            {/*                <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>*/}
            {/*            </div>*/}

            {/*            <div className="col-lg-4">*/}
            {/*                <svg className="bd-placeholder-img rounded-circle" width="140" height="140"*/}
            {/*                     xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"*/}
            {/*                     focusable="false" role="img" aria-label="Placeholder: 140x140">*/}
            {/*                    <title>Placeholder</title>*/}
            {/*                    <rect width="100%" height="100%" fill="#777"></rect>*/}
            {/*                    <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>*/}
            {/*                </svg>*/}
            {/*                <h2>Heading</h2>*/}
            {/*                <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam.*/}
            {/*                    Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus*/}
            {/*                    commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>*/}
            {/*                <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <hr className="featurette-divider"/>*/}

            {/*            <div className="row featurette">*/}
            {/*                <div className="col-md-7">*/}
            {/*                    <h2 className="featurette-heading">First featurette heading. <span*/}
            {/*                        className="text-muted">It’ll blow your mind.</span></h2>*/}
            {/*                    <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id*/}
            {/*                        ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque*/}
            {/*                        nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>*/}
            {/*                </div>*/}
            {/*                <div className="col-md-5">*/}
            {/*                    <svg*/}
            {/*                        className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"*/}
            {/*                        width="500" height="500" xmlns="http://www.w3.org/2000/svg"*/}
            {/*                        preserveAspectRatio="xMidYMid slice" focusable="false" role="img"*/}
            {/*                        aria-label="Placeholder: 500x500"><title>Placeholder</title>*/}
            {/*                        <rect width="100%" height="100%" fill="#eee"></rect>*/}
            {/*                        <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>*/}
            {/*                    </svg>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <hr className="featurette-divider"/>*/}

            {/*                <div className="row featurette">*/}
            {/*                    <div className="col-md-7 order-md-2">*/}
            {/*                        <h2 className="featurette-heading">Oh yeah, it’s that good. <span*/}
            {/*                            className="text-muted">See for yourself.</span></h2>*/}
            {/*                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum*/}
            {/*                            id ligula porta felis euismod semper. Praesent commodo cursus magna, vel*/}
            {/*                            scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>*/}
            {/*                    </div>*/}
            {/*                    <div className="col-md-5 order-md-1">*/}
            {/*                        <svg*/}
            {/*                            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"*/}
            {/*                            width="500" height="500" xmlns="http://www.w3.org/2000/svg"*/}
            {/*                            preserveAspectRatio="xMidYMid slice" focusable="false" role="img"*/}
            {/*                            aria-label="Placeholder: 500x500"><title>Placeholder</title>*/}
            {/*                            <rect width="100%" height="100%" fill="#eee"></rect>*/}
            {/*                            <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>*/}
            {/*                        </svg>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <hr className="featurette-divider"/>*/}

            {/*                    <div className="row featurette">*/}
            {/*                        <div className="col-md-7">*/}
            {/*                            <h2 className="featurette-heading">And lastly, this one. <span*/}
            {/*                                className="text-muted">Checkmate.</span></h2>*/}
            {/*                            <p className="lead">Donec ullamcorper nulla non metus auctor fringilla.*/}
            {/*                                Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus*/}
            {/*                                magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus*/}
            {/*                                commodo.</p>*/}
            {/*                        </div>*/}
            {/*                        <div className="col-md-5">*/}
            {/*                            <svg*/}
            {/*                                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"*/}
            {/*                                width="500" height="500" xmlns="http://www.w3.org/2000/svg"*/}
            {/*                                preserveAspectRatio="xMidYMid slice" focusable="false" role="img"*/}
            {/*                                aria-label="Placeholder: 500x500"><title>Placeholder</title>*/}
            {/*                                <rect width="100%" height="100%" fill="#eee"></rect>*/}
            {/*                                <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>*/}
            {/*                            </svg>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}

            {/*    </div>*/}
            {/*    </div>*/}
            {/*<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"*/}
            {/*        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"*/}
            {/*        crossOrigin="anonymous"></script>*/}
            {/*<script>window.jQuery || document.write('*/}
            {/*    <script src="/docs/4.5/assets/js/vendor/jquery.slim.min.js">*/}
            {/*        </script>')*/}
            {/*    </script>*/}
            {/*    <script src="/docs/4.5/dist/js/bootstrap.bundle.min.js"*/}
            {/*            integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"*/}
            {/*            crossOrigin="anonymous"></script>*/}


        </Base>

    );



}
export default Home;
