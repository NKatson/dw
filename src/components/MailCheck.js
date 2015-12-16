import React, { PropTypes } from 'react';

const MailCheck = ({children}) => {
  return (
    <div>
      <h2>MAIL A CHECK</h2>
        <p>Please send your check to the following address.<br />
                Enter your WorthFM TD Ameritrade Account Number in the Memo
                field on your check.</p>
            <div className="wfm-big-link">
                <a href="#"><span>Print</span> <span className="icon icon_print"></span></a>
            </div>
            <div className="pad-17">
                <p>TD Ameritrade Clearing, Inc.<br />
                    FBO Client Name and<br />
                  Account Number<br />
                PO BOX 919031<br />
              San Diego, CA 92191-9031<br />
            5010 Wateridge Vista Drive<br />
                    San Diego, CA 92121-5775</p>
            </div>
            <div className="text-center">
                <h4>Your WorthFM TD Ameritrade Account #: 123456677</h4>
            </div>
            <form className="common-form anketa-form">
               <div className="text-center">
                 {children}
               </div>
            </form>
    </div>
  );
}

export default MailCheck;
