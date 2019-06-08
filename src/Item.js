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
    this.setState({
      active: !stateActive,
      class: stateActive ? 'item' : 'item active',
    });
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
};

Item.defaultProps = {
  item: null,
};

export default Item;
