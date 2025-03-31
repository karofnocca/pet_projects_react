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

  traverse(node = this.rootNode) {
    if (node.left) {
      this.traverse(node.left);
    }

    if (node.right) {
      this.traverse(node.right);
    }
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
  removeChild(child) {}

  getSum(callback) {}

  replace(initValue, newValue) {
    const replaceValue = (node) => {
      if (!node) return;
      if (node.value === initValue) {
        node.value = newValue;
      }
      if (initValue > node.value) {
        replaceValue(node.right);
      } else {
        replaceValue(node.left);
      }
    };

    replaceValue(this.rootNode);
  }
}

//treeData number[]
const createTree = (rootNode, treeData) => {
  const tree = new BinaryTree(rootNode);

  treeData.forEach((number) => {
    const node = new TreeNode(number);

    tree.add(node);
  });

  return tree;
};

///////////////////////// ТУТ ВИЗУАЛИЗАЦИЯ:

const ROOT_ELEMENT = document.getElementById("root");

class TreeNodeVisualizer {
  // node - либо нода либо null (для того чтобы рисовать пустые кружки)
  constructor(node) {
    this.node = node;
  }

  append(layerElement) {
    const nodeElement = document.createElement("div");

    if (this.node === null) {
      nodeElement.className = "emptyNode";
    } else {
      nodeElement.className = "node";
      nodeElement.innerText = this.node.value;
    }

    layerElement.appendChild(nodeElement);
  }
}

class TreeVisualizer {
  constructor(binaryTree) {
    if (!(binaryTree instanceof BinaryTree)) {
      return;
    }

    const treeElement = document.createElement("div");
    treeElement.className = "tree";
    this.element = treeElement;

    ROOT_ELEMENT.appendChild(treeElement);

    this.tree = binaryTree;
    this.layers = [];
  }

  // ДОМАШНЕЕ ЗАДАНИЕ: переделать формирование массива nextLayerNodes на reduce
  init(currentLayerNodes = [this.tree.rootNode]) {
    this.createLayer(currentLayerNodes);

    const nextLayerNodes = [];

    let onlyNullNodes = true;

    currentLayerNodes.forEach((node) => {
      if (node !== null) {
        const { left, right } = node;

        if (left || right) {
          onlyNullNodes = false;
        }

        nextLayerNodes.push(left);
        nextLayerNodes.push(right);
      }
    });

    if (!nextLayerNodes.length || onlyNullNodes) {
      return;
    }

    this.init(nextLayerNodes);
  }

  // nodes - массив TreeNode | null
  createLayer(nodes) {
    const layerElement = document.createElement("div");

    layerElement.className = "layer";

    nodes.forEach((node) => {
      const nodeVisualizer = new TreeNodeVisualizer(node);

      nodeVisualizer.append(layerElement);
    });

    this.element.appendChild(layerElement);

    this.layers.push(layerElement);

    return layerElement;
  }

  // ДОМАШНЕЕ ЗАДАНИЕ: сделать так чтобы гэпы в леерах были нормальныe
  updateLayersGap() {
    const deepness = this.layers.length;

    this.layers.forEach((layer, index) => {
      if (index === 1) layer.style = "gap: 360px";
      if (index === 2) layer.style = "gap: 180px";
      if (index === 3) layer.style = "gap: 80px";
      if (index === 4) layer.style = "gap: 45px";
      if (index === 5) layer.style = "gap: 30px";
    });
  }
}

class InputComponent {
  constructor({ parent, label }) {
    this.parent = parent;
    this.label = label;
  }

  init() {
    const inputContainer = document.createElement("div");
    const inputEl = document.createElement("input");
    const fieldsetEl = document.createElement("fieldset");
    const legendEl = document.createElement("legend");

    inputContainer.className = "inputContainer";

    fieldsetEl.className = "fieldset";

    inputEl.type = "number";

    inputEl.inputMode = "numeric";

    inputContainer.appendChild(inputEl);
    inputContainer.appendChild(fieldsetEl);
    fieldsetEl.appendChild(legendEl);

    this.parent.appendChild(inputContainer);
  }
}

class TreeValueChangeForm {
  constructor(tree) {
    if (!(tree instanceof BinaryTree)) {
      throw "Это не дерево";
    }
    this.tree = tree;
  }

  // форма спавнится на экране
  init() {
    const formEl = document.createElement("form");

    formEl.className = "changeValueForm";

    const prevValueInput = new InputComponent({
      parent: formEl,
      label: "Старое значение",
    });
    prevValueInput.init();

    // const newValueInput = new InputComponent({
    //   parent: formEl,
    //   label: "Новое значение",
    // });
    // newValueInput.init();

    ROOT_ELEMENT.appendChild(formEl);
  }

  onSubmit() {}
}

const rootNode = new TreeNode(8);

const tree = createTree(
  rootNode,
  [4, 12, 2, 5, 3, 7, 9, 10, 14, 16, 8, 1, 20, 15, 23, 19]
);

const visualizedTree = new TreeVisualizer(tree);

const visualizedNode = new TreeNodeVisualizer(rootNode);

visualizedTree.init();

visualizedTree.updateLayersGap();

const treeForm = new TreeValueChangeForm(tree);

treeForm.init();

// visualizedNode.append(layer);
