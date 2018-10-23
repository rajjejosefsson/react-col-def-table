## How to use


```js
import { Table } from 'library-name'
import {colDef, data } from './somewhere'

const App = () => (
  <Table colDef={colDef} list={data} />
)
```

----

## Step by step

With this data below we want to have a table with *id*, *name* and *age*. 

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


For this to work we will have to create a *column definition*.

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

As we can see from above it has three important characteristics: *key*, *size* and *label*. 

| key | Description | required? |
| --- | --- |
| `key` |  What key we want to map with from the data. | YES |
| `size` | the size of the column | YES |
| label | The label in the header that will be shown for the mapped value | NO |
| checkbox | if we want to render checkboxes for a column | NO |
| component | to render a custom component with the data | NO |


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
