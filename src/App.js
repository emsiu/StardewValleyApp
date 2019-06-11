import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import './Item.css';
import Item from './Item';

class StardewValleyApp extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      selectedItems: [],
      allItems: data,
    };
    this.addSelectedItem = this.addSelectedItem.bind(this);
    this.removeSelectedItem = this.removeSelectedItem.bind(this);
  }

  addSelectedItem(item) {
    const { selectedItems } = this.state;
    const newSet = selectedItems.concat(item);
    this.setState({
      selectedItems: newSet,
    });
  }

  removeSelectedItem(item) {
    const { selectedItems } = this.state;
    const index = selectedItems.indexOf(item);
    const newSet = [
      ...selectedItems.slice(0, index),
      ...selectedItems.slice(index + 1),
    ];
    this.setState({
      selectedItems: newSet,
    });
  }

  render() {
    const { selectedItems, allItems } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            {selectedItems.map(item => (
              <li key={item.id}>
                <Item
                  key={item.id}
                  item={item}
                  selected
                  parentAddSelectedItem={this.addSelectedItem}
                  parentRemoveSelectedItem={this.removeSelectedItem}
                />
              </li>
            ))}
          </ul>
          <ul>
            {allItems.map(item => (
              <li key={item.id}>
                <Item
                  key={item.id}
                  item={item}
                  selected={!selectedItems.indexOf(item)}
                  parentAddSelectedItem={this.addSelectedItem}
                  parentRemoveSelectedItem={this.removeSelectedItem}
                />
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

StardewValleyApp.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
};

StardewValleyApp.defaultProps = {
  data: null,
};

export default StardewValleyApp;
