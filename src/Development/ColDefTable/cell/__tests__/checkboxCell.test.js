import { CheckboxCell } from "../checkboxCell";

describe("CheckboxCell", () => {
  test("Should render header with checkbox", () => {
    const props = {
      isHeader: true,
      checkboxKey: "1"
    };

    const wrapper = mount(<CheckboxCell {...props}>Test</CheckboxCell>);

    expect(wrapper.find(".c-table--th")).toHaveLength(1);
    expect(wrapper.find("input[type='checkbox']")).toHaveLength(1);
  });

  test("Should render td with checkbox", () => {
    const props = {
      isHeader: false,
      checkboxKey: "1"
    };

    const wrapper = mount(<CheckboxCell {...props}>Test</CheckboxCell>);

    expect(wrapper.find(".c-table--td")).toHaveLength(1);
    expect(wrapper.find("input[type='checkbox']")).toHaveLength(1);
  });
});
