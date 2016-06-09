import React from 'react';
import jsonQuery from 'json-query';

import Day from './day';
import DayChooser from './dayChooser';

const propTypes = {
  day: React.PropTypes.string.isRequired,
  setDay: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired
};

function Portrait(props) {
  const selected = jsonQuery(`shows[*day=${props.day}]`, {
    data: props.data
  });

  return (
    <div className="portrait">
      <DayChooser
        setDay={props.setDay}
        items={['do', 'fr', 'sa']}
      />
      <Day
        day={props.day}
        data={selected.value}
      />
    </div>
  );
}

Portrait.propTypes = propTypes;

export default Portrait;
