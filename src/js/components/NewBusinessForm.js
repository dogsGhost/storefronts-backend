import React from 'react';

export default class NewBusinessForm extends React.Component {
  constructor() {
    super();
    this.state = {
      showDetails: false
    };
  }

  _handleRadioChange(e) {
    this.setState({
      showDetails: !!Number(e.target.value)
    });
  }

  render() {
    return (
      <div id="addnewForm" className="form-newBusiness panel panel-primary">
        <div className="panel-heading">
          <h4>New Storefront Entry</h4>
        </div>
        <div className="panel-body">
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input id="address" className="form-control" type="text" />
          </div>

          <label>Occupied</label>
          <br />
          <div className="radio-inline">
            <label>
              <input name="isOccupied" type="radio" value="0" defaultChecked onChange={this._handleRadioChange.bind(this)} />
              No
            </label>
          </div>
          <div className="radio-inline">
            <label>
              <input name="isOccupied" type="radio" value="1" onChange={this._handleRadioChange.bind(this)} />
              Yes
            </label>
          </div>

          {
            this.state.showDetails ?
              <div>
                <div className="form-group">
                  <label htmlFor="occupantName">Name of Business</label>
                  <input id="occupantName" className="form-control" type="text" />
                </div>

                <label>Type of Business</label>
                <select className="form-control">
                  <option>category 1</option>
                  <option>category 2</option>
                  <option>category 3</option>
                </select>
              </div> :
              <div></div>
          }

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" className="form-control" rows="3"></textarea>
          </div>

          <button className="btn btn-lg btn-primary">Add To Storefronts</button>
        </div>
      </div>
    );
  }
}
