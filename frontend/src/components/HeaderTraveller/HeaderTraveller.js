import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//create the Navbar Component
class HeaderTraveller extends Component {
    constructor(props) {
        super(props);
        let myData;
        if (this.props.myData) {
            myData = this.props.myData
        } else {
            myData = JSON.parse(localStorage.getItem('myData'));
        }

        this.state = {
            myData: myData,
            authFlag: false,
            imgView: myData.profileImage

        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this)
        // this.updateUserInfo = this.updateUserInfo.bind(this)
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
    componentDidMount() {
        this.handleImageChange()
    }
    handleImageChange = () => {
        if (this.props.myData.profileImage) {
            // let imagePreview = 'data:image/jpg;base64, ' + this.props.myData.profileImage;
            this.setState({
                imgView: this.props.myData.profileImage
                // imgView: imagePreview
            })
        }
    }

    // updateUserInfo = () => {
    //     let myData = JSON.parse(localStorage.getItem('myData'));
    //     this.setState({
    //         myData: myData
    //     })
    //     this.handleImageChange()
    // }
    render() {
        let redirectVar;
        require('./HeaderTraveller.css')
        if (this.state.myData.type == "O") {
            redirectVar = <Redirect to="/OwnerDashboard" />
        }
        if ( !this.state.myData ) {
            localStorage.clear();
            redirectVar = <Redirect to="/" />
        }
        return (



            <div>
                {redirectVar}
                <div id="mainDiv1">
                    <nav className="navbar navbar-expand-sm">
                        <div className="container-fluid" style={{ marginTop: "15px" }}>
                            <div className="navbar-header">
                                <a className="navbar-brand" style={{ marginTop: '1px' }} id="mainHeading1" href="/">HomeAway</a>
                            </div>

                            <ul className="nav navbar-nav navbar-right">
                                <li >
                                    <a href="#" id="noFocus" style={{ 'color': "#2a6ebb", 'font-size': '15px', marginRight: '-4px' }}>Trip Boards</a>
                                </li>


                                <li className="dropdown">
                                    <a href="#" id='noFocus' className="dropdown-toggle" data-toggle="dropdown" style={{ 'color': "#2a6ebb", 'font-size': '15px' }}>
                                        <span><img className="profileImg" src={this.props.myData.profileImage} /></span>
                                        {this.props.myData.firstname} <span class="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li id="">
                                            <a href="/TravelerInbox" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="far fa-envelope" style={{ 'margin-right': '7px', 'color': 'grey' }}></i>Inbox</a>
                                        </li>
                                        <li id="">
                                            <a href="/MytripTraveller" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="fa fa-suitcase" style={{ 'margin-right': '7px', 'color': 'grey' }}></i>My Trips</a>
                                        </li>
                                        <li id="">
                                            <a href="/ProfileTraveller" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="fa fa-user" style={{ 'margin-right': '7px', 'color': 'grey' }}></i>My profile</a>
                                        </li>
                                        {/* <li id="">
                                            <a href="/AccountTraveller" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="fa fa-cog" style={{ 'margin-right': '7px', 'color': 'grey' }}></i>Account</a>
                                        </li> */}
                                        {/* <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><i className="fa fa-co" style={{'margin-right':'7px','color':'grey'}}></i>Owner Dashboard</a>
                                        </li> */}
                                        <li id="">
                                            <a href="#" onClick={this.handleLogout} className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  ><span class="glyphicon glyphicon-log-out" style={{ 'margin-right': '7px', 'color': 'grey' }}></span>Logout</a>
                                        </li>


                                    </ul>
                                </li>
                                <li className="dropdown iconStyle">
                                    {/* <Link to="/TravelerInbox" > */}
                                        <i className="far fa-envelope"></i>

                                    {/* </Link> */}
                                </li>

                                <li className="dropdown">
                                    <a href="#" id='noFocus' className="dropdown-toggle" data-toggle="dropdown" style={{ 'color': "#2a6ebb", 'font-size': '15px' }}>Help <span class="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Visit Help Center</a>
                                        </li>
                                        <li><a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right' style={{ 'padding': '10px' }}>Travelers</a></li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >How it works</a>
                                        </li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Security Center</a>
                                        </li>
                                        <li><a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right' style={{ 'padding': '10px' }}>Homeowners</a></li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >How it works</a>
                                        </li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >List your property</a>
                                        </li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Community</a>
                                        </li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >Discovery Hub</a>
                                        </li>

                                        <li><a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right' style={{ 'padding': '10px' }}>Property Managers</a></li>
                                        <li id="">
                                            <a href="#" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right dropList'  >List your property</a>
                                        </li>
                                    </ul>
                                </li>

                                <li style={{ marginRight: "15px" }}>
                                    <button type="button" className=" btn btn-default btn-round-lg btn-lg" href="#" id="searchButton">List your property</button>
                                </li>
                                <li style={{ marginRight: "15px" }}>
                                    <img alt="HomeAway birdhouse" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img>
                                </li>
                            </ul>
                            {/* {navLogin}s */}
                        </div>
                    </nav>
                </div>
                <div id="mainDiv1" style={{ "padding": "8px" }}>
                    {/* <nav className="navbar navbar-expand-sm"> */}
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" id="mainHeading1" href="#"></a>
                        </div>
                        <ul className="nav navbar-nav ">
                            <li >
                                <a href="/TravelerInbox" id="secNav">Inbox</a>
                            </li>
                            <li >
                                <a href="/MytripTraveller" id='secNav' >My trips </a>
                            </li>
                            <li >
                                <a href="/ProfileTraveller" id='secNav' >Profile</a>
                            </li>
                            {/* <li >
                                <a href="/AccountTraveller" id='secNav' >Account</a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}


const mapStateToProps = state => {
    console.log(state)
    return {
        myData: state.reducer.myData
    }
}
export default connect(mapStateToProps)(HeaderTraveller);

// export default HeaderTraveller;