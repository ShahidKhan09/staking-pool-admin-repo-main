import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <section className="main-footer" id="about">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-11 col-12 m-auto">
              <div className="main">
                <div className="left">
                  <a href="/" className="navbar-brand">
                    <img
                      src="/assests\logo\logo.svg"
                      alt=""
                      className="img-fluid hbdsjbd"
                    />
                  </a>
                </div>
                <div className="right">
                  <ul className="footer_ul">
                    <li>
                      <Link to="/" class="nav-link">
                        <img src="/assests\logo\twitter-logo.svg" alt="img" className="img-fluid" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/" class="nav-link">
                        <img src="/assests\logo\telegram-logo.svg" alt="img" className="img-fluid" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/" class="nav-link">
                        <img src="/assests\logo\discord-logo.svg" alt="img" className="img-fluid" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/" class="nav-link">
                        <img src="/assests\logo\medium-logo.svg" alt="img" className="img-fluid" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/" class="nav-link">
                        <img src="/assests\logo\insta-logo.svg" alt="img" className="img-fluid" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bottom-footer">
                <p>© 2022 <span>Staking Pool Builder</span> , All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
       
      
      </section>

    </>
  );
};

export default Footer;
