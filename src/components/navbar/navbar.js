import React, { useEffect, useState } from 'react';
import './navbar.css';
import ErrorBoundary from '../errorBoundary';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import pattern from '../../images/pattern-bg.png';
import arrow from '../../images/icon-arrow.svg';

const Navbar = ( { clientIp }) => {
    const [ip, setIp] = useState(clientIp);
    const [isloaded, setIsLoaded] = useState(false);

    const requestIpaddress = () => {
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_fR2EfIspO8gMHVti7fL4bUKgCpYSS&ipAddress=${clientIp}`)
        .then(res => setIp(res.data))
        .catch(function(error){
            console.log(error)
        })
       .finally(setIsLoaded(true))}

    useEffect(() => {
        requestIpaddress()
    }, []);

    const searchIp = (e) => {
        e.preventDefault()
        requestIpaddress()
    }

             return (
                <div className='header'>
                 <div className='header__background'>
                    <img src={pattern} alt='pattern-bg'/>
                 </div>
                 <div className='navbar'>
                
                     <div className='navbar__heading'>
                        <h3>IP Address Tracker</h3>
                     </div>
                    <div className='navbar__search' onClick={searchIp}>
                        <input
                         id='ip-address'
                         value={ip.ip}
                         placeholder="Search for any ip address"
                         onChange={(e) => setIp(e.target.value)}
                        />
                        <img className='navbar__search-arrow' src= {arrow} alt='search-arrow'/>
                    </div>
                    
                    <div className='navbar__information'>
                        <div className='navbar__address'>
                            <h4 className='navbar__information-heading'>ip address</h4>
                            <p  className='navbar__information-text'> </p>
                        </div>
                       
                        <div className='navbar__location'>
                            <h4 className='navbar__information-heading'>location</h4>
                            <p className='navbar__information-text'>  </p>
                        </div>
                    
                        <div className='navbar__timezone'>
                            <h4 className='navbar__information-heading'>timezone</h4>
                            <p className='navbar__information-text'>  </p>
                        </div>
                        <div className='navbar__isp'>
                            <h4 className='navbar__information-heading'>isp</h4>
                            <p className='navbar__information-text'>  </p>
                        </div>
                    </div> 
                 </div>
                </div>
             )
            
    



    


}

const WrappedDetails = () => {
    const params = useParams();
    return (
      <ErrorBoundary>
        <Navbar params={params} />
      </ErrorBoundary>
    );
  };
  
  export default WrappedDetails;