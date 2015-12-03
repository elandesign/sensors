var React = require('react');
var NodeStore = require('../stores/NodeStore');

var Nodes = React.createClass({
  getInitialState() {
    return NodeStore.getState();
  },

  componentDidMount() {
    NodeStore.listen(this.onChange);
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
            <li key={node.id} onClick={this.removeNode}>{node.name}</li>
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
