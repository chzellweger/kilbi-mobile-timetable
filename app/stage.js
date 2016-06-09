import React from 'react';
import jsonQuery from 'json-query';

import Show from './show';

const propTypes = {
  data: React.PropTypes.object.isRequired,
  stage: React.PropTypes.string.isRequired
};

function Stage(props) {
  const selected = jsonQuery(`value[*stage=${props.stage}]`, {
    data: props.data
  });

  const keys = Object.keys(selected.value);

  let children = keys.map(key => (
    <Show
      key={key}
      showData={selected.value[key]}
      insideStage
    />
    )
  );

  return (
    <div className={`stage ${props.stage}`} >
      <div className="stage-name">{props.stage}</div>
      <div>{children}</div>
    </div>
  );
}

Stage.propTypes = propTypes;

export default Stage;

