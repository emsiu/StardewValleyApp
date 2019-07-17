import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import logo from './logo.svg';
import './App.css';
import './Item.css';
import Item from './Item';
import MediaWiki from './MediaWiki';

class StardewValleyApp extends React.Component {
  constructor(props) {
    super(props);
    const { data, data2 } = this.props;

    const itemsList = [];
    this.populateItemList(data, itemsList);
    this.populateItemList(data2, itemsList);

    this.state = {
      selectedItems: [],
      allItems: itemsList,
    };

    this.addSelectedItem = this.addSelectedItem.bind(this);
    this.removeSelectedItem = this.removeSelectedItem.bind(this);
    this.updateAllItems = this.updateAllItems.bind(this);
  }

  populateItemList(data, itemsList) {
    for (let i = 0; i < data.length; i += 1) {
      const item = {
        name: data[i],
        id: data[i],
        active: false,
      };
      itemsList.push(item);
    }
  }

  addSelectedItem(item) {
    console.log('add item', item);
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
          <p data-tip="React-tooltip">Select items from the list of fruits below. Then hover over the selected items in Inventory to see the villager reactions.</p>
          <ReactTooltip place="bottom" type="light" effect="float">
            ◕‿‿◕
          </ReactTooltip>
          <p>Inventory</p>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedItems.map(item => (
                <TableRow key={item.id} data-for={item.id} data-tip>
                  <TableCell>
                    <Item
                      key={item.id}
                      item={item}
                      parentAddSelectedItem={this.addSelectedItem}
                      parentRemoveSelectedItem={this.removeSelectedItem}
                      parentUpdateAllItems={this.updateAllItems}
                    />
                  </TableCell>
                  <TableCell>
                    Villager Reactions:
                    <MediaWiki itemName={item.name} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p>Fruits and Flowers</p>
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
  data2: PropTypes.arrayOf(PropTypes.string),
};

StardewValleyApp.defaultProps = {
  data: null,
  data2: null,
};

export default StardewValleyApp;
