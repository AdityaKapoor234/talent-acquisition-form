import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import ProductSEOSearchTagComponent from "./sub-components/seo-tab-component/seo-search-tag-component";
import SeoApi from "../../../../services/seo";
import SearchTagAPI from "../../../../services/search-tag";
import { toast } from "react-toastify";
import Router from "next/router";
// import { WithContext as ReactTags } from 'react-tag-input';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default class ProductSEOComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props?.id,
            seo: {},
            errors: {},
            mode: props?.mode,
            // searchTagList: props?.searchTagList,
            searchTagList: {},


            term: "",
            // addSearchTag: false,
            // searchTagId: null,

            // tags: props?.tags,
            // tags: [],

            // KeyCodes: {
            //     comma: 188,
            //     enter: 13
            // },

            // delimiters: [188, 13],

        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.id !== nextProps.id ||
            prevState.mode !== nextProps.mode
        ) {
            return {
                mode: nextProps?.mode,
                id: nextProps?.id,
                // searchTagList: nextProps?.searchTagList,
                // tags: nextProps?.tags,
            };
        }
        return null;
    }

    handleChange = (event) => {
        let input = this.state.seo;
        input[event.target.name] = event.target.value
        this.setState({
            seo: input
        })
    };

    validation() {
        let input = this.state.seo;
        let errors = {};
        let isValid = true;
        if (!input["url_key"] || input["url_key"].replace(/\s/g, "").length <= 0 || /[^a-z0-9\-_]/.test(input["url_key"])) {
            isValid = false;
            errors["url_key"] = "Please enter url key in valid format";
        }
        if (!input["meta_keywords"]) {
            isValid = false;
            errors["meta_keywords"] = "Please enter meta keywords";
        }
        if (input["meta_keywords"].replace(/\s/g, "").length <= 0) {
            isValid = false;
            errors["meta_keywords"] = "Please enter meta keywords";
        }
        if (!input["meta_title"]) {
            isValid = false;
            errors["meta_title"] = "Please enter meta title";
        }
        if (input["meta_title"].replace(/\s/g, "").length <= 0) {
            isValid = false;
            errors["meta_title"] = "Please enter meta title";
        }
        if (!input["meta_description"]) {
            isValid = false;
            errors["meta_description"] = "Please enter meta description";
        }
        if (input["meta_description"].replace(/\s/g, "").length <= 0) {
            isValid = false;
            errors["meta_description"] = "Please enter meta description";
        }
        this.setState({
            errors: errors
        });

        return isValid;
    }

    EditSeo = (id) => {
        let data = {
            "meta_description": this.state.seo?.meta_description,
            "meta_keywords": this.state.seo?.meta_keywords,
            "meta_title": this.state.seo?.meta_title,
            "url_key": this.state.seo?.url_key
        }
        SeoApi.AddSeo(id, data)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    let list = response.data.data
                    this.setState({ seo: list });
                    toast.success("Update successfully")
                    Router.push("/product")
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

    onSave = () => {
        if (this.validation()) {
            this.EditSeo(this.state.id)
        }
    }

    // onSaveAndContinue=()=> {
    //     if(this.validation()){
    //         this.EditSeo(this.state.id)
    //     }
    // }

    getSeoDetails = (id) => {
        SeoApi.getSeo(id)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    let list = response.data.data
                    this.setState({ seo: list });
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






    // handleDelete = (i, tag) => {
    //     this.state.tags?.filter((tag, index) => index === i)?.map(elem => {
    //         this.DeleteSearchTerm(parseInt(elem?.id));
    //     })

    //     let newList = this.state.tags.filter((tag, index) => index !== i)
    //     this.setState({ tags: newList });
    // };

    // handleAddition = (tag) => {
    //     this.state.tags?.push(tag);
    //     this.OnAddSaveSearchTerm(tag?.text);
    // };

    // handleDrag = (tag, currPos, newPos) => {
    //     const newTags = this.state.tags.slice();

    //     newTags.splice(currPos, 1);
    //     newTags.splice(newPos, 0, tag);

    //     // re-render
    //     this.setState({ tags: newTags });
    // };

    // handleTagClick = index => {
    //     console.log('The tag at index ' + index + ' was clicked');
    // };


    searchTagViewList = () => {
        SearchTagAPI.searchTagViewList(this.state.id)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    this.setState({ searchTagList: response.data.data });

                    // console.log(typeof response.data?.data?.search_term[0].id,"response");

                    // response.data?.data?.search_term?.map(elem => {
                    //     let add_search_elem = { "id": elem?.id.toString(), "text": elem?.search_term }
                    //     this.state.tags.push(add_search_elem)
                    // })

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

    validateDataSearchTerm = (text) => {
        if (this.state.term === "" || this.state.term === null || this.state.term.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter search term");
            return false;
        }
        // if (text=== "" || text === null || text.replace(/\s/g, "").length <= 0) {
        //     toast.error("Please enter search term");
        //     return false;
        // }

        return true;
    };

    OnEditSaveSearchTerm = (id) => {
        if (this.validateDataSearchTerm()) {
            let data = {
                term: this.state.term,
            };
            SearchTagAPI.searchTagEdit(id, data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        toast.success("Search Term Editted Successfully");
                        this.setState({ term: "" });
                        this.searchTagViewList();
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

    OnAddSaveSearchTerm = (text) => {
        if (this.validateDataSearchTerm(text)) {
            let data = {
                term: this.state.term
            };
            SearchTagAPI.searchTagCreate(this.state.id, data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        toast.success("Search Term Added Successfully");
                        this.setState({ term: "" });
                        // this.setState({ addSearchTag: false });
                        this.searchTagViewList();

                        // this.state.tags?.filter(elem => elem?.text === response.data.data?.search_term?.search_term)?.map(elem => elem["id"] = response.data.data?.search_term?.id?.toString())
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
                    this.searchTagViewList();
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


    // addNewSearchTage = () => {
    //     if (this.state.addSearchTag) {
    //         toast.error("Add one by one");
    //     }
    //     else {
    //         this.setState({ addSearchTag: true });
    //     }
    // }

    componentDidMount() {
        this.getSeoDetails(this.state.id);
        this.searchTagViewList();
    }

    // ReactTags = require('react-tag-input').WithOutContext;

    render() {
        return (

            <div data-component="product-seo-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave} mode={this.state.mode} showSaveContinueButton={false}>
                    Search Engine Optimisation
                </ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="fc-form-group">
                                    <label>URL Key<span className="mandatory-star">*</span></label>
                                    <input
                                        type="text"
                                        name="url_key"
                                        readOnly={this.state.mode === "view" ? true : false}
                                        value={this.state.seo?.url_key}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <small className="form-text text-danger" >{this.state.errors["url_key"]}</small>
                                </div>
                                <div className="fc-form-group">
                                    <label>Meta Title<span className="mandatory-star">*</span></label>
                                    <br />
                                    <textarea
                                        name="meta_title"
                                        value={this.state.seo?.meta_title}
                                        cols="100"
                                        readOnly={this.state.mode === "view" ? true : false}
                                        rows="5"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <small className="form-text text-danger" >{this.state.errors["meta_title"]}</small>
                                </div>
                                <div className="fc-form-group">
                                    <label>Meta Keywords<span className="mandatory-star">*</span></label>
                                    <br />
                                    <textarea
                                        name="meta_keywords"
                                        value={this.state.seo?.meta_keywords}
                                        cols="100"
                                        readOnly={this.state.mode === "view" ? true : false}
                                        rows="5"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <small className="form-text text-danger" >{this.state.errors["meta_keywords"]}</small>
                                </div>
                                <div className="fc-form-group">
                                    <label>Meta Description<span className="mandatory-star">*</span></label>
                                    <br />
                                    <textarea
                                        name="meta_description"
                                        value={this.state.seo?.meta_description}
                                        cols="100"
                                        readOnly={this.state.mode === "view" ? true : false}
                                        rows="5"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <small className="form-text text-danger" >{this.state.errors["meta_description"]}</small>
                                </div>



                                {/* <div className="fc-form-group">
                                    <label>Search Tags<span className="mandatory-star">*</span></label>
                                    <div data-component="react-tags">
                                        {
                                            <div className="mt-4">
                                                <ReactTags
                                                    tags={this.state.tags}
                                                    // suggestions={this.suggestions}
                                                    delimiters={this.delimiters}
                                                    handleDelete={this.handleDelete}
                                                    handleAddition={this.handleAddition}
                                                    // handleDrag={this.handleDrag}
                                                    // handleTagClick={this.handleTagClick}
                                                    inputFieldPosition='bottom'
                                                    // allowDragDrop={true}
                                                    autocomplete
                                                    readOnly={this.state.mode === "view" ? true : false}
                                                />
                                            </div>
                                        }
                                    </div>

                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>





















                <div data-component="product-supplement-edit" className='product-tabbed-editor'>
                    <div className="fc-form-group">
                        <label>Search Tags<span className="mandatory-star">*</span></label>
                    </div>

                    <div className="row ">
                        <div className="col-md-12">
                            <Stack direction="row" spacing={1}>
                                <div className="col-md-8">
                                    {
                                        this.state.searchTagList?.search_term?.map((elem, key) => {
                                            return (
                                                <>

                                                    {
                                                        this.state.mode === "view" ?
                                                            <Chip
                                                                label={elem?.search_term}
                                                                className="mt-3 me-2"
                                                            />
                                                            :
                                                            <Chip
                                                                label={elem?.search_term}
                                                                onDelete={this.DeleteSearchTerm.bind(this, elem?.id)}
                                                                className="mt-3 me-2"
                                                            />
                                                    }

                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </Stack>

                            {
                                this.state.mode === "edit" && (
                                    <>
                                        <div className='row mt-4'>
                                            <div className='col-md-5'>
                                                <input
                                                    type="text"
                                                    readOnly={this.state.mode === "view" ? true : false}
                                                    placeholder='Add New Search Tag'
                                                    // id={s?.id}
                                                    name='term'
                                                    className='form-control'
                                                    onChange={(event) => this.setState({ term: event.target.value })}
                                                    value={this.state.term}
                                                />
                                            </div>
                                            <div className='col-md-1 d-grid'>
                                            </div>
                                            <div className='col-md-1 d-grid'>
                                                <button
                                                    disabled={this.state.mode === "view" ? true : false}
                                                    className='btn btn-success btn-sm'
                                                    onClick={this.OnAddSaveSearchTerm.bind()}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            <div className='col-md-1 d-grid'>
                                                <button
                                                    disabled={this.state.mode === "view" ? true : false}
                                                    className='btn btn-danger btn-sm'
                                                    onClick={() => {
                                                        this.setState({
                                                            // addSearchTag: false,
                                                            term: "",
                                                        })
                                                    }}
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )
                            }


                        </div>
                    </div>

                    {/* <div className="row ">
                        <div className="col-md-12">
                            {
                                this.state.mode === "edit" ?
                                    this.state.searchTagList?.search_term?.length === 0 &&
                                    <p className='mt-2'>Add search tag by clicking on the button below</p>
                                    :
                                    this.state.searchTagList?.search_term?.length === 0 &&
                                    <p className='mt-2'>No Search Tag Available</p>
                            }
                            {
                                this.state.searchTagList?.search_term?.map((elem, key) => {
                                    return (
                                        <>
                                            <ProductSEOSearchTagComponent
                                                key={key}
                                                elem={elem}
                                                mode={this.state.mode}
                                                id={this.state.id}
                                                searchTagViewList={this.searchTagViewList.bind(this)}
                                            />
                                            <div
                                                key={key}
                                                className='row mt-2'
                                            >
                                                <div className='col-md-4'>
                                                    <input
                                                        type="text"
                                                        readOnly={this.state.mode === "view" ? true : false}
                                                        placeholder='New Search Tag'
                                                        name='term'
                                                        className='form-control'
                                                        onChange={(event) => this.setState({elem: {search_term: event.target.value}})}
                                                        value={elem?.search_term}
                                                    />
                                                </div>
                                                <div className='col-md-2 d-grid'>
                                                </div>
                                                <div className='col-md-1 d-grid'>
                                                    <button
                                                        disabled={this.state.mode === "view" ? true : false}
                                                        className='btn btn-success btn-sm'
                                                        onClick={this.OnEditSaveSearchTerm.bind(elem?.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                                <div className='col-md-1 d-grid'>
                                                    <div
                                                        disabled={this.state.mode === "view" ? true : false}
                                                        className='btn btn-danger btn-sm'
                                                        onClick={this.DeleteSearchTerm.bind(this, elem?.id)}
                                                    >
                                                        Remove
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                            {
                                this.state.addSearchTag === true && (
                                    <>
                                        <div className='row mt-2'>
                                            <div className='col-md-4'>
                                                <input
                                                    type="text"
                                                    readOnly={this.state.mode === "view" ? true : false}
                                                    placeholder='New Search Tag'
                                                    // id={s?.id}
                                                    name='term'
                                                    className='form-control'
                                                    onChange={(event) => this.setState({ term: event.target.value })}
                                                    value={this.state.term}
                                                />
                                            </div>
                                            <div className='col-md-2 d-grid'>
                                            </div>
                                            <div className='col-md-1 d-grid'>
                                                <button
                                                    disabled={this.state.mode === "view" ? true : false}
                                                    className='btn btn-success btn-sm'
                                                    onClick={this.OnAddSaveSearchTerm.bind()}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            <div className='col-md-1 d-grid'>
                                                <button
                                                    disabled={this.state.mode === "view" ? true : false}
                                                    className='btn btn-danger btn-sm'
                                                    onClick={() => {
                                                        this.setState({
                                                            addSearchTag: false,
                                                            term: "",
                                                        })
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            {this.state.mode === "edit" &&
                                <div className='mt-5'>
                                    <button
                                        className='btn btn-primary'
                                        onClick={this.addNewSearchTage.bind(this)}
                                    >
                                        Add New Search Tag
                                    </button>
                                </div>}
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}
