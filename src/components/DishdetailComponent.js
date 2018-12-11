import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderComments(comments) {
    if(comments) {
      return comments.map((comment) => {
        return(
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author}, {new Intl.DateTimeFormat('fr-FR', { 
          year: 'numeric', 
          month: 'long', 
          day: '2-digit' 
        }).format(new Date(Date.parse(comment.date)))}</p>
          </li>
        )
      })
    } else {
      return(<div></div>)
    }    
  }
  render() {
    if(!this.props.dish){
      return(
        <div></div>
      )
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 col-xs-12 m-1">
            <Card>
              <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
              <CardBody>
                <CardTitle>{this.props.dish.name}</CardTitle>
                <CardText>{this.props.dish.description}</CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-12 col-md-5 col-xs-12 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
              {this.renderComments(this.props.dish.comments)}
            </ul>
          </div>        
        </div>
      </div>
    );
  }
}

export default DishDetail;
