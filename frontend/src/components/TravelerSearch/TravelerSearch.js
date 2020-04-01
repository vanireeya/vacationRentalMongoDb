import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeaderTraveller from '../HeaderTraveller/HeaderTraveller'
import cookie from 'react-cookies';
import imgs from './homeimg.jpg'
import { Redirect } from 'react-router';
import axios from 'axios';
import { ROOT_URL } from '../../constants/constants';


class TravelerSearch extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        if (this.props && this.props.location.state && this.props.location.state.property) {
            console.log(this.props.location.state.property)
            console.log(this.props.location.state.search)
            let response = this.props.location.state.property;
            for (let i = 0; i < response.length; i++) {
                let tempProperty = response[i].showImages;
                for (let j = 0; j < tempProperty.length; j++) {
                    let temp = 'data:image/jpg;base64, ' + response[i].showImages[j]
                    response[i].showImages[j] = temp
                }
            }
            this.state = {
                myData: myData,
                properties: response,
                bookProp: {},
                askQuestion: {},
                question: "",
                search: JSON.parse(this.props.location.state.search),
                authFlag: false,
                skip: 0,
                limit: 10,
                page: 0,
                displayPages: [],
                pname: "",
                bedroom: "",
                price: ""
            }
        } else {


            // let tempProperties = JSON.parse(this.props.location.state.search);
            let tempProperties = "";
            if (localStorage.getItem("searchProperties")) {
                tempProperties = JSON.parse(localStorage.getItem("searchProperties"))
            }

            this.state = {
                myData: myData,
                properties: [],
                bookProp: {},
                question: "",
                askQuestion: {},
                search: tempProperties,
                authFlag: false,
                skip: 0,
                limit: 10,
                page: 0,
                displayPages: [],
                pname: "",
                bedroom: "",
                price: ""
            }
        }
        console.log(this.state.search)
        this.setBookProperty = this.setBookProperty.bind(this);
        this.setAskOwnerProperty = this.setAskOwnerProperty.bind(this);
        this.CimagesPopUp = this.CimagesPopUp.bind(this);
        this.blockProperty = this.blockProperty.bind(this)
        this.handlePropDesc = this.handlePropDesc.bind(this)
        this.askOwnerQuestion = this.askOwnerQuestion.bind(this)
        this.getNext1 = this.getNext1.bind(this)
        this.fieldChangeHandler = this.fieldChangeHandler.bind(this)
        this.fieldChangeHandler1 = this.fieldChangeHandler1.bind(this)
        this.fieldChangeHandler2 = this.fieldChangeHandler2.bind(this)
        this.searchByName = this.searchByName.bind(this)
        this.customFilter = this.customFilter.bind(this)

    }


    fieldChangeHandler(e) {
        let temp = e.target.value
        this.setState({
            pname: temp
        })
    }
    fieldChangeHandler1(e) {
        let temp = e.target.value
        this.setState({
            bedroom: temp
        })
    }
    fieldChangeHandler2(e) {
        let temp = e.target.value
        this.setState({
            price: temp
        })
    }
    componentDidMount() {
        let tempvar = [];
        console.log(this.state.search.pages)
        if (this.state.search.pages) {
            for (let i = 1; i <= this.state.search.pages; i++) {
                tempvar.push(i);
            }
            this.setState({
                displayPages: tempvar
            })
        }


    }


    getNext1(number) {
        // alert(number)
        let skip = (number - 1) * this.state.limit
        if (this.state.search.city) {
            if (this.state.myData) {
                axios.defaults.withCredentials = true;

                // let data = {
                //     email: this.state.myData.email,
                //     skip: skip,
                //     limit: this.state.limit,

                // }
                data = JSON.stringify(data)
                let data = {
                    city: this.state.search.city,
                    tripStart: this.state.search.tripStart,
                    tripEnd: this.state.search.tripEnd,
                    guests: this.state.search.guests,
                    skip: skip,
                    limit: this.state.limit,

                }
                console.log(data)
                data = JSON.stringify(data)
                axios.defaults.withCredentials = true;
                axios.get(`${ROOT_URL}/search/` + data, { headers: { Authorization: this.state.myData.token } })
                    .then((response1) => {
                        console.log(response1.data);
                        if (response1.data.status == 1) {
                            let response = response1.data.property;
                            for (let i = 0; i < response.length; i++) {
                                let tempProperty = response[i].showImages;
                                for (let j = 0; j < tempProperty.length; j++) {
                                    let temp = 'data:image/jpg;base64, ' + response[i].showImages[j]
                                    response[i].showImages[j] = temp
                                }
                            }
                            let tempvar = [];
                            console.log(this.state.search.pages)
                            if (this.state.search.pages) {
                                for (let i = 1; i <= this.state.search.pages; i++) {
                                    tempvar.push(i);
                                }
                                this.setState({
                                    displayPages: tempvar
                                })
                            }
                            this.setState({
                                // authFlag: true,
                                properties: response,
                                search: data
                            })

                        }
                    });
            }
        } else {
            if (this.state.myData) {

                let tempProperties = JSON.parse(localStorage.getItem("searchProperties"))

                axios.defaults.withCredentials = true;

                // let data = {
                //     email: this.state.myData.email,
                //     skip: skip,
                //     limit: this.state.limit,

                // }
                data = JSON.stringify(data)
                let data = {
                    city: tempProperties.city,
                    tripStart: tempProperties.tripStart,
                    tripEnd: tempProperties.tripEnd,
                    guests: tempProperties.guests,
                    skip: skip,
                    limit: this.state.limit,

                }
                console.log(data)
                data = JSON.stringify(data)
                axios.defaults.withCredentials = true;
                axios.get(`${ROOT_URL}/search/` + data, { headers: { Authorization: this.state.myData.token } })
                    .then((response1) => {
                        console.log(response1.data);
                        if (response1.data.status == 1) {
                            let response = response1.data.property;
                            for (let i = 0; i < response.length; i++) {
                                let tempProperty = response[i].showImages;
                                for (let j = 0; j < tempProperty.length; j++) {
                                    let temp = 'data:image/jpg;base64, ' + response[i].showImages[j]
                                    response[i].showImages[j] = temp
                                }
                            }
                            this.setState({
                                // authFlag: true,
                                properties: response,
                                search: data
                            })

                        }
                    });
            }
        }

    }


    blockProperty() {
        console.log(this.state.bookProp)
        // let prop_data = this.state.bookProp;
        let prop_data = Object.assign({}, this.state.bookProp)
        // delete prop_data.booked;
        delete prop_data.showImages;
        console.log(prop_data)
        prop_data.booked = {
            block_from: this.state.search.tripStart,
            block_to: this.state.search.tripEnd,
            email: this.state.myData.email,
        }
        let data = {
            pid: this.state.bookProp.pid,
            block_from: this.state.search.tripStart,
            block_to: this.state.search.tripEnd,
            email: this.state.myData.email,
            property: prop_data
        }
        axios.defaults.withCredentials = true;
        axios.post(`${ROOT_URL}/book_property`, data, { headers: { Authorization: this.state.myData.token } })
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data)
                    this.setState({
                        authFlag: true
                    })
                } else {

                }
            }, resp => {
                if (resp.response && resp.response.data && resp.response.data.status === -1) {
                    alert("Oops!! something went wrong!")
                }
            });
    }

    searchByName() {
        if (this.state.pname != "" && this.state.pname != null) {
            if (this.state.myData) {

                let tempProperties = JSON.parse(localStorage.getItem("searchProperties"))

                axios.defaults.withCredentials = true;

                data = JSON.stringify(data)
                let data = {
                    city: tempProperties.city,
                    tripStart: tempProperties.tripStart,
                    tripEnd: tempProperties.tripEnd,
                    guests: tempProperties.guests,
                    skip: 0,
                    limit: 10,
                    pname: this.state.pname
                }
                console.log(data)
                data = JSON.stringify(data)
                axios.defaults.withCredentials = true;
                axios.get(`${ROOT_URL}/customSearch/` + data, { headers: { Authorization: this.state.myData.token } })
                    .then((response1) => {
                        console.log(response1.data);
                        if (response1.data.status == 1) {
                            let response = response1.data.property;
                            for (let i = 0; i < response.length; i++) {
                                let tempProperty = response[i].showImages;
                                for (let j = 0; j < tempProperty.length; j++) {
                                    let temp = 'data:image/jpg;base64, ' + response[i].showImages[j]
                                    response[i].showImages[j] = temp
                                }
                            }
                            this.setState({
                                // authFlag: true,
                                properties: response,
                                search: data,
                                displayPages: []
                            })

                        }
                    });
            }
        }
        // }
    }

    customFilter() {

        if (this.state.bedroom || this.state.price) {
            if (this.state.myData) {

                let tempProperties = JSON.parse(localStorage.getItem("searchProperties"))
                let tempData= JSON.parse(localStorage.getItem("myData"))

                axios.defaults.withCredentials = true;

                data = JSON.stringify(data)
                let data = {
                    city: tempProperties.city,
                    tripStart: tempProperties.tripStart,
                    tripEnd: tempProperties.tripEnd,
                    guests: tempProperties.guests,
                    skip: 0,
                    limit: 10,
                    bedroom: this.state.bedroom,
                    price:this.state.price
                }

                console.log(data)
                data = JSON.stringify(data)
                axios.defaults.withCredentials = true;
                axios.get(`${ROOT_URL}/customFilter/` + data, { headers: { Authorization: tempData.token } })
                    .then((response1) => {
                        console.log(response1.data);
                        if (response1.data.status == 1) {
                            let response = response1.data.property;
                            for (let i = 0; i < response.length; i++) {
                                let tempProperty = response[i].showImages;
                                for (let j = 0; j < tempProperty.length; j++) {
                                    let temp = 'data:image/jpg;base64, ' + response[i].showImages[j]
                                    response[i].showImages[j] = temp
                                }
                            }
                            this.setState({
                                // authFlag: true,
                                properties: response,
                                search: data,
                                displayPages: []
                            })

                        }
                    });
            }
        }
    }

    askOwnerQuestion() {
        console.log(this.state.askQuestion)
        console.log(this.state.question)
        // let prop_data = Object.assign({}, this.state.bookProp)
        // delete prop_data.showImages;
        // console.log(prop_data)
        // alert(Date.now())
        let conversation = {
            cid: Date.now(),
            propertyStreet: this.state.askQuestion.street,
            propertyHeadline: this.state.askQuestion.headline,
            ownerId: this.state.askQuestion.ownderId,
            travellerName: this.state.myData.firstname + " " + this.state.myData.lastname,
            travellerEmail: this.state.myData.email,
            travellerId: this.state.myData.uid,
            msg: [{
                msg: this.state.question,
                msgBy: this.state.myData.firstname + " " + this.state.myData.lastname
            }]
        }
        console.log(conversation)

        axios.defaults.withCredentials = true;
        axios.post(`${ROOT_URL}/addConversation`, conversation, { headers: { Authorization: this.state.myData.token } })
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data)
                    alert("Message successfully sent!")
                } else {
                    alert("Oops!! something went wrong!")
                }
            }, resp => {
                if (resp.response && resp.response.data && resp.response.data.status === -1) {
                    alert("Oops!! something went wrong!")
                }
            });
    }


    setBookProperty(property) {
        this.setState({
            bookProp: property
        })
    }
    handlePropDesc(e) {
        this.setState({
            question: e.target.value
        })
    }


    setAskOwnerProperty(property) {
        this.setState({
            askQuestion: property,
            question: "",
        })
        console.log(this.state.askQuestion)
    }



    CimagesPopUp() {
        if (this.state && this.state.bookProp && this.state.bookProp.showImages) {
            let details = this.state.bookProp.showImages.map((imgs, key) => {
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
        } else {
            return null
        }

    }
    Cimages({ property }) {

        let details = property.showImages.map((imgs, key) => {

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
        require('./TravelerSearch.css')

        let propertyList, redirectVar;
        if (this.state.properties && this.state.properties.length > 0) {
            propertyList = this.state.properties.map(property => {
                return (
                    <tr className="trstyling">
                        <td className="tdStyling" style={{ width: "31%", padding: "10px" }}>
                            <div style={{ width: "96%", "overflow": "hidden" }} id={"slider" + property.pid} class="carousel slide" data-ride="carousel">

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
                        <td className="tdStyling" style={{ width: "56%", padding: "10px" }}>
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
                        <td>
                            <button className="btn btn-primary" data-toggle="modal" onClick={() => {
                                this.setBookProperty(property)
                            }} data-target="#myModal">Book Now!</button>
                            <button className="btn btn-primary" style={{ marginTop: "5%" }} data-toggle="modal" onClick={() => {
                                this.setAskOwnerProperty(property)
                            }} data-target="#myModal1">Ask Owner!</button>
                        </td>
                        <td>

                        </td>
                    </tr>
                )
            })
        } else {
            propertyList = <div style={{ color: "#200755", padding: "10px 10px 10px 0px" }}>
                <h2>No property found for your search!</h2>
            </div>
        }

        if (this.state.authFlag) {
            redirectVar = <Redirect to="/MytripTraveller" />

        }
        const renderPageNumbers = this.state.displayPages.map(number => {
            return (

                <li>
                    <a onClick={() => { this.getNext1(number) }} href="#">
                        {number}
                    </a>
                </li>
                // <li
                //     key={number}
                //     id={number}
                //     onClick={() => this.numberClicked({ number })}

                // >
                //     {number}
                // </li>
            );
        });

        return (
            <div >
                {redirectVar}

                <HeaderTraveller />
                <div>
                    <div>
                        <div className="outerDiv11 mainHeadFont">Property Lists
                        <div>
                                <input style={{ marginTop: '18px' }} name="fname" value={this.state.pname} onChange={this.fieldChangeHandler} className="pwsdInput" placeholder="Search Property by name" type="text" id="pswd" />
                                <button type="button" onClick={this.searchByName} style={{ marginLeft: "2%", color: "white", backgroundColor: "blue" }} className=" btn btn-default btn-round-lg btn-lg" href="#" id="searchButton">Search </button>

                            </div>
                            <div>
                                {/* <button >Filter</button> */}


                                <input style={{ marginTop: '18px' }} name="fname" value={this.state.bedroom} onChange={this.fieldChangeHandler1} className="pwsdInput1" style={{width:"23%"}} placeholder="Min Number of bedrooms (optional)" type="number" id="pswd" />
                                <input style={{ marginTop: '18px' }} name="fname" value={this.state.price} onChange={this.fieldChangeHandler2} className="pwsdInput1" placeholder="Max Price (optional)" type="number" id="pswd" />
                                {/* <input style={{ marginTop: '18px' }} name="fname" value={this.state.location} onChange={this.fieldChangeHandler3} className="pwsdInput1" placeholder="Location (optional)" type="text" id="pswd" /> */}
                                <button type="button" onClick={this.customFilter} style={{ marginLeft: "2%", color: "white", backgroundColor: "blue" }} className=" btn btn-default btn-round-lg btn-lg" href="#" id="searchButton">Filter </button>


                            </div>

                        </div>
                        <div className="outerDiv">
                            <table style={{ marginTop: "10px" }}>
                                {propertyList}
                            </table>
                            <ul class="pagination">
                                {renderPageNumbers}
                            </ul>
                        </div>
                    </div>

                </div>








                <div class="modal" id="myModal" style={{ marginTop: "-24px" }}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body" >
                                <button type="button" class="close" style={{ marginRight: "0px" }} data-dismiss="modal">&times;</button>

                                <div style={{ width: "95%", "overflow": "hidden", height: "398px", marginLeft: "3%" }} class="carousel slide" id="MyCarousel">
                                    <div class="carousel-inner">
                                        <this.CimagesPopUp />
                                    </div>
                                    <a href="#MyCarousel" class="left carousel-control" data-slide="prev"><span class="icon-prev"></span></a>
                                    <a href="#MyCarousel" class="right carousel-control" data-slide="next"><span class="icon-next"></span></a>
                                </div>
                                <table style={{ marginTop: "10px" }}>
                                    <tr>
                                        <td className="popTr">
                                            <div style={{ fontSize: "11px", color: "#7a868e" }}>Check-in</div>
                                            <div style={{ fontSize: "13px", color: "#0067db" }}>{this.state.search.tripStart}</div>
                                        </td>
                                        <td className="popTr">
                                            <div style={{ fontSize: "11px", color: "#7a868e" }}>Check-out</div>
                                            <div style={{ fontSize: "13px", color: "#0067db" }}>{this.state.search.tripEnd}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="popTr" colSpan="2">
                                            <div style={{ fontSize: "11px", color: "#7a868e" }}>guest</div>
                                            <div style={{ fontSize: "13px", color: "#0067db" }}>{this.state.search.guests}</div>
                                        </td>
                                    </tr>
                                </table>

                                <div style={{ marginTop: "10px", marginLeft: "0" }}>
                                    <span style={{ fontSize: "17px", float: "left", marginLeft: "10px" }} className="fontDesign">${this.state.bookProp.rent}.00 x {this.state.bookProp.days} nights</span>
                                    <span style={{ fontSize: "17px", float: "right", marginRight: "10px" }} className="fontDesign"> ${this.state.bookProp.totalCost}.00</span>
                                </div>
                                <div style={{ textAlign: "center", marginTop: "35px" }}>
                                    <button type="button" onClick={this.blockProperty} class="btn btn-primary" style={{ borderRadius: "27px" }} data-dismiss="modal">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="modal" id="myModal1" >
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-body" >
                                <button type="button" class="close" style={{ marginRight: "0px" }} data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Ask Owner a Question</h4>

                                <table style={{ marginTop: "10px" }}>
                                    <tr>
                                        <td className="popTr">
                                            <div style={{ fontSize: "11px", color: "#7a868e" }}>Check-in</div>
                                            <div style={{ fontSize: "13px", color: "#0067db" }}>{this.state.search.tripStart}</div>
                                        </td>
                                        <td className="popTr">
                                            <div style={{ fontSize: "11px", color: "#7a868e" }}>Check-out</div>
                                            <div style={{ fontSize: "13px", color: "#0067db" }}>{this.state.search.tripEnd}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="popTr" colSpan="2">
                                            <div style={{ fontSize: "11px", color: "#7a868e" }}>guest</div>
                                            <div style={{ fontSize: "13px", color: "#0067db" }}>{this.state.search.guests}</div>
                                        </td>
                                    </tr>
                                </table>
                                <div style={{ marginTop: "20px", marginLeft: "0" }}>
                                    <textarea className="" style={{ width: "100%", padding: "2%", height: "150px" }} onChange={this.handlePropDesc} value={this.state.question} type="text" placeholder="Message to owner" />
                                </div>
                                <div style={{ textAlign: "center", marginTop: "35px" }}>
                                    <button type="button" onClick={this.askOwnerQuestion} class="btn btn-primary" style={{ borderRadius: "27px", width: "100%", height: "41px" }} data-dismiss="modal">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TravelerSearch;