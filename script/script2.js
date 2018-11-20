window.onload = function() {
    init();
};

let objCanvas = {
    Tab1: ['layer1canvas1']
}
let objCanvasJSON = JSON.stringify(objCanvas)
localStorage.setItem('objCanvas', objCanvasJSON);

localStorage.removeItem('canvas'); // обнуляем
localStorage.removeItem('allCanvasTab'); // обнуляем
localStorage.removeItem('activeTabNumber'); // обнуляем

let activeTabNumber = 1;
localStorage.setItem('activeTabNumber', activeTabNumber);

let canvas = document.getElementById('layer1canvas1');
let strokeColor = "black";
let lineWidth = localStorage.getItem('lineWidth') || 50;

let num = document.getElementsByClassName('btn-focus');

function init() {

    addEventListeners(canvas);
    
    lineWidth = localStorage.getItem('lineWidth');
    document.getElementById("changeSize").innerHTML = localStorage.getItem('lineWidth');
    document.getElementById('changeSize').value = localStorage.getItem('lineWidth');

    strokeColor = localStorage.getItem('color');
    document.getElementById('showColor').style.background = localStorage.getItem('color');
    document.getElementById('showColor').innerHTML = localStorage.getItem('color');
}

function addEventListeners(canvas) {

    var canvas = canvas || document.getElementById('layer1canvas1');
    console.log(canvas)
    // let thisCanvas = JSON.stringify(canvas)
    // localStorage.setItem('thisCanvas', thisCanvas);
    
    canvas.addEventListener('mousedown', mouseDownHandler);

    document.getElementById('btnPressed').addEventListener('click', buttonPressed);

    document.getElementById('changeSize').addEventListener('mousemove', updateSize);
    document.getElementById('changeColor').addEventListener('keypress', changeColor);

    document.getElementById('square').addEventListener('click', function() {
        canvas.removeEventListener('click', hexagonCanvasClick);
        canvas.removeEventListener('click', circleCanvasClick);
        canvas.addEventListener('click', squareCanvasClick);
    
    });
    document.getElementById('circle').addEventListener('click', function() {
        canvas.removeEventListener('click', hexagonCanvasClick);
        canvas.removeEventListener('click', squareCanvasClick);
        canvas.addEventListener('click', circleCanvasClick);
    
    });
    document.getElementById('hexagon').addEventListener('click', function() {
        canvas.removeEventListener('click', circleCanvasClick);
        canvas.removeEventListener('click', squareCanvasClick);
        canvas.addEventListener('click', hexagonCanvasClick);
    
    });

    // document.getElementById('square').addEventListener('click', paintSquare);
    // document.getElementById('circle').addEventListener('click', paintCircle);
    // document.getElementById('hexagon').addEventListener('click', paintHexagon);

    document.getElementById('clear').addEventListener('click', function() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById('addNewTab').addEventListener('click', addNewTabFunc);

    document.getElementById('addNewLayer').addEventListener('click', addNewLayerFunc);

    document.getElementById('btnSettings').addEventListener('click', function() {
        document.getElementById('fieldsSettings').style.display = 'block'
    });

    document.getElementById('closeSettings').addEventListener('click', function() {
        document.getElementById('fieldsSettings').style.display = 'none'
    });


};

function buttonPressed() {
    btnPressed.classList.toggle('btn-focus');
}

function mouseDownHandler(event) {
    const canvas = event.target;
    console.log(event);
    if (canvas && canvas.getContext && num.length > 0) {
        const ctx = canvas.getContext('2d');
        //ctx.clearRect(0, 0, 1400, 790);
        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.stroke();
        console.log(event.offsetX, event.offsetY);
    }
    getCoords();
    canvas.addEventListener('mousemove', mouseMoveHandler);
}

function mouseMoveHandler(event) {
    const canvas = event.target;
    if (canvas && canvas.getContext && num.length > 0) {

        canvas.removeEventListener('click', hexagonCanvasClick);
        canvas.removeEventListener('click', squareCanvasClick);
        canvas.removeEventListener('click', circleCanvasClick);

        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }

    getCoords();
    canvas.addEventListener('mouseup', mouseUpHandler);
}

function mouseUpHandler(event) {
    const canvas = event.target;
    canvas.removeEventListener('mousemove', mouseMoveHandler);
}

function getCoords() {
    document.getElementById('mouseX').innerHTML = `: ${event.clientX}`;
    document.getElementById('mouseY').innerHTML = `: ${event.clientY}`;
}

function updateSize() {
    var sizeInputRange = document.getElementById("changeSize").value;
    document.getElementById("size").innerHTML = sizeInputRange;
    lineWidth = sizeInputRange;
    localStorage.setItem('lineWidth', sizeInputRange);
}

function changeColor(event) {
    if (event.keyCode === 13) {
        let newColor = document.getElementById('changeColor');
        const showColor = document.getElementById('showColor');
        showColor.style.background = newColor.value;
        if (showColor.style.background === newColor.value) {
            strokeColor = newColor.value;
            localStorage.setItem('color', strokeColor)
            document.getElementById('showColor').innerHTML = localStorage.getItem('color');
        } else {
            console.log('error color')
        }
    }
}

// function paintSquare() {
//     var currentCanvas = localStorage.getItem('canvas') || 'layer1canvas1';
//     var canvas = document.getElementById(currentCanvas);
//     canvas.removeEventListener('click', hexagonCanvasClick);
//     canvas.removeEventListener('click', circleCanvasClick);
//     canvas.addEventListener('click', squareCanvasClick);

// };

// function paintCircle() {
//     var currentCanvas = localStorage.getItem('canvas') || 'layer1canvas1';
//     var canvas = document.getElementById(currentCanvas);
//     canvas.removeEventListener('click', hexagonCanvasClick);
//     canvas.removeEventListener('click', squareCanvasClick);
//     canvas.addEventListener('click', circleCanvasClick);

// };

// function paintHexagon() {
//     var currentCanvas = localStorage.getItem('canvas') || 'layer1canvas1';
//     var canvas = document.getElementById(currentCanvas);
//     var canvas = canvas || document.getElementById('layer1canvas1');
//     canvas.removeEventListener('click', circleCanvasClick);
//     canvas.removeEventListener('click', squareCanvasClick);
//     canvas.addEventListener('click', hexagonCanvasClick);

// };

function squareCanvasClick(event) {
    const canvas = event.target;
    if(canvas && canvas.getContext && num.length === 0)  {
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = lineWidth;
        document.getElementById('changeSize').addEventListener('mousemove', updateSize);
        localStorage.setItem('lineWidth', lineWidth);
        ctx.strokeStyle = strokeColor;
        ctx.strokeRect(event.offsetX, event.offsetY, ctx.lineWidth, ctx.lineWidth);
    }
}

function circleCanvasClick(event) {
    const canvas = event.target;
    if(canvas && canvas.getContext && num.length === 0)  {
        const ctx = canvas.getContext('2d');
        let radiusCircle = lineWidth;
        document.getElementById('changeSize').addEventListener('mousemove', updateSize);
        localStorage.setItem('lineWidth', lineWidth);
        ctx.beginPath();
        ctx.arc(event.offsetX, event.offsetY, radiusCircle,0,Math.PI*2,true); // Внешняя окружность
        ctx.stroke();

    }
}

function hexagonCanvasClick(event) {
    const canvas = event.target;
    if(canvas && canvas.getContext && num.length === 0)  {
        const ctx = canvas.getContext('2d');
        document.getElementById('changeSize').addEventListener('mousemove', updateSize);
        localStorage.setItem('lineWidth', lineWidth);
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(event.offsetX,event.offsetY);
        ctx.lineTo((event.offsetX)+50,(event.offsetY));
        ctx.lineTo((event.offsetX)+75,(event.offsetY)+25);
        ctx.lineTo((event.offsetX)+50,(event.offsetY)+50);
        ctx.lineTo((event.offsetX),(event.offsetY)+50);
        ctx.lineTo((event.offsetX)-25,(event.offsetY)+25);
        ctx.closePath();
        ctx.stroke();
    }
}

// function clearCanvas() {
//     var canvas = document.getElementById(currentCanvas)
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }


function showHideCanvas(e) {
    let thisCanvas1 = e.target.id;
    let thisCanvas = String(thisCanvas1.substr(5));
    let checkbox1 = document.getElementsByName("chboxs");
    let displayCanvas = "none";
    for(let i = 0; i < checkbox1.length; i++) { 
        if (checkbox1[i].checked){
            console.log(checkbox1[i])
            displayCanvas = "block";
        }
    }
    document.getElementById(thisCanvas).style.display = displayCanvas;
}

function showFieldSettings() {

}