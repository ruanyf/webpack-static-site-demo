import React from 'react'
import { render } from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import { Router, browserHistory, createMemoryHistory, RouterContext, match } from 'react-router'
import routes from './modules/routes'

if (typeof document !== 'undefined') {
  render(
    <Router routes={routes} history={browserHistory}/>,
    document.getElementById('app')
  )
}

export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    callback(null, locals.template({
      html: renderToStaticMarkup(<RouterContext {...renderProps} />),
      assets: locals.assets
    }));
  });
};

