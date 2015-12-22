import React from 'react';

export default () => {
  return (
    <div className="wfm-big-link">
        <a onClick={(e) => {
            e.preventDefault();
            window.print();
          }} href="#"><span>Print</span> <span className="icon icon_print"></span></a>
    </div>
  );
}
