import React from 'react';
import PropTypes from 'prop-types';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      class: 'item',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick() {
    const { active: stateActive } = this.state;
    const { item, parentAddSelectedItem, parentRemoveSelectedItem } = this.props;
    this.setState({
      active: !stateActive,
      class: stateActive ? 'item' : 'item active',
    });
    console.log(stateActive);
    if (!stateActive && parentAddSelectedItem) {
      console.log('add');
      parentAddSelectedItem(item);
    } else if (stateActive && parentRemoveSelectedItem) {
      console.log('remove');
      parentRemoveSelectedItem(item);
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) { // Enter key
      this.handleClick();
    }
  }

  render() {
    const { class: stateClass } = this.state;
    const { item } = this.props;
    return (
      <div
        className={stateClass}
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
};

Item.defaultProps = {
  item: null,
  parentAddSelectedItem: null,
  parentRemoveSelectedItem: null,
};

export default Item;
