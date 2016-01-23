import React from 'react';
import NewBusinessForm from './NewBusinessForm';
import Directory from './Directory';
import ajax from './../ajax';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      latestCat: ''
    }
  }

  _handleNewCatSubmit(catObj, srcEle) {
    ajax.sendRequest({
      url: '/api/categories',
      method: 'POST',
      body: JSON.stringify(catObj),
      success: (res) => {
        res.json().then((json) => {
          this.setState({
            categories:
              this._sortArray(
                this.state.categories.concat([json.data]),
                'categories'
              ),
            // pass the id down to form to set as category value
            latestCat: json.data._id
          });
          srcEle.value = '';
        });
      }
    });
  }

  _handleStoreSubmit(store) {
    // optimistically update the stores
    store._id = `temp-id-${Date.now()}`;
    let newStores = this.state.test.concat([store]);
    newStores.sort((a, b) => a.address - b.address);
    this.setState({ test: newStores });

    // TODO: POST store to server
  }

  _sortArray(arr, collection) {
    // Lets us sort our collections on specific values
    const sortKey = {
      test: 'address',
      categories: 'name',
      streets: '_id'
    }
    return arr.sort((a, b) => {
        if (a[sortKey[collection]] > b[sortKey[collection]]) return 1;
        if (a[sortKey[collection]] < b[sortKey[collection]]) return -1;
        return 0;
    });
  }

  _loadFromServer(endPoint) {
    ajax.sendRequest({
      url: `/api/${endPoint}`,
      success: (res) => {
        res.json().then((json) => {
          // use the json as our data
          this.setState({
            [endPoint]: this._sortArray(json, endPoint)
          });
        });
      }
    });
  }

  componentWillMount() {
    // loop through prop and set an array prop to state for each one
    this.props.collections.forEach((path) => {
      this.setState({
        [path]: []
      });
    });
  }

  componentDidMount() {
    // loop through state obj props to populate
    this.props.collections.forEach((path) => {
      this._loadFromServer(path);
    });
  }

  render() {
    return (
      <div>
        <NewBusinessForm
          categories={this.state.categories}
          defaultCategory={this.state.latestCat}
          onNewCatSubmit={this._handleNewCatSubmit.bind(this)}
          onStoreSubmit={this._handleStoreSubmit.bind(this)}
          streets={this.state.streets} />

        <Directory stores={this.state.test} />
      </div>
    );
  }
};
