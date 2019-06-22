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

    const itemsList = [];
    for (let i = 0; i < data.length; i += 1) {
      const item = {
        name: data[i],
        id: data[i],
        active: false,
      };
      itemsList.push(item);
    }

    this.state = {
      selectedItems: [],
      allItems: itemsList,
    };

    this.addSelectedItem = this.addSelectedItem.bind(this);
    this.removeSelectedItem = this.removeSelectedItem.bind(this);
    this.updateAllItems = this.updateAllItems.bind(this);
  }

  addSelectedItem(item) {
    console.debug('add item', item);
    const { selectedItems } = this.state;
    item.active = true;
    const newSet = selectedItems.concat(item);
    this.setState({
      selectedItems: newSet,
    });
  }

  removeSelectedItem(item) {
    console.log('remove item', item);
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

  updateAllItems(item) {
    console.log('update all items', item);
    const { allItems } = this.state;
    const index = allItems.indexOf(item);
    const updatedItem = allItems[index];
    updatedItem.active = false;
    const updatedAllItems = allItems;
    updatedAllItems[index] = updatedItem;
    this.setState({
      allItems: updatedAllItems,
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
                  parentAddSelectedItem={this.addSelectedItem}
                  parentRemoveSelectedItem={this.removeSelectedItem}
                  parentUpdateAllItems={this.updateAllItems}
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
                  parentAddSelectedItem={this.addSelectedItem}
                  parentRemoveSelectedItem={this.removeSelectedItem}
                  parentUpdateAllItems={this.updateAllItems}
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
  data: PropTypes.arrayOf(PropTypes.string),
};

StardewValleyApp.defaultProps = {
  data: null,
};

export default StardewValleyApp;
