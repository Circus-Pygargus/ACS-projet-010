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
var inputsEmails = [input_email, "email"];
/* true means we can submit form
    false: we have some errors */
// var formTextOKToSubmit = false;
// var formNbrOkToSubmit = false;
// var formEmailOkToSubmit = false;
// var formOkToSubmit = false;
// easier with a counter ;)
var errorCounter = 0;
// will be used for regExp
var regularExpression;





///////////////////////////////////////////  Events  ///////////////////////////////////
btn_sendMessage.addEventListener("click", controlInputs);





//////////////////////////////////////////  Functions ///////////////////////////////////


// called by a click on submit button
function controlInputs (event) {
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
  canWeSendIt(event);
  // if yes, it's sent !
}


// control text inputs
function controlInputsText () {
  // let's loop
  var i;
  for (i=0; i<inputsTexts.length; i++){
    var textToCheck = inputsTexts[i][0].value;
    if (textToCheck === "") {
      // p_form_error.innerHTML += "Please, fill out the " + inputsTexts[i][1] + " field.<br>";
      // errorCounter++;
      recordError("empty", inputsTexts[i], "string");
    }
  }  
}


// control int inputs
function controlInputsNbrs () {
    var i;
    for (i=0; i<inputsNbrs.length; i++) {
      console.log("voui");
      var nbrToCheck = inputsNbrs[i][0].value;
      // nothing written in the input field
      if (nbrToCheck === "") {
        // p_form_error.innerHTML += "Please, fill out the " + inputsNbrs[i][1] + " field.<br>";
        // errorCounter++;
        recordError("empty", inputsNbrs[i], "number");
      }
      // input was filled outerHeight, let's check
      else {
          switch (inputsNbrs[i][1]) {
              // it's a phone number
              case "phone":
              // regexp sur phone ..
              /* /^
              (?:(?:\+|00)33|0)     # Dialing code 
              \s*[1-9]              # First number (from 1 to 9) 
              (?:[\s.-]*\d{2}){4}   # End of the phone number 
              $/;  */
              regularExpression = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
              if (!regularExpression.test(nbrToCheck)) {
                recordError("invalid", inputsNbrs[i], "number");
              }
              break;
              case "zip code":
              regularExpression = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/;
              if (!regularExpression.test(nbrToCheck)) {
                recordError("invalid", inputsNbrs[i], "number");
              }
              break;
          }
      }
    }
}


// control email input
function controlInputEmail () {
    var emailToCheck = input_email.value;
    // regExp
    regularExpression = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    // is input field empty ?
    if (emailToCheck === "") {
        // p_form_error.innerHTML += "Please, fill out the email field.<br>";
        recordError("empty", inputsEmails, "email");
    }
    // check if email adress is valid (doesn't see if exist)
    else if (!regularExpression.test(emailToCheck)) {
            recordError("invalid", inputsEmails, "email");
    }
}


// explain errors in a <p> that will be displayed once each field have been correctly filled out
/*  _param 1, _errorCode : will be compared in a switch
        possible errors :
            empty : nothing in the input field
            invalid : input is not valid
    _param2, _falseInput : is a child of array inputsTexts, inputsNbrs or inputEmail.
        falseInput[0] : the object input
        falseInput[1] : the input name to display in the error message sent to user
    _param3, _inputType : tells what kind of input was used
        can be : "string", "number" or "email"

    no return here, function just keep errors in a <p> to display them later */
function recordError (_errorCode, _falseInput, _inputType) {
    // increment the errorCounter so we'll know later we shouldn't send the form
    errorCounter++;
    // let's see wich error we have
    switch (_errorCode) {
        // the input is empty
        case "empty":
            p_form_error.innerHTML += "Please, fill out the " + _falseInput[1] + " field.<br>";
            break;
        case "invalid":
            if (_inputType === "string") {

            }
            else if (_inputType === "number") {
                p_form_error.innerHTML += "Please, give a valid " + _falseInput[1] + " number.<br>";
            }
            else if (_inputType === "email") {
                p_form_error.innerHTML += "Please, give a valid email adress."
            }
            else {
                alert("Pb ! le type d'erreur envoyé à recordError() n'est pas reconnu !!");
            }
            break;
        default : 
            alert("Attention, j'essaye de stocker une erreur non reconnue ou mal nommée");
    }
}


/* Here we check if all inputs are ok
    yes -> nothing : form is sent
    no  -> display p_form_error and stop before sending form */
function canWeSendIt (_event) {
  // if (formTextOKToSubmit == false 
  //     || formNbrOkToSubmit == false 
  //     || formEmailOkToSubmit == false) {
    if (errorCounter != 0) {
        // show the p_form_error, it will display all errors
        p_form_error.classList.replace("p_error_hidden", "p_error_shown");
        // used to prevent the page reload (so we won't send the form)
        _event.preventDefault();
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
  