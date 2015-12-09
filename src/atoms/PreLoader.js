import React, { PropTypes } from 'react'

class PreLoader extends React.Component {
  render() {
    return (
      <div className="wfm-preloader la-ball-spin-clockwise la-2x" style={{
        color: '#333!important',
        position: 'absolute',
        zIndex: '200',
        top: '50%',
        marginTop: '-32px',
        left: '50%',
        marginLeft: '-32px'
        }}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
    );
  }
}

export default PreLoader;
