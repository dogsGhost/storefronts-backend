import React from 'react';
import NewBusinessForm from './NewBusinessForm';
import Directory from './Directory';
// import ajax from './../ajax';

export default class App extends React.Component {
  constructor() {
    super();
  }

  _handleStoreSubmit(store) {
    // optimistically update the stores
    store._id = `temp-id-${Date.now()}`;
    let newStores = this.state[this.props.collections[0]].concat([store]);
    newStores.sort((a, b) => a.address - b.address);
    this.setState({ [this.props.collections[0]]: newStores });

    // TODO: POST store to server
  }

  _loadFromServer(endPoint) {
    // use native fetch API
    if (window.fetch) {
      let req = new Request(`/api/${endPoint}`, {
        method: 'GET',
        cache: 'no-cache'
      });

      fetch(req).then((res) => {
        let contentType = res.headers.get('content-type');
        // check response is good
        if (
          res.ok &&
          contentType &&
          contentType.indexOf('application/json') !== -1
        ) {
          res.json().then((json) => {
            // use the json as our data
            this.setState({
              [endPoint]: json
            });
          });
        } else {
          // bad response
          console.error('promise resolved, but bad response from network');
        }
      }).catch((err) => {
        // problem with request
        console.error(`fecth did not resolve: ${err.message}`);
      });
    } else {
      // fetch not supported...
      console.error('fetch API not supported');
    }
  }

  componentWillMount() {
    // loop through prop and set an array prop to state for each one
    this.props.collections.forEach((item) => {
      this.setState({
        [item]: []
      });
    });
  }

  componentDidMount() {
    // loop through state obj props to populate
    Object.keys(this.state).forEach((key) => {
      this._loadFromServer(key);
    });
  }

  render() {
    return (
      <div>
        <NewBusinessForm
          categories={this.state.categories}
          onStoreSubmit={this._handleStoreSubmit.bind(this)}
          streets={this.state.streets} />

        <Directory stores={this.state.test} />
      </div>
    );
  }
};

export default App;
