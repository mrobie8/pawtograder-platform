/**
 * Placeholder unit tests for duplicate-student detection in the Scan & Match redesign.
 * The module under test (lib/exam/) does not exist yet; each todo maps to a requirement in the
 * project report and becomes a real test when the module lands.
 */
describe("duplicate detection (F7)", () => {
  it.todo("finds the confirmed scan that already holds the chosen student");
  it.todo("ignores a confirmed match on the scan being edited");
  it.todo("ignores students matched only by a suggestion, not a confirmation");
  it.todo("returns no conflict when the student is unassigned");
});

describe("duplicate reassignment (F8)", () => {
  it.todo("assigns the student to the selected scan and clears the conflicting scan's student");
});

describe("duplicate cancel (F9)", () => {
  it.todo("leaves both scans' assignments unchanged");
});

describe("roster search filter (F5)", () => {
  it.todo("matches students by name, ignoring case");
  it.todo("matches students by student ID");
  it.todo("returns nothing for text that matches no student");
});
