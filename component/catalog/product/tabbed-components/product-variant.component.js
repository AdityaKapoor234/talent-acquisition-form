import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import Router from "next/router";
import { toast } from "react-toastify";
import ProductApi from "../../../../services/product";
import Modal from "@mui/material/Modal";
import ProductSelector from "../product-selector";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { APP_URL } from "../../../../utils/constant";
import ProductVariantListItem from "../product-variant-list-item";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 1,
  px: 2,
  pb: 2,
};

export default class ProductVariantComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variantSelectorConfig: {
        show: false,
        selected: {
          size: {},
          flavor: {}
        }
      },
      id: props?.id,
      variants: {}
    };
  }

  openVariantSelector(type) {
    let variantSelectorConfig = this.state.variantSelectorConfig
    variantSelectorConfig.type = type;
    variantSelectorConfig.show = true;
    this.setState({
      variantSelectorConfig
    })
  };
  handleVariantSelectorClose = (type) => {
    let variantSelectorConfig = this.state.variantSelectorConfig;
    variantSelectorConfig.show = false;
    this.setState({
      variantSelectorConfig
    })
  };


  updateVariantProduct = (type) => {
    let variantSelectorConfig = this.state.variantSelectorConfig
    let infoDetails = this.state.infoDetails;
    this.setState({
      infoDetails
    })
    variantSelectorConfig.show = false;
    this.setState({
      variantSelectorConfig
    })
  };


  updateVariants = (id, button) => {
    let payload = {}
    if (this.state.variantSelectorConfig.selected.size && this.state.variantSelectorConfig.selected.size.id) {
      payload.size = this.state.variantSelectorConfig.selected.size.id
    } else {
      payload.size = 0
    }
    if (this.state.variantSelectorConfig.selected.flavor && this.state.variantSelectorConfig.selected.flavor.id) {
      payload.flavor = this.state.variantSelectorConfig.selected.flavor.id
    } else {
      payload.flavor = 0
    }
    ProductApi.updateVariants(id, payload)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {

          // toast.success("Update variants successfully");
          if (response.data && response.data.data) {
            this.setState({
              variants: response.data.data,
              variantSelectorConfig: {
                show: false,
                selected: {
                  size: {},
                  flavor: {}
                }
              }
            });
          }
          
          if (button === "continue") {
            toast.success("Update variants successfully");
            this.props?.tab("classification");
          } else if (button === "save") {
            toast.success("Update variants successfully");
            Router.push("/product");
          }
          /*if (button === "continue") {
            this.props?.tab("photos");
          } else if (button === "save") {
            toast.success("Update price successfully");
            Router.push("/product");
          }*/
        }
      })
      .catch((error) => {
        this.setState({variantSelectorConfig: {
            show: false,
            selected: {
              size: {},
              flavor: {}
            }
          }})
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  };

  removeVariantSize = () => {
    this.removeVariants(this.state.id, "size")
  }

  removeVariantFlavor = () => {
    this.removeVariants(this.state.id, "flavor")
  }


  removeVariants = (id, remove) => {

    let payload = {}

    if (remove === "size") {

      payload.size = -1

      if (this.state.variantSelectorConfig.selected.flavor && this.state.variantSelectorConfig.selected.flavor.id) {
        payload.flavor = this.state.variantSelectorConfig.selected.flavor.id
      } else {
        payload.flavor = 0
      }
    }
    else {
      
      if (this.state.variantSelectorConfig.selected.size && this.state.variantSelectorConfig.selected.size.id) {
        payload.size = this.state.variantSelectorConfig.selected.size.id
      } else {
        payload.size = 0
      }

      payload.flavor = -1
    }



    ProductApi.updateVariants(id, payload)
    .then((response) => {
      if (response.data.httpStatusCode === 200) {

        // toast.success("Update variants successfully");
        if (response.data && response.data.data) {
          this.setState({
            variants: response.data.data,
            variantSelectorConfig: {
              show: false,
              selected: {
                size: {},
                flavor: {}
              }
            }
          });
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
    if (this.state.variantSelectorConfig.selected.size.id || this.state.variantSelectorConfig.selected.flavor.id) {
      this.updateVariants(this.state.id, "save");
    } else {
      toast.error("Select variants to save");
    }

  }

  onSaveAndContinue() {
    if (this.state.variantSelectorConfig.selected.size.id || this.state.variantSelectorConfig.selected.flavor.id) {
      this.updateVariants(this.state.id, "continue");
    } else {
      toast.success("Update variants successfully");
      this.props?.tab("classification");
    }
    // if (this.state.prices?.filter((val) => val?.id === 0)?.length > 0) {
    //   if (this.validation()) {
    //     this.updatePrice(this.state.id, "continue");
    //   }
    // } else {
    //   this.setState({
    //     isunsaved: false,
    //   });
    //   this.props?.tab("classification");
    // }
  }

  getVariants = (id) => {
    ProductApi.getVariants(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ variants: response.data.data });
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

  variantSelected = (product) => {
    ;
    let variantSelectorConfig = this.state.variantSelectorConfig
    if (!variantSelectorConfig.type) {
      return
    }
    variantSelectorConfig.selected[variantSelectorConfig.type] = {
      'id': product.type_id,
      'name': product.label,
      'path': product.path
    }
    variantSelectorConfig.show = false
    this.setState({
      variantSelectorConfig
    })
  }

  componentDidMount() {
    this.getVariants(this.state.id);
  }

  render() {
    return (
      <div
        data-component="product-variant-edit"
        className="product-tabbed-editor"
      >
        <ProductTabEditorHeader
          onSave={this.onSave.bind(this)}
          onSaveAndContinue={this.onSaveAndContinue.bind(this)}
          mode={this.state.mode}
          showSaveContinueButton={true}
        >
          Variants
        </ProductTabEditorHeader>
        <div className="row ">
          <div className='col-md-6'>
            <div className='section-sub-heading'><strong>Size Variant</strong></div>
            <div className='variant-preview'>
              {
                this.state.variants && this.state.variants.sizes && <div>
                  {this.state.variants.sizes.length === 0 && <p className='not-selected'>No Size variant available</p>}
                  {this.state.variants.sizes.length !== 0 &&
                    <div className='mt-1 pt-1 border-1'>
                      <small>Existing Size Variant Group</small>
                      {
                        this.state.variants.sizes.filter((x) => {
                          return x.product && x.product.id && x.product.id !== parseInt(this.state.id)
                        }).map((v, i) => {
                          return <ProductVariantListItem product={v.product} removeVariant={this.removeVariantSize.bind(this)} />
                        })
                      }
                      {
                        this.state.variants.sizes.filter((x) => {
                          return x.product && x.product.id && x.product.id !== parseInt(this.state.id)
                        }).length === 0 && <p><strong>None assigned</strong></p>
                      }
                    </div>
                  }
                </div>
              }
              {
                this.state.variantSelectorConfig.selected.size && this.state.variantSelectorConfig.selected.size.id && <div className='mt-1 pt-1 border-1'>
                  <small>Selected Variant Group</small>
                  <ProductVariantListItem product={this.state.variantSelectorConfig.selected.size} removeVariant={this.removeVariantSize.bind(this)} />
                </div>
              }



            </div>
            <div className=''>
              <button className='btn btn-primary btn-sm mt-2' onClick={this.openVariantSelector.bind(this, 'size')}>Select Size Variant</button>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='section-sub-heading'><strong>Flavor Variant</strong></div>
            <div className='variant-preview'>
              {
                this.state.variants && this.state.variants.flavors && <div>
                  {this.state.variants.flavors.length === 0 && <p className='not-selected'>No Flavor variant available</p>}
                  {this.state.variants.flavors.length !== 0 &&
                    <div className='mt-1 pt-1 border-1'>
                      <small>Existing Flavor Variant Group</small>
                      {
                        this.state.variants.flavors.filter((x) => {
                          return x.product && x.product.id && x.product.id !== parseInt(this.state.id)
                        }).map((v, i) => {
                          return <ProductVariantListItem product={v.product} removeVariant={this.removeVariantFlavor.bind(this)} />
                        })
                      }
                      {
                        this.state.variants.flavors.filter((x) => {
                          return x.product && x.product.id && x.product.id !== parseInt(this.state.id)
                        }).length === 0 && <p><strong>None assigned</strong></p>
                      }
                    </div>
                  }
                </div>
              }
              {
                this.state.variantSelectorConfig.selected.flavor && this.state.variantSelectorConfig.selected.flavor.id && <div className='mt-1 pt-1 border-1'>
                  <small>Selected Variant Group</small>
                  <ProductVariantListItem product={this.state.variantSelectorConfig.selected.flavor} removeVariant={this.removeVariantFlavor.bind(this)} />
                </div>
              }



            </div>
            <div className=''>
              <button className='btn btn-primary btn-sm mt-2' onClick={this.openVariantSelector.bind(this, 'flavor')}>Select Flavor Variant</button>
            </div>
          </div>
        </div>



        <Modal
          open={this.state.variantSelectorConfig.show}
          onClose={this.handleVariantSelectorClose.bind(this)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box data-modal-box='variant-selector' sx={{ ...style, width: 500 }} className='modal-box'>
            <div className='header'>
              <h2 className="modal-title">Select {this.state.variantSelectorConfig.type} variant</h2>
            </div>
            <div className='body'>
              <ProductSelector onSelect={this.variantSelected} />
            </div>

          </Box>
        </Modal>
      </div>
    );
  }
}