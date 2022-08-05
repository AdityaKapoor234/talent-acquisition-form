import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import ArticleEditor from "../../../common-component/text-editer";
import { toast } from "react-toastify";
import Router from "next/router";
import ProductApi from "../../../../services/product";

export default class ProductContentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props?.content ? props.content : {},
            mode: props?.mode,
            id: props?.id,
            errors:{},
            open: false,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.content !== nextProps.content ||
            prevState.mode !== nextProps.mode
        ) {
            return {
                content: nextProps?.content,
                mode: nextProps?.mode,
                active: nextProps?.content?.is_active
                    ? nextProps?.content?.is_active
                    : false,
            };
        }
        return null;
    }

    stateHandle = (value) => {
        this.setState({ content: value });
    };

    handleFullContent = (value, name, event) => {
        let content = this.state.content;
        content[name] = value;
        this.setState({ content });

    }

    handleLabel = (value) => {
        let content = this.state.content;
        content["product_label"] = value;
        this.setState({ content });

    }

    handleShortDescription = (value) => {
        let content = this.state.content;
        content["short_description"] = value;
        this.setState({ content });

    }

    handleFullDescription = (value) => {
        let content = this.state.content;
        content["description"] = value;
        this.setState({ content });

    }

    handleDirection = (value) => {
        let content = this.state.content;
        content["direction_of_use"] = value;
        this.setState({ content });

    }

    handleOtherIngredient = (value) => {
        let content = this.state.content;
        content["other_ingredients"] = value;
        this.setState({ content });

    }

    handleDoesNotContain = (value) => {
        let content = this.state.content;
        content["does_not_contain"] = value;
        this.setState({ content });

    }

    handleWarning = (value) => {
        let content = this.state.content;
        content["warning"] = value;
        this.setState({ content });

    }


    handleChange = (event) => {
        this.setState({ type: event.target.value });

    };

    validateData = () => {
        let content = this.state.content;
        let errors = {};
        let isValid = true;
        // if (!content["description"] || content["description"] ==="<p></p>\n" || content["description"].replace(/&nbsp;/g, "").length <=8) {
        //     isValid = false;
        //     errors["description"] = "Please enter Full Description";
        // }
        // if (!content["direction_of_use"] || content["direction_of_use"] ==="<p></p>\n" || content["direction_of_use"].replace(/&nbsp;/g, "").length <=8) {
        //     isValid = false;
        //     errors["direction_of_use"] = "Please enter Direction of Use";
        // }
        // if (!content["does_not_contain"] || content["does_not_contain"] ==="<p></p>\n" || content["does_not_contain"].replace(/&nbsp;/g, "").length <=8) {
        //     isValid = false;
        //     errors["does_not_contain"] = "Please enter Does Not Contain Field";
        // }
        // if (!content["other_ingredients"] || content["other_ingredients"] ==="<p></p>\n" || content["other_ingredients"].replace(/&nbsp;/g, "").length <=8) {
        //     isValid = false;
        //     errors["other_ingredients"] = "Please enter Other Ingredients";
        // }
        if (!content["product_label"] || content["product_label"] ==="<p></p>\n" || content["product_label"].replace(/&nbsp;/g, "").length <=8) {
            isValid = false;
            errors["product_label"] = "Please enter Product Label";
        }
        // if (!content["short_description"] || content["short_description"] ==="<p></p>\n" || content["short_description"].replace(/&nbsp;/g, "").length <=8) {
        //     isValid = false;
        //     errors["short_description"] = "Please enter Short Description";
        // }
        // if (!content["warning"] || content["warning"] ==="<p></p>\n" || content["warning"].replace(/&nbsp;/g, "").length <=8) {
        //     isValid = false;
        //     errors["warning"] = "Please enter Warning";
        // }

        this.setState({
            errors: errors
        });

        return isValid;

    };


    onSave = () => {
        if (this.validateData()) {
            let data = {
                "data": {
                    description: this.state.content.description,
                    direction_of_use: this.state.content.direction_of_use,
                    does_not_contain: this.state.content.does_not_contain,
                    other_ingredients: this.state.content.other_ingredients,
                    product_label: this.state.content.product_label,
                    short_description: this.state.content.short_description,
                    warning: this.state.content.warning,
                }
            };
            ProductApi.ContentListEdit(this.state.id, data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        this.setState({ content: response.data.data });
                        toast.success(response.data.message);
                        Router.push(`/product`);
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
        }
    }

    onSaveAndContinue = () => {
        if (this.validateData()) {
            let data = {
                "data": {
                    description: this.state.content.description,
                    direction_of_use: this.state.content.direction_of_use,
                    does_not_contain: this.state.content.does_not_contain,
                    other_ingredients: this.state.content.other_ingredients,
                    product_label: this.state.content.product_label,
                    short_description: this.state.content.short_description,
                    warning: this.state.content.warning,
                }
            };
            ProductApi.ContentListEdit(this.state.id, data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        this.setState({ content: response.data.data });
                        toast.success(response.data.message);
                        this.props?.tab("supplements")
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
        }
    }

    render() {
        return (
            <div data-component="product-content-edit" className='product-tabbed-editor'>

                <ProductTabEditorHeader onSave={this.onSave} onSaveAndContinue={this.onSaveAndContinue} showSaveContinueButton={true} mode={this.state.mode}>Content</ProductTabEditorHeader>
                
                {this.state.mode === "edit" &&
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="fc-form-group editor">
                                <label>Product Label
                                    <span className="mandatory-star">*</span>
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.product_label}
                                    mode={this.state.mode}
                                    handleContent={this.handleLabel.bind(this)}
                                    articleProd="edit"
                                    name="product_label"
                                />
                                <small className="form-text text-danger" >{this.state.errors["product_label"]}</small>
                            </div>
                            <div className="fc-form-group editor">
                                <label>Short Description
                                    {/* <span className="mandatory-star">*</span> */}
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.short_description}
                                    mode={this.state.mode}
                                    handleContent={this.handleShortDescription.bind(this)}
                                    articleProd="edit"
                                    name="short_description"
                                />
                                <small className="form-text text-danger" >{this.state.errors["short_description"]}</small>
                            </div>
                            <div className="fc-form-group editor">
                                <label>Full Description
                                    {/* <span className="mandatory-star">*</span> */}
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.description}
                                    mode={this.state.mode}
                                    handleContent={this.handleFullDescription.bind(this)}
                                    articleProd="edit"
                                    name="description"
                                />
                                <small className="form-text text-danger" >{this.state.errors["description"]}</small>
                            </div>
                            <div className="fc-form-group editor">
                                <label>Direction of Use
                                    {/* <span className="mandatory-star">*</span> */}
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.direction_of_use}
                                    mode={this.state.mode}
                                    handleContent={this.handleDirection.bind(this)}
                                    articleProd="edit"
                                    name="direction_of_use"
                                />
                                <small className="form-text text-danger" >{this.state.errors["direction_of_use"]}</small>
                            </div>
                            <div className="fc-form-group editor">
                                <label>Other Ingredient
                                    {/* <span className="mandatory-star">*</span> */}
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.other_ingredients}
                                    mode={this.state.mode}
                                    handleContent={this.handleOtherIngredient.bind(this)}
                                    articleProd="edit"
                                    name="other_ingredients"
                                />
                                <small className="form-text text-danger" >{this.state.errors["other_ingredients"]}</small>
                            </div>
                            <div className="fc-form-group editor">
                                <label>Does Not Contain
                                    {/* <span className="mandatory-star">*</span> */}
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.does_not_contain}
                                    mode={this.state.mode}
                                    handleContent={this.handleDoesNotContain.bind(this)}
                                    articleProd="edit"
                                    name="does_not_contain"
                                />
                                <small className="form-text text-danger" >{this.state.errors["does_not_contain"]}</small>
                            </div>
                            <div className="fc-form-group editor">
                                <label>Product Restrictions
                                    {/* <span className="mandatory-star">*</span> */}
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.warning}
                                    mode={this.state.mode}
                                    handleContent={this.handleWarning.bind(this)}
                                    articleProd="edit"
                                    name="warning"
                                />
                                <small className="form-text text-danger" >{this.state.errors["warning"]}</small>
                            </div>
                        </div>
                    </div>}

                {this.state.mode === "view" &&
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="fc-form-group editor">
                                <label>
                                    Product Label
                                    <span className="mandatory-star">*</span>
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.product_label}
                                    mode={this.state.mode}
                                    handleContent={this.handleFullContent.bind()}
                                    articleProd="view"
                                />
                            </div>
                            <div className="fc-form-group editor">
                                <label>
                                    Short Description
                                    {/* <span className="mandatory-star">*</span> */}
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.short_description}
                                    mode={this.state.mode}
                                    handleContent={this.handleFullContent.bind()}
                                    articleProd="view"
                                />
                            </div>
                            <div className="fc-form-group editor">
                                <label>
                                    Full Description
                                    {/* <span className="mandatory-star">*</span> */}
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.description}
                                    mode={this.state.mode}
                                    handleContent={this.handleFullContent.bind()}
                                    articleProd="view"
                                />
                            </div>
                            <div className="fc-form-group editor">
                                <label>Direction of Use
                                    {/* <span className="mandatory-star">*</span> */}
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.direction_of_use}
                                    mode={this.state.mode}
                                    handleContent={this.handleFullContent.bind()}
                                    articleProd="view"
                                />
                            </div>
                            <div className="fc-form-group editor">
                                <label>Other Ingredient
                                    {/* <span className="mandatory-star">*</span> */}
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.other_ingredients}
                                    mode={this.state.mode}
                                    handleContent={this.handleFullContent.bind()}
                                    articleProd="view"
                                />
                            </div>
                            <div className="fc-form-group editor">
                                <label>Does Not Contain
                                    {/* <span className="mandatory-star">*</span> */}
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.does_not_contain}
                                    mode={this.state.mode}
                                    handleContent={this.handleFullContent.bind()}
                                    articleProd="view"
                                />
                            </div>
                            <div className="fc-form-group editor">
                                <label>Product Restrictions
                                    {/* <span className="mandatory-star">*</span> */}
                                </label>
                                <br />
                                <ArticleEditor
                                    value={this.state.content?.warning}
                                    mode={this.state.mode}
                                    handleContent={this.handleFullContent.bind()}
                                    articleProd="view"
                                />
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
}
