 "use strict";

/* Formatting Tools Library - String Formatting Functions in JavaScript */
/* Copyright Dan Mazzola and ABOR                                       */

/*
 * leftPadString("99,999", '+', 12) returns "++++++99,999"
 */
function leftPadString(string, padChar, length) {
	var resultString = string;
	if (padChar.length != 1) { 
		alert("call to LeftPadString() with bad value for padChar,"
			+ " can lead to infinite loop");
	}
	while (resultString.length < length) {
		resultString = padChar + resultString;
	}
	return resultString;
}

/*
 * formatNumberWithCommas(num) - returns a string with comma's 
 *                               every 3 spaces, decimals dropped
 *
 *   formatNumberWithCommas(999999.99) returns "1,000,000"
 *   formatNumberWithCommas(999999.01) returns "999,999"
 */
function formatNumberWithCommas(num) {
	var resultString = "";
	var numString  	 = num.toFixed(0);
	var commaArray 	 = [];
	var revArray	 = numString.split("").reverse();
	var i = 1;

	while (revArray.length > 0) {
		commaArray = commaArray.concat(revArray.shift())
		if (i%3 === 0 && revArray.length !== 0) { 
			commaArray = commaArray.concat([","]);
		}
		i=i+1;
	}
	resultString = commaArray.reverse().join('');
	return resultString;
}

/* formatNumberWithCommas tutorial - paste "> "lines to javascript console
	> var commaArray=[];
	> revArray="123456789".split("").reverse()
	< ["9", "8", "7", "6", "5", "4", "3", "2", "1"]
	> commaArray = commaArray.concat(revArray.shift());
	< ["9"]
	> revArray
	< ["8", "7", "6", "5", "4", "3", "2", "1"]
	> commaArray = commaArray.concat(revArray.shift());
	< ["9", "8"]
	> revArray
	< ["7", "6", "5", "4", "3", "2", "1"]
	> commaArray = commaArray.concat(revArray.shift());
	< ["9", "8", "7"]
	> revArray
	< ["6", "5", "4", "3", "2", "1"]
	> commaArray = commaArray.concat([","]) 
	< ["9", "8", "7", ","]
	> commaArray = commaArray.concat(revArray.shift());
	< ["9", "8", "7", ",", "6"]
	> commaArray = commaArray.concat(revArray.shift());
	< ["9", "8", "7", ",", "6", "5"]
	> commaArray = commaArray.concat(revArray.shift());
	< ["9", "8", "7", ",", "6", "5", "4"]
	> commaArray = commaArray.concat([","]) 
	< ["9", "8", "7", ",", "6", "5", "4", ","]
	> commaArray = commaArray.concat(revArray.shift());
	< ["9", "8", "7", ",", "6", "5", "4", ",", "3"]
	> commaArray = commaArray.concat(revArray.shift());
	< ["9", "8", "7", ",", "6", "5", "4", ",", "3", "2"]
	> commaArray = commaArray.concat(revArray.shift());
	< ["9", "8", "7", ",", "6", "5", "4", ",", "3", "2", "1"]
	> commaArray.reverse();
	< ["1", "2", "3", ",", "4", "5", "6", ",", "7", "8", "9"]
	> commaArray.reverse().join('');
	< "987,654,321"
*/
