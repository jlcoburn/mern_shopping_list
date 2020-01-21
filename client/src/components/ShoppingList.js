import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';



class ShoppingList extends Component {

  componentDidMount() {
    this.props.getItems();
  }
  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }

  strikeThrough =(event) => {
    event.target.classList.toggle('strike_through')
  }
  render() {
    const { items } = this.props.item;
    return(
      <Container>

      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({_id, name, department})=> (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem onClick={this.strikeThrough} id="list_item">
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={this.onDeleteClick.bind(this, _id)}
                >&times;</Button>
                {name}
                {/* <div><span>{name}</span><span className="text-right">{department}</span> </div> */}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
      </Container>
    )
  }

}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);