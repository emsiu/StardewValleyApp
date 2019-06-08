import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import { fruits } from './Fruits';

class StardewValleyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleSubmit(e) {
    const { text: stateText } = this.state;
    e.preventDefault();
    if (!stateText.length) {
      return;
    }
    const newItem = {
      text: stateText,
      id: Date.now(),
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: '',
    }));
  }

  render() {
    const { items, text } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ItemList items={fruits} />
          <ItemList items={items} />
          <form onSubmit={this.handleSubmit}>
            <input
              id="new-item"
              onChange={this.handleChange}
              value={text}
            />
            <br />
            <button type="submit">
              Add item #
              {items.length + 1}
            </button>
          </form>
        </header>
      </div>
    );
  }
}

function ItemList(props) {
  const { items } = props;
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

ItemList.propTypes = {
  items: PropTypes.node,
};

ItemList.defaultProps = {
  items: null,
};

export default StardewValleyApp;
