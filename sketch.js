let rand;
let author;
let font;
let state = 'play';
let kanye, ron;

function preload() {
  font = loadFont('KIN668.TTF');
  kanye = loadImage('kanye6.png');
  ron = loadImage('ron2.png');
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  generateQuote();
  

}

function generateQuote(){
  state = 'play';
  background('#B6D6F2')
  fill(255);
  rand = floor(random(0, 2));

  textAlign(CENTER);
  textFont(font);
  textSize(50);
  text('Who Said It?',width/2,100)
  

  if (rand === 0) {
    author = 'Ron';
    getRonQuote();
  } else {
    getKanyeQuote();
    author = 'Kanye';
  }

  noFill();
  noStroke();
  image(ron,width/2-200,height/2,150,200);
  rect(width / 2 - 200, height / 2, 150, 200);
  image(kanye,width/2+50,height/2,150,200);
  rect(width / 2 + 50, height / 2, 150, 200);
}

function getRonQuote() {
  fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes").then(response => response.json()).then(data => display(data));
}

function getKanyeQuote() {
  fetch("https://api.kanye.rest").then(response => response.json()).then(data => display(data));
}

function display(data) {
  textAlign(CENTER);
  textFont(font);
  fill(0)
  textSize(20)
  if (rand === 0) {
    text(data, width / 2 - 250, height / 4, 500, 500);
  } else {
    text(data.quote, width / 2 - 250, height / 4, 500, 500);
  }
  print(author)
}

function mousePressed() {
   let hit1 = collidePointRect(mouseX, mouseY, width / 2 - 200, height / 2, 150, 200);
    let hit2 = collidePointRect(mouseX, mouseY, width / 2 + 50, height / 2, 150, 200);
  if (state === 'play' && (hit1 || hit2)) {
    push();
    fill(0, 0, 0, 95);
    rect(0, 0, width, height);
    pop();
   

    if (hit1) {
      print('hit1')
      rect(width/2-125, 20, 250,100,20);
      if (author === 'Ron') {
        fill(0, 255, 0);
        text('Correct! It was', width / 2, 50);
        
      } else {
        fill(255, 0, 0);
        text('Incorrect! It was', width / 2, 50);
      }
      text(author, width / 2, 100);
    }
    if (hit2) {
      print('hit2')
      rect(width/2-125, 20, 250,100,20);
      if (author === 'Kanye') {
        fill(0, 255, 0);
        text('Correct! It was', width / 2, 50);
       
      } else {
        fill(255, 0, 0);
        text('Incorrect! It was', width / 2, 50);
        
      }
      text(author, width / 2, 100);
    }
    
    state = 'end';
  }

  if (state === 'end') {
    fill(255);
    rect(width / 2 - 100, height / 2-120, 200, 100, 25);
    fill(0);
    text('play again', width/2, height/2-70);
    
    let hit3 = collidePointRect(mouseX, mouseY, width / 2-100, height / 2-120, 200, 100);
    if (hit3 && state === 'end') {
      print('hit')
      generateQuote();
    }
  }
  //print(state);
}