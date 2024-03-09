exports.MONGO_URL = "mongodb://localhost:27017",
exports.MONGO_DB = "/rpncsecurity",
exports.MONGO_OPTIONS= "authSource=rpncsecurity",
exports.MONGO_URI_OPTIONS= "?authSource=rpncsecurity",
exports.MONGO_USER= "rpncsecurity_rw",
exports.MONGO_PWD= "vcallGvcTnjH3r"


module.exports = {
    port: process.env.PORT || 3000,
    mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost/insuredmine',
    // Add other configuration options here
  };