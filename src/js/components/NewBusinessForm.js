import React from 'react';

export default class NewBusinessForm extends React.Component {
  constructor() {
    super();
    this.state = {
      address: '',
      category: '',
      isOccupied: '0',
      notes: '',
      occupantName: '',
      // TODO: set default to first value from street dropdown
      street: 's1-ref-id'
    };
  }

  _handleInputChange(e) {
    // as a shortcut, input names match our state properties
    this.setState({ [e.target.name]: e.target.value });
  }

  _handleSubmit(e) {
    e.preventDefault();
    // clone this.state with casted values
    let obj = {
      ...this.state,
      address: Number(this.state.address),
      isOccupied: !!Number(this.state.isOccupied)
    };

    if (!obj.isOccupied) {
      delete obj.category;
      delete obj.occupantName;
    }

    // Check that the data is useful
    if (!Number.isFinite(obj.address)) return;

    // submit
    this.props.onStoreSubmit(obj);

    this.setState({
      address: '',
      category: '',
      notes: '',
      occupantName: ''
    });
  }

  render() {
    // user class change to trigger hide/show animation
    let detailsClasses =
      'occupant-details' + (Number(this.state.isOccupied) ? ' show': '');

    return (
      <form
        className="form-newBusiness panel panel-primary"
        id="addnewForm"
        onSubmit={this._handleSubmit.bind(this)}>
        <div className="panel-heading clearfix">
          <h4 className="pull-left">New Storefront Entry</h4>
          <div className="pull-right">
            <select
              className="form-control"
              name="street"
              onChange={this._handleInputChange.bind(this)}
              value={this.state.street}>
              <option value="s1-ref-id">street 1</option>
              <option value="s2-ref-id">street 2</option>
              <option value="s3-ref-id">street 3</option>
            </select>
          </div>
        </div>

        <div className="panel-body">
          <div className="form-group">
            <label htmlFor="address">Address Number</label>
            <input
              className="form-control"
              id="address"
              name="address"
              onChange={this._handleInputChange.bind(this)}
              required
              type="text"
              value={this.state.address} />
          </div>

          <label>Occupied</label>
          <br />
          <div className="radio-inline">
            <label htmlFor="occupiedRadio1">
              <input
                defaultChecked
                id="occupiedRadio1"
                name="isOccupied"
                onChange={this._handleInputChange.bind(this)}
                type="radio"
                value="0" />
              No
            </label>
          </div>
          <div className="radio-inline">
            <label htmlFor="occupiedRadio2">
              <input
                id="occupiedRadio2"
                name="isOccupied"
                onChange={this._handleInputChange.bind(this)}
                type="radio"
                value="1" />
              Yes
            </label>
          </div>

          <div id="occupantDetails" className={detailsClasses}>
            <div className="form-group">
              <label htmlFor="occupantName">Name of Business</label>
              <input
                className="form-control"
                id="occupantName"
                name="occupantName"
                onChange={this._handleInputChange.bind(this)}
                type="text"
                value={this.state.occupantName} />
            </div>

            <label>Type of Business</label>
            <select
              className="form-control"
              name="category"
              onChange={this._handleInputChange.bind(this)}
              value={this.state.category}>
              <option value="">select a category</option>
              <option value="c1-ref-id">category 1</option>
              <option value="c2-ref-id">category 2</option>
              <option value="c3-ref-id">category 3</option>
            </select>
          </div>

          <div className="form-group store-notes">
            <label htmlFor="notes">Notes</label>
            <textarea
              className="form-control"
              id="notes"
              name="notes"
              onChange={this._handleInputChange.bind(this)}
              rows="3"
              value={this.state.notes} />
          </div>
          <input
            className="btn btn-lg btn-primary"
            type="submit"
            value="Add To Storefronts" />
        </div>
      </form>
    );
  }
}
