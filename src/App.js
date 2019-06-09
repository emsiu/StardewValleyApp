import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import './Item.css';
import Item from './Item';

class StardewValleyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
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
    console.log('this one is', newSet, item);
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
    console.log('is this working', newSet, item, index);
  }

  render() {
    const { selectedItems } = this.state;
    const { data } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            {selectedItems.map(item => (
              <li key={item.id}>
                <Item key={item.id} item={item} />
              </li>
            ))}
          </ul>
          <ul>
            {data.map(dat => (
              <li key={dat.id}>
                <Item
                  key={dat.id}
                  item={dat}
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
