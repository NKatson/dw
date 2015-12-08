import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
class Html extends Component {
  render() {
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    return (
      <html lang="en-us">
        <head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}

          { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('../containers/App.css')}}/> : null }
        </head>
        <body>
          <div id="root" className="wfm-main-wrap" dangerouslySetInnerHTML={{__html: content}}></div>
            <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"></script>
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object,
};

export default Html;
