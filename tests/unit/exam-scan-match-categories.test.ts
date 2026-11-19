/**
 * Placeholder unit tests for the Scan & Match redesign's categorization and progress logic.
 * The module under test (lib/exam/) does not exist yet; each todo maps to a requirement in the
 * project report and becomes a real test when the module lands.
 */
describe("review categories (I1)", () => {
  it.todo("puts a scan with no suggested or confirmed student in Needs Attention");
  it.todo("puts a scan with a high-confidence suggested match in Confident");
  it.todo("puts a scan with a low-confidence suggested match in Needs Attention");
  it.todo("puts a confirmed scan in Validated");
  it.todo("puts a skipped (flagged) scan in Flagged");
});

describe("review progress (I7, I3)", () => {
  it.todo("counts Validated and Flagged scans as reviewed out of the batch total");
  it.todo("reports 0 of N for a freshly processed batch");
  it.todo("reports 0 of 0 for an empty batch without dividing by zero");
});

describe("match confidence (D4)", () => {
  it.todo("returns the stored confidence value unchanged");
  it.todo("reports no confidence when the scan has none");
});

describe("finalization eligibility (F10, F14)", () => {
  it.todo("includes Validated scans in the set of submissions to create");
  it.todo("excludes Flagged scans from the set of submissions to create");
});
