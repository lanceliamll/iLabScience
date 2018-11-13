import React from 'react'
import iLabScience1 from '../../img/iLabScience1.png';
import  './Footer.scss';


const Footer = () => {
  return (
    <div>
       <footer className="footer">
          <div className="footer__logo-box">
            <img src={iLabScience1} alt="iLabScienceLogo" className="footer__logo"/>          
          </div>
          <div className="row">
            <div className="col-1-of-2">
              <div className="footer__navigation">
                <ul className="footer__list">
                  <li className="footer__item"><a href="#" className="footer__link">Facebook</a></li>
                  <li className="footer__item"><a href="#" className="footer__link">Instagram</a></li>
                  <li className="footer__item"><a href="#" className="footer__link">GitHub</a></li>
                </ul>
              </div>
            </div>
            <div className="col-1-of-2">
              <p className="footer__copyright">
                LAINA PRODUCTIONS &copy; 2018
              </p>
            </div>
          </div>
        </footer>
    </div>
  )
}


export default Footer;

