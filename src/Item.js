import React from 'react';
import PropTypes from 'prop-types';

class Item extends React.Component {
  constructor(props) {
    super(props);
    let isActive = false;
    const { selected } = this.props;
    if (selected) {
      isActive = true;
    }
    this.state = {
      active: isActive,
      class: !isActive ? 'item' : 'item active',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { active } = this.state;
    if (nextProps.selected !== active) {
      this.updateItem(nextProps.selected);
    }
  }

  updateItem(selected) {
    let isActive = false;
    if (selected) {
      isActive = true;
    }
    this.setState({
      active: isActive,
      class: !isActive ? 'item' : 'item active',
    });
  }

  handleClick() {
    const { active: stateActive } = this.state;
    const { item, parentAddSelectedItem, parentRemoveSelectedItem } = this.props;
    this.setState({
      active: !stateActive,
      class: stateActive ? 'item' : 'item active',
    });
    if (!stateActive && parentAddSelectedItem) {
      parentAddSelectedItem(item);
    } else if (stateActive && parentRemoveSelectedItem) {
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
  selected: PropTypes.bool,
};

Item.defaultProps = {
  item: null,
  parentAddSelectedItem: null,
  parentRemoveSelectedItem: null,
  selected: false,
};

export default Item;
