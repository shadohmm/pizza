const { createStore } = require("redux");
const { default: Reducer } = require("./rducer");

var store = createStore(Reducer)

export default store