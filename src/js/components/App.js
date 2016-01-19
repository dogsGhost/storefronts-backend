import React from 'react';
import NewBusinessForm from './NewBusinessForm';
import Directory from './Directory';

var dummydata = [
  {
    address: 11500,
    isOccupied: true,
    occupantName: 'David',
    street: 'Mackay',
    category: 'residence',
    notes: 'no big deal'
  },
  {
    address: 11503,
    isOccupied: false,
    street: 'Mackay',
    notes: 'looks like it used to be a pawn shop'
  },
  {
    address: 11502,
    isOccupied: false,
    street: 'Mackay'
  },
  {
    address: 11501,
    isOccupied: true,
    occupantName: 'Sal\'s Saloon',
    street: 'Mackay'
  }
];

dummydata = dummydata.sort((a, b) => {
  return a.address - b.address;
});

export default class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     stores: dummydata
  //   };
  // }

  render() {
    return (
      <div>
        <NewBusinessForm />
        <Directory data={dummydata} />
      </div>
    );
  }
};

export default App;
