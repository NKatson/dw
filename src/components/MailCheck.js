import React, { PropTypes } from 'react';

const MailCheck = ({children}) => {
  return (
    <div>
      <h2>SEND A WIRE MailCheck</h2>
        <p>If you’d like to wire us your funds, please print these instructions
            and take them to your bank.</p>
          <div className="wfm-big-link">
            <a href="#"><span>Print</span> <span className="icon icon_print"></span></a>
        </div>
        <div className="pad-16">
            <h4>If your bank is located in the United States:</h4>
            <p>Wells Fargo Bank, NA<br />
                420 Montgomery Street<br />
              San Fancisco, CA 94104<br />
                ABA transit routing #121000248
            </p>
            <div className="pad-16__col">
                <h5>For benefit of:</h5>
                <p>Your WorthFM TD Ameritrade<br />
                    Account #123456677<br />
                    Jane Smith<br />
                    100 My Address<br />
                    Washington, NY 10392</p>
            </div>
            <div className="pad-16__col">
                <h5>For credit to:</h5>
                <p>TD Ameritrade Clearing, Inc.<br />
                    Account #16424641
                </p>
            </div>
        </div>
    </div>
  );
}

export default MailCheck;
