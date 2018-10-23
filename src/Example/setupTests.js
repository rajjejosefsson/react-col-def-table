import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, render, mount } from "enzyme";

// to be able to use new built-ins like Promise or WeakMap
// @see more https://babeljs.io/docs/en/babel-polyfill#docsNav
import "@babel/polyfill";

Enzyme.configure({ adapter: new Adapter() });

// Make functions available in all test files without importing
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
