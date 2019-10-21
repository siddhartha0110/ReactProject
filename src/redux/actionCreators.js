import * as actionTypes from './actionTypes';
import {baseUrl} from '../shared/baseUrl';

export const addComment=(comment)=>({
    type:actionTypes.ADD_COMMENT,
    payload:comment
});


//POSTING COMMENTS TO SERVER
export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

//POSTING FEEDBACK TO SERVER
export const postFeedback = (feedback) => (dispatch) => {

    const newFeedback = Object.assign({ date: new Date().toISOString() }, feedback);
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};
//FETCHING DISHES FROM SERVER
export const fetchDishes=()=>(dispatch)=>{
    dispatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes')
    .then(response=>{
        if(response.ok){
            return response;
        }
        else{
            var error=new Error('Error'+response.status+":"+response.statusText);
            error.response=response;
            throw error;
        }
    },
    error=>{
        var errMess=new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error=>dispatch(dishesFailed(error.message)));
}

export const dishesLoading=()=>({
    type:actionTypes.DISHES_LOADING
})

export const dishesFailed=(err)=>({
    type:actionTypes.DISHES_FAILED,
    value:err
})

export const addDishes=(dishes)=>({
    type:actionTypes.ADD_DISHES,
    value:dishes
})


//FETCHING COMMENTS FROM SERVER
export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response=>{
        if(response.ok){
            return response;
        }
        else{
            var error=new Error('Error'+response.status+":"+response.statusText);
            error.response=response;
            throw error;
        }
    },
    error=>{
        var errMess=new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error=>dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: actionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: actionTypes.ADD_COMMENTS,
    payload: comments
});

//FETCHING PROMOTIONS FROM SERVER
export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());
    return fetch(baseUrl + 'promotions')
    .then(response=>{
        if(response.ok){
            return response;
        }
        else{
            var error=new Error('Error'+response.status+":"+response.statusText);
            error.response=response;
            throw error;
        }
    },
    error=>{
        var errMess=new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error=>dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: actionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: actionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: actionTypes.ADD_PROMOS,
    payload: promos
});

//FETCHING LEADERS FROM SERVER
export const fetchLeaders=()=>(dispatch)=>{
    dispatch(leadersLoading(true));
    return fetch(baseUrl + 'leaders')
    .then(response=>{
        if(response.ok){
            return response;
        }
        else{
            var error=new Error('Error'+response.status+":"+response.statusText);
            error.response=response;
            throw error;
        }
    },
    error=>{
        var errMess=new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addleaders(leaders)))
    .catch(error=>dispatch(leadersFailed(error.message)));
}

export const leadersLoading=()=>({
    type:actionTypes.LEADERS_LOADING
})

export const leadersFailed=(err)=>({
    type:actionTypes.LEADERS_FAILED,
    value:err
})

export const addleaders=(leaders)=>({
    type:actionTypes.ADD_LEADERS,
    value:leaders
})