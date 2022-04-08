import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import Router from "next/router";
import { toast } from "react-toastify";
import ProductApi from "../../../../services/product";

export default class ProductPriceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isunsaved: false,
      id: props?.id,
      prices: [],
      mode: props?.mode,
      errors: {},
    };
  }

  addNewPrice() {
    let prices = this.state.prices;
    prices = [
      {
        special_price: 0,
        price: 0,
        id: 0,
      },
    ].concat(prices);
    this.setState({
      prices,
      isunsaved: true,
    });
  }

  validation() {
    let input = this.state.prices;
    let errors = {};
    let isValid = true;
    if (
      input?.filter((value) => value.id === 0)?.map((val) => val?.price)[0] ===
      0
    ) {
      isValid = false;
      errors["price"] = "Please enter price";
    }
    if (
      input
        ?.filter((value) => value.id === 0)
        ?.map((val) => val?.special_price)[0] === 0
    ) {
      isValid = false;
      errors["special_price"] = "Please enter special price";
    }
    this.setState({
      errors: errors,
    });

    return isValid;
  }

  updatePrice = (id, button) => {
    let data = {
      price: this.state.prices
        ?.filter((val) => val?.id === 0)
        ?.map((p) => p?.price)[0],
      special_price: this.state.prices
        ?.filter((val) => val?.id === 0)
        ?.map((p) => p?.special_price)[0],
    };
    ProductApi.updatePrice(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({
            isunsaved: false,
          });
          if (button === "continue") {
            toast.success("Update price successfully");
            this.props?.tab("photos");
          } else if (button === "save") {
            toast.success("Update price successfully");
            Router.push("/product");
          }
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

  onSave() {
    if (this.state.prices?.filter((val) => val?.id === 0)?.length > 0) {
      if (this.validation()) {
        this.updatePrice(this.state.id, "save");
      }
    } else {
      this.setState({
        isunsaved: false,
      });
      Router.push("/product");
    }
  }

  onSaveAndContinue() {
    if (this.state.prices?.filter((val) => val?.id === 0)?.length > 0) {
      if (this.validation()) {
        this.updatePrice(this.state.id, "continue");
      }
    } else {
      this.setState({
        isunsaved: false,
      });
      this.props?.tab("photos");
    }
  }

  getprice = (id) => {
    ProductApi.getPrice(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ prices: response.data.data?.list });
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

  handleChange = (event) => {
    let prices = this.state.prices;
    let objIndex = prices.findIndex(
      (obj) => obj.id === parseInt(event.target.id)
    );
    prices[objIndex][event.target.name] = parseInt(event.target.value);
    this.setState({ prices });
  };

  remove(i){
    let prices = this.state.prices;
    prices.splice(0,1);
    this.setState({
        prices,
        isunsaved: false,
    })
}

  componentDidMount() {
    this.getprice(this.state.id);
  }

  render() {
    return (
      <div
        data-component="product-price-edit"
        className="product-tabbed-editor"
      >
        <ProductTabEditorHeader
          onSave={this.onSave.bind(this)}
          onSaveAndContinue={this.onSaveAndContinue.bind(this)}
          mode={this.state.mode}
          showSaveContinueButton={true}
        >
          Prices
        </ProductTabEditorHeader>
        <div className="row ">
          <div className="col-md-12">
            {this.state.prices.length === 0 && (
              <p className="mt-2">Add price but clicking on the button below</p>
            )}
            {this.state.prices.length >0 && (
            <div className="row mt-2">
                  <div className="col-md-4">
                    <label style={{color:'#012169'}}>Price</label>
                  </div>
                  <div className="col-md-4 ">
                    <label style={{color:'#012169'}}>Special Price</label>
                  </div>
            </div>)}
            {this.state.prices.map((p, i) => {
              return (
                <div key={i} className="row mt-2">
                  <div className="col-md-4">
                    <input
                      type="number"
                      placeholder="Price"
                      readOnly={p?.id === 0 ? false : true}
                      className="form-control"
                      name="price"
                      value={p.price}
                      id={p?.id}
                      onChange={this.handleChange}
                    />
                    {p?.id === 0 && (
                      <small className="form-text text-danger">
                        {this.state.errors["price"]}
                      </small>
                    )}
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      placeholder="Special Price"
                      className="form-control"
                      readOnly={p?.id === 0 ? false : true}
                      name="special_price"
                      value={p.special_price}
                      id={p?.id}
                      onChange={this.handleChange}
                    />
                    {p?.id === 0 && (
                      <small className="form-text text-danger">
                        {this.state.errors["special_price"]}
                      </small>
                    )}
                  </div>
                  {p?.id === 0 &&
                  <div className='col-md-2 d-grid'>
                        <button className='btn btn-danger btn-sm' onClick={this.remove.bind(this,0)}>Remove</button>
                    </div>}
                  <div className="col-md-4 mt-1">
                    {/*Added on: {p.created_at}*/}
                  </div>
                </div>
              );
            })}
            {this.state.mode === "edit" &&
            <div className="mt-5">
              <button
                className="btn btn-primary"
                disabled={this.state.isunsaved}
                onClick={this.addNewPrice.bind(this)}
              >
                Add New Price
              </button>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}
