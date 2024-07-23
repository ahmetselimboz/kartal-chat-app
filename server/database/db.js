const { default: mongoose } = require("mongoose");

let instance = null;

class Database {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async connect(options) {
    try {
      console.log("Connecting DB...");
      await mongoose.connect(options);
 
      console.log("Connected DB!");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}

module.exports = new Database();
