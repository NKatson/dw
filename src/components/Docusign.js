import React, { PropTypes } from 'react';
import { setLink } from '../redux/actions/docusign';
import { getDocusignLink } from '../utils/apiClient';

class Docusign extends React.Component {
  componentDidMount() {
    getDocusignLink((err, data) => {
      const link = data.docusign_url;
      console.log(link);
      if (link && !this.props.link) {
          this.props.dispatch(setLink(link));
      }
    });
  }
  render() {
    const { link } = this.props;
    return (
      <div>
        <h2>4. SIGN</h2>
        <p>Please review and sign the following:</p>
        <br />
          <div className="anketa-form__fieldset">
            <div className="input-wrap input-wrap_list">
                <span className="common-form__label-title">Standard Account Application</span>
                <span className="common-form__label-text">2 signatures, one for your savings account and one for your investment account</span>
            </div>
            <div className="input-wrap input-wrap_list">
                <span className="common-form__label-title">IRA Application</span>
                <span className="common-form__label-text">1 signature, to open your retirement account</span>
            </div>
            <div className="input-wrap input-wrap_list">
                <span className="common-form__label-title">Move Money</span>
                <span className="common-form__label-text">1 signature to allow TD Bank to electronically move funds to and from your connected bank</span>
            </div>
        </div>
        <div className="wfm-docusign">
            {link ? <iframe style={{width: '550px', height: '700px'}} src={link}></iframe> : null }
        </div>
      </div>
    );
  }
}

export default Docusign;
