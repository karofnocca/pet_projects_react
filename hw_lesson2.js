"use strict";

// alg #1
var num = [13, 345, 1, 234, 23, 2, 3, 6, 5, 4567, 32, 45, 5, 43, 10];
var target = 5;

function finalSum(num, target) {
  for (var i = 0; i < num.length; i++) {
    for (var j = i + 1; j < num.length; j++) {
      if (num[i] + num[j] === target) {
        return [num[i], num[j]];
      }
    }
  }
  return null;
}

console.log(finalSum(num, target));

//alg #2 if we need find count of any letter

var row = ["Hello Michael, chek my hw pls"];
var letter = "h";

function countH(row) {
  if (
    typeof row[0] !== "string" ||
    row[0].trim() === "" ||
    !Array.isArray(row) ||
    row.length === 0
  ) {
    return "Некорректный ввод";
  }
  var count = 0;
  for (var i = 0; i < row[0].length; i++) {
    if (row[0][i].toLowerCase() === letter) {
      count++;
    }
  }
  return count;
}

console.log(countH(row));

// alg #3

var arr = [1, 2, 3, 5, 6, 7, 8];

function getArrayLength(arr) {
  var count = 0;
  while (count < arr.length) {
    count++;
  }
  return count;
}
console.log(getArrayLength(arr));

//alg #4

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
  let palindromes = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i] === words[i].split("").reverse().join("")) {
      palindromes.push(words[i]);
    }
  }
  return palindromes;
}
