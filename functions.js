let FACTS = [
  ""
]

window.onload = onLoad;

let XWalls = [0, document.getElementById("wanderRoom").offsetWidth];
let YWalls = [0, document.getElementById("wanderRoom").offsetHeight];

let wanderers = [];

function onLoad() {
  setFactsStraight();
  setupWanderers();
}



// Setting up the loop and processing the loop (for all animations)
let then = timestamp()

  ; (function loop() {
    requestAnimationFrame(loop)

    // calculating elapsed time since last call in Seconds.
    let now = timestamp()
    let delta = (now - then) / 1000;
    then = now

    process(delta);
  })()


/**
*  Sets the Facts banner.
*/
function setFactsStraight() {
  let factElem = document.getElementById("facts");
  let html = "<h1>Octopus Fact:</h1><h3>";
  html += FACTS[Math.floor(Math.random() * FACTS.length)];
  html += "</h3>";
  factElem.innerHTML = html;
}


/**
 * Processes one Frame of the window.
 * @param {float} delta The time Elapsed since the last frame.
 */
function process(delta) {
  for (let i = 0; i < wanderers.length; i++) {
    wanderers[i].update(delta);
  }
  // wanderers.forEach(wanderer => wanderer.update(delta));
  birthday.update(delta);
}

/**
 * Setting up all Wanderers on the Screen.
 */
function setupWanderers() {
  // getting all the wandering pictures and storing them in the wanderers array
  let elemts = document.getElementsByClassName("wanderer");

  for (let i = 0; i < elemts.length; i++) {
    wanderers[i] = new Wanderer(elemts[i], i);
    elemts[i].addEventListener("mouseover", () => runAway(i));
  }

  // setting up mario:
  let elemt = document.getElementById("mario");
  let marioWanderer = new Wanderer(elemt, wanderers.length);
  marioWanderer.normalSpeed = 300;
  marioWanderer.speed = 300;
  marioWanderer.yOffset = +200;
  marioWanderer.untilChangeTime = 30;
  marioWanderer.untilDirChange = 30;
  wanderers[wanderers.length] = marioWanderer;
}

function runAway(i) {
  wanderers[i].runAway();
  console.log("got me")
}

entertainerPlaying = false;
let entertainer = new Audio("audio/entertainer.mp3");
/**
 * Called when ENTERTAINING!!
 */
function playEntertain() {
  if (entertainerPlaying) {
    entertainerPlaying = false;
    entertainer.pause();
    return;
  }
  entertainer.play();
  entertainerPlaying = true;
}

marioPlaying = false;
let marioSlide = new Audio("audio/mario.mp3");
function playMario() {
  if (marioPlaying) {
    marioPlaying = false;
    mario.pause();
    return;
  }
  marioSlide.play();
  marioPlaying = true;
}

// How much pioxel the wanderers are allowed in the unknown
let TOLERANCE = 10;
/**
 * A class for the screen wanderer that contains all useful functions needed.
 */
class Wanderer {

  constructor(elem, index) {
    this.normalSpeed = 40;
    this.index = index;
    this.elem = elem;
    this.speed = 40;
    this.dir = 2 * Math.PI * Math.random();
    console.log(this.dir);
    this.untilChangeTime = 200 + Math.round(Math.random() * 200);
    this.untilDirChange = this.untilChangeTime;

    // when touched set runaway function
    // this.elem.addEventListener("mouseover", this.runAway);
    this.runAwayCounter = 0;

    // Setting starting Position of the wanderer.
    this.y = (Math.random() * (YWalls[1] - YWalls[0]));
    this.x = (Math.random() * (XWalls[1] - XWalls[0]));
    this.xOffset = elem.offsetLeft;
    this.yOffset = elem.offsetHeight;
    this.elem.style.top = (this.y - this.yOffset) + "px";
    this.elem.style.left = (this.x - this.xOffset) + "px";
  }

  /**
   * Gets calles every Frame to process the Movement / Animation of the Wanderer.
   * @param {float} delta The time elapsed since the last frame
   */
  update(delta) {
    if (this.running) {
      this.dir = Math.PI * 2 * Math.random();
      this.runAwayCounter = 100;
      this.speed = this.normalSpeed * 3;
      this.running = false;
    }

    // when currently running away ajust speed
    if (this.runAwayCounter > 0) {
      console.log("oh moin!")
      this.runAwayCounter--;
      if (this.runAwayCounter == 0) {
        this.speed = this.normalSpeed;
        this.running = false;
      }
    }

    // teleporting to the other side
    this.walkThrougWall();

    // Setting internal x and y Position
    this.moveX = Math.cos(this.dir) * this.speed * delta;
    this.moveY = Math.sin(this.dir) * this.speed * delta;
    this.x += this.moveX;
    this.y += this.moveY;

    // Change direction if neccessary
    this.untilDirChange--;
    if (this.untilDirChange <= 0) {
      this.dir = Math.PI * 2 * Math.random();
      this.untilDirChange = this.untilChangeTime;
    }

    // setting actual direction
    this.elem.style.top = (this.y - this.yOffset) + "px";
    this.elem.style.left = (this.x - this.xOffset) + "px";

  }

  runAway() {
    this.running = true;
  }

  /**
   * Checks whether the wanderer is near a wall and should turn.
   */
  walkThrougWall() {
    if (Math.cos(this.dir) < 0) {
      if (this.x < XWalls[0] - TOLERANCE) {
        this.x = XWalls[1];
      }
    } else {
      if (this.x > XWalls[1] + TOLERANCE) {
        this.x = XWalls[0];
      }
    }

    // Checking for Y walls and going through
    if (Math.sin(this.dir) < 0) {
      if (this.y < YWalls[0] - TOLERANCE) {
        this.y = YWalls[1] - this.elem.height;
      }
    } else {
      if (this.y > YWalls[1] - this.elem.height) {
        this.y = YWalls[0];
      }
    }
  }
}

/*timer*/
const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

let countDown = new Date('Jun 22, 2021 00:00:00').getTime(),
  x = setInterval(function () {

    let now = new Date().getTime(),
      distance = countDown - now;

    document.getElementById('days').innerText = Math.floor(distance / (day)),
      document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
      document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
      document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

  }, second)

