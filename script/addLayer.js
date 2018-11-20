function addNewLayerFunc() {
    const ulSectionForLayer = document.getElementById('newLiForLayer');
    let activeID = localStorage.getItem('activeTabNumber') || 1;
    let canvasWrapNum = 'canvasWrap' + parseInt(activeID);
    let divAddCanvasLayer = document.getElementById(canvasWrapNum);

    let li = document.createElement('li'); 
    let input = document.createElement('input');
    let label = document.createElement('label');
    let canvasLayer = document.createElement('canvas');

    ulSectionForLayer.appendChild(li);
    li.appendChild(input);
    li.appendChild(label);
    divAddCanvasLayer.appendChild(canvasLayer);

    input.setAttribute('type', 'checkbox');
    //input.checked = true;   
    InputNumCanvasLayer = 'inputlayer' + ulSectionForLayer.children.length + 'canvas' + parseInt(activeID); 
    input.setAttribute('id', InputNumCanvasLayer);
    input.setAttribute('name', 'chboxs');
    input.addEventListener('click', showHideCanvas);
    label.innerText = 'Layer' + ulSectionForLayer.children.length;

    numCanvasLayer = 'layer' + ulSectionForLayer.children.length + 'canvas' + parseInt(activeID);
    //let aaa = localStorage.setItem('numCanvasLayer', numCanvasLayer);
    canvasLayer.setAttribute('id', numCanvasLayer);
    canvasLayer.setAttribute('width', '1400px');
    canvasLayer.setAttribute('height', '790px');
    canvasLayer.classList.add('canvas-tabs');
    
    canvasLayer.style.zIndex = parseInt(ulSectionForLayer.children.length);
    canvasLayer.setAttribute('style', 'display: none');

    divAddCanvasLayer.setAttribute('width', '1400px');
    divAddCanvasLayer.setAttribute('height', '790px');    
    divAddCanvasLayer.style.position = 'relative';

    // добавление нового canvas`а при создании layer в объект canvas`ов
    objCanvas['Tab' + activeID].push(numCanvasLayer);
    objCanvasJSON = JSON.stringify(objCanvas)
    localStorage.setItem('objCanvas', objCanvasJSON);

    var inputCheckbox = document.getElementsByTagName('input');
    for (var i=0; i < inputCheckbox.length; i++) {
        if(inputCheckbox[i].type === 'checkbox') {
            console.log(inputCheckbox[i])            
            inputCheckbox[i].addEventListener('click', checkboxCheckedType)
        }
    }
    localStorage.setItem('canvas', numCanvasLayer);
    addEventListeners(document.getElementById(numCanvasLayer))
}

function checkboxCheckedType(e) {
    var element = e.target;
    layerInputID = element.id;
    var canvasName = layerInputID.substr(5);
    var canvasVis = 'none';
    element.addEventListener('click', function() {
        if(document.getElementById(layerInputID).checked) {
            canvasVis = 'block'
        } else {
            document.getElementById(canvasName).style.display = canvasVis;
        }
    })

// console.log(e)
// let thisCanvas1 = e.target.id;
// thisCanvas = String(thisCanvas1.substr(5));
// let checkbox1 = document.getElementsByName("chboxs");
// let displayCanvas = "none";
// for(let i = 0; i < checkbox1.length; i++) { 
//     if (checkbox1[i].checked){
//         console.log(checkbox1[i])
//         displayCanvas = "block";
//     }
// }
// document.getElementById(thisCanvas).style.display = displayCanvas;
}