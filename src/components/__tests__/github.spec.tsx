import React from "react";
import { shallow } from "enzyme";
import GitHub from "../github";

test("gtihub", () => {
  const wrapper = shallow(<GitHub />);
  expect(wrapper).toMatchSnapshot();
});
