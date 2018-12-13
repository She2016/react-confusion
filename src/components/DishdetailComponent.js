import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem,
        Modal, Button, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'


const required = (val) => val && val.length
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => val && (val.length >= len)

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this) // To bind the functions with the navbar toggler
    this.handleSubmit = this.handleSubmit.bind(this) // To bind the functions with the navbar toggler
  }
  
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit(values) {
    console.log("State:" + JSON.stringify(values))
    alert("State:" + JSON.stringify(values))
  }

  render() {
    return(
      <>
      <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group"> 
              <Col md={{size:12}}>
                <Label htmlFor="rating">Rating</Label>
                <Control.select 
                  model=".rating" 
                  className="form-control" 
                  name="rating">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{size:12}}>
                <Label htmlFor="name">First Name</Label>
                <Control.text model=".name" 
                  className="form-control" 
                  id="name" 
                  name="name" 
                  placeholder="First Name"
                  validators={{
                    required, minLength: minLength(3), maxLength: maxLength(15)
                  }} />
                  <Errors className="text-danger" model=".name" show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 character',
                      maxLength: 'Must be 15 characters or less'
                    }} />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{size:12}}>
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea 
                  model=".comment" 
                  className="form-control" 
                  id="comment" 
                  name="comment" 
                  rows="6" />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{size:12}}>
                <Button type="submit" color="primary">Submit</Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
      </>
    )
  }

}
  function RenderDish({dish}) {
    if(dish) {
      return (
        <div className="col-12 col-md-5 col-xs-12 m-1">
            <Card>
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          </div>  
      )
    }
  }

  function RenderComments({comments}) {
    if(comments) {
        return(
          <div className="col-12 col-md-5 col-xs-12 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
              {comments.map((comment) => {
                return (
                  <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                  </li>
                )
              })}
              
            </ul>
            <CommentForm />
          </div>
        )
    } else {
      return(<div></div>)
    }    
  }

  const DishDetail = (props) => {
    if(props.dish){
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
            </div>
          </div>
          <div className="row">
            <RenderDish dish={props.dish} />
            <RenderComments comments={props.comments} />      
          </div>
        </div>
      )
    } else {
      return(
        <div></div>
      )
    }
    
  }

export default DishDetail;
