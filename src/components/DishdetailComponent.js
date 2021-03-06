import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem,Button,
Modal,ModalHeader,ModalBody,Row,Col,Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import{Control,Errors,LocalForm} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform,Fade,Stagger} from 'react-animation-components';
    const required = (val) => val && val.length;
	const maxLength = (len) => (val) => !(val) || (val.length <= len);
	const minLength = (len) => (val) => !(val) || (val.length >= len);
    //Adding Comment Form
    class CommentForm extends Component{
        constructor(props){
            super(props)
            this.state={
                isModalOpen:false
            }
            this.handleSubmit=this.handleSubmit.bind(this);
            this.toggleModal=this.toggleModal.bind(this);
        }
        
        handleSubmit(values){
            this.toggleModal();
            this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
        }

        toggleModal(){
            this.setState({isModalOpen:!this.state.isModalOpen});
        }
        render(){
            return(
                <div>
                    <Button outline onClick={this.toggleModal}>
	          			<span className="fa fa-comments fa-lg"> Submit Comment </span>
	          		</Button>
                    <Modal toggle={this.toggleModal} isOpen={this.state.isModalOpen}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comments Here</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(val)=>this.handleSubmit(val)}>
                                <Row className="form-group">
                                    <Col md={2}>
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="author">Name</Label>
                                        <Control.text model=".author" name="author"
                                         className="form-control"
                                         validators={{
                                             required,minLength:minLength(2),maxLength:maxLength(15)
                                         }}
                                         />
                                         <Errors
                                         className="text-danger"
                                         model=".author"
                                         show="touched"
                                         messages={{
                                             required:"Required",
                                             minLength:"Min. 2 letters needed",
                                             maxLength:"Max. 15 letters limit"
                                         }}
                                         />
                                    </Col>
                                </Row>
				       			<Row className="form-group">
				       				<Col>
					       				<Label htmlFor="comment">Comment</Label>
					       					<Control.textarea model=".comment" id="comment" name="comment" rows="6"
	                                   		className="form-control"/>
	                                </Col>
				       			</Row>
				    			<Button type="submit" value="submit" color="primary">Submit</Button>         
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }

    //Rendering the dishes
    function RenderDish({dish}) {

        if (dish != null)
            return(
                <div className="col-12 col-md-5 m-1">
                     <FadeTransform in 
                        transformProps={{
                        exitTransform:'scale(0.5) translateY(-50%)'
                    }}>
                <Card>
                  <CardImg top src={ baseUrl + dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
                </Card>
                </FadeTransform>
                </div>
            )
        else
            return(
                <div></div>
            )
      }

    //Rendering Comments
    function RenderComments({comments,postComment,dishId}){
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
                    <Stagger in>
                        <Fade in>
                            {comment}
                        </Fade>
                    </Stagger>
                </ul>
                <CommentForm
                dishId={dishId}
                postComment={postComment}
                />
                </div>
            )
        }
    }


const DishDetails=(props)=>{
    const selectedDish=props.dish;
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }
    else if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(selectedDish!=null){
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{selectedDish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{selectedDish.name}</h3>
                    <hr/>
                </div>                
            </div>
            <div className="row">
                <RenderDish dish={selectedDish}/>
                <RenderComments comments={props.comments}
                postComment={props.postComment}
                dishId={props.dish.id}
                />
            </div>
        </div>
        )

   }  
   else{
       return(
           <div>
               
           </div>
       )
   }
}
export default DishDetails;