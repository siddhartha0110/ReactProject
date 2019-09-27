import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

    function RenderDish({dish}) {
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
    function RenderComments({comments}){
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
                  <p>-- {cmt.author},{new Intl.DateTimeFormat('en-US',
                  {year:'numeric',month:'short',day:'2-digit'})
                  .format(new Date(Date.parse(cmt.date)))}
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
    const DishDetails=(props)=>{
        const selectedDish=props.dish;
        if(selectedDish==null)
            return(<div></div>);
        return(
            <div className="container">
            <div className="row">
                <RenderDish dish={selectedDish}/>
                <RenderComments comments={selectedDish.comments}/>
            </div>
            </div>
        )

    }
       


export default DishDetails;