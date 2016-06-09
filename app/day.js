import React from 'react';
import Shows from './shows';
import { getLiteralDay } from './helpers';

const propTypes = {
  day: React.PropTypes.string.isRequired,
  data: React.PropTypes.array.isRequired,
};

function Day(props) {
  let literalDay = getLiteralDay(props.day);

  return (
    <div className={`day ${props.day}`}>
      <Shows
        day={literalDay}
        data={props.data}
      />
    </div>
  );
}

Day.propTypes = propTypes;

export default Day;
