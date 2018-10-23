import React from "react";
import hljs from "highlight.js";

import javascript from "highlight.js/lib/languages/javascript";
import htmlbars from "highlight.js/lib/languages/htmlbars";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
// import "highlight.js/styles/agate.css";
// import "highlight.js/styles/hybrid.css";
// import "highlight.js/styles/ocean.css";
import "highlight.js/styles/vs2015.css";

import "github-markdown-css";

const LANGUAGES = { javascript, json, xml, htmlbars };
Object.keys(LANGUAGES).forEach(key =>
  hljs.registerLanguage(key, LANGUAGES[key])
);

export class CodeBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  setRef(el) {
    this.codeEl = el;
  }

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl);
  }

  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    );
  }
}
