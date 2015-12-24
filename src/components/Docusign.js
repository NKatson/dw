import React, { PropTypes } from 'react';
import * as actions from '../redux/actions/docusign';
import { getDocusignLink } from '../utils/apiClient';

class Docusign extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.setIsDocusign(true));
    getDocusignLink((err, data) => {
      const link = data.docusign_url;
      console.log(link);
      
      if (link && !this.props.link) {
          this.props.dispatch(actions.setLink(link));
      }
    });
  }
  componentWillUnmount() {
    this.props.dispatch(setIsDocusign(false));
  }
  render() {
    const { link } = this.props;
    return (
      <div>
        <h2>4. ONLY THINGS YOU KNOW</h2>
        <p>We already love you, and we want to make sure you’re really you to keep you safe. Confirm your identity by answering these three questions.</p>
        <div className="wfm-docusign">
            {link ? <iframe style={{width: '1050px', height: '1000px'}} src={link}></iframe> : null }
            <div className="text-center">
              <div className="common-form__buttons">
                  {this.props.children}
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Docusign;
