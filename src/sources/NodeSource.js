var NodeActions = require('../actions/NodeActions');

var mockData = [
  { id: 0, name: 'Kitchen' },
  { id: 1, name: 'Brewery' },
  { id: 2, name: 'Hall' },
  { id: 3, name: 'Living Room' },
  { id: 4, name: 'Bedroom 1' },
  { id: 5, name: 'Bedroom 2' },
  { id: 6, name: 'Outside' }
];

var NodeSource = {
  fetchNodes() {
    return {
      remote() {
        return new Promise(function (resolve, reject) {
          // simulate an asynchronous flow where data is fetched on
          // a remote server somewhere.
          setTimeout(function () {

            // change this to `false` to see the error action being handled.
            if (true) {
              // resolve with some mock data
              resolve(mockData);
            } else {
              reject('Things have broken');
            }
          }, 500);
        });
      },

      local() {
        // Never check locally, always fetch remotely.
        return null;
      },

      success: NodeActions.updateNodes,
      error: NodeActions.nodesFailed,
      loading: NodeActions.fetchNodes
    }
  }
};

module.exports = NodeSource;
