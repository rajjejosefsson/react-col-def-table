import React, { Fragment, Component } from "react";
import { render } from "react-dom";
import { Switch } from "./hola/switch";
import { Table, Footer } from "../Development/ColDefTable";
import { data, colDef } from "./data/myData";
import {
  customComponentColDef,
  customComponentData
} from "./data/customComponentData";
import { financialColDef, financialData } from "./data/financialGridData";
import { dataWithSubColDef, dataWithSubData } from "./data/dataWithSub";
import { Docs } from "./docs/docs";
import "./style.css";

const blueTheme = `
  .c-table--th {
    background: var(--color-blue);
    color: white;
    border-right-color: white;
  }

  .c-sort-button,
  .c-table--th-sort {
    color: var(--color-blue-very-light);
  }

  .c-sort-button--active,
  .c-table--th-sort-active {
    color: white;
  }


`;

const CustomCellTable = () => (
  <div>
    <h2>Custom Cells with Checkboxes</h2>
    <Table
      colDef={customComponentColDef}
      list={customComponentData}
      onLabelClick={label => console.log("clicked colDef: ", label)}
      hoverOnX={true}
      isBoxShadow={true}
      fixedRowCount={1}
      fixedHeight={500}
      isSortOn={true}
    />
  </div>
);

const EditableTable = () => (
  <div>
    <h2>Editable Table with Zebra Rows and sorting on</h2>
    <Table
      isBoxShadow={true}
      colDef={colDef}
      fixedRowCount={1}
      isSortOn={true}
      list={data}
      isZebra={true}
      fixedHeight={500}
      isEditable={true}
      onCellChange={x => console.log("cell changed:", x)}
    />
  </div>
);

const HorizontalScrollTable = () => (
  <div>
    <h2>Horizontal Scroll with 1 Fixed Column</h2>
    <Table
      colDef={financialColDef}
      list={financialData}
      fixedRowCount={1}
      fixedColumnCount={1}
    />
  </div>
);

const VerticalHorizontalScrollTable = () => (
  <div>
    <h2>Vertical and Horizontal scroll with 3 fixed row and 1 column</h2>
    <Table
      colDef={colDef}
      list={data}
      hoverOnX={true}
      hoverOnY={true}
      fixedRowCount={3}
      fixedColumnCount={1}
      fixedWidth={300}
      fixedHeight={400}
    />
  </div>
);

const SubHeaderTable = () => (
  <div>
    <h2>Table - With Sub headers</h2>
    <Table
      colDef={dataWithSubColDef}
      list={dataWithSubData}
      hoverOnX={true}
      fixedRowCount={1}
      fixedColumnCount={1}
    />
  </div>
);

const TableWithFooter = () => (
  <div>
    <h2>Table with custom footer (WIP)</h2>
    <Table
      list={data}
      colDef={colDef}
      footer={
        <Footer
          onNextPage={() => console.log("Next page clicked")}
          onPrevPage={() => console.log("Prev page clicked")}
          rowsPerPage={50}
          totalRows={data.length}
        />
      }
      fixedRowCount={1}
      isBoxShadow={true}
      isZebra={true}
      fixedHeight={400}
      onCellChange={x => console.log("cell changed:", x)}
    />
  </div>
);

export class App extends Component {
  state = { isBlueTheme: false, isDocumentationOn: false };

  handleButtonClick = () => {
    this.setState(({ isBlueTheme }) => ({ isBlueTheme: !isBlueTheme }));
  };

  onThemeToggle = () => {
    this.setState(({ isBlueTheme }) => ({
      isBlueTheme: !isBlueTheme
    }));
  };

  toggleDocumentation = () => {
    this.setState(({ isDocumentationOn }) => ({
      isDocumentationOn: !isDocumentationOn
    }));
  };

  render() {
    const { isDocumentationOn } = this.state;

    return (
      <Fragment>
        {this.state.isBlueTheme && <style>{blueTheme}</style>}
        <header className="c-header">
          <h1>The Table Library</h1>
          <p className="c-lib-text">
            This is a library that wraps{" "}
            <a
              href="https://github.com/bvaughn/react-virtualized"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Virtualized
            </a>{" "}
            MultiGrid, to simplify the creation of its core.
          </p>
          <button className="c-docs-button" onClick={this.toggleDocumentation}>
            {isDocumentationOn ? "Hide Docs" : "Show Docs"}
          </button>
        </header>

        <hr />

        <section className="c-documentation--section">
          {isDocumentationOn && <Docs />}
        </section>

        <section>
          <h1>Demos</h1>
          <div>
            <p>With Blue Theme</p>
            <Switch on={this.state.isBlueTheme} onClick={this.onThemeToggle} />
          </div>

          <CustomCellTable />
          <HorizontalScrollTable />
          <VerticalHorizontalScrollTable />
          <SubHeaderTable />
          <TableWithFooter />
          <EditableTable />
        </section>
      </Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
