import React, { Component } from 'react';
import OwnerLocation from '../OwnerLocation/OwnerLocation';
import OwnerDetails from '../OwnerDetails/OwnerDetails';
import OwnerPhotos from '../OwnerPhotos/OwnerPhotos';
import OwnerWelcome from '../OwnerWelcome/OwnerWelcome';
import OwnerPricing from '../OwnerPricing/OwnerPricing';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import { stat } from 'fs';
import {ROOT_URL} from '../../constants/constants';


//create the Navbar Component
class OwnerDashboard extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            myData: myData,
            redirectFlag: false,
            errorListingFlag: false
        }
        this.setLocation = this.setLocation.bind(this)
        this.setDetails = this.setDetails.bind(this)
        this.handleLogout = this.handleLogout.bind(this);
        this.setPricing = this.setPricing.bind(this)
        this.changeView = this.changeView.bind(this)
        this.setPhotos = this.setPhotos.bind(this);
        this.back = this.back.bind(this);
        this.submitProperty = this.submitProperty.bind(this)
    }

    componentDidMount() {

        let tempLocation, tempLocationFlag, tempDetails, tempDetailFlag, tempPhotos = null, tempPhotosFlag, tempPricing, tempPricingFlag;

        if (JSON.parse(localStorage.getItem('location'))) {
            tempLocation = JSON.parse(localStorage.getItem('location'));
            tempLocationFlag = true
        } else {
            tempLocationFlag = false;
            tempLocation = {}
        }
        if (JSON.parse(localStorage.getItem('details'))) {
            tempDetails = JSON.parse(localStorage.getItem('details'));
            tempDetailFlag = true

        } else {
            tempDetails = {};
            tempDetailFlag = false;
        }
        if (JSON.parse(localStorage.getItem('photos'))) {
            tempPhotos = JSON.parse(localStorage.getItem('photos'))
            tempPhotosFlag = true;

        } else {
            tempPhotos = {},
                tempPhotosFlag = false
        }
        if (JSON.parse(localStorage.getItem('pricing'))) {
            tempPricing = JSON.parse(localStorage.getItem('pricing'))
            tempPricingFlag = true

        } else {
            tempPricing = {}
            tempPricingFlag = false
        }
        this.setState({
            authFlag: false,
            locationFlag: tempLocationFlag,
            location: tempLocation,
            detailsFlag: tempDetailFlag,
            details: tempDetails,
            photosFlag: tempPhotosFlag,
            photos: tempPhotos,
            pricingFlag: tempPricingFlag,
            pricing: tempPricing,
            currentView: "welcome",
            submitKey: false
        })
    }

    submitProperty() {

        if (this.state.locationFlag && this.state.detailsFlag && this.state.photosFlag && this.state.pricingFlag) {
            // let data = {
            //     location: this.state.location,
            //     details: this.state.details,
            //     photos: this.state.photos,
            //     pricing: this.state.pricing,
            //     email: this.state.myData.email
            // };
            let formData = this.state.photos
            formData.set("location", JSON.stringify(this.state.location))
            formData.set("details", JSON.stringify(this.state.details))
            formData.set("pricing", JSON.stringify(this.state.pricing))
            formData.set("email", JSON.stringify(this.state.myData.email))
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post(`${ROOT_URL}/listing`, formData,{headers: {   Authorization:  this.state.myData.token} })
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log(response.data)
                        if (response.data.status == 1) {
                            localStorage.removeItem('location')
                            localStorage.removeItem('details')
                            localStorage.removeItem('pricing')
                            this.setState({
                                redirectFlag: true
                            })
                        }
                    } else {
                        this.setState({

                        })
                    }
                }, resp => {
                    if (resp.response && resp.response.data && resp.response.data.status === -1) {
                        this.setState({
                            errorListingFlag: true
                        })
                    }
                });
        } else if (!this.state.locationFlag) {
            alert("Please complete all the details before listing the property");
            this.changeView(2);
        } else if (!this.state.detailsFlag) {
            alert("Please complete all the details before listing the property");
            this.changeView(3);
        } else if (!this.state.photosFlag) {
            alert("Please complete all the details before listing the property");
            this.changeView(4);
        }



    }

    back() {
        if (this.state.currentView === "details") {

            this.setState({
                currentView: "location"
            })
        } else if (this.state.currentView === "photos") {

            this.setState({
                currentView: "details"
            })
        } else if (this.state.currentView === "pricing") {
            this.setState({
                currentView: "photos"
            })
        } else {

        }
    }
    changeView(newState) {

        if (newState === 2) {
            this.setState({
                currentView: "location"
            })
        } else if (newState === 3) {

            this.setState({
                currentView: "details"
            })
        } else if (newState === 4) {

            this.setState({
                currentView: "photos"
            })
        } else if (newState === 5) {
            this.setState({
                currentView: "pricing"
            })
        } else {

        }

    }
    setPhotos(formData) {
        this.setState({
            photos: formData,
            photosFlag: true,
            submitKey: false
        })
        this.changeView(5)

    }
    setPricing(availableFrom, availableTill, rent) {
        this.setState({
            pricingFlag: true,
            pricing: {
                availableFrom: availableFrom,
                availableTill: availableTill,
                rent: rent
            }
        })
        // console.log(availableFrom + availableTo + rent)
        setTimeout(() => {
            this.submitProperty()
        }, 100);

    }

    setLocation(country, street, city, state, zipcode) {

        console.log(country + street + city + state + zipcode);
        this.setState({
            locationFlag: true,
            location: {
                country: country,
                street: street,
                city: city,
                state: state,
                zipcode: zipcode
            },
            submitKey: false
        })
        this.changeView(3)

    }
    setDetails(headline, propDesc, aptType, bedrooms, accomodates, bathrooms) {
        console.log(headline + propDesc + aptType + bedrooms + accomodates + bathrooms)
        this.setState({
            detailsFlag: true,
            details: {
                headline: headline,
                propDesc: propDesc,
                aptType: aptType,
                bedrooms: bedrooms,
                accomodates: accomodates,
                bathrooms: bathrooms
            },
            submitKey: false
        })
        this.changeView(4)
    }

    // handle logout to destroy the cookie and clear local storage
    handleLogout = () => {
        // cookie.remove('cookie', { path: '/' })
        localStorage.clear();
        this.setState({
            myData:"",
            authFlag: true
        })
    }

    render() {
        require('./OwnerDashboard.css')
        let redirectVar = null, complete, remaining, location_icon, details_icon, photos_icon, pricing_icon,currentComponent;
        let  errorListing = null;

        if (!this.state.myData) {
            localStorage.clear();
            redirectVar = <Redirect to="/" />
        } else {
            if (this.state.myData.type == "T") {
                redirectVar = <Redirect to="/TravelerHome" />
            }
            complete = <i style={{ color: "#0089f0" }} class="far fa-check-circle  sideBarIcons"></i>
            remaining = <i class="far fa-circle sideBarIcons"></i>
            location_icon = remaining;
            details_icon = remaining;
            photos_icon = remaining;
            pricing_icon = remaining;
            if (this.state.locationFlag) {
                location_icon = complete
            }
            if (this.state.detailsFlag) {
                details_icon = complete
            }
            if (this.state.photosFlag) {
                photos_icon = complete
            }
            if (this.state.pricingFlag) {
                pricing_icon = complete
            }
            
            if (this.state.currentView == "pricing") {
                currentComponent = <OwnerPricing parentSubmit={this.setPricing} parentBack={this.back} />
            } else if (this.state.currentView === "location") {
                currentComponent = <OwnerLocation parentSubmit={this.setLocation} />
            } else if (this.state.currentView == "details") {
                currentComponent = <OwnerDetails parentSubmit={this.setDetails} parentBack={this.back} />
            } else if (this.state.currentView == "photos") {
                currentComponent = <OwnerPhotos parentSubmit={this.setPhotos} parentBack={this.back} />
            } else {
                currentComponent = <OwnerWelcome parentSubmit={this.changeView} />
            }
            
            if (this.state.errorListingFlag) {
                errorListing = <div className="errorColm9">
                    <i style={{ color: "#ff4848" }} class="fa fa-exclamation-circle fonticons"></i>
                    <div style={{ marginTop: "5px" }} > This property is already listed</div>
                </div>
            } else {
                errorListing = null
            }
            if (this.state.redirectFlag) {
                redirectVar = <Redirect to="/OwnerListing" />
            }
        }


        return (



            <div style={{ "backgroundColor": "#f7f7f8" }}>
                {redirectVar}
                <div id="mainDiv1">
                    <nav className="navbar navbar-expand-sm">
                        <div className="container-fluid" >
                            <div className="navbar-header" style={{ "marginLeft": "45px" }}>
                                <a className="navbar-brand" id="mainHeading2" href="/">HomeAway</a>
                            </div>

                            <ul className="nav navbar-nav navbar-right">


                                <li className="dropdown topNavBar  ">
                                    <a href="#" id='noFocus' className="dropdown-toggle" data-toggle="dropdown" style={{ marginRight: "10px", 'font-size': '16px', color: "gray" }}>
                                        <span>
                                            <img className="profileImg" src="https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png" />
                                        </span>
                                        <span style={{ "margin-left": "10px", "marginRight": "10px" }}>My Account</span>

                                        <span style={{ "margin-left": "5px" }} class="caret"></span>
                                    </a>
                                    <ul className="dropdown-menu" style={{ width: "100%", textAlign: "center", color: "gray" }}>
                                        <li id="">
                                            <a href="/OwnerInbox" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Inbox</a>
                                        </li>
                                        <li id="">
                                            <a href="/OwnerListing" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Property Details</a>
                                        </li>
                                        {/* <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Property archive</a>
                                        </li> */}
                                        <li id="">
                                            <a href="/OwnerDashboard" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Add new property</a>
                                        </li>
                                        <li id="">
                                            <a href="#" onClick={this.handleLogout} className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList' > Sign out</a>
                                        </li>


                                    </ul>
                                </li>
                                <li className="dropdown iconStyle"><i style={{ marginTop: "10px" }} className="far fa-bell"></i>
                                </li>
                                {/* <li className="dropdown topNAvBar"><i class="far fa-bell"></i></li> */}


                            </ul>
                        </div>
                    </nav>
                </div>

                <div>


                    <div class="container-fluid">
                        {errorListing}
                        <div class="row">
                            <div class="col-sm-4" >
                                <div className="sideBar">
                                    <div style={{ "cursor": "auto", textDecoration: "none" }} className="sideBarItems">{complete}Welcome</div>
                                    <div onClick={() => this.changeView(2)} className="sideBarItems">{location_icon}Location</div>
                                    <div onClick={() => this.changeView(3)} className="sideBarItems">{details_icon}Details</div>
                                    <div onClick={() => this.changeView(4)} className="sideBarItems">{photos_icon}Photos</div>
                                    <div onClick={() => this.changeView(5)} className="sideBarItems">{pricing_icon}Pricing</div>
                                </div>
                            </div>
                            <div class="col-sm-8" >


                                {currentComponent}

                                {/* <OwnerPhotos parentSubmit={this.setPhotos} /> */}



                            </div>
                        </div>
                    </div>



                </div>


                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>


        )
    }
}

export default OwnerDashboard;









