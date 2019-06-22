import React from 'react';
import PropTypes from 'prop-types';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick() {
    const {
      item,
      parentAddSelectedItem,
      parentRemoveSelectedItem,
      parentUpdateAllItems,
    } = this.props;
    if (!item.active && parentAddSelectedItem) {
      parentAddSelectedItem(item);
    } else if (item.active && parentRemoveSelectedItem) {
      parentRemoveSelectedItem(item);
      parentUpdateAllItems(item);
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) { // Enter key
      this.handleClick();
    }
  }

  render() {
    const { item } = this.props;
    return (
      <div
        className={item.active ? 'item active' : 'item'}
        onClick={this.handleClick}
        onKeyUp={this.handleKeyPress}
        role="button"
        tabIndex={0}
      >
        {item.name}
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]),
  parentAddSelectedItem: PropTypes.func,
  parentRemoveSelectedItem: PropTypes.func,
  parentUpdateAllItems: PropTypes.func,
};

Item.defaultProps = {
  item: null,
  parentAddSelectedItem: null,
  parentRemoveSelectedItem: null,
  parentUpdateAllItems: null,
};

export default Item;
