import React, { Component } from 'react'
import Button from './button'

const propTypes = {
  setDay: React.PropTypes.func.isRequired,
  items: React.PropTypes.array.isRequired,
};

function DayChooser(props) {
  let clicked = props.setDay
  let children = props.items.map(key => (
    <Button
      key={key}
      day={key}
      className='button'
      clicked={clicked}
    />
  ))

  return <div>{children}</div>
}

DayChooser.propTypes = propTypes

export default DayChooser
