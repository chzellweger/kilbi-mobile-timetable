import React from 'react';

const propTypes = {
  showData: React.PropTypes.object.isRequired,
  insideStage: React.PropTypes.bool.isRequired
};

function Show(props) {
  if (props.insideStage) {
    return (
      <div className="show">
        <div className="show-time">{props.showData.time}</div>
        <div className="show-name band">{props.showData.name}</div>
      </div>
    );
  } else {
    return (
      <div className="show">
        <div className="show-time">{props.showData.time}</div>
        <div className="show-name band">{props.showData.name}</div>
        <div className="show-stage">{props.showData.stage}</div>
      </div>
    );
  }
}

Show.propTypes = propTypes;

export default Show;
