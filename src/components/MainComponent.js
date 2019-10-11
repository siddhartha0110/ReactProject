import React,{Component} from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutUsComponent';
import Footer from './FooterComponent';
import DishDetails from './DishdetailComponent';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
class Main extends Component{

  constructor(props){
    super(props);
    this.state={
    
    };
  }
 
  render(){
    const HomePage=()=>{
      return(
        <Home dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
              leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
              promotion={this.props.promotions.filter((promotion)=>promotion.featured)[0]}/>
        )
    }

    const DishWithID=({match})=>{
        return(
          <DishDetails dish={this.props.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
          comments={this.props.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}/>
        );
    }

    return (
      <div className="App"> 
      <Header/>
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
        <Route path="/menu/:dishId" component={DishWithID}/>
        <Route exact path="/contactus" component={Contact}/>
        <Route exact path="/aboutus" component={()=><About leaders={this.props.leaders} />}/>
        <Redirect to="/home"/>
      </Switch>
      <Footer/>
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  }
}

export default withRouter(connect(mapStateToProps)(Main));