class View {
  constructor(game, $el) {
    this.setupBoard();
    this.el = $el;
    this.game = game;
    this.bindEvents();
  }

  bindEvents() {
    $('li').on("click", (e) => {
      let curPlr = this.game.currentPlayer;
      let curTar = $(e.currentTarget);
      if (this.game.board.isEmptyPos(curTar.data("pos")) && !this.game.isOver()) {
        // console.log(curTar.data("pos"));
        this.makeMove(curTar);
        this.game.playMove(curTar.data("pos"));
        if (this.game.isOver()) {
          $(".ttt").append(`<h1>${curPlr} has won!</h1>`);
        }
      } else if (this.game.isOver()) {
        alert('game is over!');
      } else {
        alert('invalid move');
      }
    }); 
  }

  makeMove($square) {
    $square.text(`${this.game.currentPlayer}`);
  }

  setupBoard() {
    $(".ttt").append("<ul class=\"grid\"></ul>");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
      let cell = $("<li></li>");
      cell.addClass("cell");
      cell.data("pos", [i, j]);
      $(".grid").append(cell);
      }
    }
  }
}

module.exports = View;
