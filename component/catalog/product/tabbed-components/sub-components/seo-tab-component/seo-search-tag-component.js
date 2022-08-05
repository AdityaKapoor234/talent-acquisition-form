import React, { Component } from "react";
import SearchTagAPI from "../../../../../../services/search-tag";
import { toast } from "react-toastify";
import Router from "next/router";

export default class ProductSEOSearchTagComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props?.id,
            mode: props?.mode,
            key: props?.key,
            elem: props?.elem,


            term: "",
            is_edit: false,
            edit_term: "",

        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.elem !== nextProps.elem ||
            prevState.key !== nextProps.key
        ) {
            return {
                elem: nextProps?.elem,
                key: nextProps?.key,
                mode: nextProps?.mode,
                id: nextProps?.id,
            };
        }
        return null;
    }


    validateDataSearchTerm = () => {
        if (this.state.edit_term === "" || this.state.edit_term === null || this.state.edit_term.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter search term");
            return false;
        }

        return true;
    };

    OnEditSetTrue = (value) => {
        this.setState({
            is_edit: true,
            edit_term: value,
        })
    }

    OnEditSaveSearchTerm = (id) => {
        if (this.validateDataSearchTerm()) {
            let data = {
                term: this.state.edit_term,
            };
            SearchTagAPI.searchTagEdit(id, data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        toast.success("Search Term Editted Successfully");
                        this.setState({
                            edit_term: "",
                            is_edit: false,
                        });
                        this.props?.searchTagViewList();
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
    };

    DeleteSearchTerm = (id) => {
        let data = {};
        SearchTagAPI.searchTagDelete(id, data)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    toast.success("Search Tag Deleted Successfully");
                    this.props?.searchTagViewList();
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



    render() {
        return (

            <div data-component="product-seo-edit" className='product-tabbed-editor'>
                <div
                    key={this.state.key}
                    className='row mt-2'
                >
                    <div className='col-md-4'>
                        {
                            this.state.is_edit === true ?
                                <input
                                    type="text"
                                    readOnly={this.state.mode === "view" ? true : false}
                                    placeholder='Edit Search Tag'
                                    name='term'
                                    className='form-control'
                                    onChange={(event) => this.setState({ edit_term: event.target.value })}
                                    value={this.state.edit_term}
                                />
                                :
                                <input
                                    type="text"
                                    readOnly={true}
                                    placeholder='Edit Search Tag'
                                    name='term'
                                    className='form-control'
                                    value={this.state.elem?.search_term}
                                />
                        }
                    </div>
                    {
                        this.state.mode === "view" ?
                            <>
                            </>
                            :
                            <>
                                <div className='col-md-2 d-grid'>
                                </div>
                                <div className='col-md-1 d-grid'>
                                    {
                                        this.state.is_edit === true ?
                                            <button
                                                disabled={this.state.mode === "view" ? true : false}
                                                className='btn btn-success btn-sm'
                                                onClick={this.OnEditSaveSearchTerm.bind(this, this.state.elem?.id)}
                                            >
                                                Save
                                            </button>
                                            :
                                            <button
                                                disabled={this.state.mode === "view" ? true : false}
                                                className='btn btn-success btn-sm'
                                                onClick={this.OnEditSetTrue.bind(this, this.state.elem?.search_term)}
                                            >
                                                Edit
                                            </button>
                                    }
                                </div>
                                <div className='col-md-1 d-grid'>
                                    <button
                                        disabled={this.state.mode === "view" ? true : false}
                                        className='btn btn-danger btn-sm'
                                        onClick={this.DeleteSearchTerm.bind(this, this.state.elem?.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </>
                    }

                </div>
            </div>
        );
    }
}
