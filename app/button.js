import React from 'react';
import { getLiteralDay } from './helpers';

const propTypes = {
  className: React.PropTypes.string.isRequired,
  clicked: React.PropTypes.func.isRequired,
  day: React.PropTypes.string.isRequired
};

function Button(props) {
  let literalDay = getLiteralDay(props.day);

  return (
    <button
      id={props.day}
      className={`${props.day} ${props.className}`}
      onClick={props.clicked}
    >
      {literalDay}
    </button>
  );
}

Button.propTypes = propTypes;

export default Button;
