import { useEffect } from 'react';
import '../../App.scss';
import { useHistory } from 'react-router-dom';
import Footer from './footer/Footer';
import Navbar from './header/Navbar';
import Banner from './main-banner/Banner';


function Landing() {
  const history=useHistory()
  useEffect(()=>{
    let token = localStorage.getItem('mytoken')
    if(token){
      history.push('/landing')
    }else{
      history.push('/')
    }
  },[])
  return (
    <>
      <Navbar />
      <Banner />
      <Footer />
    </>
  );
}

export default Landing;