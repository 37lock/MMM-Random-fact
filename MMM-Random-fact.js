Module.register("MMM-Random-fact", {

  defaults: {
    exampleContent: "",
    updateTime: 900000,
  },

  /**
   * Apply the default styles.
   */
  getStyles() {
    return ["random-fact.css"]
  },



  start() {
    this.templateContent = this.config.exampleContent;
    this.addRandomFact(),
    // set timeout for next random text
    setInterval(() => this.addRandomFact(), 900000)
    
  },

  /**
   * Handle notifications received by the node helper.
   * So we can communicate between the node helper and the module.
   *
   * @param {string} notification - The notification identifier.
   * @param {any} payload - The payload data`returned by the node helper.
   */
  socketNotificationReceived: function (notification, payload) {
    if (notification === "RETURN_RANDOM_FACT") {
      this.templateContent = `${this.config.exampleContent} ${payload.text}`;
      this.updateDom()
    }
  },
  /**
   * Render the page we're on.
   */
  getDom() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `Random Fact<br />${this.templateContent}`;

    return wrapper
  },

  addRandomFact() {
    this.sendSocketNotification("GET_RANDOM_FACT")
  },

  /**
   * This is the place to receive notifications from other modules or the system.
   *
   * @param {string} notification The notification ID, it is preferred that it prefixes your module name
   * @param {number} payload the payload type.
   *
  notificationReceived(notification, payload) {
    if (notification === "TEMPLATE_RANDOM_TEXT") {
      this.templateContent = `${this.config.exampleContent} ${payload}`
      this.updateDom()
    }
  }
  */
})
