import React, { Component } from 'react'
import { EditorState, ContentState, convertFromHTML, CompositeDecorator } from "draft-js";
import dynamic from 'next/dynamic';
import { convertFromRaw, convertToRaw } from 'draft-js';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class ArticleEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props?.value,
      mode: props?.mode,
      editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(`${props?.value}`))) || EditorState.createEmpty()
    };
  }

  setValue = () => {
    if ((this.state.value !== "") || (this.state.value !== null) || (this.state.value !== undefined) || (!this.state.value)) {

      if (this.state.mode === "view") {
        this.state.editorState = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(`${this.state.value}`)))
        // this.state.editorState = EditorState.createWithContent(ContentState.createFromText(`${this.state.value}`));
        // this.state.editorState=EditorState.createWithContent(convertFromRaw(JSON.parse(post.this.state.value)))
      }
    }
  }



  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.handleContent(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    this.props.handleContent.bind(this);
  };

  render() {
    this.setValue();
    const { editorState } = this.state;
    return (<>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true }
        }}
      />
    </>

    )
  }
}
