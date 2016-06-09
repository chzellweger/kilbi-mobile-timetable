import React from 'react';
import Show from './show';

const propTypes = {
  day: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired
};

function Shows(props) {
  const keys = Object.keys(props.data);
  let children = keys.map(key => (
    <Show
      key={key}
      showData={props.data[key]}
      insideStage={false}
    />
  ));

  return <div className="shows">{children}</div>;
}

Shows.propTypes = propTypes;

export default Shows;
