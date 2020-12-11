import React from 'react';
import logo from "./assets/ebook.png"

const Credits = () => {
    return (

            <div className="card w-25">
                <img src={logo} alt="" className="card-body" width="100" height="100"/>
                <p className="d-inline">
                    Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
                </p>
            </div>
    );
};

export default Credits;
