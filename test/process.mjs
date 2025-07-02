export const process = (store, order) => {
  const storeMap = new Map();
  const originalQuantities = new Map();
  for (const { size, quantity } of store) {
    storeMap.set(size, quantity);
    originalQuantities.set(size, quantity);
  }

  const assignment = [];
  let mismatches = 0;

  for (const user of order) {
    const { id, size } = user;
    let assignedSize = null;

    if (size.length === 1) {
      const s = size[0];
      const qty = storeMap.get(s) || 0;
      if (qty > 0) {
        assignedSize = s;
        storeMap.set(s, qty - 1);
      }
    } else {
      const [s1, s2] = size;
      const masterSize = user.masterSize;

      const preferred = masterSize === "s1" ? s1 : s2;
      const fallback = masterSize === "s1" ? s2 : s1;

      if ((storeMap.get(preferred) || 0) > 0) {
        assignedSize = preferred;
        storeMap.set(preferred, storeMap.get(preferred) - 1);
      } else if ((storeMap.get(fallback) || 0) > 0) {
        assignedSize = fallback;
        storeMap.set(fallback, storeMap.get(fallback) - 1);
        mismatches++;
      }
    }

    if (assignedSize === null) {
      return false;
    }

    assignment.push({ id, size: assignedSize });
  }

  const stats = [];
  for (const [size, originalQty] of originalQuantities.entries()) {
    const remaining = storeMap.get(size);
    const used = originalQty - remaining;
    if (used > 0) {
      stats.push({ size, quantity: used });
    }
  }

  stats.sort((a, b) => a.size - b.size);
  assignment.sort((a, b) => a.id - b.id);

  return {
    stats,
    assignment,
    mismatches,
  };
};
