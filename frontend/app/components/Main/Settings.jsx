import React from 'react';
import services from './../../services';
import { connect } from 'react-redux';
import actions from './../../actions';

const data = [{ markerType: 'My Place', dataType: 'Current', event: 'Add' }, {
  markerType: 'Danger',
  dataType: 'Historical',
  event: 'Del'
}];

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.onMarkerChanged = this.onMarkerChanged.bind(this);
    this.onDataTypeChanged = this.onDataTypeChanged.bind(this);
    this.onEventChanged = this.onEventChanged.bind(this);
  }

  onMarkerChanged(e) {
    this.props.changeMarkerType(e.currentTarget.value)
  }

  onDataTypeChanged(e) {
    this.props.changeViewType(e.currentTarget.value)
  }

  onEventChanged(e) {
    this.props.changeActionType(e.currentTarget.value)
  }

  render() {
    let resultRows = data.map((result, id) =>
      <tbody key={id}>
      <tr>
        <td><input type="radio" name="markers"
                   value={result.markerType}
                   checked={this.props.markerType === result.markerType}
                   onChange={this.onMarkerChanged}/>{result.markerType}</td>
        <td><input type="radio" name="data_type"
                   value={result.dataType}
                   checked={this.props.viewType === result.dataType}
                   onChange={this.onDataTypeChanged}/>{result.dataType}</td>
        <td><input type="radio" name="event"
                   value={result.event}
                   checked={this.props.actionType === result.event}
                   onChange={this.onEventChanged}/>{result.event}</td>
      </tr>
      </tbody>, this);

    return (
      <div>
        <table className="table">
          <thead>
          <tr>
            <th>Marker</th>
            <th>Data</th>
            <th>Event</th>
          </tr>
          </thead>
          {resultRows}
          <tfoot>
          <tr>
            <td>chosen marker: {this.props.markerType} </td>
            <td>chosen data: {this.props.viewType} </td>
            <td>chosen event: {this.props.actionType} </td>
          </tr>
          </tfoot>
        </table>
        <input type="range" id="start" name="size"
               min="0" max="1000000" onChange={(e)=> this.props.changeScaleWind(e.target.value)}/>
        <div style={{whiteSpace:'pre'}}>
          {JSON.stringify(this.props.statistic, null, 4)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    markerType: state.get('markerType'),
    viewType: state.get('viewType'),
    actionType: state.get('actionType'),
  };
}

export default connect(mapStateToProps, actions)(Settings);
