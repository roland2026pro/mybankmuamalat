function formatText(text) {
  returnValue = text;
  for (i = 1; i < arguments.length; i++) {
    pattern = "\\{" + (i-1) + "\\}";
    returnValue = returnValue.replace(new RegExp(pattern), arguments[i]);
  }
  return returnValue;
}

function isNotEmpty(field, fieldName) {
	if (field.value.trim() == '') {
		alert(formatText(messageRequired, fieldName));
		
		try{
			//avoid js error n not return value
			field.focus();
			field.select();
		}catch(o){}
		return false;
	} else {
		return true;
	}
}

function mustSelect(formElementSelectedIndex, message){
	if(formElementSelectedIndex <= 0){
		errorMsg = formatText(messageRequired, message);
		alert(errorMsg);
		return false;
	}
	else
		return true;
}

/*
 * function: validate a decimal field
 * parameter: c - control
 *            min - minimum value, '' means ignore
 *            max - maximum value, '' means ignore
 *            len - length of field
 *            frac - the number of decimal places
 * return: true if integer is within range and length; false otherwise
 */

function validateDecimal(field, fieldName, min, max, len, frac) {
  var s = "";
  if (field.value != "") {
    if (isNaN(field.value)) {
      field.select();
      field.focus();
      alert(formatText(messageMustBeNumber, fieldName));
      return false;
    }
    limit = "";
    for (i = 0; i < len-frac; i++) {
      limit = limit + "9";
    }
    if (frac > 0) {
      limit = limit + ".";
      for (i = 0; i < frac; i++) {
        limit = limit + "9";
      }
    }
    if (isNaN(parseFloat(min, 10))) min = parseFloat(limit, 10) * -1;
    if (isNaN(parseFloat(max, 10))) max = parseFloat(limit, 10);
    if ((parseFloat(field.value, 10) < min) || (parseFloat(field.value, 10) > max)) {
      field.select();
      field.focus();
      alert(formatText(messageInvalidRange, fieldName, toNumeric(min.toString(),frac), toNumeric(max.toString(),frac)));	//added by NY
      return false;
    }
    field.value = toNumeric(field.value, frac);
  }
  
  return true;
}

function toNumeric(val, frac) {
  var decimalPoint = val.indexOf('.');
  if (decimalPoint == -1) {
    intPart = val;
    decimalPart = "";
  }
  else {
    intPart = val.substr(0, decimalPoint);
    decimalPart = val.substr(decimalPoint+1);
  }
  if (frac == 0) {
  	return intPart;
  }
  // Substract the decimal part based on the input fraction
  if (decimalPart.length > frac) {
    decimalPart = decimalPart.substr(0, frac);
  }
  // Place zero as decimal points
  for (var i = decimalPart.length; i < frac; i++) {
    decimalPart = decimalPart + "0";
  }
  return intPart + "." + decimalPart;
}

function checkSpecialChar(field, fieldName) {
	var temp = field.value;
	var re = new RegExp ('\r\n', 'gi') ;
	var newstr = temp.replace(re, '') ;

     for (var i=0; i < newstr.length; i++)
     {
          var ch = newstr.substring(i, i+1);
          if ((ch >= "A" && ch <= "Z") || (ch>= "0" && ch <= "9") || (ch >= "a" && ch <= "z") || (ch == "\n") ||
          	 (ch == " ") || (ch == ".") || (ch == "-") || (ch == "&") || (ch == "'") || (ch == "/") || (ch == "(") ||
          	 (ch == ")") || (ch == ";") || (ch == ":") || (ch == "+") || (ch == "#") || (ch =="?") || (ch == "@") ||
          	 (ch == "_") || (ch == ",")) {
               continue;
          } else {
	          alert(formatText(messageInvalidChar, fieldName));
              field.select();
              field.focus ();
              return false;
          }
     }
     return true;
}

// this function is to check for a valid email address.
function emailCheck (field, fieldName) {	
	var emailStr = field.value;
	emailStr = emailStr.trim();
	
	if (emailStr.length > 0) {
		if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(emailStr)){
			return true;
		}
		alert(formatText(messageInvalidEmail, fieldName));
		field.select();
		field.focus();
		return false;
	}
	return true;
}

/*
 * Validate key stroke - allow digit only
 * @handleEvent onkeypress, onblur
 * @return true if the key stroke is digit; false otherwise
 */
function integerKey(obj) {
  var event = window.event;
  key = String.fromCharCode(event.keyCode);
  if (isNaN(key))
    return false;
  else 
    obj.value = obj.value.replace(/\D/g, "");
}

/*
 * function: validate key stroke - allow digit only
 * @handleEvent onkeypress, onblur
 * return: true if the key stroke is digit; false otherwise
 */
function integerKey() {
  var event = window.event;
  key = String.fromCharCode(event.keyCode);
  if (isNaN(key) || key.trim() == "") {
    return false;
  }
  return true;
}

/*
 * Validate key stroke - allow digit or dot char only
 * @handleEvent onkeypress, onblur
 * @return true if the key stroke is digit and dot char; false otherwise
 */
function decimalKey(obj) {
  var event = window.event;
  key = String.fromCharCode(event.keyCode);

  if (!isNaN(key) || key.match(/\./) != null) {
    obj.value = obj.value.replace(/[^0-9.]/g, "");

    idx = obj.value.indexOf(".");
    if (idx >= 0) {
      if (key == ".") {
        return false;
      } 
      if ((obj.value.length - idx) > 2) {
        obj.value = obj.value.substring(0, idx + 3);
        return false;
      }
    }
    return true;
  }
  else {
    return false;
  }
}

/*
 * function: allow alphabet and numeric key code
 */
function alphaNumericKey() {
  var event = window.event;
  key = event.keyCode;
   
  if (!isAlphaKey(key) && !isNumericKey(key) || key == 32) {
    return false;
  }
  return true;
}

/*
 * function: allow alphabet, numeric and underscore key code
 * disallow space key
 */
function alphaNumericUnderscoreKey() {
  var event = window.event;
  key = event.keyCode;

  if (!isAlphaKey(key) && !isNumericKey(key) && !(key == 95) || key == 32) {
    return false;
  }
  return true;
}

/*
 * function: allow alphabet, numeric, space key code
 */
function alphaNumericSpaceKey() {
  var event = window.event;
  key = event.keyCode;
  
  if (!isAlphaKey(key) && !isNumericKey(key)) {
    return false;
  }
  return true;
}

/*
 * Validate key stroke - Only allows letters, numbers, and spaces
 * @handleEvent oninput
 * @return value which already removed invalid char
 */
function validAlphanumeric(obj) {
    obj.value = obj.value.replace(/[^a-zA-Z0-9]/g, '');
}

/*
 * Validate key stroke - Only allows letters, numbers, and spaces
 * @handleEvent oninput
 * @return value which already removed invalid char
 */
function validAlphanumericSpace(obj) {
    obj.value = obj.value.replace(/[^a-zA-Z0-9\s]/g, '');
}

/*
 * function: allow only alphabet, space key code
 */
function alphaKey() {
  var event = window.event;
  key = event.keyCode;
  
  if (!isAlphaKey(key)) {
    return false;
  }
  return true;
}

/*
 *function: allow only numerics
 */
function numericKey(){
	var event = window.event;
	key = event.keyCode;
	
	if(!isNumericKey(key)){
		return false;
	}
	return true;
}

/*
 * function: validate if key code is alphabets and space
 */
function isAlphaKey(arg) {
   return (arg > 64 && arg < 91) || (arg > 96 && arg < 123) || arg == 32;
}

/*
 * function: validate if a character is digit
 */
function isNumericKey(arg) {
  return (arg >= "0".charCodeAt(0)) && (arg <= "9".charCodeAt(0));
}

/*
 * function: remove the preceeding and trailling space
 */
String.prototype.trim = function() {
  return( this.replace(/^\s*([\s\S]*\S+)\s*$|^\s*$/,'$1') );
}


/**
 * Validate mandatory fields.
 * Usage:
 *   function required() { 
 *     this.aa = new Array("<field name>", "<lable name>", <overwrite message: true/false/1/0>);
 *     this.ab = new Array("<field name>", "<lable name>");
 *   }
 */
function validateRequired(form) {
  var isValid = true;
  var focusField = null;
  var i = 0;
  var fields = new Array();
  oRequired = new required();
  for (x in oRequired) {
    var field = form[oRequired[x][0]];
    var label = oRequired[x][1];
    var ownMsg = (typeof(oRequired[x][2]) == "undefined" || oRequired[x][2] == false || oRequired[x][2] == 0) ? false : true;

    if (validateFieldRequired(field) == false) {
      if (i == 0) {
		  focusField = (typeof(field.type) != "undefined") ? field : field[0];
	  }
	  fields[i++] = (ownMsg)? label : formatText(messageRequired, label);
	  isValid = false;
	  break; // added to show 1 message at a time.
  	}
  }

  if (fields.length > 0) {
    focusField.focus();
    alert(fields.join('\n'));
  }

  return isValid;
}

function validateRequiredRemind(form) {
  var isValid = true;
  var focusField = null;
  var i = 0;
  var fields = new Array();
  oRequired = new required();
  for (x in oRequired) {
    var field = form[oRequired[x][0]];
    var label = oRequired[x][1];
    var ownMsg = (typeof(oRequired[x][2]) == "undefined" || oRequired[x][2] == false || oRequired[x][2] == 0) ? false : true;

    if (validateFieldRequired(field) == false) {
      if (i == 0) {
		  focusField = (typeof(field.type) != "undefined") ? field : field[0];
	  }
	  fields[i++] = (ownMsg)? label : formatText(messageKinlyEnter, label);
	  isValid = false;
	  break; // added to show 1 message at a time.
  	}
  }

  if (fields.length > 0) {
    focusField.focus();
    alert(fields.join('\n'));
  }

  return isValid;
}

/**
 * Validate whether the given field is empty.
 * @return true(not empty)/false(empty)
 */
function validateFieldRequired(field) { 
  var isValid = true;
  if (field.type == 'text' ||
      field.type == 'textarea' ||
      field.type == 'file' ||
      field.type == 'select-one' ||
      field.type == 'radio' ||
      field.type == 'checkbox' ||
      field.type == 'password') {

    var value = '';
    // get field's value
    if (field.type == "select-one") {
      var si = field.selectedIndex;
      if (si >= 0) {
        value = field.options[si].value;
      }
    } else if (field.type == "checkbox" || field.type == 'radio') {
      if (field.checked) value = field.value;
    } else {
      value = field.value;
    }
    
    if (trim(value).length == 0) {
      isValid = false;
    }
  }
  else if (typeof(field.type) == "undefined") {
    if (!(isNaN(field.length))) {
      checked = false;
      for(j=0; j<field.length; j++) {
        checked = validateFieldRequired(field[j]);
        if (checked) break;
      }
      if (checked == false) {
        isValid = false;
      }
    }
  }
  return isValid;
}

function isEmptyObject(obj) {
	  for(var prop in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	      return false;
	    }
	  }
	  return true;
	}

/**
 * Validate at least 1 of the give fields i required.
 * Usage:
 *   function minRequired() { 
 *     this.aa = new Array("<Field Name>", "<Own Message>");
 *     this.ab = new Array("<Field Name>");
 *   }
 */ 
function validateMinRequired(form) {
  var isValid = false;
  var i = 0;
  var ownMsg;
  oMinRequired = new minRequired();
  for(var x in oMinRequired) {
    var field = form[oMinRequired[x][0]];
    if (typeof(oMinRequired[x][1]) != "undefined") {
      ownMsg = oMinRequired[x][1];
    }

    if (validateFieldRequired(field) == true) {
      isValid = true;
      break;
    }
  }
  if (isEmptyObject(oMinRequired)) {
	  isValid = true;
  }
  if (!isValid) {
    alert((ownMsg != null && ownMsg.length > 0) ? ownMsg : messageAtLeastOne);
  }
  return isValid;
}

/**
 * Validate field requirement depeneds on another field.
 * Usage:
 *   function requiredIf() { 
 *     this.aa = new Array("<field name>", "<field value>", "<operator>", "<required name>", "<required label>", <overwrite message: true/false/1/0>);
 *     this.ab = new Array("<field1 name>", "<field1 value>", "==", "<required4 name>", "<required4 label>");
 *     this.ac = new Array("<field2 name>", "<field2 value>", "!=", "<required5 name>", "<required5 label>", true);
 *   } 
 */
function validateRequiredIf(form) {
  var isValid = true;
  var focusField = null;
  var i = 0;
  var fields = new Array();
  oRequiredIf = new requiredIf();
  for(var x in oRequiredIf) {
    field    = form[oRequiredIf[x][0]];
    value    = oRequiredIf[x][1];
    operator = oRequiredIf[x][2];
    fieldr   = form[oRequiredIf[x][3]];
    label    = oRequiredIf[x][4];
    ownMsg   = (typeof(oRequiredIf[x][5]) == "undefined" || oRequiredIf[x][5] == false || oRequiredIf[x][5] == 0) ? false : true;

    if (field.type == 'select-one') {
      if (field.options[field.selectedIndex].value == value) {
        if (validateFieldRequired(fieldr) == false) {
          if (i == 0) {
            focusField = (typeof(fieldr.type) != "undefined") ? fieldr : fieldr[0];
          }
          fields[i++] = (ownMsg)? label : formatText(messageRequiredIf, label);
          isValid = false;
          break; // added to show 1 message at a time.
        }                	
      }
    }
    else if (typeof(field.type) == "undefined") {
      if (!(isNaN(field.length))) {
        for(j=0; j<field.length; j++) {
          if (field[j].checked && field[j].value == value) {
            if (validateFieldRequired(fieldr) == false) {
              if (i == 0) {
                focusField = (typeof(fieldr.type) != "undefined") ? fieldr : fieldr[0];
              }
              fields[i++] = (ownMsg)? label : formatText(messageRequiredIf, label);
              isValid = false;
            }
            break;                	
          }
        }
      }
    }
    else if (field.type == 'text' || field.type == 'textarea' || field.type == 'password') {
      if (field.value.length > 0 && eval(field.value + operator + value)) {
        if (validateFieldRequired(fieldr) == false) {
          if (i == 0) {
            focusField = (typeof(fieldr.type) != "undefined") ? fieldr : fieldr[0];
          }
          fields[i++] = (ownMsg)? label : formatText(messageRequiredIf, label);
          isValid = false;
          break; // added to show 1 message at a time.
        }
      }
    }
  }
  if (fields.length > 0) {
    focusField.focus();
    alert(fields.join('\n'));
  }
  return isValid;
}

// Trim whitespace from left and right sides of s.
function trim(s) {
  return s.replace( /^\s*/, "" ).replace( /\s*$/, "" );
}

/**
 * Validate the pattern of the field
 * Usage:
 *   function mask() { 
 *     this.aa = new Array("<field name>", "<field label>", "<pattern>", "<own message>");
 *     this.ab = new Array("<field1 name>", "<field1 label>", "<pattern1>", "<own message1>");
 *     this.ac = new Array("<field2 name>", "<field2 label>", "<pattern2>", "<own message2>");
 *   } 
 */
function validateMask(form) {
	var isValid = true
	var focusField = null
	var i = 0;
	var fields = new Array()
	oMasked = new mask()
	for (x in oMasked) {
		field = form[oMasked[x][0]]
		label = oMasked[x][1]
		pattern = oMasked[x][2]
		msg = oMasked[x][3]
		if (!(typeof(field) == "undefined" || field.type == "undefined") && 
			((field.type == 'text' || 
			 field.type == 'textarea' ||
			 field.type == 'password') && 
 			(field.value.length > 0))) {
                        
			if (!field.value.match(pattern)) {
				focusField = (typeof(field) != "undefined" || field.type != "undefined") ? field : field[0];
				if (msg) {
					fields[i++] = formatText(msg, label);
				}
				isValid = false;
				break
			}
		}
	}
	if (fields.length > 0) {
		focusField.focus()
		focusField.select()
		alert(fields.join('\n'))
	}
	return isValid
}

/*
 * function: validate a field length
 * parameter: minLength - minimum length, '' means ignore
 *            maxLength - maximum length, '' means ignore
 *            args0     - custom error message [optional]
 * return: true if input is within length range; false otherwise
 */
function validateLength(field, fieldName, minLength, maxLength, args0) {
   	errMsg  = (args0 != null) ? args0 : messageInvalidLength;

	if (minLength == '' && maxLength == '')
		return true
	else if (minLength != '' && maxLength != '') {
		if (trim(field.value).length < minLength || trim(field.value).length > maxLength) {
			field.focus()
			field.select()
			alert(formatText(errMsg, fieldName))
			return false
		} else 
			return true
	}
	else if (minLength != '' && maxLength == '') {
		if (trim(field.value).length < minLength) {
			field.focus()
			field.select()
			alert(formatText(errMsg, fieldName))
			return false
		} else
			return true
	}
	else if (minLength == '' && maxLength != '') {
		if (trim(field.value).length > maxLength) {
			field.focus()
			field.select()
			alert(formatText(errMsg, fieldName))
			return false			
		} else
			return true
	}
	else
		return false
}

/*
 * function: validate whether first field equals second field
 * return: true if input 1 equals input 2; false otherwise
 */
 function validateEquals(field1, fieldName1, field2, fieldName2) {
 	if (field1.value != field2.value) {
 		field1.focus();
 		field1.select(); 		
 		alert(formatText(messageMustBeSame, fieldName1, fieldName2))
 		return false
 	} else 
 		return true
 }

/* 
 * function: validate date
 * return: true if date is valid, false otherwise
 */
 function validateDate(dayField, monthField, yearField, fieldName) {
 	var di = dayField.selectedIndex;
 	var mi = monthField.selectedIndex;
 	var yi = yearField.selectedIndex;
 	var day = dayField.options[di].value;
 	var month = monthField.options[mi].value;
 	var year = yearField.options[yi].value;

	if (month < 0 || month > 11) { // check month range
		monthField.focus();
		alert(formatText(messageInvalidDate, fieldName));
		return false;
	}
	if (day < 1 || day > 31) {
		dayField.focus();
		alert(formatText(messageInvalidDate, fieldName));		
		return false;
	}
	if ((month == 3 || month == 5 || month == 8 || month == 10) && day == 31) {
		dayField.focus();
		alert(formatText(messageInvalidDate, fieldName));		
		return false;
	}
	if (month == 1) { // check for february 29th
		var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
		if (day > 29 || (day == 29 && !isleap)) {
			dayField.focus();
			alert(formatText(messageInvalidDate, fieldName));		
			return false;
		}
	}
	return true;
}

/*
 * Function : Compare two date strings to see which is greater.
 * return false if date is invalid or fromDate is greater than toDate
 */

function compareDates(fromDayField, 
					  fromMonthField, 
					  fromYearField, 
					  toDayField, 
					  toMonthField, 
					  toYearField,
					  fromDateLabel,
					  toDateLabel) {
	var now=new Date();
	var hh=now.getHours();
	var mm=now.getMinutes();
	var ss=now.getSeconds();
	
	var fromDay = fromDayField.options[fromDayField.selectedIndex].value;
 	var fromMonth = fromMonthField.options[fromMonthField.selectedIndex].value;
 	var fromYear = fromYearField.options[fromYearField.selectedIndex].value;
 	
 	var toDay = toDayField.options[toDayField.selectedIndex].value;
 	var toMonth = toMonthField.options[toMonthField.selectedIndex].value;
 	var toYear = toYearField.options[toYearField.selectedIndex].value;
 	
	var newDate1=new Date(fromYear,fromMonth,fromDay,hh,mm,ss);
	var newDate2=new Date(toYear,toMonth,toDay,hh,mm,ss);
	var d1=newDate1.getTime();
	var d2=newDate2.getTime();
	
	if (d1==0) {
	    alert(formatText(messageInvalidDate, fromDateLabel));
		return false;
	} else if (d2==0) {
		alert(formatText(messageInvalidDate, toDateLabel));
		return false;
	} else if (d1 > d2) {
	    alert(formatText(messageMustBeEarlier, fromDateLabel, toDateLabel));	
		return false;
	}
	return true;
}

function checkFieldLength(field, fieldName, len, type, equal) {
	// check the length of account number upon an array that keeps the length of each bank's account number
	var testValue = field.value.length;
	
	if(equal == "equal"){
		if(testValue == len){
			return true;
		} else {
			alert(fieldName + " must be " + len + " " + type + " long.");
			field.focus();
			return false;
		}
	} else {
		if(testValue < len){
			return true;
		} else {
			alert(fieldName + " must not exceed " + len + " " +type + " long.");
			field.focus();
			return false;
		}
	}
}

//allow digit only
var strKeyPressNumber	= new Array(new Array(48,57));
function validIntegerKey(evt){
	var keyValue;
	keyValue = document.all ? evt.keyCode : evt.which ;
	strValidate = "keyValue == 0 || keyValue == 8 || keyValue == 13 || keyValue == 27";
  	
  	for (var i=0; i< eval('strKeyPressNumber').length; i++){
		var checkValue = eval('strKeyPressNumber')[i];
  		strValidate += ' || (keyValue >= ' + checkValue[0] + ' && keyValue <= ' + checkValue[1] + ')' ;
  	}
  
  	if (eval(strValidate)){
  		return true;
  	} else {
  		alert('Please key in valid Integer value');
  	return false;
  }
}
/*
//allow valid decimal value
var strKeyPressDecimal	= new Array(new Array(48,57), new Array(46,46));
function validDecimalKey(obj,evt){
	var keyValue;
	keyValue = document.all ? evt.keyCode : evt.which ;
	strValidate = "keyValue == 0 || keyValue == 8 || keyValue == 13 || keyValue == 27";
	
	for (var i=0; i< eval('strKeyPressDecimal').length; i++){
		var checkValue = eval('strKeyPressDecimal')[i];
	  	strValidate += ' || (keyValue >= ' + checkValue[0] + ' && keyValue <= ' + checkValue[1] + ')' ;
	}
	
	if (eval(strValidate)){
		var tempStr = getValue(obj);
		var len = tempStr.indexOf(".");
		
		if(len != -1){
			if(tempStr.substr(len).length == 3){
				alert("Amount entered only allow in 2 decimal place");
				return false;
			}
		}
		
		return true;
	} else {
	 	alert('Please key in valid decimal value');
	  	return false;
	}
} */

function validDecimalKey(obj, event) {
	var keyValue = getKeyValue(event);
	
	if(validateGeneral(event))
  	{
  		return true;
  	}

	if(isNumericKey(keyValue) || keyValue == 46){
		var ptn = /[^0-9.]/g;
		if (ptn.test(obj.value)) {
			obj.value = obj.value.replace(ptn, "");
		}
		
		idx = obj.value.indexOf(".");
		if (idx >= 0) {
			if (keyValue == 46) {
				return false;
  			}
  			if ((obj.value.length - idx) > 2 && getSelectionStart(obj) > idx) {
  				return false;
  			}
        }
		return true;
  	}
  	else {
    		return false;
  	}
}

/*
 * Validate key stroke - allow decimal with 2 decimal point only
 * @handleEvent oninput
 * @return value which already removed invalid char
 */
function validDecimal(obj){
	obj.value = obj.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^(\d+\.\d{2}).*$/, '$1');
}

function getSelectionStart(input){

	var pos = input.value.length;
	if (input.createTextRange) {
		var r = document.selection.createRange().duplicate();
		r.moveEnd('character', input.value.length);
		if (r.text == '')
			pos = input.value.length;
		pos = input.value.lastIndexOf(r.text);
	} else if(typeof(input.selectionStart)!="undefined") {
		pos = input.selectionStart;
	}

	return pos;
}

function checkMaxLength(value){
	var length = value.length;
	if(length > 599){
		alert('Max length for Message is only 600 chars.');
		return false;
	}
	return true;
}

/**
	Validate function support by IE and Firefox
**/
/*
 * function: allow alphabet and numeric key code
 */
function validAlphaNumericKey(event) {
  var keyValue = getKeyValue(event);

  if(validateGeneral(event))
  {
  	return true;
  }
  
  if (!isAlphaKey(keyValue) && !isNumericKey(keyValue) || keyValue == 32) {
    return false;
  }
  return true;
}

/*
 * function: allow alphabet and numeric key code and underscore
 */
function validAlphaNumericUnderscoreKey(event) {
  var keyValue = getKeyValue(event);

  if(validateGeneral(event))
  {
  	return true;
  }
  
  if (!isAlphaKey(keyValue) && !isNumericKey(keyValue) && !(keyValue == 95) || keyValue == 32) {
    return false;
  }
  return true;
}

/*
 * function: allow alphabet, numeric, space key code
 */
function validAlphaNumericSpaceKey(event) {
  var keyValue = getKeyValue(event);

  if(validateGeneral(event))
  {
  	return true;
  }
  
  if (!isAlphaKey(keyValue) && !isNumericKey(keyValue)) {
    return false;
  }
  return true;
}

/*
 * function: allow only alphabet, space key code
 */
function validAlphaKey(event) {
  var keyValue = getKeyValue(event);


  if(validateGeneral(event))
  {
  	return true;
  }
  
  if (!isAlphaKey(keyValue)) {
    return false;
  }
  return true;
}

/*
 * function: allow numeric keys and + sign
 */
function validPhoneNoKey(event) {
	return event.keyCode == '+'.charCodeAt(0) || validNumericKey(event);
}

/*
 *function: allow only numerics
 */
function validNumericKey(event){
  var keyValue = getKeyValue(event);

  if(validateGeneral(event))
  {
  	return true;
  }
	
	if(!isNumericKey(keyValue)){
		return false;
	}
	return true;
}

/*
 * Validate key stroke - Only allows numbers
 * @handleEvent oninput
 * @return value which already removed invalid char
 */
function validNumeric(obj) {
    obj.value = obj.value.replace(/[^0-9]/g, '');
}

function getKeyValue(event)
{
	return  document.all ? event.keyCode : event.which ;
}

/*
 Function, allow backspace, enterkey in firefox
*/
function validateGeneral(event)
{
	var keyValue = getKeyValue(event);
	if(keyValue == 0 || keyValue == 8 || keyValue == 13 || keyValue == 27)
		return true;
	else
		return false;
}

/*
 * function: allow custom character
 * charArray: new Array("char1", "char2", ..)
 */
function validCustomCharacter(event, charArray){
  var keyValue = getKeyValue(event);

  if(validateGeneral(event))
  {
  	return true;
  }
  
  var isValid = false;
  for ( var i = 0; i < charArray.length; i++ ) {
  	if ( keyValue == charArray[i].charCodeAt(0) ) {
  		isValid = true;
  		break;
  	}
  }  
  return isValid;

}


function validAlphaNumericKeyBackSlash(event){
	var keyValue = getKeyValue(event);
	
	return validAlphaNumericKey(event) || keyValue==47;
	
}

function IsNumeric(sText)

{
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;


   if (sText.length > 0){
	   for (i = 0; i < sText.length && IsNumber == true; i++) 
	      { 
	      Char = sText.charAt(i); 
	      if (ValidChars.indexOf(Char) == -1) 
	         {
	         IsNumber = false;
	         }
	      }
   }
   else {return false;}
   return IsNumber;
   
   }