"use strict";
class SegmentTree {
  constructor() {
    this.data = [];
  }

  down(id) {
    if (!this.data[id]) {
      this.data[id] = { value: 0, lazy: 0 };
    }
    if (!this.data[id * 2]) {
      this.data[id * 2] = { value: 0, lazy: 0 };
    }
    if (!this.data[id * 2 + 1]) {
      this.data[id * 2 + 1] = { value: 0, lazy: 0 };
    }
    const t = this.data[id].lazy;
    this.data[id * 2].lazy += t;
    this.data[id * 2].value += t;

    this.data[id * 2 + 1].lazy += t;
    this.data[id * 2 + 1].value += t;

    this.data[id].lazy = 0;
  }

  update(id, l, r, u, v, value) {
    if (v < l || u > r) {
      return;
    }
    if (u <= l && r <= v) {
      if (!this.data[id]) {
        this.data[id] = { value: 0, lazy: 0 };
      }
      this.data[id].value += value;
      this.data[id].lazy += value;
      return;
    }

    this.down(id);

    const mid = Math.floor((l + r) / 2);
    this.update(id * 2, l, mid, u, v, value);
    this.update(id * 2 + 1, mid + 1, r, u, v, value);

    if (!this.data[id]) {
      this.data[id] = { value: 0, lazy: 0 };
    }
    if (!this.data[id * 2]) {
      this.data[id * 2] = { value: 0, lazy: 0 };
    }
    if (!this.data[id * 2 + 1]) {
      this.data[id * 2 + 1] = { value: 0, lazy: 0 };
    }

    this.data[id].value = Math.max(
      this.data[id * 2].value,
      this.data[id * 2 + 1].value
    );
  }

  get(id, l, r, u, v) {
    if (v < l || r < u) {
      return 0;
    }
    if (u <= l && r <= v) {
      if (!this.data[id]) {
        this.data[id] = { value: 0, lazy: 0 };
      }
      return this.data[id].value;
    }
    this.down(id);

    const mid = Math.floor((l + r) / 2);
    return Math.max(
      this.get(id * 2, l, mid, u, v),
      this.get(id * 2 + 1, mid + 1, r, u, v)
    );
  }
}

function arrayManipulation(n, queries) {
  const s = new SegmentTree();
  for (let i = 0; i < queries.length; i++) {
    const [l, r, value] = queries[i];
    s.update(1, 1, n, l, r, value);
  }

  return s.get(1, 1, n, 1, n);
}

console.log(
  arrayManipulation(5, [
    [1, 2, 100],
    [2, 5, 100],
    [3, 4, 100],
  ])
);
