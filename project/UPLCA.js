function onload(){
    listen();
    css();
}
/*************************************************************
 * CSS
 ************************************************************/
function listen(){
    //clicks
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
    document.getElementById("newconfirm").addEventListener("click", confirmNew);
    document.getElementById("editbtn").addEventListener("click", newMemberVisible);

    //validation input
    onInputValidate();
}
function changeColorbtn(event){
    var oColor = event.target.style.color;
    event.target.style.color = "#8cc63e"; //relying on CSS to do the transition
    document.getElementById("navbtnHome").onmouseout = function(){event.target.style.color = oColor};
}
function css(){
    setHeaderHeight();
    alignFilterAndBackground();
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
    document.getElementById("thankYou").style.display = "none";
    document.getElementById("background").style.backgroundImage = "url('utah-photo-21.jpg')";
    document.getElementById("content").style.backgroundColor = "#ffffffd8";
    document.getElementById("backfilter").style.backgroundColor = "#ffffffd8";
}
function twoChoiceVisible(){
    document.getElementById("updateEnterPrompt").style.display = "block";
    document.getElementById("newMemberInput").style.display = "none";
    document.getElementById("existingMemberInput").style.display = "none";
    document.getElementById("thankYou").style.display = "none";
    document.getElementById("background").style.backgroundImage = "url('backgroundgrass.png')"    
    document.getElementById("content").style.backgroundColor = "#ffffff00";
}
function existingMemberVisible(){
    document.getElementById("updateEnterPrompt").style.display = "none";
    document.getElementById("newMemberInput").style.display = "none";
    document.getElementById("thankYou").style.display = "none";
    document.getElementById("existingMemberInput").style.display = "block";
    document.getElementById("background").style.backgroundImage = "url('utah-photo-21.jpg')";
    document.getElementById("content").style.backgroundColor = "#ffffffd8";
    document.getElementById("backfilter").style.backgroundColor = "#ffffffd8";
}
function displayThankYou(){
    document.getElementById("newMemberInput").style.display = "none";
    document.getElementById("thankYou").style.display = "block";   
}
function validationCSS(method, input){
    var inputaster = "v" + input;
    if(!method){
        document.getElementById(inputaster).style.display = "block";
        document.getElementById(input).style.border = "2px solid #ff0000";
        document.getElementById("vmessage").style.display = "block";
    }
    else{
        document.getElementById(inputaster).style.display = "none";
        document.getElementById(input).style.borderColor = "#00ba09"; 
        document.getElementById("vmessage").style.display = "none";           
    }    
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
    localStorage.setItem("member", JSON.stringify(member));
    displayThankYou();
    populateThankYouData(member);    
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
/********************************
 *dbLookup
 *looks up the member information on the server side
********************************/
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
/********************************
 *populateThankYouData
********************************/
function populateThankYouData(member){
    document.getElementById("thankYouNameh1").innerHTML = "Thank you, " + member.firstName +"!";
    document.getElementById("rfirstName").innerHTML = member.firstName;
    document.getElementById("rlastName").innerHTML = member.lastName;
    document.getElementById("rbusinessName").innerHTML = member.businessName;
    document.getElementById("rbusinessAddress").innerHTML = member.businessAddress;
    document.getElementById("rzipCode").innerHTML = member.zip;
    document.getElementById("rstate").innerHTML = member.state;
    document.getElementById("rbusinessLicense").innerHTML = "4000-" + member.businesslicense;
    document.getElementById("rpersonalLicense").innerHTML = "4001-" + member.personllicense;
    document.getElementById("remail").innerHTML = member.email;
}
/*******************************
 * confirmNew
 ******************************/
function confirmNew(){
    var member = localStorage.getItem("member");
    write(member);
    clearFields();
    twoChoiceVisible();
}
/*******************************
 * clearFields
 ******************************/
function clearFields(){
    document.getElementById("firstName").value = '';
    document.getElementById("lastName").value = '';
    document.getElementById("businessName").value = '';
    document.getElementById("businessAddress").value = '';
    document.getElementById("zipcode").value = '';
    document.getElementById("state").value = '';
    document.getElementById("businesslicense").value = '';
    document.getElementById("personallicense").value = '';
    document.getElementById("email").value = '';
}
/*******************************
 * fillFields
 ******************************/
function fillFields(){
    var member = JSON.parse(localStorage.getItem("member"));
    document.getElementById("firstName").value = member.firstName;
    document.getElementById("lastName").value = member.lastName;
    document.getElementById("businessName").value = member.businessName;
    document.getElementById("businessAddress").value = member.businessAddress;
    document.getElementById("zipcode").value = member.zip;
    document.getElementById("state").value = member.state;
    document.getElementById("businesslicense").value = member.businesslicense;
    document.getElementById("personallicense").value = member.personllicense;
    document.getElementById("email").value = member.email;
}
/*************************************************************
 * Form Validation
 ************************************************************/
/**********************
 * New Member
 *********************/
function onInputValidate(){
    document.getElementById("firstName").oninput = function(){ validationCSS(validateFirstName(), "firstName"); };
    document.getElementById("lastName").oninput = function(){ validationCSS(validateLastName(), "lastName"); };/*
    document.getElementById("businessName").value = member.businessName;
    document.getElementById("businessAddress").value = member.businessAddress;
    document.getElementById("zipcode").value = member.zip;
    document.getElementById("state").value = member.state;
    document.getElementById("businesslicense").value = member.businesslicense;
    document.getElementById("personallicense").value = member.personllicense;*/
    document.getElementById("email").oninput = function(){ validationCSS(validateEmail(), "email"); };
}
function validateFirstName() {
    var name = document.getElementById("firstName").value;
    var regularEx = /^[a-z ,.'-]+$/i;
    return regularEx.test(name);
  }
  function validateLastName() {
    var name = document.getElementById("lastName").value;
    var regularEx = /^[a-z ,.'-]+$/i;
    return regularEx.test(name);
  }
function validateEmail() {
    var email = document.getElementById("email").value;
    var regularEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularEx.test(email);
  }