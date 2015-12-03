var alt = require('../alt');
var NodeActions = require('../actions/NodeActions');
var NodeSource = require('../sources/NodeSource');

class NodeStore {
  constructor() {
    this.nodes = [];
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateNodes: NodeActions.UPDATE_NODES,
      handleFetchNodes: NodeActions.FETCH_NODES,
      handleNodesFailed: NodeActions.NODES_FAILED
    });

    this.exportAsync(NodeSource);
  }

  handleUpdateNodes(nodes) {
    this.nodes = nodes;
    this.errorMessage = null;
  }

  handleFetchNodes() {
    this.nodes = [];
  }

  handleNodesFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

module.exports = alt.createStore(NodeStore, 'NodeStore');
