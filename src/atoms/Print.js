import React from 'react';

export default () => {
  return (
    <div className="wfm-big-link">
        <a onClick={(e) => {
            e.preventDefault();
            const w = window.open('http://www.tdameritrade.com/retail-en_us/resources/pdf/TDA081.pdf');
            w.print();
          }} href="#"><span>Print</span> <span className="icon icon_print"></span></a>
    </div>
  );
}
