function addNewTabFunc() { //добавление новой tab с созданием div, canvas, и checkbox layer
    const canvasTabSection = document.getElementById('canvasTabSection');
    const canvasWrap = document.getElementById('canvas-wrapper');

    let div = document.createElement('div'); // div для нового tab
    let divWrapCanvas = document.createElement('div'); // div для нового canvas
    let canvas = document.createElement('canvas'); // новый canvas

    canvasTabSection.appendChild(div);
    canvasWrap.appendChild(divWrapCanvas);
    divWrapCanvas.appendChild(canvas);

    div.classList.add('tab-btn');
    div.setAttribute('tabindex', '0');
    div.innerText = 'Tab' + canvasTabSection.children.length;
    let numDiv = 'div' + canvasTabSection.children.length;
    div.setAttribute('id', numDiv);

    wrapNumDiv = 'canvasWrap' + canvasTabSection.children.length;
    divWrapCanvas.setAttribute('id', wrapNumDiv);

    numCanvas = 'layer1canvas' + canvasTabSection.children.length;
    canvas.setAttribute('id', numCanvas);
    canvas.setAttribute('width', '1400px');
    canvas.setAttribute('height', '790px');
    canvas.classList.add('canvas-tabs');
    canvas.style.display = 'none';

    // добавление нового canvas`а при создании tab в объект canvas`ов 
    objCanvas[div.innerText] = [numCanvas];
    objCanvasJSON = JSON.stringify(objCanvas)
    localStorage.setItem('objCanvas', objCanvasJSON);

    // добавление первого layer`а для каждой tab
    let ulSectionForLayer = document.getElementById('newLiForLayer');
    let li = document.createElement('li'); 
    let input = document.createElement('input');
    let label = document.createElement('label');
    ulSectionForLayer.appendChild(li);
    li.appendChild(input);
    li.appendChild(label);
    input.setAttribute('type', 'checkbox');
    //input.checked = true;   
    InputNumCanvasLayer = 'inputlayer1canvas' + canvasTabSection.children.length; 
    input.setAttribute('id', InputNumCanvasLayer);
    input.setAttribute('name', 'chboxs');
    input.addEventListener('click', showHideCanvas);
    label.innerText = 'Layer1';
    input.addEventListener('click', checkboxCheckedType)
    
    localStorage.setItem('canvas', numCanvas);
    addEventListeners(document.getElementById(numCanvas))

    // отображение layer`ов только активной tab
    var inputCheckbox = document.getElementById('newLiForLayer'); 
    let activeTabNum = localStorage.getItem('activeTabNumber');

    var liElement = inputCheckbox.children; // все потомки списка Layer
    for(var i = 0; i < liElement.length; i++) {

        let lastSevenElement = liElement[i].children[0].id.slice(-7); // последние 7 символов строки с id - для canvas`ов 1-9
        let lastEightElement = liElement[i].children[0].id.slice(-8); // последние 8 символов - для canvas`ов 10-99
        if (lastSevenElement === 'canvas' + activeTabNum || lastEightElement === 'canvas' + activeTabNum) {
            liElement[i].style.display = 'block'; // которые содержат в названии активную tab - display: block
        } else {
            liElement[i].style.display = 'none'; // не содержат - display: none
        }
    }

    //поиск tab`а, на котором был клик
    let tabs = document.querySelectorAll('.tab-btn');
    for (i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', findTabsText)
    }

    function findTabsText() {

        let tabsText = this.innerText; // текст активного tab
        let thisTabCanvas = localStorage.getItem('objCanvas');
        thisTabCanvas = JSON.parse(thisTabCanvas)
        thisTabCanvas = thisTabCanvas[tabsText] || ['layer1canvas1'] // достаем конкретный массив с canvas для этой tab
        console.log(thisTabCanvas) // все canvas этой tab
        var canvasStringify = JSON.stringify(thisTabCanvas)
        localStorage.setItem('allCanvasTab', canvasStringify);    
    
        let tabTextLastsChar = String(tabsText.charAt(tabsText.length-2)) + tabsText.charAt(tabsText.length-1); //поиск 2-х последних символов
        let tabsTextNumber = parseInt(this.innerText.charAt(tabsText.length-1));
    
        if( String(parseInt(tabTextLastsChar)).length === 2) { //если при преобразовании в строку не обрежет длину, то 2 цифры, изменяем tabsTextNumber
            tabsTextNumber = parseInt(tabTextLastsChar);
        }
    
        let allCanvas = document.querySelectorAll('.canvas-tabs');
        for (i = 0; i < allCanvas.length; i++) { // всем canvas display none
            allCanvas[i].style.display = 'none';
        }
    
        localStorage.setItem('activeTabNumber', tabsTextNumber);
        var canvasName = 'layer1canvas' + tabsTextNumber; //искомый canvas по id
        console.log(canvasName)
    
        for (var i = 0; i < thisTabCanvas.length; i++) { // canvas`ы в активной tab - display block
            document.getElementById(thisTabCanvas[i]).style.display = 'block';
        }
    
         // убираем layer элемент li, которые не относятся к данной tab
        var inputCheckbox = document.getElementById('newLiForLayer');
        var liElement = inputCheckbox.children; // все потомки списка Layer
        for(var i = 0; i < liElement.length; i++) {
            let lastSevenElement = liElement[i].children[0].id.slice(-7); // последние 7 символов строки с id
            let lastEightElement = liElement[i].children[0].id.slice(-8); // последние 8 символов
            if(lastSevenElement === 'canvas' + tabsTextNumber || lastEightElement === 'canvas' + tabsTextNumber) {
                liElement[i].style.display = 'block'; // которые содержат в названии активную tab - display: block
            } else {
                liElement[i].style.display = 'none'; // не содержат - display: none
            }
        }
    
        
        localStorage.setItem('canvas', canvasName);
        let canvasClass = document.getElementsByClassName('canvas-tabs');
        for(let i = 0; i < canvasClass.length; i++) {
            if(canvasClass[i].id === canvasName) {
                let newCanvasAddEvent = document.getElementById(canvasName)
                addEventListeners(newCanvasAddEvent)
                localStorage.setItem('canvas', canvasName);
            }
        }
    }
}