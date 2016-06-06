import React, { Component } from 'react'

const propTypes = {
  showData: React.PropTypes.object.isRequired
};

function Show(props) {
  if (props.insideStage) {
    return (
      <div className='show'>
        {/*<div className='show-decorator'>*-*-*-*</div>*/}
        <div className='show-time'>{props.showData.time}</div>
        <div className='show-name band'>{props.showData.name}</div>
      </div>
    );
  } else {
    return (
      <div className='show'>
        {/*<div className='show-decorator'>*-*-*-*</div>*/}
        <div className='show-time'>{props.showData.time}</div>
        <div className='show-name band'>{props.showData.name}</div>
        <div className='show-stage'>{props.showData.stage}</div>
      </div>
    );
  }
}

Show.propTypes = propTypes;

export default Show;
