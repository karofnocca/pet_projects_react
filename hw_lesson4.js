"use strict";

//#1
const arr1 = [5, 1, 22, 25, 6, -1, 8, 10];
const arr2 = [1, 6, -1, 10];

function findSequence(arr1, arr2) {
  let arr1Index = 0;
  let arr2Index = 0;
  while (arr1Index < arr1.length && arr2Index < arr2.length) {
    if (arr1[arr1Index] === arr2[arr2Index]) {
      arr2Index++;
    }
    arr1Index++;
  }
  return arr2Index === arr2.length;
}

console.log(findSequence(arr1, arr2));

//#2

("use strict");

let arr = [-4, -2, 1, 3];

function sortedSquares(arr) {
  const emptyArr = new Array(arr.length);
  let startIndx = 0;
  let IndexForEmptyArray = arr.length - 1;
  let finishIndx = arr.length - 1;
  while (startIndx <= finishIndx) {
    const leftSquare = arr[startIndx] ** 2;
    const rightSquare = arr[finishIndx] ** 2;
    if (leftSquare > rightSquare) {
      emptyArr[IndexForEmptyArray] = leftSquare;
      startIndx++;
    } else {
      emptyArr[IndexForEmptyArray] = rightSquare;
      finishIndx--;
    }
    IndexForEmptyArray--;
  }
  return emptyArr;
}

console.log(sortedSquares(arr));
