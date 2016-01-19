import React from 'react';

export default class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    let listings = this.props.data.map((store, index) => {
      return (
        <tr key={index}>
          <th>{index + 1}</th>
          <td>{store.address}</td>
          <td>{store.isOccupied ? 'occupied' : 'vacant'}</td>
          <td>{store.occupantName ? store.occupantName : '-'}</td>
          <td>{store.notes ? 'Notes' : ''}</td>
          <td><button className="btn btn-primary">Edit</button></td>
        </tr>
      );
    });

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>Status</th>
            <th>Current Resident</th>
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
