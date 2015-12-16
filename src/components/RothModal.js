import React, { PropTypes } from 'react';

export default ({ children, header }) => {
  return (
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <div className="modal-body">
                <h2>INTERESTED IN ROTH IRA?</h2>
                  <p>{header}</p>
                  <br />
                  {children}
            </div>
        </div>
    </div>
  );
}
