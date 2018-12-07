document.addEventListener("DOMContentLoaded", onload, false);
function onload(){
    //localStorage.clear();
    listenForTouch();
    listenForClicks();
    createChart();
    updateTable();
    setEntryToStart();
    setInterval(animateTutorial, 2000);
    //listenForBlur();
    listenForInput();
}
function listenForClicks() {
    document.getElementById("donebtn").addEventListener("click", addEntry);
    document.getElementById("addEntrybtn").addEventListener("click", toggleEntryInput);
    document.getElementById("clearbtn").addEventListener("click", clearInput);
}
function checkStage(){
    var stage;
    if(localStorage.stage){
        stage = localStorage.getItem("stage");
    } else{
        stage = 1;
        localStorage.setItem("stage", stage);
    }
    return stage;
}
function resetInput(input){
    document.getElementById(input).style.border = "2px solid #ffc24d";
        document.getElementById(input).style.width = "50%";    
}
function highlightInput(input){    
    document.getElementById(input).style.border = "2px solid #ff0000";
        document.getElementById(input).style.width = "100%";
}
function animateTutorial(){
    var stage = checkStage();    
    if(stage == 1){
        drawAttentionAddEntry();        
    }
    if(stage == 2){
        resetInput("rInput2");
        resetInput("rInput3");
        resetInput("rInput4");
        highlightInput("rInput1");
    }
    if(stage == 3){
        resetInput("rInput1");
        resetInput("rInput3");
        resetInput("rInput4");
        highlightInput("rInput2");
    }
    if(stage == 4){
        resetInput("rInput1");
        resetInput("rInput2");
        resetInput("rInput4");
        highlightInput("rInput3");
    }
    if(stage == 5){
        resetInput("rInput1");
        resetInput("rInput2");
        resetInput("rInput3");
        highlightInput("rInput4");
    }
    colorbars();
}
function setEntryToStart(){
    document.getElementById("EntryEnter").style.right = "145%";    
}
function drawAttentionAddEntry(){
    var addEntrybtn = document.getElementById("addEntrybtn");
    addEntrybtn.style.border = "7px solid #ff0000";
    setTimeout(function() {
        addEntrybtn.style.border = "2px solid #ffc24d";
    }, 1000);
}
function setNewStage(){
    var stage = parseInt(checkStage());
    stage += 1;
    if(stage == 6){
        stage = 2;
    }
    localStorage.setItem("stage", stage); 
    animateTutorial();      
}
function setStage(stage){
    localStorage.setItem("stage", stage); 
    animateTutorial();      
}
function resetStage(){
    var stage = 2;
    localStorage.setItem("stage", stage);    
}
function toggleEntryInput(){
    if(checkStage() == 1){
        setNewStage();
    }
    if(document.getElementById("EntryEnter").style.right == "145%"){
        animateEntry();
        document.getElementById("rInput1").select();
    }
    else{
        animateEntryReverse();
        resetStage();
        clearInput();    
    }
}
function listenForTouch(){
    document.getElementById("donebtn").addEventListener("touchstart", animateTouch);
    document.getElementById("addEntrybtn").addEventListener("touchstart", animateTouch);
    document.getElementById("clearbtn").addEventListener("touchstart", animateTouch);

    document.getElementById("donebtn").addEventListener("touchend", addEntry);
    document.getElementById("addEntrybtn").addEventListener("touchend", toggleEntryInput);
    document.getElementById("clearbtn").addEventListener("touchend", clearInput);   
}
function animateTouch(event){
    event.target.style.background = "#ffa600"; //relying on CSS to do the transition
}
function animateEntry(){
    var posX = 145;
    var posY = 40;
    var rotate = 0;
    var window = document.getElementById("EntryEnter");
    var interval = setInterval(frame,10);
    var interval2 = setInterval(frame2,10);
    function frame(){
        if(posX == 45){
            clearInterval(interval);
        } else {
            posX--;
            window.style.right = posX + "%";
            window.style.top = posY + "%";
        }
    }
    function frame2(){
        if(rotate >= 360){
            clearInterval(interval2);
        } else {
            rotate += 3.5;
            window.style.transform = "rotate(" + rotate + "deg)";
        }
    }
}
function animateEntryReverse(){
    var posX = 45;
    var posY = 40;
    var rotate = 360;
    var window = document.getElementById("EntryEnter");
    var interval = setInterval(frame3,10);
    var interval2 = setInterval(frame4,10);
    function frame3(){
        if(posX == 145){
            clearInterval(interval);
        } else {
            posX++;
            window.style.right = posX + "%";
            window.style.top = posY + "%";
        }
    }
    function frame4(){
        if(rotate <= 0){
            clearInterval(interval2);
        } else {
            rotate -= 3.5;
            window.style.transform = "rotate(" + rotate + "deg)";
        }
    }
}
function clearInput(){
    document.getElementById("rInput1").value = "";
    document.getElementById("rInput2").value = "";
    document.getElementById("rInput3").value = "";
    document.getElementById("rInput4").value = "";
}/*
function listenForBlur(){
    var rInput = document.getElementsByClassName("rInput");
    for (var i = 0; i < rInput.length; i++) {
        rInput[i].addEventListener('blur', setNewStage, false);
    }
    listenForBlur();
}*/
function listenForInput() {
    var rInput1 = document.getElementById('rInput1');
    var timeout = null;
    rInput1.onkeyup = function (e) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            setStage(3);
            document.getElementById("rInput2").select();
        }, 1000);
    };
    var rInput2 = document.getElementById('rInput2');
    var timeout = null;
    rInput2.onkeyup = function (e) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            setStage(4);
            document.getElementById("rInput3").select();
        }, 1000);
    };
    var rInput3 = document.getElementById('rInput3');
    var timeout = null;
    rInput3.onkeyup = function (e) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            setStage(5);
            document.getElementById("rInput4").select();
        }, 1000);
    };
    listenForInput();
}
function colorbars(){
    for(var i = 0; i <document.getElementById("pillars").childElementCount; i++){
        if(document.getElementById("pillars").children[i].style.background == "blue"){
            document.getElementById("pillars").children[i].style.background = "red";
        } else{
            document.getElementById("pillars").children[i].style.background = "blue";
        }
    }    
}
/****************
 * Program
 ***************/
function Entry(){
    this.familyMember;
    this.amountWhole;
    this.amountCents;
    this.amount;
    this.description;
    this.category;
}
Entry.prototype.getformatedAmount = function () {
    return "$" + this.amountWhole + "." + this.amountCents;
};
function User() {
    this.userName;
    this.password;
    this.stage;
    this.ledger = [];
}
function Pillar(){
    this.count;
    this.category;
}
function ChartData(){
    this.numPillars;
    this.pillars = [];
}
function addEntry(){
    var entry = new Entry();
    entry.familyMember = document.getElementById("rInput1").value;
    entry.amount = document.getElementById("rInput2").value;
    entry.description = document.getElementById("rInput3").value;
    entry.category = document.getElementById("rInput4").value;
    var database = [];
    if(localStorage.database){
        database = JSON.parse(localStorage.getItem("database"));
    }
    if (entry.familyMember != "" && entry.amount != "" && entry.category != "") {
        database.push(entry);
        localStorage.setItem("database", JSON.stringify(database));
        addToTable(entry);
    }
    toggleEntryInput();
    resetStage();
    clearInput();
}
function updateTable(){
    var database = [];
    if(localStorage.database){
        database = JSON.parse(localStorage.getItem("database"));
    }
    var table = document.getElementById('displayTable');
    for(var i = 0; i < database.length; i++){
        var row = table.insertRow();
                var row_familyMember = row.insertCell(0);
                var row_amount = row.insertCell(1);
                var row_description = row.insertCell(2);
                var row_category = row.insertCell(3);
                row_familyMember.innerHTML = database[i].familyMember;
                row_amount.innerHTML = "$" + database[i].amount;
                row_description.innerHTML = database[i].description;
                row_category.innerHTML = database[i].category;        
    }
}
function addToTable(entry){
    var table = document.getElementById('displayTable');
            if (entry.amount != "" && entry.amount != null) {
                var row = table.insertRow();
                var row_familyMember = row.insertCell(0);
                var row_amount = row.insertCell(1);
                var row_description = row.insertCell(2);
                var row_category = row.insertCell(3);
                row_familyMember.innerHTML = entry.familyMember;
                row_amount.innerHTML = "$" + entry.amount;
                row_description.innerHTML = entry.description;
                row_category.innerHTML = entry.category;
                addToChart(entry.category);
            }
}
function addToChart(category){
    var databasep = [];
    var found = false;
    if(localStorage.pillars){
        databasep = JSON.parse(localStorage.getItem("pillars"));
    }
    for(var i = 0; i < databasep.length; i++){
        if(category == databasep[i].category){
            databasep[i].count += 1;
            found = true;
            updateChart(databasep[i].category, i, databasep[i].count * 100);
        }
    }
    if(found == false && category != ""){
        var newp = new Pillar();
        newp.category = category;
        newp.count = 1;
        databasep.push(newp);
        var pillars = document.getElementById("pillars");
        var div = document.createElement("div");
        var widthsize = newp.count * 100;
        div.style.width = "0px";
        div.style.height = "20px";
        div.style.background = "red";
        div.style.color = "white";
        div.innerHTML = newp.category + ": " + newp.count;
        div.className = "pillarbar";
        pillars.appendChild(div);
        //div.style.width = widthsize + "px";
        animateBarOnCreation(widthsize, div);
    }
    found = false;
    localStorage.setItem("pillars", JSON.stringify(databasep));
}
function updateChart(cat, i, j){
    var databasep = [];
    if(localStorage.pillars){
        databasep = JSON.parse(localStorage.getItem("pillars"));
    }
    var pillars = document.getElementById("pillars");
    pillars.children[i].style.width = j + "px";
    pillars.children[i].innerHTML = cat + ": " + j / 100;
}
function createChart(){
    var databasep = [];
    if(localStorage.pillars){
        databasep = JSON.parse(localStorage.getItem("pillars"));
    }
    var pillars = document.getElementById("pillars");
    pillars.innerHTML = '';
    for (var i = 0; i < databasep.length; i++) {
        var div = document.createElement("div");
        var widthsize = databasep[i].count * 100;
        div.style.width = "0px";
        div.style.height = "20px";
        div.style.background = "red";
        div.style.color = "white";
        div.innerHTML = databasep[i].category + ": " + databasep[i].count;
        div.className = "pillarbar";
        pillars.appendChild(div);
        //div.style.width = widthsize + "px";
        animateBarOnCreation(widthsize, div);
    }
}
function animateBarOnCreation(count, div){
    var start = 0;
    var interval = setInterval(grow, 10);
    function grow(){
        if(start >= count){
            clearInterval(interval);
        } else {
            start++;
            div.style.width = start + "px";
        }
    }
}
