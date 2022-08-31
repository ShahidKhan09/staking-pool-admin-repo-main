import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import "./navbar.scss";
import { useHistory } from 'react-router-dom';

import useAuth from "../../../hooks/useAuth";
import { NavigateBefore } from "@material-ui/icons";
import { toast } from "react-toastify";

const Navbar = () => {
  const history = useHistory();
  const { account } = useWeb3React();
  const { login, logout } = useAuth();
  const logout1 = () => {
    localStorage.clear('mytoken');
    history.push("/");
  }

  const connectMetamask = () => {
    localStorage.setItem("connectorId", "injected");
    login("injected");
    localStorage.setItem("flag", "true");
  };

  const trustWallet = async () => {
    localStorage.setItem("connectorId", "walletconnect");
    if (account) {
      logout();
    } else {
      login("walletconnect");
    }
  };
  const NavigateBefore = (type) => {

    if (type === 'variableApi') {
      window.$(`#basicModalunstakeddfd`).modal("hide")
      history.push("/createVariable")
    } else if (type === 'fixedApi') {
      window.$(`#basicModalunstakeddfd`).modal("hide")
      history.push("/create")
    } else {
      window.$(`#basicModalunstakeddfd`).modal("show")
    }
  }
  const logoutt = () => {
    localStorage.setItem("flag", "false");
    logout();
  };

  return (
    <>
      <section className="main-navbar">
        <div className="container-fluid padd">
          <div className="row">
            <div className="col-xl-11 col-lg-11 m-auto padd">
              <nav className="navbar ptb20 navbar-expand-xl">
                <NavLink to='/landing' className="navbar-brand">
                  <img
                    src="/assests\logo\logo.svg"
                    alt=""
                    className="img-fluid hbdsjbd"
                  />
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="togg">
                    <i class="fas fa-bars"></i>
                  </span>
                </button>

                <div
                  className="collapse navbar-collapse marg"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto">
                    <li class="nav-item active">
                      <Link to="/landing" class="nav-link">
                        {" "}
                        Pool <span class="sr-only">(current)</span>
                      </Link>
                    </li>
                    <li class="nav-item ">
                      {/* to="/create" */}
                      <p class="nav-link createPool" onClick={() => NavigateBefore()} style={{ cursor: 'pointer' }}>
                        Create Pool{" "}
                      </p>
                    </li>
                    <li class="nav-item">
                      <Link to="/settings" class="nav-link ">
                        Project Settings{" "}
                      </Link>
                    </li>
                  </ul>
                  <div className="align-left">
                    {account ? <p className="connected-tag ">Connected: <span className="">{account?.slice(0,10)}...</span> </p> : ''}
                    {account ? <div> <button
                      type="button"
                      class="btn-yellow sbvsx mr-2"
                      onClick={logoutt}
                    // data-toggle="modal"
                    // data-target="#myModal2"
                    >
                      Disconnect
                    </button></div> :
                      <button
                        type="button"
                        class="btn-yellow sbvsxvv"
                        data-toggle="modal"
                        data-target="#myModal2"
                      >
                        Connect wallet
                      </button>
                    }
                    <button
                      type="button"
                      class="btn-yellow sbvsx"
                      onClick={logout1}
                    // data-toggle="modal"
                    // data-target="#myModal2"
                    >
                      <img src="/assests\logo\logout_icon.svg" alt="img" className="img-fluid" />
                      Logout
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div
        class="modal right fade"
        id="myModal2"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel2"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img
                  src="/assests\CardsImg\close.svg"
                  className="img-fluid" alt="img"
                />
              </button>
              <div className="upper_text">
                <h4 class="modal-title heading_modal" id="myModalLabel2">
                  Connect Wallet
                </h4>
                <p className="para_modal">
                  By connecting your wallet, you agree to our <br />
                  <a href="//"> Terms of Service</a> and Our{" "}
                  <a href="//">Privacy Policy</a> .
                </p>
              </div>
            </div>

            <div class="modal-body">
              <div className="inner_btn">
                <button
                  type="button"
                  className="btn btn-btn-button d-block mb_bottom"
                  onClick={connectMetamask}
                >
                  <img
                    src="/assests\CardsImg\metamas.svg"
                    className="img-fluid" alt="img"
                  />
                  Metamask
                </button>
                <button type="button" className="btn btn-btn-button " onClick={trustWallet}>
                  <img
                    src="/assests\CardsImg\wal.svg"
                    className="img-fluid " alt="img"
                  />
                  WalletConnect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal1">
        <div
          class="modal fade"
          id={`basicModalunstakeddfd`}
          tabindex="-1"
          role="dialog"
          aria-labelledby="basicModal"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content p-md-4">
              <div class="modal-header">
                <h4 class="modal-title modalHH" id="myModalLabel">
                  Create{" "}
                  <span className="text-capitalize">
                  </span>{" "}
                  Pool
                </h4>
                <button
                  type="button"
                  class="close"
                  onClick={() => window.$(`#basicModalunstakeddfd`).modal("hide")}
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <img src="\assests\CardsImg\modalclose.svg" alt="" />
                </button>
              </div>
              <div class="modal-body">
                <button
                  onClick={() => NavigateBefore('variableApi')}
                  className="btn-yellow mt-4 w-100 mocalBtn"
                >
                  Variable Apy
                </button>

                <button
                  onClick={() => NavigateBefore('fixedApi')}
                  className="btn-yellow mt-4 w-100 mocalBtn"
                >
                  Fixed Apy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
