### 8.2 The DOM Diff Algorithm Explained

The DOM Diff algorithm is the core technique React uses to efficiently compare the previous and current Virtual DOM trees. Its main job is to find the differences between the old and new Virtual DOM trees and apply them to the real DOM with minimal changes. Below is a detailed breakdown of the DOM Diff algorithm.

---

## 8.2.1 Core Ideas of the Diff Algorithm

### Core Goal

The core goal of the Diff algorithm is to compute the differences between the old and new Virtual DOM trees as efficiently as possible, applying only the necessary updates to the real DOM. It achieves this through the following steps:

1. **Compare the root node**: The algorithm first compares the root node of the Virtual DOM trees. If the root node types differ, the entire subtree is re-rendered.

2. **Compare level by level**: If the root nodes are the same, the algorithm compares each node level by level, checking for differences in attributes and children.

3. **Minimize updates**: Based on the comparison results, it generates the smallest possible set of DOM update operations and applies them to the real DOM.

---

## 8.2.2 Algorithm Steps

### 1. Comparing Node Types

- **Different root node types**: If the root nodes of the two Virtual DOM trees have different types, React destroys the old subtree and replaces it with the new one. This means the entire component is re-rendered.

- **Same root node types**: If the root nodes have the same type, the algorithm continues comparing nodes level by level.

### 2. Comparing Node Attributes

- **Attribute updates**: If a node's attributes have changed, React updates the attributes on the real DOM node.

- **Attribute removal**: If an attribute is removed, React removes it from the real DOM.

### 3. Comparing Child Nodes

- **Ordering child nodes**: React uses a node's `key` attribute to handle the ordering of child nodes. The `key` is React's unique identifier for recognizing list items.

- **Moving child nodes**: If the order of nodes changes, the algorithm uses the `key` attribute to handle node moves accurately, avoiding unnecessary re-renders.

### 4. Generating and Applying Patches

- **Generate patches**: The algorithm generates a series of patches (that is, DOM update operations), including inserting, deleting, and updating nodes.

- **Apply patches**: These patches are applied to the real DOM, keeping DOM updates minimal and improving performance.

---

## 8.2.3 Optimization Strategies

### 1. A Node's `key` Attribute

- **Unique identification**: The `key` attribute is a unique identifier for a node. It helps React distinguish between different nodes and optimizes the node update process.

- **List optimization**: When handling lists, using `key` attributes greatly reduces recreating and reordering nodes.

### 2. Reusing Nodes of the Same Type

- **Node reuse**: When two nodes have the same type, React reuses the node and only updates its attributes and children, rather than recreating it entirely.

### 3. Comparing the Tree Level by Level

- **Level-by-level comparison**: The algorithm compares the old and new Virtual DOM trees level by level (React assumes DOM nodes rarely move across levels, so it only compares nodes within the same level, reducing complexity from O(n³) to O(n)), ensuring each level's nodes are compared accurately and cutting out unnecessary DOM operations.

---

## 8.2.4 A Practical Example

### Example: Updating Nodes

Suppose we have a component whose Virtual DOM and real DOM look like this:

```javascript
// The old Virtual DOM
const oldVDOM = {
  type: 'div',
  props: { className: 'container' },
  children: [
    {
      type: 'h1',
      props: {},
      children: ['Hello, world!']
    },
    {
      type: 'p',
      props: {},
      children: ['This is a paragraph.']
    }
  ]
};

// The new Virtual DOM
const newVDOM = {
  type: 'div',
  props: { className: 'container updated' },
  children: [
    {
      type: 'h1',
      props: {},
      children: ['Hello, React!']
    },
    {
      type: 'p',
      props: { style: { color: 'blue' } },
      children: ['This is an updated paragraph.']
    }
  ]
};
```

### The Diff Process

1. **Compare the root node**: The root node's `type` is the same, so continue comparing attributes and children.

2. **Attribute update**: The `className` attribute is updated from `container` to `container updated`.

3. **Compare children**: The `h1` tag's content is updated to `Hello, React!`, and the `p` tag's content and attributes are updated.

### Generating Patches

```javascript
const patch = [
  { type: 'UPDATE_ATTR', target: 'div', attrs: { className: 'container updated' } },
  { type: 'UPDATE_TEXT', target: 'h1', text: 'Hello, React!' },
  { type: 'UPDATE_ATTR', target: 'p', attrs: { style: { color: 'blue' } } },
  { type: 'UPDATE_TEXT', target: 'p', text: 'This is an updated paragraph.' }
];
```

### Applying Patches

```javascript
// Update the real DOM (corresponds to the patch structure generated above)
function applyUpdates(patch) {
  patch.forEach(operation => {
    const target = document.querySelector(operation.target);
    switch (operation.type) {
      case 'UPDATE_ATTR':
        Object.entries(operation.attrs).forEach(([attr, value]) => {
          target.setAttribute(attr, value);
        });
        break;
      case 'UPDATE_TEXT':
        target.textContent = operation.text;
        break;
    }
  });
}
```

---

The implementation of the Diff algorithm explains how React compares trees and commits UI updates, and it provides clues for performance investigation.

## References

- [React repository](https://github.com/react/react)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [knowledge](/knowledge.md))
