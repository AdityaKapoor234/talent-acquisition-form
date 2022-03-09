import React, {Component} from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";

import Photo from "../../../common-component/photo";
import IconButton from "@mui/material/IconButton";
import {PhotoCamera} from "@mui/icons-material";

export default class ProductPhotoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [
                {
                    'path': 'https://picsum.photos/id/237/200/300',
                    'sort_order': 1,
                    'is_primary': true
                },
                {
                    'path': 'https://picsum.photos/id/232/200/300',
                    'sort_order': 1,
                    'is_primary': true
                },
                {
                    'path': 'https://picsum.photos/id/137/200/300',
                    'sort_order': 1,
                    'is_primary': true
                },
                {
                    'path': 'https://picsum.photos/id/227/200/300',
                    'sort_order': 1,
                    'is_primary': true
                },
                {
                    'path': 'https://picsum.photos/id/230/200/300',
                    'sort_order': 1,
                    'is_primary': true
                },
                {
                    'path': 'https://picsum.photos/id/220/200/300',
                    'sort_order': 1,
                    'is_primary': true
                },
                {
                    'path': 'https://picsum.photos/id/221/200/300',
                    'sort_order': 1,
                    'is_primary': true
                },
                {
                    'path': 'https://picsum.photos/id/222/200/300',
                    'sort_order': 1,
                    'is_primary': true
                }
            ]
        };

    }

    handleChange = (event) => {
        this.setState({type: event.target.value});
    };


    onSave() {
        console.log('bar');
    }

    onSaveAndContinue() {
        console.log('continue');
    }

    render() {
        return (
            <div data-component="product-photo-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave} onSaveAndContinue={this.onSaveAndContinue}
                                        showSaveContinueButton={true}>Photos</ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12">
                        <div className='photo-upload-list d-flex flex-wrap'>
                        {
                            this.state.photos.map((p, i) => {
                                return <div key={i}  className='photo-upload-box'>
                                    <div className='preview-img' style={{backgroundImage : 'url(' + p.path + ')'}}></div>
                                </div>
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
