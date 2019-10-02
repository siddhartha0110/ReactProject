import React,{Component} from 'react';
import {Navbar,NavbarBrand,Jumbotron,Nav,NavbarToggler,Collapse,NavItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';
class Header extends Component{

    constructor(props){
        super(props);
        this.state={
            isOpen:false
        }
        this.toggleNav=this.toggleNav.bind(this);
    }
    toggleNav(){
        this.setState({isOpen:!this.state.isOpen});
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
                                <NavLink className="nav-link" to="/contacts">
                                    <span className="fa fa-address fa-lg"></span>Contact Us
                                </NavLink>
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
            </React.Fragment>
        );
    }
}
export default Header;