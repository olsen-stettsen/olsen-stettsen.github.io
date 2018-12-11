function onload(){
    listen();
    css();
}
/*************************************************************
 * CSS
 ************************************************************/
function listen(){
    document.getElementById("navbtnHome").onclick = function () { location.href = "http://upcla.com/"; this.style.color = "#00ba09"};
    document.getElementById("navbtnHome").addEventListener("mouseover", changeColorbtn);
    document.getElementById("choose2btnleft").addEventListener("click", newMemberVisible);
    document.getElementById("choose2btnright").addEventListener("click", existingMemberVisible);
    document.getElementById("backto2").addEventListener("click", twoChoiceVisible);
    document.getElementById("backto22").addEventListener("click", twoChoiceVisible);
    document.getElementById("existingMemberbtn").addEventListener("click", existingMemberVisible);
    document.getElementById("newMemberbtn").addEventListener("click", newMemberVisible);
    document.getElementById("submitnewbtn").addEventListener("click", submitNewMember);
    document.getElementById("submitexistingbtn").addEventListener("click", updateExistingMember);
}
function changeColorbtn(event){
    var oColor = event.target.style.color;
    event.target.style.color = "#8cc63e"; //relying on CSS to do the transition
    document.getElementById("navbtnHome").onmouseout = function(){event.target.style.color = oColor};
}
function css(){
    setHeaderHeight();
    alignFilterAndBackground();
    //centerPrompt();
    startUpButtonAppearFade();
}
function setHeaderHeight(){
    document.getElementById("UPCLAHOMELINKPIC").style.height = window.innerHeight * 11 / 100 + "px";
    document.getElementById("heading").style.paddingTop = window.innerHeight * 2 / 100 + "px";
    document.getElementById("heading").style.paddingBottom = window.innerHeight * 6 / 100 + "px";
}
function alignFilterAndBackground(){
    document.getElementById("backgroundfilter").style.top = document.getElementById("header").clientHeight + "px";
    document.getElementById("backgroundfilter").style.height = window.innerHeight - document.getElementById("header").clientHeight + "px";
    document.getElementById("background").style.height = window.innerHeight + "px";
}
function centerPrompt(){
    document.getElementById("updateEnterPrompt").style.marginTop = ((document.getElementById("backgroundfilter").style.height - document.getElementById("updateEnterPrompt").style.height) / 2) + "px";
}
function startUpButtonAppearFade(){
    var navbtn = document.getElementsByClassName("navbtn");
    for (var i = 0; i < navbtn.length; i++){
        navbtn[i].style.color = "#ffffff";
    }
}
function newMemberVisible(){
    document.getElementById("updateEnterPrompt").style.display = "none";
    document.getElementById("newMemberInput").style.display = "block";
    document.getElementById("existingMemberInput").style.display = "none";
    document.getElementById("background").style.backgroundImage = "url('utah-photo-21.jpg')"
    document.getElementById("content").style.backgroundColor = "#ffffffd8";
    document.getElementById("backfilter").style.backgroundColor = "#ffffffd8";
}
function twoChoiceVisible(){
    document.getElementById("updateEnterPrompt").style.display = "block";
    document.getElementById("newMemberInput").style.display = "none";
    document.getElementById("existingMemberInput").style.display = "none"
    document.getElementById("background").style.backgroundImage = "url('backgroundgrass.png')"    
    document.getElementById("content").style.backgroundColor = "#ffffff00";
}
function existingMemberVisible(){
    document.getElementById("updateEnterPrompt").style.display = "none";
    document.getElementById("newMemberInput").style.display = "none";
    document.getElementById("existingMemberInput").style.display = "block";
    document.getElementById("background").style.backgroundImage = "url('utah-photo-21.jpg')";
    document.getElementById("content").style.backgroundColor = "#ffffffd8";
    document.getElementById("backfilter").style.backgroundColor = "#ffffffd8";
}
/*************************************************************
 * Program
 ************************************************************/
/**********************
 * Member Object
 *********************/
function Member() {
    this.firstName;
    this.lastName;
    this.businessName;
    this.businessAddress;
    this.zip;
    this.state;
    this.businesslicense;
    this.personllicense;
    this.email;
};
/**********************
 * Submit new Member
 *********************/
function submitNewMember(){
    var member = new Member();
    member.firstName = document.getElementById("firstName").value;
    member.lastName = document.getElementById("lastName").value;
    member.businessName = document.getElementById("businessName").value;
    member.businessAddress = document.getElementById("businessAddress").value;
    member.zip = document.getElementById("zipcode").value;
    member.state = document.getElementById("state").value;
    member.businesslicense = document.getElementById("businesslicense").value;
    member.personllicense = document.getElementById("personallicense").value;
    member.email = document.getElementById("email").value;
    write(JSON.stringify(member));
}
/**********************
 * Update Existing Member
 *********************/
function updateExistingMember(){
    dbLookup();
}
/********************************
 *write
********************************/
function write(input) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);
        }
    };
    xmlhttp.open("GET", "save.php?q=" + input, true);
    xmlhttp.send();
}
function dbLookup(){
    var input = "test";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    };
    xmlhttp.open("GET", "dbLookup.php?q=" + input, true);
    xmlhttp.send();
}