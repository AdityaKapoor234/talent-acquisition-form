import React, { Component } from "react";
import { toast } from "react-toastify";
import ProductApi from "../../../../services/product";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import InventoryImportComponent from "./sub-components/inventory-tab-component/inventory-import.component";
import InventoryExportComponent from "./sub-components/inventory-tab-component/inventory-export.component";
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
    show: true,
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
      inventory: {},
    };
  }
  handleChange = (event) => {
    this.setState({ type: event.target.value });
  };

  onSave = () => {
    toast.success("Inventory added successfully");
    Router.push("/product");
  };

  onSaveAndContinue = () => {
    toast.success("Inventory added successfully");
    this.props?.tab("prices");
  };

  setTab = (value) => {
    this.setState({ tab: value });
  };

  getInventoryList = (id, page) => {
    ProductApi.getInventoryExportList(id, page)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ inventory: response.data.data });
        }
      })
      .catch((error) => {
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  };

  componentDidMount() {
    this.getInventoryList(this.state.id, 1)
  }

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
          Inventories {this.state.inventory?.stock_count ? <>({this.state.inventory?.stock_count})</> : "(0)"}
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
          {this.state.tab === "export" && (
            <>
              <InventoryExportComponent id={this.state.id} />
            </>
          )}
        </div>
      </div>
    );
  }
}
