window.onload = init;
function init() {

    let strokeColor = "black";
    let lineWidth = 1;
    strokeColor = localStorage.getItem('color');
    lineWidth = localStorage.getItem('lineWidth');
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    let input = document.getElementById('changeColor');
    const btnPressed = document.getElementById('btnPressed');
    let changeSizeBtn = document.getElementById('changeSize');
    // const class1 = document.getElementsByClassName('btn-focus');
    // console.log(class1.length)
    let num = document.getElementsByClassName('btn-focus');

    btnPressed.addEventListener('click', buttonPressed);
    function buttonPressed() {
        btnPressed.classList.toggle('btn-focus');
        //console.log(document.getElementsByClassName('btn-focus').length)
    }
    console.log(num.length)

    canvas.addEventListener('mousedown', mouseDownHandler);
    function mouseDownHandler(event) {
        // if () {
        const canvas = event.target;
        if (canvas && canvas.getContext && num.length > 0) {
            const ctx = canvas.getContext('2d');
            ctx.lineWidth = lineWidth;
            ctx.lineCap = "round"
            changeSizeBtn.addEventListener('mousemove', updateSize);
            function updateSize() {
                var sizeInputRange = document.getElementById("changeSize").value;
                //console.log(sizeInputRange)
                document.getElementById("size").innerHTML = sizeInputRange;
                ctx.lineWidth = sizeInputRange;
            }
            ctx.strokeStyle = strokeColor;
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke()
        }
        const mouseX = document.getElementById('mouseX');
        mouseX.innerHTML = `: ${event.clientX}`;
        const mouseY = document.getElementById('mouseY');
        mouseY.innerHTML = `: ${event.clientY}`;
        canvas.addEventListener('mousemove', mouseMoveHandler);

        function mouseMoveHandler(event) {
            const canvas = event.target;

            if (canvas && canvas.getContext && num.length > 0) {
                const ctx = canvas.getContext('2d');
                ctx.lineWidth = lineWidth;
                changeSizeBtn.addEventListener('mousemove', updateSize);
                function updateSize() {
                    var sizeInputRange = document.getElementById("changeSize").value;
                    //console.log(sizeInputRange)
                    document.getElementById("size").innerHTML = sizeInputRange;
                    ctx.lineWidth = sizeInputRange;
                }
                ctx.beginPath();
                ctx.moveTo(event.offsetX, event.offsetY);
                ctx.lineCap = "round"
                ctx.lineTo(event.offsetX, event.offsetY);
                ctx.stroke();

                ctx.strokeStyle = strokeColor;
                // ctx.lineTo(event.offsetX, event.offsetY);
                // ctx.stroke()
            }
            const mouseX = document.getElementById('mouseX');
            mouseX.innerHTML = `: ${event.clientX}`;
            const mouseY = document.getElementById('mouseY');
            mouseY.innerHTML = `: ${event.clientY}`;
            canvas.addEventListener('mouseup', mouseUpHandler);
        };

        function mouseUpHandler(event) {
            const canvas = event.target;
            if (canvas && canvas.getContext && num.length > 0) {
                const ctx = canvas.getContext('2d');
                ctx.lineWidth = lineWidth;
                changeSizeBtn.addEventListener('mousemove', updateSize);
                function updateSize() {
                    var sizeInputRange = document.getElementById("changeSize").value;
                    document.getElementById("size").innerHTML = sizeInputRange;
                    ctx.lineWidth = sizeInputRange;
                    //localStorage.setItem('lineWidth', ctx.lineWidth)
                }
                ctx.strokeStyle = strokeColor;
                ctx.lineCap = "round"
                ctx.lineTo(event.offsetX, event.offsetY);
                ctx.stroke()
            }
            canvas.removeEventListener('mousemove', mouseMoveHandler);
        };
        // } else if (num.length === 0) {
        //     console.log('press button PEN')
        //     canvas.removeEventListener('mousedown', mouseDownHandler);
        //     canvas.removeEventListener('mousemove', mouseDownHandler);
        //     canvas.removeEventListener('mouseup', mouseDownHandler);
        // }
    };


    input.addEventListener('keypress', changeColor);
    function changeColor(event) {
        if (event.keyCode === 13) {
            const showColor = document.getElementById('showColor');
            //console.log(showColor.style.background);
            showColor.style.background = input.value;
            //console.log(showColor.style.background);
            if (showColor.style.background === input.value) {
                //console.log(showColor.style.background);
                strokeColor = input.value;
                showColor.innerHTML = `: ${strokeColor}`;
                //console.log(strokeColor)
                localStorage.setItem('color', strokeColor)
            } else {
                console.log('error color')
            }


            //let colorBlock = document.querySelector('.current-color');

            //colorBlock.style.background = strokeColor;
        }
    }

    changeSizeBtn = document.getElementById('changeSize');
    changeSizeBtn.addEventListener('mousemove', updateSize);
    changeSizeBtn.value = localStorage.getItem('lineWidth');
    function updateSize() {
        var sizeInputRange = document.getElementById("changeSize").value;
        document.getElementById("size").innerHTML = sizeInputRange;
        ctx.lineWidth = sizeInputRange;
        lineWidth = ctx.lineWidth;
        document.getElementById("size").innerHTML = localStorage.getItem('lineWidth');
        localStorage.setItem('lineWidth', ctx.lineWidth)
    }

    const square = document.getElementById('square');
    square.addEventListener('click', paintSquare);
    function paintSquare() {
        canvas.addEventListener('click', squareCanvasClick);
        function squareCanvasClick(event) {
            const canvas = event.target;
            if(canvas && canvas.getContext)  {
                const ctx = canvas.getContext('2d');
                ctx.lineWidth = lineWidth;
                changeSizeBtn.addEventListener('mousemove', updateSize);
                function updateSize() {
                    var sizeInputRange = document.getElementById("changeSize").value;
                    document.getElementById("size").innerHTML = sizeInputRange;
                    ctx.lineWidth = sizeInputRange;
                    lineWidth = sizeInputRange;
                    localStorage.setItem('lineWidth', sizeInputRange)
                }
                ctx.strokeStyle = strokeColor;
                ctx.strokeRect(event.offsetX, event.offsetY, ctx.lineWidth, ctx.lineWidth);
                // ctx.beginPath();
                // ctx.moveTo(100,50);
                // ctx.lineTo(200,50);
                // ctx.lineTo(200,100);
                // ctx.lineTo(100,100);
                // ctx.closePath();
                // ctx.stroke();
                //canvas.removeEventListener('click', squareCanvasClick);
            }
        }
    };

    const circle = document.getElementById('circle');
    circle.addEventListener('click', paintCircle);
    function paintCircle() {
        canvas.removeEventListener('click', squareCanvasClick);
        canvas.addEventListener('click', circleCanvasClick);
        function circleCanvasClick(event) {
            const canvas = event.target;
            console.log('df')
            if(canvas && canvas.getContext)  {
                const ctx = canvas.getContext('2d');
                let radiusCircle = lineWidth;
                changeSizeBtn.addEventListener('mousemove', updateSize);
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.arc(event.offsetX, event.offsetY, radiusCircle,0,Math.PI*2,true);
                ctx.stroke();
                canvas.removeEventListener('click', circleCanvasClick);
            }
        }
    };

    const hexagon = document.getElementById('hexagon');
    hexagon.addEventListener('click', paintHexagon);
    function paintHexagon() {
        canvas.addEventListener('click', hexagonCanvasClick);
        function hexagonCanvasClick(event) {
            const canvas = event.target;
            console.log(event)
            if(canvas && canvas.getContext)  {
                const ctx = canvas.getContext('2d');
                changeSizeBtn.addEventListener('mousemove', updateSize);
                // function updateSize() {
                //     var sizeInputRange = document.getElementById("changeSize").value;
                //     document.getElementById("size").innerHTML = sizeInputRange;
                //     ctx.lineWidth = sizeInputRange;
                // }
                ctx.beginPath();
                ctx.moveTo(event.offsetX,event.offsetY);
                ctx.lineTo((event.offsetX)+50,(event.offsetY));
                ctx.lineTo((event.offsetX)+75,(event.offsetY)+25);
                ctx.lineTo((event.offsetX)+50,(event.offsetY)+50);
                ctx.lineTo((event.offsetX),(event.offsetY)+50);
                ctx.lineTo((event.offsetX)-25,(event.offsetY)+25);
                ctx.closePath();
                ctx.stroke();
                // if(event.target !== 'canvas#canvas1') {
                //     canvas.removeEventListener('click', hexagonCanvasClick);
                // }

            }
        }
    };

    let clear = document.getElementById('clear');
    clear.addEventListener('click', clearCanvas);
    function clearCanvas() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}