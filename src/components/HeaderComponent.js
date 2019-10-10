import React,{Component} from 'react';
import {Navbar,NavbarBrand,Jumbotron,Nav,NavbarToggler,Collapse,NavItem,Button
    ,Modal,ModalBody,ModalHeader,Form,FormGroup,Label,Input} from 'reactstrap';
import {NavLink} from 'react-router-dom';
class Header extends Component{

    constructor(props){
        super(props);
        this.state={
            isOpen:false,
            isModalOpen:false
        }
        this.toggleNav=this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }

    toggleNav(){
        this.setState({isOpen:!this.state.isOpen});
    }

    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen});
    }

    handleLogin(event){
        this.toggleModal();
        alert("Username is:"+this.username.value+"Password is:"+this.password.value+"Remember Me:"+this.remember.value);
        event.preventDefault();
    }

    render(){
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" alt="Logo" height="30" width="41"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isOpen}  navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-home fa-lg"></span>Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/aboutus">
                                    <span className="fa fa-info fa-lg"></span>About Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu">
                                    <span className="fa fa-list fa-lg"></span>Menu
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/contactus">
                                    <span className="fa fa-address fa-lg"></span>Contact Us
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button outline onClick={this.toggleModal}>
                                    <span className="fa fa-sign-in fa-lg">Login</span>
                                </Button>
                            </NavItem>
                        </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Restaurant ConFusion</h1>
                                <p>Fusing Dishes, Making New Food.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>
                        Login
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label  htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                innerRef={(input)=>this.username=input}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label  htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                innerRef={(input)=>this.password=input}></Input>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input)=>this.remember=input}></Input>
                                    Remember Me
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" type="submit" value="submit">Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}
export default Header;