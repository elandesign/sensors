var React = require('react');
var Link = require('react-router').Link;

var Node = React.createClass({
  render() {
    return(
      <div>
        <Link to={"/"}>{this.props.params.id}</Link>
      </div>
    );
  },
});

module.exports = Node;
