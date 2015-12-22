import React, { PropTypes } from 'react';

const Transfer = ({ children, data, firstName, lastName }) => {
  return (
    <div>
      <h2>SEND A WIRE TRANSFER</h2>
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
                <h5>For credit to:</h5>
                <p>TD Ameritrade Clearing, Inc.<br />
                    Account #16424641
                </p>
            </div>
        </div>
        <div className="pad-16">
           <h4>If your bank is located outside the United States:</h4>
           <p>First National Bank  of Omaha<br />
               16th & Dodge Streets<br />
             Omaha, NE 68102<br />
           ABA transit routing #104000016<br />
               Swift Code/BIC: FNBOUS44XXX (if your bank requires it)
           </p>
           <div className="pad-16__col">
               <h5>For benefit of:</h5>
               <p>
                  {firstName} {lastName}<br />
                  {data.address.value}<br />
                  {data.city.value}, {data.state.value} {data.zip_code.value}</p>
           </div>
           <div className="pad-16__col">
               <h5>For credit to:</h5>
               <p>TD Ameritrade Clearing, Inc.<br />
                   Account #16424641
               </p>
           </div>
       </div>
       <form className="common-form anketa-form">
           <div className="text-center">
              {children}
           </div>
       </form>
    </div>
  );
}

export default Transfer;
