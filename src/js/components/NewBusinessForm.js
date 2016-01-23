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
      street: ''
    };
  }

  _handleNewCat(e) {
    let input = this.refs.newCategoryInput;
    let newCatName = input.value.trim();
    if (newCatName) {
      // post a new category
      this.props.onNewCatSubmit({ name: newCatName }, input);
    }
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

  componentWillReceiveProps(newProps) {
    // Set default street
    if (this.props.streets.length) {
      let id = this.props.streets[0]._id;
      this.setState({
        street: id
      });
    }
    // When a new category is added automatically set it as the form's category
    if (!this.state.category) {
      this.setState({ category: newProps.defaultCategory });
    }
  }

  render() {
    // user class change to trigger hide/show animation
    let detailsClasses =
      'occupant-details' + (Number(this.state.isOccupied) ? ' show': '');

    let streetOptions = this.props.streets.map((street, index) => {
      return (
        <option key={index} value={street._id}>{street.name}</option>
      );
    });

    let categoryOptions = this.props.categories.map((cat, index) => {
      return (
        <option key={index} value={cat._id}>{cat.name}</option>
      );
    });

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
              {streetOptions}
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
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <label>Type of Business</label>
                  <select
                    className="form-control"
                    name="category"
                    onChange={this._handleInputChange.bind(this)}
                    value={this.state.category}>
                    <option value="">None</option>
                    {categoryOptions}
                  </select>
                </div>

                <div className="col-sm-6">
                  <label>Add New Category</label>
                  <div className="form-inline">
                    <div className="form-group">
                      <input
                        className="form-control"
                        name="newCategory"
                        ref="newCategoryInput" />
                      <button
                        className="btn btn-info btn-newCat"
                        onClick={this._handleNewCat.bind(this)}
                        type="button">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
