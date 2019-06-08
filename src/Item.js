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
  }

  handleClick() {
    const { active: stateActive } = this.state;
    this.setState({
      active: !stateActive,
      class: stateActive ? 'item' : 'item active',
    });
  }

  render() {
    const { class: stateClass } = this.state;
    const { item } = this.props;
    return (
      <div
        className={stateClass}
        onClick={this.handleClick}
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
