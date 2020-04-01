import React, { Component } from 'react';
import OwnerLocation from '../OwnerLocation/OwnerLocation';
import OwnerDetails from '../OwnerDetails/OwnerDetails';
import OwnerPhotos from '../OwnerPhotos/OwnerPhotos';
import OwnerWelcome from '../OwnerWelcome/OwnerWelcome';
import OwnerPricing from '../OwnerPricing/OwnerPricing';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import {ROOT_URL} from '../../constants/constants';

// import logo from './1.jpg'
// import logo2 from './2.jpg'
// import logo3 from './3.jpg'
import { stat } from 'fs';


//create the Navbar Component
class OwnerInbox extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            myData: myData,
            properties: [],
            Cimages: []
        }
        this.handleLogout = this.handleLogout.bind(this)
        this.handlePropDesc = this.handlePropDesc.bind(this)

    }

    componentDidMount() {
        if (this.state.myData) {
            axios.defaults.withCredentials = true;
            axios.get(`${ROOT_URL}getMessageList/` + this.state.myData.email, { headers: { Authorization: this.state.myData.token } })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status == 1) {

                        this.setState({
                            messages: response.data.info,
                        })

                    }


                });
        }
    }


    
    handlePropDesc(e) {
        this.setState({
            replyMsg: e.target.value
        })
    }

    // componentDidMount() {

    //     if (this.state.myData) {
    //         axios.defaults.withCredentials = true;
    //         axios.get('http://localhost:3001/getList/' + this.state.myData.email)
    //             .then((response) => {
    //                 console.log(response.data);
    //                 if (response.data.status == 1) {
    //                     let info = response.data.info
    //                     let temp;
    //                     for (let i = 0; i < response.data.property.length; i++) {
    //                         let tempProperty = response.data.property[i].showImages;
    //                         for (let j = 0; j < tempProperty.length; j++) {
    //                             let temp = 'data:image/jpg;base64, ' + response.data.property[i].showImages[j]
    //                             response.data.property[i].showImages[j] = temp
    //                         }
    //                     }
    //                     this.setState({
    //                         properties: response.data.property,

    //                         // imageView: 'data:image/jpg;base64, ' + info.profileImage
    //                     })

    //                 }


    //             });
    //     }

    // }
    // handle logout to destroy the cookie and clear local storage
    handleLogout = () => {
        // cookie.remove('cookie', { path: '/' })
        localStorage.clear();
        this.setState({
            myData:"",
            authFlag: true
        })
    }
    sendReply(property) {
        console.log(property)
        if (this.state.replyMsg && this.state.replyMsg != "" && this.state.replyMsg != null) {
            let data = {
                traveler: property.travellerEmail,
                ownerId: property.ownerId,
                cid: property.cid,
                msg: {
                    msgBy: this.state.myData.firstname + " " + this.state.myData.lastname,
                    msg: this.state.replyMsg
                }
            }

            axios.defaults.withCredentials = true;
            axios.post(`${ROOT_URL}/addMessage`, data,{headers: {   Authorization:  this.state.myData.token} })
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log(response.data)
                        // alert("Message successfully sent!")
                    } else {
                        alert("Oops!! something went wrong!")
                    }
                }, resp => {
                    if (resp.response && resp.response.data && resp.response.data.status === -1) {
                        alert("Oops!! something went wrong!")
                    }
                });
            let msg = this.state.messages;

            msg.forEach(element => {
                if (element.cid == property.cid) {
                    element.msg.push({
                        msgBy: this.state.myData.firstname + " " + this.state.myData.lastname,
                        msg: this.state.replyMsg
                    })
                }
            });

            console.log(msg)
            this.setState({
                messages: msg,
                replyMsg: "",
                
            })
            let temp="myReply"+property.cid
            document.getElementById(temp).value = ''
        }

    }

    Cimages({ property }) {

        var traveler = property.travellerName
        console.log(property)
        let details = property.msg.map((imgs, key) => {
            console.log(imgs.msgBy);
            console.log(traveler)
            if (imgs.msgBy == traveler) {
                return (
                    <div className="addressFont "><span style={{color:"blue"}}>{imgs.msgBy}</span>: {imgs.msg}  </div>
                    // <div className="addressFont ">You: {imgs.msg}  </div>


                )
            } else {
                return (
                    <div className="addressFont ">You: {imgs.msg}  </div>
                    // <div className="addressFont ">{imgs.msgBy}: {imgs.msg}  </div>

                )
            }
            // <div className="addressFont ">{imgs.msgBy}: {imgs.msg}  </div>

        })
        return details
    }
    render() {
        require('./OwnerInbox.css')
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

        if (this.state.messages && this.state.messages.length > 0) {
            propertyList = this.state.messages.map(property => {
                return (


                    <div className="trstyling">

                        <div className="tdStyling" style={{ padding: "10px" }}>
                            <div>
                                <div className="headingFont">{property.propertyHeadline}</div>

                                <div >
                                    <this.Cimages property={property} />
                                </div>
                                {/* <div data-toggle="collapse" style={{ cursor: "pointer" }} data-target="#demo" className="addressFont "><a>click here to reply</a></div>
                                 <div id="demo" class="collapse">
                                    <div className=" " >
                                        <textarea className="" style={{ width: "100%", padding: "0%", height: "100px" }} onChange={this.handlePropDesc} value={this.state.question} type="text" placeholder="Your Reply" />
                                    </div>
                                </div> */}
                                <div className=" " style={{ marginTop: "10px" }} >
                                    <textarea className="" id={"myReply"+property.cid} style={{ width: "100%", padding: "1%", }} onChange={this.handlePropDesc} type="text" placeholder="Your Reply" />
                                    <button className="btn btn-primary" style={{ backgroundColor: "green", borderColor: "green" }} value={property} onClick={() => this.sendReply(property)}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            propertyList = <div style={{ color: "#200755", padding: "10px 10px 10px 0px" }}>
                <h2>No Messages!</h2>

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
                        <div className="outerDiv11 mainHeadFont">Messages</div>
                        <div className="outerDiv">
                            {/* <table style={{ marginTop: "10px" }}> */}

                                {propertyList}
                            {/* </table> */}

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

export default OwnerInbox;









