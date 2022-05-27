import React, { Component } from "react";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  CompositeDecorator,
} from "draft-js";
import dynamic from "next/dynamic";
import { convertFromRaw, convertToRaw } from "draft-js";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class ArticleEditor extends Component {
  constructor(props) {
    super(props);

    // timeout = setTimeout(() => {
    this.state = {
      value: props?.value,
      mode: props?.mode,
      timeout: "",
      editorState: "",
      articleProd: props?.articleProd ? props?.articleProd : "",

    };
    // }, 1000)
  }

  setValue = () => {
    if (
      this.state.value !== "" ||
      this.state.value !== null ||
      this.state.value !== undefined ||
      !this.state.value
    ) {
      if (this.state.mode === "view") {
        this.state.editorState = EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(`${this.state.value}`)
          )
        );
        // this.state.editorState = EditorState.createWithContent(ContentState.createFromText(`${this.state.value}`));
        // this.state.editorState=EditorState.createWithContent(convertFromRaw(JSON.parse(post.this.state.value)))
      }
    }
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.handleContent(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    this.props.handleContent.bind(this);
  };

  componentDidMount(props) {
    // this.state.timeout = setTimeout(() => {
      this.setState({
        editorState: EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(`${this.state.value}`))
        ) || EditorState.createEmpty(),
      })
    // }, 1000)
  }

  render() {
    async function uploadImageCallBack(file) {
      const formData = new FormData();
      formData.append("media", file);
      const token = cookie.get("access_token_admin");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = await axios.put(
        "http://65.1.17.188:5001/manage/category/photo/banner",
        formData,
        headers
      );
      return new Promise((resolve, reject) => {
        resolve({ data: { link: data?.data?.data?.url } });
      });
    }
    this.setValue();
    const { editorState } = this.state;
    return (
      <>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbar-class"
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              "embedded",
              "emoji",
              "image",
              "history",
            ],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: true },
            },
          }}
        />
      </>
    );
  }
}
