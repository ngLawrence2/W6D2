const View = require("./ttt-view.js");
const Game = require("../../solution/game.js");

$( () => {
  const container = $(".ttt");
  let view = new View(new Game(), container);
});
