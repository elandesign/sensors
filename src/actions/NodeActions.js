var alt = require('../alt');

class NodeActions {
  updateNodes(nodes) {
    this.dispatch(nodes);
  }

  fetchNodes() {
    this.dispatch();
  }

  nodesFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}

module.exports = alt.createActions(NodeActions);
