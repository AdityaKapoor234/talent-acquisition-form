import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import InventoryImportComponent from "./sub-components/inventory-tab-component/inventory-import.component";
import Router from "next/router";

const editor_tabs = [
  {
    id: 1,
    show: true,
    label: "Import",
    key: "import",
  },
  {
    id: 2,
    show: false,
    label: "Export",
    key: "export",
  },
];

export default class ProductInventoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: props?.mode,
      tabs: editor_tabs,
      tab: "import",
      id: props?.id,
    };
  }
  handleChange = (event) => {
    this.setState({ type: event.target.value });
  };

  onSave = () => {
    Router.push("/product");
  };

  onSaveAndContinue = () => {
    this.props?.tab("prices");
  };

  setTab = (value) => {
    this.setState({ tab: value });
  };

  render() {
    return (
      <div
        data-component="product-inventory-edit"
        className="product-tabbed-editor"
      >
        <ProductTabEditorHeader
          onSave={this.onSave}
          mode={this.state.mode}
          onSaveAndContinue={this.onSaveAndContinue}
          showSaveContinueButton={true}
        >
          Inventories
        </ProductTabEditorHeader>
        <div className="row ">
          <div className="col-md-12">
            <div className="tab">
              {this.state.tabs.map((t) => {
                return (
                  t.show && (
                    <div
                      key={t.key}
                      className={
                        this.state.tab === t.key
                          ? `sub-tab active-tab`
                          : "sub-tab"
                      }
                      onClick={() => {
                        this.setState({ tab: t.key });
                      }}
                    >
                      {t.label}
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
        <div>
          {this.state.tab === "import" && (
            <>
              <InventoryImportComponent id={this.state.id} />
            </>
          )}
        </div>
      </div>
    );
  }
}
