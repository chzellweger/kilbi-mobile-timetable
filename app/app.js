import React, { Component } from 'react'
import { render } from 'react-dom';

import Landscape from './landscape'
import Portrait from './portrait'

import { getDay } from './helpers'

import Data from './new_data'

export default class App extends Component {
constructor(props){
    super(props);

    this.state = {
      day: 'do',
      orientation: 'portrait',
      data: {}
    };

    this.setDay = this.setDay.bind(this);
    this.setOrientation = this.setOrientation.bind(this);
  }

  componentWillMount(){
    let day = getDay();
    let data = JSON.parse(Data);

    this.setState({
      data: data,
      day: day
    })
  }

  componentDidMount() {
    let mediaQueryList = window.matchMedia('(orientation: portrait)');
    
    // If there are matches, we're in portrait
    if (mediaQueryList.matches) {
      this.setState({orientation: 'portrait'})
    } else {
      this.setState({orientation: 'landscape'})
    }

    // Add a media query change listener
    let setter = this.setOrientation;

    mediaQueryList.addListener((mediaQuery) => {
      mediaQuery.matches ? setter('portrait') : setter('landscape')
    });
  }

  setOrientation(value){
    this.setState({'orientation': value});
  }

  setDay (e) {
    console.log(e.target.dataset.day);
    let day = e.target.dataset.day;
    
    this.setState({'day': day});
  }

  render () {
    let renderOrientationView;

    if (this.state.orientation === 'portrait'){
      renderOrientationView = 
        <Portrait
          day={this.state.day}
          setDay={this.setDay}
          data={this.state.data}
        />
    } else {
      renderOrientationView =
        <Landscape 
          day={this.state.day}
          stages={['Main-Stage','B-Stage','Haus']}
          setDay={this.setDay}
          data={this.state.data}
        />
    }

    return <div className="app">{renderOrientationView}</div>
  }
};
