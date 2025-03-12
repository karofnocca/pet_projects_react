"use strict";

class TreeNode {
  #value;
  constructor(value) {
    this.#value = value;
    this.left = null;
    this.right = null;
  }

  traverse() {}

  addChild(childNode) {
    if (!(childNode instanceof TreeNode)) {
      throw "Ошибка: сюда можно только TreeNode";
    }

    if (childNode.value === this.value) {
      throw "Ошибка: значения совпадают";
    }

    if (this.left && this.right) {
      throw "Ошибка: у этой ноды уже есть 2 ребенка";
    }

    if (childNode.value < this.value) {
      this.left = childNode;
    } else {
      this.right = childNode;
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

    this.value = newValue;
  }

  removeNode(node) {
    const remove = (node, value) => {
      if (!node) return null;
    };
    if (value < node.value) {
      node.left = remove(node.value, value);
      return node;
    } else if (this.value > node.value) {
      node.right = remove(node.value, value);
      return node;
    } else {
      if (!node.left && !node.right) {
        return null;
      }
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      if (node.right && node.left) {
        let newNodeValue = node.right;
        node.right = remove(node.right, newNodeValue);
        return node;
      }
    }
  }
}

const rootNode = new TreeNode(8);

const child = new TreeNode(9);

const child2 = new TreeNode(11);

rootNode.addChild(child);

console.log(rootNode);

rootNode.value = "asdalskjd";

console.log(rootNode);
