const jokes = require("../../jokes_list.js");

module.exports = {
  name: "joke",
  description: "tell you a joke",
  async execute({ interaction }) {
    var joke = jokes[Math.floor(Math.random() * jokes.length)];
    interaction.channel.send(joke);
  },
};
