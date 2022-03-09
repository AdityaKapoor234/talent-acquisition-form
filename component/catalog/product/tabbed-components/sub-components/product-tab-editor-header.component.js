import React, {Component} from "react";
import Router from "next/router";

export default class ProductTabEditorHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }




    render() {
        return (
            <div className='tab-heading-row'>
                <div className='row justify-content-between'>
                    <div className='col-md-8'>
                        <div className='tab-heading'>{this.props.children}</div>
                    </div>
                    <div className='col-md-2 d-grid'>
                        <button className='btn btn-primary   full-width btn-sm' onClick={this.props.onSave}>Save</button>
                    </div>
                    {
                        this.props.showSaveContinueButton && <div className='col-md-2 d-grid'>
                            <button className='btn btn-primary   full-width btn-sm' onClick={this.props.onSaveAndContinue}>Save and Continue</button>
                        </div>
                    }

                </div>
            </div>
        );
    }
}
