<!--
////////////////////////////////  Variables  //////////////////////////
// get form name
var myForm = document.querySelector("#myForm");
// get submit button
var btn_sendMessage = document.querySelector("#btn_send_message");
// get the p made to send errors
var p_form_error = document.querySelector("#p_error_message");
// get all inputs
var input_name = document.querySelector("#input-name");
var input_1st_name = document.querySelector("#input-1st_name");
var input_email = document.querySelector("#input-email");
var input_phone = document.querySelector("#input-phone");
var input_street = document.querySelector("#input-street");
var input_zip_code = document.querySelector("#input-zip_code");
var input_town = document.querySelector("#input-town");
var input_message = document.querySelector("#input-message");
// get all p used to send error // I prefer one place with all messages
// var p_err_name = document.querySelector("#p_err_name");
// var p_err_1st_name = document.querySelector("p_err_1st_name");
// var p_err_email = document.querySelector("#input-email");
// var p_err_phone = document.querySelector("#p_err_phone");
// var p_err_street = document.querySelector("#p_err_street");
// var p_err_zip_code = document.querySelector("#p_err_zip_code");
// var p_err_town = document.querySelector("#p_err_town");
// var p_err_message = document.querySelector("#p_err_message");

var inputsTexts = [
                    [input_name, "name"],
                    [input_1st_name, "first name" ],
                    [input_street, "street"],
                    [input_town, "town"],
                    [input_message, "message"]
];
var inputsNbrs = [
                    [input_phone, "phone"],
                    [input_zip_code, "zip code"]
];
/* true means we can submit form
    false: we have some errors */
// var formTextOKToSubmit = false;
// var formNbrOkToSubmit = false;
// var formEmailOkToSubmit = false;
// var formOkToSubmit = false;
// easier with a counter ;)
var errorCounter = 0;





///////////////////////////////////////////  Events  ///////////////////////////////////
btn_sendMessage.addEventListener("click", controlInputs);





//////////////////////////////////////////  Functions ///////////////////////////////////


// called by a click on submit button
function controlInputs () {
  // first, empty this so it doesn't display an old message
  p_form_error.innerHTML = "";
  // check if p_form_error is shown, if yes, hide it !
  if (p_form_error.classList.contains("p_error_shown")) {
    p_form_error.classList.replace("p_error_shown", "p_error_hidden");
  }

  // now we can check inputs
  controlInputsText();
  controlInputsNbrs();
  controlInputEmail();

  // Are all inputs ok ?
  canWeSendIt();
  // if yes, it's sent !
}


// control text inputs
function controlInputsText () {
  // let's loop
  var i;
  for (i=0; i<inputsTexts.length; i++){
    var textToCheck = inputsTexts[i][0].value;
    if (textToCheck === "") {
      p_form_error.innerHTML += "Please, fill out the " + inputsTexts[i][1] + " field.<br>";
      errorCounter++;
    }
  }  ///  ecrire une fonction qui écrit les erreurs (arguments :erreur, sur quel champ, )
}


// control int inputs
function controlInputsNbrs () {
    var i;
    for (i=0; i<inputsNbrs.length; i++) {
      console.log("voui");
      var nbrToCheck = inputsNbrs[i][0].value;
      if (nbrToCheck === "") {
        p_form_error.innerHTML += "Please, fill out the " + inputsNbrs[i][1] + " field.<br>";
        errorCounter++;
      }
    }
}


// control email input
function controlInputEmail () {
    var emailToCheck = input_email.value;
    if (emailToCheck === "") {
        p_form_error.innerHTML += "Please, fill out the email field.<br>";
    }
}


// explain errors in a <p> that will be displayed once each field have been correctly filled out
function recordError () {

}


/* Here we check if all inputs are ok
    yes -> nothing : form is sent
    no  -> display p_form_error and stop before sending form */
function canWeSendIt () {
  // if (formTextOKToSubmit == false 
  //     || formNbrOkToSubmit == false 
  //     || formEmailOkToSubmit == false) {
    if (errorCounter != 0) {
        // show the p_form_error, it will display all errors
        p_form_error.classList.replace("p_error_hidden", "p_error_shown");
        // used to prevent the page reload (so we won't send the form)
        event.preventDefault();
    } 
    // Every thing is ok !
    else {
        // we don't send anything because there's nothing out there to receive ..
        p_form_error.classList.replace("p_error_hidden", "p_no_error_shown");
        p_form_error.innerHTML += "Nbr of counted errors : " + errorCounter + "<br>";
        p_form_error.innerHTML += "Everything seems to be ok !";
        event.preventDefault();
    }
}
//-->
  