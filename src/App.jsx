var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Redirect = ReactRouter.Redirect
var Nodes = require('./components/Nodes.jsx');
var Node = require('./components/Node.jsx')

ReactDOM.render((
  <Router>
    <Route path="/" component={Nodes} />
    <Route path="/nodes/:id" component={Node} />
  </Router>
), document.getElementById('sensors'))
