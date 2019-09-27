import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';
class DishDetails extends Component{

    renderDish(dish) {
        if (dish != null)
            return(
                <div className="col-12 col-md-5 m-1">
                <Card>
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
                </Card>
                </div>
            )
        else
            return(
                <div></div>
            )
      }
    renderComments(comments){
        if(comments==null)
        {
            return(
                <div></div>
            )
        }
        else
        {
            const comment=comments.map(cmt=>{
                return( <li key={cmt.id}>
                  <p>{cmt.comment}</p>
                  <p>-- {cmt.author},{cmt.date}
                  </p>
              </li>)
            })
            return(
                <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comment}
                </ul>
                </div>
            )
        }

      }
    render(){
        const selectedDish=this.props.dish;
        if(selectedDish==null)
            return(<div></div>);
        return(
            <div className="row">
                {this.renderDish(selectedDish)}
                
                {this.renderComments(selectedDish.comments)}
            </div>
        )
    }
}

export default DishDetails;