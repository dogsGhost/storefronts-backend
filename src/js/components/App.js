import React from 'react';
import NewBusinessForm from './NewBusinessForm';
import Directory from './Directory';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  _loadFromServer(endPoint) {
    // use native fetch API
    if (window.fetch) {
      // TODO: add `/api` url prefix here once real endpoints being used
      let req = new Request(`/${endPoint}`, {
        method: 'GET',
        cache: 'no-cache'
      });

      fetch(req).then((res) => {
        // check response is good
        if (res.ok) {
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
    // TODO: change to pass all state props
    return (
      <div>
        <NewBusinessForm />
        <Directory stores={this.state[this.props.collections[0]]} />
      </div>
    );
  }
};

export default App;
