<h1 align="center">
  React Col Def Table
</h1>

<p align="center">
  <img height="50px" src="https://ubisafe.org/images/transparent-emoji-thumbs-up-2.png" />
</p>
<p align="center" style="font-size: 1.2rem;">This is built upon <a href="https://github.com/bvaughn/react-virtualized" target="_blank">React Virtualized, created by bvaughn</a></p>

<p align="center">
  <img src="https://img.shields.io/badge/🦄-Just Works-cc00cc.svg"/> <img src="https://img.shields.io/badge/💎-Modern-44aadd.svg"/> <img src="https://img.shields.io/badge/🦋-Extremely Lightweight-7799cc.svg"/> <img src="https://img.shields.io/badge/🔥-Blazing%20Fast-red.svg"/>
</p>

<p align="center">
 Demo @ <a href="https://codesandbox.io/s/7jmv0p63w6" target="_blank">Codesandbox</a>
</p>

<hr />

## How to use

```js
import { Table } from "react-col-def-table";
import { colDef, data } from "./somewhere";

const App = () => <Table colDef={colDef} list={data} />;
```

---

## Step by step

With this data below we want to have a table with _id_, _name_ and _age_.

**Data:**

```js
[
  {
    id: "1",
    name: "Steve",
    age: "29"
  },
  {
    id: "2",
    name: "Roger",
    age: "33"
  },
  {
    id: "3",
    name: "Sarah",
    age: "27"
  }
];
```

For this to work we will have to create a _column definition_.

**Column Definition** defines how we want to map the respective values from the data:

```json
const columnDefinition = [
  {
    key: "id",
    label: "Id",
    size: 50
  },
  {
    key: "name",
    label: "User Name",
    size: 150
  },
  {
    key: "age",
    label: "User Age",
    size: 50
  }
];
```

As we can see from above it has three important characteristics: _key_, _size_ and _label_.

| key       | Description                                                     | required? |
| --------- | --------------------------------------------------------------- | --------- |
| `key`     | What key we want to map with from the data.                     | YES       |
| `size`    | the size of the column                                          | YES       |
| label     | The label in the header that will be shown for the mapped value | NO        |
| checkbox  | if we want to render checkboxes for a column                    | NO        |
| component | to render a custom component with the data                      | NO        |

**Checkbox column and a custom component:**

```js
export const customColDef = [
  {
    key: "checkbox",
    size: 50
  },
  {
    label: "Hotel",
    key: "hotel",
    size: 250,
    component: ({ rowData }) => {
      return <a href={rowData.link}>{rowData.hotel}</a>;
    }
  }
];
```

## Props

| key                | Description                                                      | default             |
| ------------------ | ---------------------------------------------------------------- | ------------------- |
| `list`             | Your data.                                                       |                     |
| `colDef`           | Defines how to map the values into the grid                      |                     |
| `fixedRowCount`    | number                                                           |                     |
| `fixedColumnCount` | number                                                           |                     |
| `fixedHeight`      | number                                                           |                     |
| `fixedWidth`       | number                                                           |                     |
| `rowHeight`        | number                                                           |                     |
| `headerHeight`     | number                                                           |                     |
| `isBoxShadow`      | boolean,                                                         | true                |
| `hoverOnX`         | boolean                                                          | false               |
| `hoverOnY`         | boolean                                                          | false               |
| `isZebra`          | boolean                                                          | false               |
| `isSortOn`         | boolean                                                          | false               |
| `isEditable`       | boolean                                                          | false               |
| `onCellChange`     | function callback with changed cell (only when using isEditable) |                     |
| `onLabelClick`     | function callback with clicked label info                        |                     |
| `footer`           | function                                                         | example: lib/footer |

## CSS Classes

| key                               | Description                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Table                             | has to be set on style prop                                                                                         |
| Row                               | `.table--row-even` `.table--row-odd`                                                                                |
| th                                | `.c-table--th`                                                                                                      |
| td                                | `.c-table--td`                                                                                                      |
| th when sorting (when active)     | `.c-table--th-sort` `.c-table--th-sort-active`                                                                      |
| sort icon button (when active)    | `.c-sort-button` `.c-sort-button--active`                                                                           |
| hover cell (when active)          | `.c-table--td-hover-cell`                                                                                           |
| Fixed rows styles (when active)   | `.c-table--top-left-grid` `.c-table--top-right-grid` `.c-table--bottom-left-grid` `.c-table--bottom-right-grid`     |
| editable cell input (when active) | `.c-editable-cell--input`                                                                                           |
| sub header (when active)          | `.c-table--sub-header` `.c-table--sub-header-title`                                                                 |
| Checkbox (when active)            | `.c-checkbox-cell` `.c-checkbox-cell--input` `id="c-checkbox-label-checkboxKey` `for="c-checkbox-label-checkboxKey` |

## Build

---

`npm run build`
