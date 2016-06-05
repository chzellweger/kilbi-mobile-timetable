import React, { Component } from 'react'
import Show from './show'

const propTypes = {
  day: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired
};

function Shows(props) {
  let keys = Object.keys(props.data);
  let children = keys.map(key => (
    <Show 
      key={key}
      showData={props.data[key]}
    />
  ));

  return <div className='shows'>{children}</div>
}

Shows.propTypes = propTypes;

export default Shows;
