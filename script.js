var ball_x, ball_dx, ball_y, ball_dy, ball_r;
var paddle_x, paddle_y, paddle_w, paddle_h, paddle_dx;

var brick_r = 4, brick_c = 4, brick_w = 75, brick_h = 20, brick_padding = 20, brickOffSetLeft = 20, brickOffSetTop = 30;

var score = 0, lives = 3;

var bricks = [];
for (var c=0; c<brick_c; c++) {
  bricks[c] = [];
  for (var r=0; r<brick_r; r++) {
    bricks[c][r] = {x: 0, y: 0, hidden: 0};
  }
}

function createBricks () {
  for (var c=0; c<brick_c; c++) {
    for (var r=0; r<brick_r; r++) {
      if (bricks[c][r].hidden == 0) {
        var brick_x = brickOffSetLeft + r*(brick_w + brick_padding);
        var brick_y = brickOffSetTop + c*(brick_h + brick_padding);

        bricks[c][r].x = brick_x;
        bricks[c][r].y = brick_y;
        fill("rgb(36,100,142)");
        rect(bricks[c][r].x, bricks[c][r].y, brick_w, brick_h);
      }
    }
  }
}

function checkHit () {
  for (var c=0; c<brick_c; c++) {
    for (var r=0; r<brick_r; r++) {
      var brick_x = bricks[c][r].x;
      var brick_y = bricks[c][r].y;
      
      if ((bricks[c][r].hidden == 0) && (ball_x >= brick_x && ball_x <= brick_x + brick_w) && (ball_y - ball_r <= brick_y + brick_h)) {
        ball_dy = -ball_dy
        bricks[c][r].hidden = 1;
        score++;
      }
    }
  }
}

function setup() {
  createCanvas(400, 420);
  
  paddle_w = 90;
  paddle_h = 15;
  paddle_x = (width/2) - (paddle_w/2);
  paddle_y = (height) - (paddle_h);
  paddle_dx = 3;
  
  ball_r = 25/2;
  ball_x = width/2;
  ball_dx = 2;
  ball_y = height - (paddle_h + ball_r);
  ball_dy = 3;
}

function draw () {
  clear ();
  
  if (height <= 20) {
    background("white");
  } 
  if (height > 20) {
    background("rgb(181,182,179)");
  }
  fill("rgb(31,34,33)");
  textSize(16);
  text("Score = " + score + "  Lives = " + lives, 40, 20);
  
  if (lives <= 0) {
    ball_dx = 0;
    ball_dy = 0;
    lives = 0;
  } 
  
  createBricks ();
  checkHit();
  
  fill(0, 255, 0);
  circle(ball_x, ball_y, 25);
  rect(paddle_x, paddle_y, paddle_w, paddle_h)
  
  if (ball_x + ball_r >= width || ball_x - ball_r <= 0) {
    ball_dx = -ball_dx;
  }
  
  if (ball_y + ball_r >= height || ball_y - ball_r <= 20) {
    ball_dy = -ball_dy;
  }
  
  if ((ball_x >= paddle_x && ball_x <= paddle_x + paddle_w) && (ball_y + ball_r >= paddle_y)) {
    ball_dy = -ball_dy
  }
  
  if ((ball_x < paddle_x || ball_x > paddle_x + paddle_w)) {
    if (ball_y + ball_r >= height) {
      lives--;
      if (lives) {
        ball_r = 25/2;
        ball_x = paddle_x + paddle_w/2;
        ball_dx = 2;
        ball_y = height - (paddle_h + ball_r);
        ball_dy = -3; 
      }
    }
  }
  
  if (score == brick_c*brick_r) {
    ball_dx = 0;
    ball_dy = 0;
  }
  
  ball_x = ball_x + ball_dx;
  ball_y = ball_y + ball_dy;
  
  if (keyIsDown(LEFT_ARROW)) {
    if (paddle_x > 0) {
      paddle_x = paddle_x - paddle_dx; 
    }
  } 
  if (keyIsDown(RIGHT_ARROW)) {
    if (paddle_x + paddle_w < width) {
      paddle_x = paddle_x + paddle_dx;
    }
  }
}
