const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1100;
canvas.height = 920;

const TILE = 28;

const offsetX = 120;
const offsetY = 250;

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

let usedQuestions = [];

let estrogenBar = 0;
let progesteroneBar = 0;
let lhBar = 0;

let estrogenMode = false;
let progesteroneMode = false;
let lhMode = false;

const questions = [

{q:"¿Qué hormona provoca la ovulación?",o:["LH","Insulina","Melatonina","FSH"],a:0,p:"lh"},
{q:"¿Qué órgano produce estrógeno?",o:["Ovario","Riñón","Pulmón","Hígado"],a:0,p:"estrogen"},
{q:"¿Qué hormona mantiene el embarazo?",o:["Progesterona","Insulina","Cortisol","Dopamina"],a:0,p:"progesterone"},
{q:"¿Dónde ocurre la fecundación?",o:["Trompas","Pulmón","Corazón","Cerebro"],a:0,p:"lh"},
{q:"¿Qué hormona prepara el útero?",o:["Progesterona","FSH","Melatonina","Serotonina"],a:0,p:"progesterone"},
{q:"¿Qué hormona ayuda al folículo?",o:["FSH","LH","Insulina","Adrenalina"],a:0,p:"estrogen"},
{q:"¿Qué estructura libera el óvulo?",o:["Folículo","Pulmón","Riñón","Hueso"],a:0,p:"lh"},
{q:"¿Qué dura 28 días?",o:["Ciclo menstrual","Digestión","Sueño","Mitosis"],a:0,p:"estrogen"},
{q:"¿Qué hormona aumenta antes de ovular?",o:["LH","Cortisol","Melatonina","Insulina"],a:0,p:"lh"},
{q:"¿Qué órgano alberga el bebé?",o:["Útero","Pulmón","Riñón","Páncreas"],a:0,p:"progesterone"},
{q:"¿Qué célula fecunda el óvulo?",o:["Esperma","Neurona","Plaqueta","Glóbulo"],a:0,p:"lh"},
{q:"¿Qué regula el ciclo menstrual?",o:["Estrógeno","Saliva","Bilis","Glucosa"],a:0,p:"estrogen"},
{q:"¿Qué órgano libera el óvulo?",o:["Ovario","Hígado","Pulmón","Corazón"],a:0,p:"estrogen"},
{q:"¿Qué hormona disminuye antes de menstruar?",o:["Progesterona","Insulina","FSH","LH"],a:0,p:"progesterone"},
{q:"¿Qué ocurre en la menstruación?",o:["El útero elimina tejido","Crece cabello","Aumenta hueso","Sube glucosa"],a:0,p:"progesterone"},
{q:"¿Cuál es el gameto femenino?",o:["Óvulo","Esperma","Neurona","Plaqueta"],a:0,p:"estrogen"},
{q:"¿Qué órgano produce espermatozoides?",o:["Testículos","Pulmón","Riñón","Corazón"],a:0,p:"lh"},
{q:"¿Qué conecta ovario y útero?",o:["Trompas","Bronquios","Venas","Nervios"],a:0,p:"progesterone"},
{q:"¿Qué hormona engrosa el endometrio?",o:["Progesterona","Melatonina","Insulina","Testosterona"],a:0,p:"progesterone"},
{q:"¿Qué ocurre en la ovulación?",o:["Se libera un óvulo","Se rompe hueso","Se duerme","Sube azúcar"],a:0,p:"lh"},
{q:"¿Qué hormona domina la fase folicular?",o:["Estrógeno","Progesterona","Insulina","Adrenalina"],a:0,p:"estrogen"},
{q:"¿Qué órgano femenino produce hormonas?",o:["Ovario","Pulmón","Páncreas","Riñón"],a:0,p:"estrogen"},
{q:"¿Qué fase sigue a la ovulación?",o:["Lútea","Digestiva","Respiratoria","Ósea"],a:0,p:"progesterone"},
{q:"¿Qué hormona aumenta en embarazo?",o:["hCG","Melatonina","Insulina","Dopamina"],a:0,p:"progesterone"},
{q:"¿Qué célula nada hacia el óvulo?",o:["Esperma","Neurona","Plaqueta","Glóbulo"],a:0,p:"lh"},
{q:"¿Qué hormona ayuda a formar el endometrio?",o:["Estrógeno","Cortisol","Insulina","FSH"],a:0,p:"estrogen"},
{q:"¿Qué estructura recibe el embrión?",o:["Útero","Pulmón","Hígado","Corazón"],a:0,p:"progesterone"},
{q:"¿Qué hormona desencadena ovulación?",o:["LH","FSH","Insulina","Serotonina"],a:0,p:"lh"},
{q:"¿Qué hormona domina embarazo?",o:["Progesterona","Insulina","Melatonina","Glucosa"],a:0,p:"progesterone"},
{q:"¿Qué hormona se relaciona con ovarios?",o:["Estrógeno","Insulina","Cortisol","Adrenalina"],a:0,p:"estrogen"},
{q:"¿Qué gameto es masculino?",o:["Esperma","Óvulo","Plaqueta","Neurona"],a:0,p:"lh"},
{q:"¿Qué hormona ayuda al crecimiento del folículo?",o:["FSH","Insulina","Melatonina","Adrenalina"],a:0,p:"estrogen"},
{q:"¿Qué hormona prepara el cuerpo para embarazo?",o:["Progesterona","LH","Insulina","Cortisol"],a:0,p:"progesterone"},
{q:"¿Qué órgano contiene el endometrio?",o:["Útero","Riñón","Pulmón","Hígado"],a:0,p:"progesterone"},
{q:"¿Qué hormona aumenta en ovulación?",o:["LH","Dopamina","Cortisol","Melatonina"],a:0,p:"lh"},
{q:"¿Qué hormona ayuda a duplicar puntos?",o:["Estrógeno","Insulina","FSH","Glucosa"],a:0,p:"estrogen"}

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

speed:1.7,

direction:0

};

const enemySpawn = [

{x:470,y:540},
{x:510,y:540},
{x:550,y:540},
{x:590,y:540},
{x:630,y:540},
{x:670,y:540}

];

const enemyColors = [
"red",
"cyan",
"lime",
"orange",
"pink",
"purple"
];

const enemies = [];

for(let i=0;i<6;i++){

enemies.push({

x:enemySpawn[i].x,
y:enemySpawn[i].y,

color:enemyColors[i],

speed:0.85,

angle:0

});

}

const keys = {};

window.addEventListener("keydown",(e)=>{

keys[e.key] = true;

if(e.key === "1" && estrogenBar >= 100){

estrogenBar = 0;
estrogenMode = true;

setTimeout(()=>{

estrogenMode = false;

},8000);

}

if(e.key === "2" && progesteroneBar >= 100){

progesteroneBar = 0;
progesteroneMode = true;

setTimeout(()=>{

progesteroneMode = false;

},8000);

}

if(e.key === "3" && lhBar >= 100){

lhBar = 0;
lhMode = true;

setTimeout(()=>{

lhMode = false;

},8000);

}

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

if(!wallCollision(player.x+dx,player.y,player.radius)){

player.x += dx;

}

if(!wallCollision(player.x,player.y+dy,player.radius)){

player.y += dy;

}

}

function drawRetroBackground(){

ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width,canvas.height);

for(let i=0;i<canvas.height;i+=4){

ctx.fillStyle = "rgba(255,255,255,0.03)";
ctx.fillRect(0,i,canvas.width,1);

}

}

function drawWalls(){

ctx.strokeStyle = "#00aaff";

ctx.lineWidth = 4;

ctx.shadowBlur = 20;
ctx.shadowColor = "#00aaff";

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

ctx.fillStyle = "#ff66ff";

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
