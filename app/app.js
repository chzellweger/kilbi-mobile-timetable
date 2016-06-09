import React, { Component } from 'react';

import Landscape from './landscape';
import Portrait from './portrait';

import { getDay } from './helpers';

import Data from './new_data';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: 'do',
      orientation: 'portrait',
      data: {}
    };

    this.setDay = this.setDay.bind(this);
    this.setOrientation = this.setOrientation.bind(this);
  }

  componentWillMount() {
    const thisDay = getDay();
    const thisData = JSON.parse(Data);

    this.setState({
      data: thisData,
      day: thisDay
    });
  }

  componentDidMount() {
    const mediaQueryList = window.matchMedia('(orientation: portrait)');

    // If there are matches, we're in portrait
    if (mediaQueryList.matches) {
      this.setState({ orientation: 'portrait' });
    } else {
      this.setState({ orientation: 'landscape' });
    }

    // Add a media query change listener
    const setter = this.setOrientation;

    mediaQueryList.addListener((mediaQuery) => {
      const match = mediaQuery.matches ? 'portrait' : 'landscape';
      setter(match);
    });
  }

  setOrientation(value) {
    this.setState({ orientation: value });
  }

  setDay(e) {
    console.log(e.target.id);
    const clickedDay = e.target.id;
    this.setState({ day: clickedDay });
  }

  render() {
    let renderOrientationView;

    if (this.state.orientation === 'portrait') {
      renderOrientationView =
        (<Portrait
          day={this.state.day}
          setDay={this.setDay}
          data={this.state.data}
        />);
    } else {
      renderOrientationView =
        (<Landscape
          day={this.state.day}
          stages={['Main-Stage', 'B-Stage', 'Haus']}
          setDay={this.setDay}
          data={this.state.data}
        />);
    }

    return <div className="app">{renderOrientationView}</div>;
  }
}
