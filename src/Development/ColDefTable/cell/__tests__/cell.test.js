import { Cell } from "../cell";

describe("Cell Render", () => {
  test("Should render with class c-table--td", () => {
    const CellComponent = mount(<Cell>Test</Cell>);
    expect(CellComponent.exists(".c-table--td")).toEqual(true);
  });
});
