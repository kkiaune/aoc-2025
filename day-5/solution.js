const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");
input = input.split(/\r?\n/);

const freshIDsRanges = [];
const availableIDs = [];

input.forEach((line) => {
  if (line?.includes("-")) {
    freshIDsRanges.push(line.split("-").map(Number));
  } else if (line) {
    availableIDs.push(+line);
  }
});

const removeOverlappingRanges = () => {
  const sorted = [...freshIDsRanges].sort((a, b) => a[0] - b[0]);
  const result = [];
  let current = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i];

    // skip if next range is inside the current range
    if (next[0] >= current[0] && next[1] <= current[1]) {
      continue;
    }

    // new range begins
    if (next[0] > current[1]) {
      result.push(current);
      current = next;
    } else {
      current[1] = next[1];
    }
  }

  result.push(current);

  return result;
};

const mergedFreshIDsRanges = removeOverlappingRanges();

const firstSolution = () =>
  availableIDs.filter((id) =>
    mergedFreshIDsRanges.some((range) => id >= range[0] && id <= range[1])
  ).length;

console.log("first part result:", firstSolution());

const secondSolution = () =>
  mergedFreshIDsRanges.reduce((acc, range) => acc + range[1] - range[0] + 1, 0);

console.log("second part result:", secondSolution());
