import React, { Component } from 'react';
import '../App.css'

console.log('i am a dummy component');
class dummy extends Component {
  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'orange'
        }}
      >
        <div
          style={{
            // flex: 1,
            // display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000'
          }}
        >
          <h1
            style={{
              color: '#FFFFFF'
            }}
          >My name is Ajay</h1>
        </div>
      </div>
    );
  }
}

export default dummy;
