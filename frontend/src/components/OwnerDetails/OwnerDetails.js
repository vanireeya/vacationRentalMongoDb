import React, { Component } from 'react';

class OwnerDetails extends Component {
    constructor(props) {
        super(props);
        let details = JSON.parse(localStorage.getItem("details"));
        if (details) {
            this.state = {
                headline: details.headline,
                propDesc: details.propDesc,
                aptType: details.aptType,
                bedrooms: details.bedrooms,
                accomodates: details.accomodates,
                bathrooms: details.bathrooms,
                errorFlag: false
            }
        } else {
            this.state = {
                headline: "",
                propDesc: "",
                aptType: "",
                bedrooms: "",
                accomodates: "",
                bathrooms: "",
                errorFlag: false
            }
        }

        this.handleHeadlineChange = this.handleHeadlineChange.bind(this)
        this.handlePropDesc = this.handlePropDesc.bind(this)
        this.handleAptType = this.handleAptType.bind(this)
        this.handleBedrooms = this.handleBedrooms.bind(this)
        this.handleAccomodates = this.handleAccomodates.bind(this)
        this.handleBathrooms = this.handleBathrooms.bind(this)
        this.handleNext = this.handleNext.bind(this);
        this.handleBack=this.handleBack.bind(this)
    }

    handleAccomodates(e) {
        this.setState({
            accomodates: e.target.value
        })
    }
    handleAptType(e) {
        this.setState({
            aptType: e.target.value
        })
    }
    handleBathrooms(e) {
        this.setState({
            bathrooms: e.target.value
        })
    }
    handleBedrooms(e) {
        this.setState({
            bedrooms: e.target.value
        })

    }
    handleHeadlineChange(e) {
        this.setState({
            headline: e.target.value
        })
    }
    handlePropDesc(e) {
        this.setState({
            propDesc: e.target.value
        })
    }
    handleBack(){
        this.props.parentBack()
    }
    handleNext() {
        if (this.state.headline && this.state.propDesc && this.state.aptType && this.state.bedrooms && this.state.accomodates && this.state.bathrooms) {
            let details = {
                headline: this.state.headline,
                propDesc: this.state.propDesc,
                aptType: this.state.aptType,
                bedrooms: this.state.bedrooms,
                accomodates: this.state.accomodates,
                bathrooms: this.state.bathrooms
            }
            localStorage.setItem("details", JSON.stringify(details))
            this.props.parentSubmit(this.state.headline, this.state.propDesc, this.state.aptType, this.state.bedrooms, this.state.accomodates, this.state.bathrooms)
        } else {
            this.setState({
                errorFlag: true
            })
        }

    }
    render() {
        require('./OwnerDetails.css')
        let error;
        if (this.state.errorFlag) {
            error = <div className="errorColm1">
                <i style={{ color: "#ff4848" }} class="fa fa-exclamation-circle fonticons1"></i>
                <div > You have entered text that is longer or shorter than we allow.</div>
            </div>
        }
        return (
            <div className="formStyle1">
                <div className="formHeading1">Describe your property </div>
                <div className="formItems1" >
                    <div id="formLine1">
                        Start out with a descriptive headline and a detailed summary of your property.
                    </div>
                    {error}

                    <div className="margintop45">
                        <div><span className="labelStyle">Headline</span></div>
                        <input className="stylings" style={{ width: "100%" }} onChange={this.handleHeadlineChange} type="text" placeholder={this.state.headline} />
                    </div>
                    <div className="margintop45">
                        <div><span className="labelStyle">Property Description</span></div>
                        <textarea className="stylings" style={{ width: "100%" }} onChange={this.handlePropDesc} type="text" placeholder={this.state.propDesc} />
                    </div>

                    <div className="margintop22">
                        <div><span className="labelStyle">Property Type</span></div>
                        <select id="optionStylings1" onChange={this.handleAptType}>
                            <option value="" >Select</option>
                            <option value="Apartment" selected={this.state.aptType == "Apartment"}>Apartment</option>
                            <option value="Barn" selected={this.state.aptType == "Barn"}>Barn</option>
                            <option value="Bed and Breakfast" selected={this.state.aptType == "Bed and Breakfast"}>Bed and Breakfast</option>
                            <option value="Boat" selected={this.state.aptType == "Boat"}>Boat</option>
                            <option value="Bunglow" selected={this.state.aptType == "Bunglow"}>Bunglow</option>
                            <option value="cabin" selected={this.state.aptType == "can=bin"}>Cabin</option>
                            <option value="estate" selected={this.state.aptType == "estate"}>Estate</option>
                            <option value="farmhouse" selected={this.state.aptType == "farmhouse"}>Farmhouse</option>
                            <option value="guest house/pension" selected={this.state.aptType == "guest house/pension"}>Guest House</option>
                            <option value="hostel" selected={this.state.aptType == "hostel"}>Hostel</option>
                            <option value="hotel" selected={this.state.aptType == "hotel"}>Hotel</option>
                            <option value="hotel suites" selected={this.state.aptType == "hotel suites"}>Hotel Suites</option>
                            <option value="house" selected={this.state.aptType == "house"}>House</option>
                            <option value="resort" selected={this.state.aptType == "resort"}>Resort</option>
                            <option value="studio" selected={this.state.aptType == "studio"}>Studio</option>
                            <option value="Tower" selected={this.state.aptType == "Tower"}>Tower</option>
                            <option value="townhome" selected={this.state.aptType == "Catownhomebin"}>Townhome</option>
                            <option value="villa" selected={this.state.aptType == "villa"}>Villa</option>
                            <option value="yacht" selected={this.state.aptType == "yacht"}>Yacht</option>
                        </select>
                    </div>
                    <div className="margintop45">
                        <div><span className="labelStyle">Bedrooms</span></div>
                        <input className="stylings" onChange={this.handleBedrooms} type="number" placeholder={this.state.bedrooms} />
                    </div>
                    <div className="margintop45">
                        <div><span className="labelStyle">Accomodates</span></div>
                        <input className="stylings" onChange={this.handleAccomodates} type="number" placeholder={this.state.accomodates} />
                    </div>
                    <div className="margintop45">
                        <div><span className="labelStyle">Bathrooms</span></div>
                        <input className="stylings" onChange={this.handleBathrooms} type="number" placeholder={this.state.bathrooms} />
                    </div>
                    <hr>
                    </hr>
                    <div style={{ textAlign: "center" }}>
                        <button className="btn btn-primary buttonStyling1" onClick={this.handleBack} id="backButton">Back</button>
                        <button className="btn btn-primary buttonStyling2" onClick={this.handleNext}>Next</button>
                    </div>
                </div>
            </div>
        )
    }

}
export default OwnerDetails