import React from 'react';
import Menu from "./Menu";

const Base = ({
                  className = "bg-dark text-white p-4",
                  children
              }) => {
    return (
        <div>
            <Menu />
            <div className={className}>{children}</div>
            {/*<footer className="footer mt-auto py-3">*/}
            {/*    <div className="container">*/}
            {/*        <span className="text-muted">Place sticky footer content here.</span>*/}
            {/*    </div>*/}
            {/*</footer>*/}
        </div>
    );
};

export default Base;
