import './App.scss';
import React, { useEffect, useState } from 'react';
import Landing from './components/landing/Landing.js';
import Banner from './components/landing/main-banner/Banner';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create from "./components/CreatePool/Create";
import CreateVariable from "./components/CreatePool/CreateVariable";
import Settings from "./components/Settings/Settings";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import useEagerConnect from "./hooks/useEagerConnect";
import './main.js'
import Login from './components/Login/Login';
import Edit from './components/EditPool/Edit';
import EditVariable from './components/EditPool/EditVariable';

function App() {
  const [token, setToken] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('mytoken')
    setToken(token)
  }, [])
  useEagerConnect();
  return (
    <>
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* {authResult ? */}

        <Switch>
        <Route exact path='/' component={Login} />
          <Route exact path='/landing' component={Landing} />
          <Route exact path='/create' component={Create} />
          <Route exact path='/createVariable' component={CreateVariable} />
          <Route exact path='/edit/:id' component={Edit} />
          <Route exact path='/editvariable/:id' component={EditVariable} />
          <Route exact path='/settings' component={Settings} />
          {/* <Route exact path='/login' component={Login} /> */}
        </Switch>
        {/* //   :
        //   <Switch>
        //     <Route exact path='/' component={Login} />
        //     <Route exact path='/login' component={Login} />
        //     <Redirect to='/' component={Login} />
        //   </Switch>
        // } */}
      </Router>
    </>
  );
}

export default App;
