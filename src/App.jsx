var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Nodes = require('./components/Nodes.jsx');

ReactDOM.render((
  <Router>
    <Route path="/" component={Nodes} />
  </Router>
), document.getElementById('sensors'))
