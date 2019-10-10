/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{Component} from 'react';
import {Breadcrumb,BreadcrumbItem,Button,Form,FormGroup,Label,Input,Col,FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';

class Contact extends Component {

    constructor(props){
        super(props);
        this.state={
            firstname:'',
            lastname:'',
            phone:'',
            email:'',
            agree:false,
            contactType:'Phone',
            message:'',
            changed:{
                firstname:'',
                lastname:'',
                phone:'',
                email:''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    handleChange=(field)=>(event)=>{
        this.setState({changed:{...this.state.changed,[field]:true}});
    }

    validate(firstname,lastname,phone,email){
        const errors={
            firstname:'',
            lastname:'',
            phone:'',
            email:''
        };
        if (this.state.changed.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be greater than 3 characters';
        else if (this.state.changed.firstname && firstname.length > 12)
            errors.firstname = 'First Name should be smaller than 12 characters';

        if (this.state.changed.lastname && lastname.length < 3)
            errors.lastname = 'Last Name should be greater than 3 characters';
        else if (this.state.changed.lastname && lastname.length > 15)
            errors.lastname = 'Last Name should be smaller 15 characters';

        const numberRegex = /^\d+$/;
        if (this.state.changed.phone && !numberRegex.test(phone))
            errors.phone = 'No letters are allowed in phone number and 10 digits are allowed';
        
        const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
        if (this.state.changed.email && !emailRegex.test(email)) 
            errors.email = 'Inavlid Email ID';

    return errors;
    }

    render(){

        const errors=this.validate(this.state.firstname,this.state.lastname,this.state.phone,this.state.email);
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        Near GVK Toll Plaza<br />
		                Manipal University Jaipur<br />
		                Jaipur,INDIA<br />
                        <i className="fa fa-phone"></i>: +91 70734 90367<br />
                        <i className="fa fa-fax"></i>: +91 70734 90367<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+917073490367"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send Us Your Feedback</h3>
                </div>
                <div className="col-12 col-md-9">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label htmlFor="firstname" md={2}>First Name:</Label>
                            <Col md={10}>
                                <Input type="text" id="firstname" name="firstname"
                                placeholder="First Name"
                                value={this.state.firstname}
                                valid={errors.firstname === ''}
                                invalid={errors.firstname !== ''}
                                onBlur={this.handleChange('firstname')}
                                onChange={this.handleInputChange}/>
                                <FormFeedback>{errors.firstname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="lastname" md={2}>Last Name:</Label>
                            <Col md={10}>
                                <Input type="text" id="lastname" name="lastname"
                                placeholder="Last Name"
                                value={this.state.lastname}
                                valid={errors.lastname === ''}
                                invalid={errors.lastname !== ''}
                                onBlur={this.handleChange('lastname')}
                                onChange={this.handleInputChange}/>
                                <FormFeedback>{errors.lastname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="phone" md={2}>Mobile Number:</Label>
                            <Col md={10}>
                                <Input type="tel" id="phone" name="phone"
                                placeholder="Mobile Number"
                                value={this.state.phone}
                                valid={errors.phone === ''}
                                invalid={errors.phone !== ''}
                                onBlur={this.handleChange('phone')}
                                onChange={this.handleInputChange}/>
                                <FormFeedback>{errors.phone}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="email" md={2}>Email:</Label>
                            <Col md={10}>
                                <Input type="email" id="email" name="email"
                                placeholder="Email"
                                value={this.state.email}
                                valid={errors.email === ''}
                                invalid={errors.email !== ''}
                                onBlur={this.handleChange('email')}
                                onChange={this.handleInputChange}/>
                                <FormFeedback>{errors.email}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size: 6, offset: 2}}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox"
                                            name="agree"
                                            checked={this.state.agree}
                                            onChange={this.handleInputChange} /> {' '}
                                        <strong>May we contact you?</strong>
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col md={{size: 3, offset: 1}}>
                                <Input type="select" name="contactType"
                                        value={this.state.contactType}
                                        onChange={this.handleInputChange}>
                                    <option>Phone</option>
                                    <option>Email</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="message" md={2}>Your Feedback</Label>
                            <Col md={10}>
                                <Input type="textarea" id="message" name="message"
                                    rows="12"
                                    value={this.state.message}
                                    onChange={this.handleInputChange}></Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size: 10, offset: 2}}>
                                <Button type="submit" color="primary">
                                    Send Feedback
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    );
    }
}

export default Contact;