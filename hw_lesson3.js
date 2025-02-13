"use strict";

//alg1

var num = [10, 12, 22, 28, 29, 30, 40];
var target = 54;
var maxValue = Infinity;
var resultPair = [];

function finalSum(num, target) {
  for (var i = 0; i < num.length; i++) {
    for (var j = i + 1; j < num.length; j++) {
      var sum = num[i] + num[j];
      if (Math.abs(target - sum) < Math.abs(target - maxValue)) {
        maxValue = sum;
        resultPair = [num[i], num[j]];
      }
    }
  }
  return resultPair;
}

console.log(finalSum(num, target));

//alg2

var s = "swiss";
var letterCount = {};

function notRepeat(s) {
  for (var i = 0; i < s.length; i++) {
    var letter = s[i];
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }
  console.log(letterCount);
  for (var i = 0; i < s.length; i++) {
    if (letterCount[s[i]] === 1) {
      console.log(s[i]);
    }
  }
}
notRepeat(s);

//alg 3

// in development

//alg 4 (palindroms)

var words = [
  "vvn",
  "isjjsi",
  "iytaare",
  "wxys",
  "vbbv",
  "xumamux",
  "zyqor",
  "bthhtb",
  "rcxrxcr",
  "mpun",
];
function gerPalindromes(words) {
  var palindromes = [];
  for (var i = 0; i < words.length; i++) {
    if (words[i] === words[i].split("").reverse().join("")) {
      palindromes.push(words[i]);
    }
  }
  return palindromes;
}

console.log(gerPalindromes(words));
