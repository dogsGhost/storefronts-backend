import React from 'react';
import NewBusinessForm from './NewBusinessForm';
import Directory from './Directory';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stores: [],
      streets: [],
      categories: []
    };
  }

  _loadFromServer(url) {
    // use native fetch API
    if (window.fetch) {
      let req = new Request(url, {
        method: 'GET',
        cache: 'no-cache'
      });

      fetch(req).then((res) => {
        // check response is good
        if (res.ok) {
          res.json().then((json) => {
            // TODO: change state obj prop to `[url.slice(1)]`
            // use the json as our data
            this.setState({
              stores: json
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

  componentDidMount() {
    // TODO: loop through state obj props to populate?
    this._loadFromServer(this.props.storesUrl);
  }

  render() {
    return (
      <div>
        <NewBusinessForm />
        <Directory stores={this.state.stores} />
      </div>
    );
  }
};

export default App;
