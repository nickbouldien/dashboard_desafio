import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../constants/itemTypes';
import ItemCard from '../components/Card';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id
  }
};

const cardTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(sourceId !== targetId) {
      targetProps.onMove({ sourceId, targetId });
    }
  }
};

const CardContainer = compose(
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.CARD, cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(ItemCard);

export default CardContainer;
