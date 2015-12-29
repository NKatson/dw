import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Print } from '../atoms';
import { Buttons } from '../components';
import { setCategoryIndex } from '../redux/actions/survey';
import { transferSelector } from '../redux/selectors/surveySelectors';

class Transfer extends React.Component {
  componentWillMount() {
    this.props.dispatch(setCategoryIndex(2));
  }
  render() {
    const { firstName, lastName, address, city, state, zipCode, prevLink, nextLink} = this.props;
    return (
      <div>
        <h2>SEND A WIRE TRANSFER</h2>
          <p>If you’d like to wire us your funds, please print these instructions
              and take them to your bank.</p>
              <Print />
          <div className="pad-16">
              <h4>If your bank is located in the United States:</h4>
              <p>Wells Fargo Bank, NA<br />
                  420 Montgomery Street<br />
                San Francisco, CA 94104<br />
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
                    {address}<br />
                    {city}, {state} {zipCode}</p>
             </div>
             <div className="pad-16__col">
                 <h5>For credit to:</h5>
                 <p>TD Ameritrade Clearing, Inc.<br />
                     Account #16424641
                 </p>
             </div>
         </div>
         <form className="common-form anketa-form">
           <Buttons
             prevLink={prevLink}
             nextLink={nextLink}
            />
         </form>
      </div>
    );
  }
}

export default connect(transferSelector)(Transfer);
