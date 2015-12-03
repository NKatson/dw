import React, { PropTypes } from 'react'
import { Link } from 'react-router';

class ResetPasswordSent extends React.Component {
  render() {
    return (
      <div className="container container-1">
         <div className="login-block">
             <div className="text-left">
                 <h1>Check Your Email!</h1>
                 <p>We've sent you instructions to reset your password. If you need more help, check out our <a
                         href="#">FAQs</a> or contact <a href="#">Customer Support</a>. </p>
             </div>
             <div className="input-wrap pad-02">
                 <Link to="signin" className="btn btn_blue w-308">Return to Sign In</Link>
             </div>
         </div>
     </div>
   );
  }
}

export default ResetPasswordSent;
