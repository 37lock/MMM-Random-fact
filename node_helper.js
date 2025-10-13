const NodeHelper = require("node_helper")

module.exports = NodeHelper.create({

  async socketNotificationReceived(notification, payload) {
    if (notification === "GET_RANDOM_TEXT") {
      this.sendSocketNotification("EXAMPLE_NOTIFICATION", { text: fact })
    }
  },
})
