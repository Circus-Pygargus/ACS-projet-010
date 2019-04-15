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
var formTextOKToSubmit = false;
var formNbrOkToSubmit = false;
var formEmailOkToSubmit = false;
var formOkToSubmit = false;


btn_sendMessage.addEventListener("click", controlInputs);

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
}

// control text inputs
function controlInputsText () {
  // let's loop
  var i;
  for (i=0; i<inputsTexts.length; i++){
    var textToCheck = inputsTexts[i][0].value;
console.log("text from " + inputsTexts[i][1] + " : " + textToCheck);
    if (textToCheck === "") {
      p_form_error.innerHTML += "Please, fill the " + inputsTexts[i][1] + " field.<br>";
    }
    // everything is ok
    else {
      formTextOKToSubmit = true;
    }

    // can we send form ?
  }
}

// control int inputs
function controlInputsNbrs () {

}

// control email input
function controlInputEmail () {

}

/* Here we check if all inputs are ok
    yes -> nothing : form is sent
    no  -> display p_form_error and stop before sending form */
function canWeSendIt () {
  if (formTextOKToSubmit == false 
      || formNbrOkToSubmit == false 
      || formEmailOkToSubmit == false) {
        // show the p_form_error, it will display all errors
        p_form_error.classList.replace("p_error_hidden", "p_error_shown");
        // use to prevent the page reload
        event.preventDefault();
      }
}
  