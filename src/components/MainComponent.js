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
import {postComment,fetchDishes,fetchComments,fetchPromos} from '../redux/actionCreators';
import {actions} from 'react-redux-form';
class Main extends Component{

  constructor(props){
    super(props);
    this.state={
    
    };
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
 
  render(){
    const HomePage=()=>{
      return(
        <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.err}
              leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
              promotion={this.props.promotions.promotions.filter((promotion)=>promotion.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              />
        )
    }

    const DishWithID=({match})=>{
        return(
          <DishDetails dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.err}
          comments={this.props.comments.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
          postComment={this.props.postComment}
          commentsErrMess={this.props.comments.errMess}
          />
        );
    }

    return (
      <div className="App"> 
      <Header/>
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
        <Route path="/menu/:dishId" component={DishWithID}/>
        <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
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

const mapDispatchToProps=dispatch=>({
  postComment:(dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment)),
  fetchDishes:()=>{dispatch(fetchDishes())},
  resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));