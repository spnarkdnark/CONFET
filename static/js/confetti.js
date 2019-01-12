let canvas = document.getElementById('confetti');

canvas.height = screen.height;
canvas.width = screen.width;
let ctx = canvas.getContext('2d');

let pieces = [];

let max_pieces = document.getElementById('density').value;

let LastUpdateTime = Date.now();

let colors = document.getElementsByClassName('color');
let sizeSlider = document.getElementById('sizeRange').value;
let speedSlider = document.getElementById('speedRange').value;
let includeShapes = getCheckedBoxes();


var renderButton = document.getElementById('render');

renderButton.addEventListener('click',function(event){

    console.log('renderclicked')
    colors = document.getElementsByClassName('color');
    sizeSlider = document.getElementById('sizeRange').value;
    speedSlider = document.getElementById('speedRange').value;
    includeShapes = getCheckedBoxes();
    console.log(sizeSlider,speedSlider);
    ctx.clearRect(0,0,canvas.width,canvas.height);
})


function getCheckedBoxes(){
    var checkboxes = document.getElementsByName('shape');
    console.log(checkboxes);
    var checkedArray = [];

    for (var i = 0; i<checkboxes.length; i++){
        if (checkboxes[i].checked){
        checkedArray.push(checkboxes[i]);
        }
    }

    return checkedArray;

}

function GetRandomColor(){
    let colors = ['#ffff99', '#aec6cf', '#000000', '#80ffbf', '#bb99ff', '#ff5c33'];
    return colors[Math.floor(Math.random()*colors.length)];
}

function Update(){
    now = Date.now();
    dt = now - LastUpdateTime;

    for (let i = pieces.length -1; i>= 0; i--){
        p = pieces[i];

        if (p.y > canvas.height)
            {
                pieces.splice(i,1);
                continue;
            }

        p.y += p.gravity*dt;
        p.rotation += p.rotationSpeed*dt;

        }

    while (pieces.length < max_pieces) {
        pieces.push(new Piece(Math.random() * canvas.width, -20));
    }

    LastUpdateTime = now;
    setTimeout(Update,1);

}

function Draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(function(p){

        ctx.save();

        ctx.fillStyle = p.color;
        ctx.translate(p.x+(p.size/2),p.y+(p.size/2));
        ctx.rotate(p.rotation);
        ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);
        ctx.restore();




    });
    requestAnimationFrame(Draw);
}


function Piece(x,y){

    this.x = x;
    this.y = y;
    this.size = (Math.random()*.5 +.75)*(sizeSlider);
    this.gravity = (Math.random()*.5 +.75)*(speedSlider/500);
    this.rotation = (Math.PI * 2) * Math.random();
    this.rotationSpeed = (Math.PI * 2) * (Math.random()-.5) * .001;
    this.color = GetRandomColor();

}

function Square(x,y){
    Piece.call(this,x,y);
    this.name = 'square';
}

function Rectangle(x,y){
    Piece.call(this,x,y);
    this.name = 'rectangle';
}


function fillPieces(){

    while (pieces.length < max_pieces) {
        pieces.push(new Piece(Math.random()*canvas.width,Math.random()*canvas.height));
    }

}


fillPieces();
Update();
Draw();