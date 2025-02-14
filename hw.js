"use strict";

//alg1

var num = [10, 12, 22, 28, 29, 30, 40];
var target = 54;
var maxValue = Infinity;
var resultNumbers = [];

function finalSum(num, target) {
  var startIndex = 0;
  var finishIndex = num.length - 1;
  while (startIndex < finishIndex) {
    var sumOfnumbers = num[startIndex] + num[finishIndex];
    if (Math.abs(target - sumOfnumbers) < Math.abs(target - maxValue)) {
      maxValue = sumOfnumbers;
      resultNumbers = [num[startIndex], num[finishIndex]];
    }
    if (sumOfnumbers < target) {
      startIndex++;
    } else {
      finishIndex--;
    }
  }
  return resultNumbers;
}

console.log(finalSum(num, target));

//alg2 (matrix)

let compititions = [
  ["HTML", "C#"],
  ["C#", "Python"],
  ["Python", "HTML"],
];
let result = [0, 0, 1];

function findWinTeam(compititions, result) {
  let scoreOfTeam = {};
  let maxScore = 0;
  let winTeam = "";
  for (let i = 0; i < compititions.length; i++) {
    let homeTeam = compititions[i][0];
    let guestTeam = compititions[i][1];
    let winningTeam;
    if (result[i] === 1) {
      winningTeam = homeTeam;
    } else {
      winningTeam = guestTeam;
    }
    if (scoreOfTeam[winningTeam] !== undefined) {
      scoreOfTeam[winningTeam] += 3;
    } else {
      scoreOfTeam[winningTeam] = 0;
    }
    if (scoreOfTeam[winningTeam] > maxScore) {
      maxScore = scoreOfTeam[winningTeam];
      winTeam = winningTeam;
    }
  }
  return winTeam;
}

console.log(findWinTeam(compititions, result));
