import React from 'react';
import jsonQuery from 'json-query';

import DayChooser from './dayChooser';
import Stage from './stage';

import { getLiteralDay } from './helpers';

const propTypes = {
  day: React.PropTypes.string.isRequired,
  stages: React.PropTypes.array.isRequired,
  setDay: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired
};

function Landscape(props) {
  let literalDay = getLiteralDay(props.day);
  let selected = jsonQuery(`shows[*day=${props.day}]`, {
    data: props.data
  });

  let children = props.stages.map(key => (
    <Stage
      key={key}
      stage={key}
      data={selected}
      className="stage"
    />
      ));

  return (
    <div className="landscape">
      <DayChooser
        setDay={props.setDay}
        items={['do', 'fr', 'sa']}
      />
      <div>
        <div className="stages-container">
          <div className={`day-name ${props.day}`}>{literalDay}</div>
          <div className="stages">{children}</div>
        </div>
      </div>
    </div>
  );
}

Landscape.propTypes = propTypes;

export default Landscape;
