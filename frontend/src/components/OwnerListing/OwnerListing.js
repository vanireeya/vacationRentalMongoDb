import React, { Component } from 'react';
import OwnerLocation from '../OwnerLocation/OwnerLocation';
import OwnerDetails from '../OwnerDetails/OwnerDetails';
import OwnerPhotos from '../OwnerPhotos/OwnerPhotos';
import OwnerWelcome from '../OwnerWelcome/OwnerWelcome';
import OwnerPricing from '../OwnerPricing/OwnerPricing';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import logo from './1.jpg'
import logo2 from './2.jpg'
import logo3 from './3.jpg'
import { stat } from 'fs';
import {ROOT_URL} from '../../constants/constants';


//create the Navbar Component
class OwnerListing extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            myData: myData,
            properties: [],
            Cimages: []
        }
        this.handleLogout = this.handleLogout.bind(this)

    }

    componentDidMount() {

        if (this.state.myData) {
            axios.defaults.withCredentials = true;
            axios.get(`${ROOT_URL}/getList/` + this.state.myData.email,{headers: {   Authorization:  this.state.myData.token} })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status == 1) {
                        let info = response.data.info
                        let temp;
                        for (let i = 0; i < response.data.property.length; i++) {
                            let tempProperty = response.data.property[i].showImages;
                            for (let j = 0; j < tempProperty.length; j++) {
                                let temp = 'data:image/jpg;base64, ' + response.data.property[i].showImages[j]
                                response.data.property[i].showImages[j] = temp
                            }
                        }
                        this.setState({
                            properties: response.data.property,

                            // imageView: 'data:image/jpg;base64, ' + info.profileImage
                        })

                    }


                });
        }

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

    Cimages({ property }) {

        let details = property.showImages.map((imgs, key) => {
            console.log(key)
            if (key == 0) {
                return (
                    <div style={{ overflow: "hidden" }} class="item active">
                        <img src={imgs} />
                    </div>
                )
            } else {
                return (
                    <div style={{ overflow: "hidden" }} class="item">
                        <img src={imgs} />
                    </div>
                )
            }

        })
        return details
    }

    render() {
        require('./OwnerListing.css')
        let redirectVar = null;

        if (!this.state.myData) {
            localStorage.clear();
            redirectVar = <Redirect to="/" />
        } else {
            if (this.state.myData.type == "T") {
                redirectVar = <Redirect to="/TravelerHome" />
            }
        }

        let propertyList;

        if (this.state.properties && this.state.properties.length > 0) {
            propertyList = this.state.properties.map(property => {
                return (
                    <tr className="trstyling">
                        <td className="tdStyling" style={{ width: "31%", padding: "10px" }}>
                            {/* <img src={property.showImages[1]} /> */}
                            <div style={{ width: "96%", "overflow": "hidden" }} id={"slider" + property.pid} class="carousel slide" data-ride="carousel">

                                {/* <ol class="carousel-indicators">
                                    <li data-target={"#slider" + property.pid} data-slide-to="0" class="active"></li>
                                    <li data-target={"#slider" + property.pid} data-slide-to="1"></li>
                                    <li data-target={"#slider" + property.pid} data-slide-to="2"></li>
                                </ol> */}


                                <div class="carousel-inner">


                                    <this.Cimages property={property} />
                                </div>

                                <a class="left carousel-control" href={"#slider" + property.pid} data-slide="prev">
                                    <span class="glyphicon glyphicon-chevron-left"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="right carousel-control" href={"#slider" + property.pid} data-slide="next">
                                    <span class="glyphicon glyphicon-chevron-right"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </td>
                        <td className="tdStyling" style={{ width: "60%", padding: "10px" }}>
                            <div style={{ marginLeft: "10%" }}>
                                <div className="headingFont">{property.headline}</div>
                                <div className="addressFont margin10">{property.street + " " + property.city + " " + property.state + " " + property.country} </div>
                                <div className="margin10 descFont" style={{ width: "50%" }}>{property.description} </div>
                                <div className="margin10">
                                    <div>
                                        <span className="spanDiv">{property.apt_type}</span>
                                        <span className="marginLeft10 spanDiv">{property.bedrooms}BR</span>
                                        <span className="marginLeft10 spanDiv">{property.bathrooms}BA</span>
                                        <span className="marginLeft10 spanDiv">Sleeps {property.accomodates}</span>
                                    </div>
                                    <div>USD: {property.rent} per night</div>
                                    <div>Availablity: {property.availablefrom} - {property.availabletill}</div>
                                </div>
                            </div>
                        </td>
                        {/* <td>
                                        <button className="btn btn-primary">Details</button>
                                    </td> */}
                    </tr>
                    //    {testtr}
                )
            })
        } else {
            propertyList = <div style={{ color: "#200755", padding: "10px 10px 10px 0px" }}>
                <h2>You have not posted any property yet!</h2>
            </div>
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
                    <div>
                        <div className="outerDiv11 mainHeadFont">Property Lists</div>
                        <div className="outerDiv">
                            <table style={{ marginTop: "10px" }}>

                                {propertyList}
                            </table>

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

export default OwnerListing;









