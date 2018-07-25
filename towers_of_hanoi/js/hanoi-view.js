class View {
  constructor(game, $el) {
    this.game = game;
    this.el = $el;
    this.setupTowers();
    this.bindEvents();
    this.currentTower = null;
  }

  bindEvents() {
    $('ul').on('click', (e) => {
      if (!this.game.isWon()) {
        if (this.currentTower === null && $(e.currentTarget).context.children.length > 0) {
          this.currentTower = $(e.currentTarget);
          this.currentTower.css("background-color", "green");
        } else if (!!this.currentTower && this.game.isValidMove(this.currentTower.data("num"), $(e.currentTarget).data("num"))) {
          this.makeMove(this.currentTower, $(e.currentTarget));
          this.currentTower.css("background-color", "white");
          this.currentTower = null;
          if (this.game.isWon()) $(".towers").append("<h1>You Win!</h1>");
        } else {
          this.currentTower.css("background-color", "white");
          this.currentTower = null;
        }
      }
    });
  }

  makeMove($to, $from) {
    // move li to tower
    const disk = $to.context.children[0];
    console.log($(disk));
    $(disk).remove();
    $from.prepend($(disk));
    this.game.move($to.data("num"), $from.data("num"));
  }

  setupTowers() {
    $(".towers").append("<div class=\"row\" ></div>");
    for (let i = 0; i < 3; i++) {
      const tower = $("<ul class=\"tower\" ></ul>");
      tower.data("num", i);
      if (i === 0) {
        for (let j = 0; j < 3; j++) {
          const disk = $("<li></li>");
          disk.data("size", j);
          disk.css("width", (j + 1) * 50);
          tower.append(disk);
        }
      }
      $(".row").append(tower);
    }
  }
}

module.exports = View;