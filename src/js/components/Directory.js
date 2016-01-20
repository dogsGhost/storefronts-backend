import React from 'react';

export default class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    let listings = this.props.stores.map((store, index) => {
      return (
        <tr key={index}>
          <th>{index + 1}</th>
          <td>{store.address}</td>
          <td>{store.isOccupied ? 'occupied' : 'vacant'}</td>
          <td>{store.occupantName ? store.occupantName : '-'}</td>
          <td>{store.notes ? <abbr title={store.notes}>Notes</abbr> : null}</td>
          <td><button className="btn btn-primary">Edit</button></td>
        </tr>
      );
    });

    return (
      <table className="table table-striped">
        <caption className="h4">Directory</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>Status</th>
            <th>Current Occupant</th>
            <th>Notes</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {listings}
        </tbody>
      </table>
    );
  }
}
