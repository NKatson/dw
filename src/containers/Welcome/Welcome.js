import React, { PropTypes } from 'react';
import { SubmitButton, Radio, Step } from '../../components';

class Welcome extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
  }
  handleRadioClick() {
    console.log('Radio click!');
    console.log(this);

  }
  renderRadios() {
    const radios = [
      {
        text: 'Fresh',
        description: "I've never opened an investment account before. Not sure what the difference is between an IRA and a 401(k), but I'm hoping to learn.",
      },
      {
        text: 'Growing',
        description: "I have an IRA or 401(k) already, but I'd like to do more with my money and learn about other alternatives.",
      },
      {
        text: 'Seasoned',
        description: "I'm pretty comfortable with investing. I have an IRA, 401(k) and a separate brokerage account. I just want a new place to put my money.",
      },
    ];
    return radios.map((item, index) => {
      return (
        <Radio
          handleClick={() => {}}
          key={index}
          {...item}
          isChecked={index === 1 ? true : false}
        />
      );
    });
  }
  renderSteps() {
    const steps = [
      {
        text: 'Personal Info.',
        description: "Tell us about yourself. All the basics: name, birthday, etc.",
      },
      {
        text: 'Pick Your Account Type',
        description: "Here's where you'll pick the right account for you. And don't worry if you don't know yet. We can help.",
      },
      {
        text: 'Find Your Account',
        description: "Last step: Transfer your money! Then the real magic begins.",
      },
    ];
    return steps.map((item, index) => <Step key={index} {...item} />);
  }
  render() {
    const imgUrl = require('../../../static/spoiler/wide-bg.jpg');
    const spoilerPicture = require('../../../static/spoiler/picture.jpg');
    return (
      <div>
        <div className="wide-block common-block promise-block" style={{ backgroundImage: 'url(' + imgUrl + ')'}}>
          <div className="container container-1">
            <div className="common-block__inner">
              <h2>Our Promise to You</h2>
              <p className="promise-block__text-01">You want a smart, easy way to manage and grow your money and that's what we do:
              </p>
              <p>We promise to give you the tools you need to take control of your money. But you're not alone. We'll provide help and advice along the way to make sure you have as much or as little financial knowledge as you want to feel confident.</p>
              <p>We promise to keep it simple: no complicated financial jargon or distracting bells and whistles that keep you from achieving your goals.</p>
              <p>We promise to give you information about your money when and how you need it.</p>
              <p>We promise to do this all in a secure, encrypted enviornment to keep your money safe. </p>
            </div>
          </div>
        </div>
        <div className="wide-block common-block tell-us-block">
          <div className="container container-1">
            <div className="common-block__inner">
              <h2>Tell Us About You</h2>
              <p>How would you describe your level of investing knowledge? Have you done this before or are you new to the game? (There's no wrong answer!)
              </p>
              <div>
                <div className="btn-group tell-us-block__choises" data-toggle="buttons">
                  {::this.renderRadios()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wide-block common-block steps-block">
          <div className="container container-1">
            <div className="common-block__inner">
              <h2>The Steps</h2>
              <p>Here's what we'll do to set up your account.</p>
              <div className="steps-block__items">
                {::this.renderSteps()}
              </div>
              <div><a href="#" className="btn btn_blue pad-03">Next</a></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
