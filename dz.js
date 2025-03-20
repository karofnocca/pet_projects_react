"use strict";

class TreeNode {
  #value;

  constructor(value) {
    this.#value = value;
    this.left = null;
    this.right = null;
  }

  addChild(childNode) {
    if (!(childNode instanceof TreeNode)) {
      throw "Ошибка: сюда можно только TreeNode";
    }

    if (childNode.value == this.value) {
      throw "Ошибка: значения совпадают";
    }

    if (this.left && this.right) {
      throw `Ошибка: у этой ноды (${this.value}) уже есть 2 ребенка`;
    }

    if (childNode.value < this.value) {
      if (this.left) {
        throw `У этой ноды (${this.value}) уже есть ребенок слева (${this.left.value})`;
      } else {
        this.left = childNode;
      }
    } else {
      if (this.right) {
        throw `У этой ноды (${this.value}) уже есть ребенок справа (${this.right.value})`;
      } else {
        this.right = childNode;
      }
    }
  }

  get value() {
    return this.#value;
  }

  set value(newValue) {
    if (typeof newValue !== "number") {
      throw `Сюда можно только числа`;
    }

    const isRightExists = !!this.right;

    const isLeftExists = !!this.left;

    if (isLeftExists && isRightExists) {
      if (newValue > this.left.value && newValue < this.right.value) {
        this.#value = newValue;
      } else {
        throw `Число должно быть в диапазоне от ${this.left.value} до ${this.right.value} (отче назес)`;
      }
    }

    if (isLeftExists && !isRightExists) {
      if (newValue > this.left.value) {
        this.#value = newValue;
      } else {
        throw `Число должно быть больше чем ${this.left.value} (отче назес)`;
      }
    }

    if (!isLeftExists && isRightExists) {
      if (newValue < this.right.value) {
        this.#value = newValue;
      } else {
        throw `Число должно быть меньше чем ${this.right.value} (отче назес)`;
      }
    }

    this.#value = newValue;
  }
}

class BinaryTree {
  constructor(root) {
    this.rootNode = root;
  }

  traverse(node = this.rootNode, sumFunc) {
    if (!node) return;

    if (sumFunc) sumFunc(node.value);

    if (node.left) {
      this.traverse(node.left, sumFunc);
    }

    if (node.right) {
      this.traverse(node.right, sumFunc);
    }
  }

  getSum() {
    let sum = 0;
    this.traverse(this.rootNode, (value) => {
      sum += value;
    });
    return sum;
  }

  // node - TreeNode
  add(node, currentNode = this.rootNode) {
    if (!(node instanceof TreeNode)) {
      throw "Ошибка: сюда можно только TreeNode";
    }

    try {
      currentNode.addChild(node);
    } catch {
      if (node.value < currentNode.value) {
        this.add(node, currentNode.left);
      } else {
        this.add(node, currentNode.right);
      }
    }
  }

  // child - TreeNode или числом

  // removeNode(node) {  ТУТ я пытался сделать не каскадное удаление, а с заменой, но че то пошло не так
  //   const remove = (node, value) => {
  //     if (!node) return null;
  //   };
  //   if (value < node.value) {
  //     node.left = remove(node.value, value);
  //     return node;
  //   } else if (this.value > node.value) {
  //     node.right = remove(node.value, value);
  //     return node;
  //   } else {
  //     if (!node.left && !node.right) {
  //       return null;
  //     }

  //     if (!node.left) return node.right;
  //     if (!node.right) return node.left;

  //     let newNodeValue = node.right;
  //     node.right = remove(node.right, newNodeValue);
  //     return node;
  //     }
  //   }

  removeChild(value) {
    //каскадное удаление
    const remove = (node, value) => {
      if (!node) return null;
      if (node.value === value) {
        if (node.left) {
          node.left = remove(node.left, node.left.value);
        }
        if (node.right) {
          node.right = remove(node.right, node.right.value);
        }
        return null;
      }
      if (value < node.value) {
        node.left = remove(node.left, value);
        return node;
      }
      if (value > node.value) {
        node.right = remove(node.right, value);
        return node;
      }
    };
    this.rootNode = remove(this.rootNode, value);
  }
}

// replace(initValue, newValue) {}

//treeData number[]
const createTree = (rootNode, treeData) => {
  const tree = new BinaryTree(rootNode);

  treeData.forEach((number) => {
    const node = new TreeNode(number);

    tree.add(node);
  });

  return tree;
};

const rootNode = new TreeNode(8);

const tree = createTree(rootNode, [4, 12, 2, 5, 3, 7, 9, 10, 14]);

console.log(tree);

// ДОМАШНЕЕ ЗАДАНИЕ:
// написать remove (каскадный) и реплейс и getSum
// *********: ПОДУМАТЬ КАК ИСПОЛЬЗОВАТЬ traverse() внутри метода add() и возможно внутри remove и replace
const sum = tree.getSum();
const remove = tree.removeChild(12);
// console.log(sum);
