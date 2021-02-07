"use strict";
class SegmentTree {
  constructor() {
    this.data = [];
  }

  add(id, l, r, i) {
    if (i < l || r < i) {
      return;
    }
    if (l === r) {
      this.data[id] = 1;
      return;
    }

    const mid = Math.floor((l + r) / 2);
    this.add(id * 2, l, mid, i);
    this.add(id * 2 + 1, mid + 1, r, i);

    this.data[id] = (this.data[id * 2] || 0) + (this.data[id * 2 + 1] || 0);
  }

  get(id, l, r, u, v) {
    if (v < l || r < u) {
      return 0;
    }
    if (u <= l && r <= v) {
      return this.data[id] || 0;
    }
    const mid = Math.floor((l + r) / 2);
    return (
      this.get(id * 2, l, mid, u, v) + this.get(id * 2 + 1, mid + 1, r, u, v)
    );
  }
}

function minimumBribes(q) {
  const n = q.length;
  let res = 0;

  for (let i = n - 1; i >= 0; i--) {
    if (q[i] - (i + 1) > 2) {
      return "Too chaotic";
    }
  }

  const a = [];
  for (let i = 0; i < n; i++) {
    a[q[i] - 1] = i;
  }

  const s = new SegmentTree();
  for (let i = n - 1; i >= 0; i--) {
    res += s.get(1, 1, n, 1, a[i] + 1);
    s.add(1, 1, n, a[i] + 1);
  }

  return res;
}

console.log(minimumBribes([2, 1, 5, 3, 4]));
