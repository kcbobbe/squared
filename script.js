// var count=0;
class Game {
  constructor (canvas) {
    this.canvas = canvas
    this.screen = canvas.getContext('2d')
    this.player = new Player(this)
    this.coin = new Coin(this)
    this.badCoin = new BadCoin(this)
    this.badCoinB = new BadCoinB(this)
  }
  draw () {
    this.screen.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.screen.strokeStyle = '#FF0000'
    this.screen.lineWidth = 1
    this.screen.strokeRect(150, 150, 300, 300)
    this.player.draw()
    this.coin.draw()
    this.badCoin.draw()
    // if (document.getElementById('counter').innerText > 5) {
      this.badCoinB.draw()
    // }
  }

  tick () {
    this.update()
    this.draw()
    requestAnimationFrame(this.tick.bind(this))
  }

  update () {
    this.player.update()

    // put this into badcoin update
    this.badCoin.location.y += 3
    if (this.badCoin.location.y > 430) {
      this.badCoin.update()
    }

    this.badCoinB.location.y -= 2
    if (this.badCoinB.location.y < 150) {
      this.badCoinB.update()
    }

    if (colliding(this.coin.location, this.player.location)) {
      if (this.coin.location.sizeX < this.player.location.sizeX){
        console.log('the coin is bigger')
        var count = document.getElementById('counter')
        count.innerText = parseInt(count.innerText) + 1
        console.log(this.player.location)
          if (this.player.location.sizeX>295){
            count.innerText='YOU WIN'
          }else{
          this.player.location.sizeX = this.player.location.sizeX+3
          this.player.location.sizeY = this.player.location.sizeY+3
          console.log(count)
          this.coin.update()
          }
      }else{
        var count = document.getElementById('counter')
        count.innerText = 0
        console.log(count)
        this.coin.update()

      }
    }
      

    if (colliding(this.badCoin.location, this.player.location)) {
      var count = document.getElementById('counter')
        if (this.player.location.sizeX<=1){
          this.player.location.sizeX = this.player.location.sizeX-1
        this.player.location.sizeY = this.player.location.sizeY-1
          count.innerText='YOU LOSE'
        }else{
        this.player.location.sizeX = this.player.location.sizeX-1
        this.player.location.sizeY = this.player.location.sizeY-1
        count.innerText = 0
        console.log(count)
        }
      this.badCoin.update()
    }

    if (colliding(this.badCoinB.location, this.player.location)) {
      var count = document.getElementById('counter')
      count.innerText = 0
      console.log(count)
      this.badCoinB.update()
    }
  }
}


class Player {
  constructor (game) {
    this.game = game
    this.screen = game.screen
    this.keyboarder = new Keyboarder()
    this.location = {
      x: 270,
      y: 270,
      sizeX: 5,
      sizeY: 5
    }
  }
  draw () {
    this.screen.fillStyle = '#FF8800'
    var sizeX = this.location.sizeX
    var sizeY = this.location.sizeY
    var leftX = this.location.x
    var leftY = this.location.y
    this.screen.strokeRect(leftX, leftY, sizeX, sizeY)
  }
  update () {
    if (this.keyboarder.isDown(Keyboarder.KEYS.LEFT) && this.keyboarder.isDown(Keyboarder.KEYS.SPACE) && this.location.x > 150) {
      this.location.x -= 6
    } else if (this.keyboarder.isDown(Keyboarder.KEYS.RIGHT) && this.keyboarder.isDown(Keyboarder.KEYS.SPACE) && this.location.x < (445 - this.location.sizeX)) {
      this.location.x += 6
    } else if (this.keyboarder.isDown(Keyboarder.KEYS.DOWN) && this.keyboarder.isDown(Keyboarder.KEYS.SPACE) && this.location.y < (445 - this.location.sizeY)) {
      this.location.y += 6
    } else if (this.keyboarder.isDown(Keyboarder.KEYS.UP) && this.keyboarder.isDown(Keyboarder.KEYS.SPACE) && this.location.y > 150) {
      this.location.y -= 6
    } else if (this.keyboarder.isDown(Keyboarder.KEYS.LEFT) && this.location.x > (150)) {
      this.location.x -= 3
    } else if (this.keyboarder.isDown(Keyboarder.KEYS.RIGHT) && this.location.x < (445 - this.location.sizeX)) {
      this.location.x += 3
    } else if (this.keyboarder.isDown(Keyboarder.KEYS.DOWN) && this.location.y < (445 - this.location.sizeY)) {
      this.location.y += 3
    } else if (this.keyboarder.isDown(Keyboarder.KEYS.UP) && this.location.y > (150) ){
      this.location.y -= 3
    }
  }
}

class Coin {
  constructor (game) {
    this.game = game
    this.screen = game.screen
    this.location = {
      x: (Math.floor(Math.random() * 155) + 155),
      y: ((Math.floor(Math.random() * 155)) + 155),
      sizeX: 5,
      sizeY: 5
    }
  }
  draw () {
    this.screen.strokeStyle = '#FFDD00'
    var sizeX = 20
    var sizeY = 20
    this.screen.strokeRect(this.location.x, this.location.y, sizeX, sizeY)
  }
  update () {
    this.location.x = (Math.floor(Math.random() * 155)) + 155
    this.location.y = (Math.floor(Math.random() * 155)) + 155
  }
}

class BadCoin {
  constructor (game, direction) {
    this.game = game
    this.screen = game.screen
    this.location = {
      x: (Math.floor(Math.random() * 155) + 155),
      y: (0)
    }
  }

  draw () {
    this.screen.strokeStyle = '#FF0000'
    var sizeX = 20
    var sizeY = 20
    this.screen.strokeRect(this.location.x, this.location.y, sizeX, sizeY)
  }

  update () {
    this.location.x = (Math.floor(Math.random() * 155)) + 155
    this.location.y = (0)
  }
}

class BadCoinB {
  constructor (game) {
    this.game = game
    this.screen = game.screen
    this.location = {
      x: (Math.floor(Math.random() * 155) + 155),
      y: (500)
    }
  }
  draw () {
    this.screen.fillStyle = '#000055'
    var sizeX = 20
    var sizeY = 20
    this.screen.strokeRect(this.location.x, this.location.y, sizeX, sizeY)
  }
  update () {
    this.location.x = (Math.floor(Math.random() * 155)) + 155
    this.location.y = (500)
  }
}

function colliding (b1, b2) {
  var b1centerX = b1.x + (10)
  var b1centerY = b1.y + (10)

  var b2centerX = b2.x + (b2.sizeX / 2)
  var b2centerY = b2.y + (b2.sizeY / 2)

  return !(b1 === b2 ||
      b1centerX + 10 < b2centerX - b2.sizeX / 2 ||
      b1centerY + 10 < b2centerY - b2.sizeY / 2 ||
      b1centerX - 10 > b2centerX + b2.sizeX / 2 ||
      b1centerY - 10 > b2centerY + b2.sizeY / 2
  )
}

class Keyboarder {
  constructor () {
    this.keyState = {}

    window.addEventListener('keydown', function (e) {
      this.keyState[e.keyCode] = true
    }.bind(this))

    window.addEventListener('keyup', function (e) {
      this.keyState[e.keyCode] = false
    }.bind(this))
  }

  isDown (keyCode) {
    return this.keyState[keyCode] === true
  }

  on (keyCode, callback) {
    window.addEventListener('keydown', function (e) {
      if (e.keyCode === keyCode) {
        callback()
      }
    })
  }
}

Keyboarder.KEYS = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  SPACE: 32
}
var canvas = document.getElementById('myCanvas')

// window.addEventListener('load', function(){
var game = new Game(canvas)
game.tick()

// var canvas= document.getElementById("myCanvas")
// var screen = canvas.getContext("2d")

// var ctx=canvas.getContext("2d")
// ctx.fillStyle="FF0000";
// ctx.strokeRect(250,250,200,200)
