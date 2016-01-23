import React from 'react';

export default class Directory extends React.Component {
  constructor() {
    super();
  }

  render() {
    let listings = this.props.stores.map((store, index) => {
      let color = store.isOccupied ? {} : {backgroundColor: '#eee'};
      return (
        <tr key={index} style={color}>
          <th>{index + 1}</th>
          <td>{'' + store.address}</td>
          <td>{store.isOccupied ? 'occupied' : 'vacant'}</td>
          <td>
            {
              store.occupantName ?
                store.occupantName : store.category ? store.category.name : '-'
            }
          </td>
          <td>{store.notes ? <abbr title={store.notes}>Notes</abbr> : null}</td>
          <td><button type="button" className="btn btn-primary">Edit</button></td>
        </tr>
      );
    });


    return (
      <table className="table">
        <caption className="h3">Directory</caption>
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
