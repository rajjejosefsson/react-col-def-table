import React, { Fragment } from "react";

import Markdown from "react-markdown";
import { CodeBlock } from "./codeblock";

import step from "./markdown/step.md";
import propsTable from "./markdown/propsTable.md";
import cssTable from "./markdown/cssTable.md";

import "./docs.css";
export const Docs = () => (
  <Fragment>
    <h1 style={{ marginBottom: "66px" }}>Documentation</h1>
    <section>
      <Markdown
        className="markdown-body"
        source={step}
        renderers={{ code: CodeBlock }}
      />
    </section>

    <section style={{ display: "flex" }}>
      <Markdown
        escapeHtml={false}
        options={{ typographer: true }}
        className="markdown-body u-flex--1"
        source={propsTable}
      />
      <Markdown
        escapeHtml={false}
        options={{ typographer: true }}
        className="markdown-body u-flex--1"
        style={{ flex: "1" }}
        source={cssTable}
      />
    </section>
  </Fragment>
);
