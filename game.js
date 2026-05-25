const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 760;

const TILE = 28;

const offsetX = 70;
const offsetY = 170;

const questionBox = document.getElementById("questionBox");
const questionText = document.getElementById("questionText");

const optionButtons = [
document.getElementById("opt0"),
document.getElementById("opt1"),
document.getElementById("opt2"),
document.getElementById("opt3")
];

const map = [

"111111111111111111111111111111",
"100000000000000000000000000001",
"101110111101111111101111011101",
"102000100001000000100001000201",
"101110111101111111101111011101",
"100000000000000000000000000001",
"101110111111011110111111011101",
"100000000000010000000000000001",
"111110111011111110111011111111",
"100000100010000010000100000001",
"111110101111044011110101111111",
"100000100000000000000100000001",
"111110101111111111110101111111",
"100000100000000000000100000001",
"111110101111111111110101111111",
"100000000000010000000000000001",
"101110111111011110111111011101",
"102000000001000000100000000201",
"111111111111111111111111111111"

];

let pellets = [];

let score = 0;
let lives = 3;

let pelletsEaten = 0;

let gamePaused = false;

let estrogenBar = 0;
let progesteroneBar = 0;
let lhBar = 0;

let estrogenMode = false;
let progesteroneMode = false;
let lhMode = false;

const powers = {

estrogen:{
name:"Estrógeno",
effect:"Duplica puntos",
time:8000
},

progesterone:{
name:"Progesterona",
effect:"Ralentiza espermas",
time:8000
},

lh:{
name:"LH Surge",
effect:"Permite comer espermas",
time:8000
}

};

const questions = [

{
q:"¿Qué hormona provoca la ovulación?",
o:["LH","Insulina","Adrenalina","Melatonina"],
a:0,
power:"lh"
},

{
q:"¿Qué órgano libera el óvulo?",
o:["Ovario","Pulmón","Riñón","Corazón"],
a:0,
power:"estrogen"
},

{
q:"¿Dónde ocurre la fecundación?",
o:["Pulmón","Corazón","Trompas","Hígado"],
a:2,
power:"progesterone"
},

{
q:"¿Qué hormona aumenta en el embarazo?",
o:["hCG","Insulina","Adrenalina","Melanina"],
a:0,
power:"progesterone"
},

{
q:"¿Qué órgano produce estrógeno?",
o:["Pulmón","Ovario","Riñón","Páncreas"],
a:1,
power:"estrogen"
},

{
q:"¿Cuál es el gameto masculino?",
o:["Esperma","Óvulo","Plaqueta","Neurona"],
a:0,
power:"lh"
},

{
q:"¿Qué hormona prepara el útero?",
o:["Progesterona","Insulina","Cortisol","Adrenalina"],
a:0,
power:"progesterone"
},

{
q:"¿Qué ocurre en la menstruación?",
o:["El útero elimina tejido","Crece cabello","Se rompen huesos","Aumenta corazón"],
a:0,
power:"estrogen"
},

{
q:"¿Qué dura 28 días?",
o:["Ciclo menstrual","Digestión","Respiración","Sueño"],
a:0,
power:"estrogen"
},

{
q:"¿Qué hormona ayuda al folículo?",
o:["FSH","LH","Insulina","Testosterona"],
a:0,
power:"lh"
},

{
q:"¿Dónde se implanta el embrión?",
o:["Útero","Pulmón","Corazón","Riñón"],
a:0,
power:"progesterone"
},

{
q:"¿Qué célula fecunda el óvulo?",
o:["Esperma","Neurona","Plaqueta","Hueso"],
a:0,
power:"lh"
},

{
q:"¿Qué hormona aumenta antes de ovular?",
o:["LH","Serotonina","Melatonina","Insulina"],
a:0,
power:"lh"
},

{
q:"¿Qué estructura libera el óvulo?",
o:["Folículo","Pulmón","Hígado","Riñón"],
a:0,
power:"estrogen"
},

{
q:"¿Dónde ocurre la ovulación?",
o:["Ovario","Útero","Corazón","Estómago"],
a:0,
power:"estrogen"
},

{
q:"¿Qué órgano alberga el bebé?",
o:["Útero","Pulmón","Cerebro","Hígado"],
a:0,
power:"progesterone"
},

{
q:"¿Qué hormona disminuye antes de menstruar?",
o:["Progesterona","Adrenalina","Melatonina","Insulina"],
a:0,
power:"progesterone"
},

{
q:"¿Qué regula el ciclo menstrual?",
o:["Estrógeno","Bilis","Melanina","Saliva"],
a:0,
power:"estrogen"
},

{
q:"¿Cuál es el gameto femenino?",
o:["Óvulo","Esperma","Plaqueta","Neurona"],
a:0,
power:"estrogen"
},

{
q:"¿Qué hormona libera el óvulo?",
o:["LH","FSH","Insulina","Serotonina"],
a:0,
power:"lh"
},

{
q:"¿Qué produce espermatozoides?",
o:["Testículos","Pulmón","Riñón","Corazón"],
a:0,
power:"lh"
},

{
q:"¿Qué fase sigue a la ovulación?",
o:["Fase lútea","Digestión","Respiración","Mitosis"],
a:0,
power:"progesterone"
},

{
q:"¿Qué domina la fase folicular?",
o:["Estrógeno","Progesterona","Insulina","Cortisol"],
a:0,
power:"estrogen"
},

{
q:"¿Qué conecta ovario y útero?",
o:["Trompas","Bronquios","Venas","Nervios"],
a:0,
power:"progesterone"
},

{
q:"¿Qué libera el ovario?",
o:["Óvulo","Plaquetas","Neuronas","Cabello"],
a:0,
power:"estrogen"
},

{
q:"¿Qué mantiene el embarazo?",
o:["Progesterona","Insulina","Adrenalina","Dopamina"],
a:0,
power:"progesterone"
},

{
q:"¿Qué célula nada hacia el óvulo?",
o:["Esperma","Glóbulo rojo","Neurona","Plaqueta"],
a:0,
power:"lh"
},

{
q:"¿Qué órgano es femenino?",
o:["Ovario","Pulmón","Riñón","Corazón"],
a:0,
power:"estrogen"
},

{
q:"¿Qué aumenta durante la ovulación?",
o:["LH","Cortisol","Melatonina","Insulina"],
a:0,
power:"lh"
},

{
q:"¿Qué engrosa el endometrio?",
o:["Progesterona","Adrenalina","Insulina","Testosterona"],
a:0,
power:"progesterone"
}

];

function createPellets(){

pellets = [];

for(let row=0; row<map.length; row++){

for(let col=0; col<map[row].length; col++){

if(map[row][col] === "0"){

pellets.push({

x: offsetX + col*TILE + TILE/2,
y: offsetY + row*TILE + TILE/2

});

}

}

}

}

createPellets();

const player = {

x: offsetX + TILE*1.5,
y: offsetY + TILE*1.5,

radius:13,

speed:2.5,

direction:0

};

const enemies = [];

const colors = [
"red",
"cyan",
"lime",
"orange",
"pink",
"purple"
];

for(let i=0;i<6;i++){

enemies.push({

x: offsetX + TILE*14,
y: offsetY + TILE*10,

color: colors[i],

speed:1.2,

angle:0

});

}

function gridPos(x,y){

return {

col: Math.floor((x-offsetX)/TILE),
row: Math.floor((y-offsetY)/TILE)

};

}

function worldPos(col,row){

return {

x: offsetX + col*TILE + TILE/2,
y: offsetY + row*TILE + TILE/2

};

}

const keys = {};

window.addEventListener("keydown",(e)=>{

keys[e.key] = true;

});

window.addEventListener("keyup",(e)=>{

keys[e.key] = false;

});

function wallCollision(x,y,radius){

const left = Math.floor((x-radius-offsetX)/TILE);
const right = Math.floor((x+radius-offsetX)/TILE);

const top = Math.floor((y-radius-offsetY)/TILE);
const bottom = Math.floor((y+radius-offsetY)/TILE);

for(let row=top; row<=bottom; row++){

for(let col=left; col<=right; col++){

if(map[row] && map[row][col] === "1"){

return true;

}

}

}

return false;

}

function movePlayer(){

if(gamePaused) return;

let dx = 0;
let dy = 0;

if(keys["ArrowUp"]){

dy = -player.speed;
player.direction = -Math.PI/2;

}

if(keys["ArrowDown"]){

dy = player.speed;
player.direction = Math.PI/2;

}

if(keys["ArrowLeft"]){

dx = -player.speed;
player.direction = Math.PI;

}

if(keys["ArrowRight"]){

dx = player.speed;
player.direction = 0;

}

const nextX = player.x + dx;
const nextY = player.y + dy;

if(!wallCollision(nextX,player.y,player.radius)){

player.x = nextX;

}

if(!wallCollision(player.x,nextY,player.radius)){

player.y = nextY;

}

}

function bfs(start,target){

const queue = [start];

const visited = {};

const parent = {};

visited[start.row+","+start.col] = true;

const dirs = [

[1,0],
[-1,0],
[0,1],
[0,-1]

];

while(queue.length){

const current = queue.shift();

if(
current.row === target.row &&
current.col === target.col
){

break;

}

for(const d of dirs){

const nr = current.row + d[0];
const nc = current.col + d[1];

if(
map[nr] &&
map[nr][nc] !== "1" &&
!visited[nr+","+nc]
){

visited[nr+","+nc] = true;

parent[nr+","+nc] = current;

queue.push({

row:nr,
col:nc

});

}

}

}

let step = target;

while(parent[step.row+","+step.col]){

const prev = parent[step.row+","+step.col];

if(
prev.row === start.row &&
prev.col === start.col
){

return step;

}

step = prev;

}

return start;

}

function moveEnemies(){

if(gamePaused) return;

const playerGrid = gridPos(player.x,player.y);

enemies.forEach(enemy=>{

const enemyGrid = gridPos(enemy.x,enemy.y);

const nextCell = bfs(enemyGrid,playerGrid);

const target = worldPos(nextCell.col,nextCell.row);

const dx = target.x - enemy.x;
const dy = target.y - enemy.y;

enemy.angle = Math.atan2(dy,dx);

let speed = enemy.speed;

if(progesteroneMode){

speed *= 0.5;

}

const dist = Math.sqrt(dx*dx + dy*dy);

if(dist > 1){

enemy.x += (dx/dist)*speed;
enemy.y += (dy/dist)*speed;

}

});

}

let mouth = 0;

function drawPlayer(){

ctx.save();

ctx.translate(player.x,player.y);

ctx.rotate(player.direction);

mouth += 0.18;

const open = Math.abs(Math.sin(mouth))*0.22;

ctx.fillStyle = "yellow";

ctx.beginPath();

ctx.arc(
0,
0,
player.radius,
open*Math.PI,
(2-open)*Math.PI
);

ctx.lineTo(0,0);

ctx.fill();

ctx.restore();

}

function drawEnemy(enemy){

ctx.save();

ctx.translate(enemy.x,enemy.y);

ctx.rotate(enemy.angle);

ctx.fillStyle = enemy.color;

ctx.beginPath();

ctx.ellipse(0,0,6,4,0,0,Math.PI*2);

ctx.fill();

ctx.beginPath();

ctx.moveTo(-6,0);

for(let i=0;i<10;i++){

ctx.lineTo(
-6-i*3,
Math.sin(Date.now()/100+i)*2.5
);

}

ctx.strokeStyle = enemy.color;

ctx.lineWidth = 2;

ctx.stroke();

ctx.restore();

}

function drawWalls(){

ctx.strokeStyle = "#4d7cff";

ctx.lineWidth = 4;

ctx.shadowBlur = 10;

ctx.shadowColor = "#4d7cff";

for(let row=0; row<map.length; row++){

for(let col=0; col<map[row].length; col++){

if(map[row][col] === "1"){

const x = offsetX + col*TILE;
const y = offsetY + row*TILE;

ctx.strokeRect(
x+2,
y+2,
TILE-4,
TILE-4
);

}

}

}

ctx.shadowBlur = 0;

}

function drawPellets(){

ctx.fillStyle = "hotpink";

pellets.forEach(p=>{

ctx.beginPath();

ctx.arc(
p.x,
p.y,
3,
0,
Math.PI*2
);

ctx.fill();

});

}

function eatPellets(){

pellets.forEach((p,index)=>{

const dx = player.x - p.x;
const dy = player.y - p.y;

const dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 16){

pellets.splice(index,1);

pelletsEaten++;

let points = 10;

if(estrogenMode){

points *= 2;

}

score += points;

if(pelletsEaten >= 10){

pelletsEaten = 0;

showQuestion();

}

}

});

if(pellets.length === 0){

createPellets();

enemies.forEach(enemy=>{

enemy.speed += 0.08;

});

}

}

function showQuestion(){

gamePaused = true;

const q = questions[
Math.floor(Math.random()*questions.length)
];

questionText.innerText = q.q;

optionButtons.forEach((btn,index)=>{

btn.innerText = q.o[index];

btn.onclick = ()=>{

if(index === q.a){

score += 100;

if(q.power === "estrogen"){

estrogenBar += 25;

}

if(q.power === "progesterone"){

progesteroneBar += 25;

}

if(q.power === "lh"){

lhBar += 25;

}

activatePowers();

}else{

lives--;

}

questionBox.style.display = "none";

gamePaused = false;

};

});

questionBox.style.display = "block";

}

function activatePowers(){

if(estrogenBar >= 100){

estrogenBar = 0;

estrogenMode = true;

setTimeout(()=>{

estrogenMode = false;

},powers.estrogen.time);

}

if(progesteroneBar >= 100){

progesteroneBar = 0;

progesteroneMode = true;

setTimeout(()=>{

progesteroneMode = false;

},powers.progesterone.time);

}

if(lhBar >= 100){

lhBar = 0;

lhMode = true;

setTimeout(()=>{

lhMode = false;

},powers.lh.time);

}

}

function checkEnemyCollision(){

enemies.forEach(enemy=>{

const dx = player.x - enemy.x;
const dy = player.y - enemy.y;

const dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 16){

if(lhMode){

enemy.x = offsetX + TILE*14;
enemy.y = offsetY + TILE*10;

score += 250;

}else{

lives--;

player.x = offsetX + TILE*1.5;
player.y = offsetY + TILE*1.5;

}

if(lives <= 0){

alert("💀 GAME OVER\nPUNTAJE: " + score);

location.reload();

}

}

});

}

function drawHUD(){

ctx.fillStyle = "black";

ctx.fillRect(0,0,canvas.width,140);

ctx.fillStyle = "white";

ctx.font = "20px Arial";

ctx.fillText("❤️ Vidas: " + lives,40,35);

ctx.fillText("⭐ Puntos: " + score,240,35);

ctx.fillText("🟣 Pastillas: " + pelletsEaten + "/10",480,35);

ctx.fillText("⚡ PODERES HPO",760,30);

ctx.fillText("Estrógeno = x2 puntos",40,75);
ctx.fillText("Progesterona = espermas lentos",320,75);
ctx.fillText("LH Surge = comer espermas",720,75);

ctx.strokeStyle = "white";

ctx.strokeRect(40,95,200,16);
ctx.strokeRect(320,95,200,16);
ctx.strokeRect(720,95,200,16);

ctx.fillStyle = "#ff4fd8";
ctx.fillRect(40,95,estrogenBar*2,16);

ctx.fillStyle = "#7d7dff";
ctx.fillRect(320,95,progesteroneBar*2,16);

ctx.fillStyle = "#ffe14d";
ctx.fillRect(720,95,lhBar*2,16);

if(estrogenMode){

ctx.fillStyle = "#ff4fd8";
ctx.fillText("ACTIVO",110,128);

}

if(progesteroneMode){

ctx.fillStyle = "#7d7dff";
ctx.fillText("ACTIVO",395,128);

}

if(lhMode){

ctx.fillStyle = "#ffe14d";
ctx.fillText("ACTIVO",800,128);

}

}

function gameLoop(){

ctx.clearRect(0,0,canvas.width,canvas.height);

movePlayer();

moveEnemies();

eatPellets();

checkEnemyCollision();

drawHUD();

drawWalls();

drawPellets();

drawPlayer();

enemies.forEach(drawEnemy);

}

function animate(){

gameLoop();

requestAnimationFrame(animate);

}

animate();
