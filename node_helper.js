const NodeHelper = require("node_helper")

var url = "https://uselessfacts.jsph.pl/api/v2/facts/random";
async function randomFact() {
 const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    const fact = data.text;
    return fact
    
}
module.exports = NodeHelper.create({

  async socketNotificationReceived(notification, payload) {
    if (notification === "GET_RANDOM_FACT") {
      const result = await randomFact();
      this.sendSocketNotification("RETURN_RANDOM_FACT", { text: result })
    }
  },
})
