var React = require('react');
var NodeStore = require('../stores/NodeStore');
var Link = require('react-router').Link;

var Nodes = React.createClass({
  getInitialState() {
    return NodeStore.getState();
  },

  componentDidMount() {
    NodeStore.listen(this.onChange);
    if(!this.state.nodes.length)
      NodeStore.fetchNodes();
  },

  componentWillUnmount() {
    NodeStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  render() {
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    }

    if (!this.state.nodes.length) {
      return (
        <div>
          <img src="/images/ajax-loader.gif" />
        </div>
      )
    }

    return (
      <ul>
        {this.state.nodes.map((node) => {
          return (
            <li key={node.id}>
              <Link to={`/nodes/${node.id}`}>{node.name}</Link>
            </li>
          );
        })}
      </ul>
    );
  },

  removeNode(node) {
    console.log(node);
  }
});

module.exports = Nodes;
