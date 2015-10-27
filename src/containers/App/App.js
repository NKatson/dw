import React, {PropTypes} from 'react';

import {Registration} from '../../components';
require('./styles');

class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    return (
      <div className="main-wrap">
        <div className="wide-block main-header">
            <div className="container container-1">
                <a href="#" className="main-logo"></a> Text
                <div className="cabinet">
                    <span></span>
                </div>
            </div>
        </div>
        <div className="wide-block">
          <Registration />
        </div>
        <div className="wide-block main-footer">
            <div className="container container-1">
                <div className="main-footer__copy"><span></span></div>
                Disclaimer
            </div>
        </div>
      </div>
    );
  }
}

export default App;
