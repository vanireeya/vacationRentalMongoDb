import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeaderTraveller from '../HeaderTraveller/HeaderTraveller'
import axios from 'axios';
import { connect } from 'react-redux';
import {ROOT_URL} from '../../constants/constants';


// import {HeaderTraveller} from './HeaderTraveller'
// import FaEnvelope from 'react-icons/fa'
import cookie from 'react-cookies';

import { Redirect } from 'react-router';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

var property = {
    name: "sdalkf",
    pid: 3

}
//create the Navbar Component
class TravelerInbox extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            myData: myData,
            property: {

                name: "sdalkf",
                pid: 3

            },
            replyMsg: "",

        }
        this.sendReply = this.sendReply.bind(this);
        this.handlePropDesc = this.handlePropDesc.bind(this)
    }
    componentDidMount() {
        if (this.state.myData) {
            axios.defaults.withCredentials = true;
            axios.get(`${ROOT_URL}/getMessageList/` + this.state.myData.email, { headers: { Authorization: this.state.myData.token } })
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

    sendReply(property) {
        console.log(property)
        if (this.state.replyMsg && this.state.replyMsg != "" && this.state.replyMsg != null) {
            let data = {
                traveler: this.state.myData.email,
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
            // document.getElementById('myReply').value = ''
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
                    // <div className="addressFont ">{imgs.msgBy}: {imgs.msg}  </div>
                    <div className="addressFont ">You: {imgs.msg}  </div>


                )
            } else {
                return (
                    // <div className="addressFont ">"you": {imgs.msg}  </div>
                    <div className="addressFont "><span style={{color:"blue"}}>{imgs.msgBy}</span>: {imgs.msg}  </div>

                )
            }
            // <div className="addressFont ">{imgs.msgBy}: {imgs.msg}  </div>

        })
        return details
    }

    render() {
        require('./TravelerInbox.css')
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
            <div>
                {/* {redirectVar} */}

                <HeaderTraveller />
                <div>
                    <div style={{ marginTop: "18px" }}>
                        <div className="outerDiv11 mainHeadFont">Your messages...</div>
                        <div className="outerDiv">
                            {/* <table style={{ marginTop: "10px" }}> */}

                            {propertyList}
                            {/* </table> */}

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    // alert(state.login.myData)
    console.log(state)
    return {
        myData: state.reducer.myData
    }
}

export default connect(mapStateToProps)(TravelerInbox);

// export default MytripTraveller;