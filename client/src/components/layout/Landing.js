import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';



import './Landing.scss';
import branchesofearth from '../../img/branchesofearth.png';
import branchesofscience from '../../img/branchesofscience.jpg';
import everythingaboutscience from '../../img/everythingaboutscience.jpg';
import and from '../../img/and.jpg';
import lancerino from '../../img/lancerino.jpg';



class Landing extends Component {

  componentDidMount = () => {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  

  render() {
    return (
      <div>
        <header className = "header">
          <div className="header__logo-box">
            {/* <img src={iLabScience1} alt="ILABSCIENCELOGO" className = "header__logo" /> */}
          </div>

          <div className = "header__text-box">
            <h1 className = "heading-primary">
              <span className ="heading-primary-main">ILABScience</span>
              <span className = "heading-primary-sub">Science Not Silence</span>
            </h1>
              <a href="/login" className ="btn btn-white">Get Started</a>
              
          </div>
        </header>

        <main>
          <section className="section-about">
            <div className="u-center-text u-margin-bottom-big">
              <h2 className="heading-secondary">
                EVERYTHING you don't know is something you can LEARN.
              </h2>
            </div>

            <div className="row">
              <div className="col-1-of-2">
                <h3 className="heading-tertiary u-margin-bottom-small">
                  You are going to love everything about Science
                </h3>
                <p className="paragraph">
                  Do you want to know anything about the branches of science ? Do you want to share some of your science knowledge ? Blog it here.
                </p>
                <h3 className="heading-tertiary u-margin-bottom-small">
                  Why this site was created ? 
                </h3>
                <p className="paragraph">
                  Other people might forgotten some topics about science, The Developer used to create this site for the people who wanted to learn everything about our beloved Science. To show how everything works and how it was created.
                </p>
              </div>
              <div className="col-1-of-2">
                  <div className="composition">
                   <img src={everythingaboutscience} alt="EverythingAboutScience" className="composition__photo composition__photo--p1"/>
                   <img src={branchesofscience} alt="BranchesofScience" className="composition__photo composition__photo--p2"/>
                   <img src={branchesofearth} alt="BranchecofEarth" className="composition__photo composition__photo--p3"/>
                  </div>
              </div>
            </div>
          </section>

        <section className="section-team">
          <div className="bg-video">
            <video className="bg-video__content">
              <source src />
            </video>
          </div>
        <div className="u-center-text u-margin-bottom-big">
            <h2 className="heading-secondary">
              About my Team
            </h2>
          </div>

          <div className="row">
            <div className="about-team">
             <figure className="about-team__shape">
                <img src={and} alt="Project Manager" className = "about-team__photo"/>
                <figcaption className="about-team__caption">
                  Reina Andrea Arescon
                </figcaption>
             </figure>
            <div className="about-team__text">
              <h3 className="heading-tertiary u-margin-bottom-small">
                Reina Andrea Arescon
              </h3>
                <p className = "paragraph">
                  She is the best Project Manager i've ever had.
                </p>
            </div>
            </div>
          </div>

           <div className="row">
            <div className="about-team">
             <figure className="about-team__shape">
                <img src={lancerino} alt="Project Manager" className = "about-team__photo"/>
                <figcaption className="about-team__caption">
                  Lance Liam De Padua
                </figcaption>
             </figure>
            <div className="about-team__text">
              <h3 className="heading-tertiary u-margin-bottom-small">
                Lance Liam De Padua
              </h3>
                <p className = "paragraph">
                   Developer of the team.
                </p>
            </div>
            </div>
          </div>
        </section>
        </main>
      </div>
    )
  }
}


Landing.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps)(Landing);
