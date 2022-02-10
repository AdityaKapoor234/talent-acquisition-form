import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Pagination from "@mui/material/Pagination";
const order = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
export default class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      tab: 1,
      customer: props?.customer,
      mode: props?.mode,
    };
  }

  render() {
    return (
      <div data-component="edit-customer">
        <div className="row">
          <div className="col-md-12">
            <div className="tab">
              <div
                className={
                  this.state.tab === 1 ? `sub-tab active-tab` : "sub-tab"
                }
                onClick={() => {
                  this.setState({ tab: 1 });
                }}
              >
                General info
              </div>
              <div
                className={
                  this.state.tab === 2 ? `sub-tab active-tab` : "sub-tab"
                }
                onClick={() => {
                  this.setState({ tab: 2 });
                }}
              >
                Address Info
              </div>
              <div
                className={
                  this.state.tab === 3 ? `sub-tab active-tab` : "sub-tab"
                }
                onClick={() => {
                  this.setState({ tab: 3 });
                }}
              >
                order Info
              </div>
            </div>
          </div>
        </div>
        {this.state.tab === 1 && (
          <>
            {this.state.mode === "edit" && (
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="login-form ">
                    <label>Customer Type</label>
                    <input type="text" value={this.state.customer?.type} />
                  </div>
                  <div className="login-form ">
                    <label>Name</label>
                    <input type="text" value={this.state.customer?.name} />
                  </div>
                  <div className="login-form ">
                    <label>Email</label>
                    <input type="text" value={this.state.customer?.email} />
                  </div>
                  <div className="login-form ">
                    <label>Mobile</label>
                    <input
                      type="number"
                      value={this.state.customer?.phone_number}
                    />
                  </div>
                  <div className="signup-check">
                    <Checkbox
                      size="small"
                      style={{ color: "#012169" }}
                      checked={this.state.active}
                      onChange={(e) => {
                        this.setState({ active: e.target.checked });
                      }}
                    />
                    <label>Active</label>
                  </div>
                </div>
              </div>
            )}
            {this.state.mode === "view" && (
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="login-form ">
                    <label>Customer Type</label>
                    <input
                      type="text"
                      readonly="readonly"
                      value={this.state.customer?.type}
                    />
                  </div>
                  <div className="login-form ">
                    <label>Name</label>
                    <input
                      type="text"
                      readonly="readonly"
                      value={this.state.customer?.name}
                    />
                  </div>
                  <div className="login-form ">
                    <label>Email</label>
                    <input
                      type="text"
                      readonly="readonly"
                      value={this.state.customer?.email}
                    />
                  </div>
                  <div className="login-form ">
                    <label>Mobile</label>
                    <input
                      type="number"
                      readonly="readonly"
                      value={this.state.customer?.phone_number}
                    />
                  </div>
                  <div className="signup-check">
                    <Checkbox
                      size="small"
                      style={{ color: "#012169" }}
                      checked={this.state.customer?.active}
                    />
                    <label>Active</label>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {this.state.tab === 2 && (
          <div className="row mt-4">
            {this.state.customer?.addressInfo?.map((p) => {
              return (
                <div className="col-3">
                  <div className="complete-address">
                    <div className="name">{p?.name}</div>
                    <div className="address">{p?.address}</div>
                    <div className="number">{p?.phone_number}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {this.state.tab === 3 && (
          <>
            <div data-component="CustomerComponent">
              <div className="row">
                <div className="col-md-12">
                  <div className="tableRow">
                    <div className="col">Order#</div>
                    <div className="col text-center">Date</div>
                    <div className="col text-center">Status</div>
                    <div className="col-3 text-center">Shipment Method</div>
                    <div className="col text-center">Total</div>
                    <div className="col-1 text-center">Active</div>
                    <div className="col-1 text-end">View</div>
                  </div>
                </div>
              </div>
              <div className="scroll-table scroll">
                {order?.map((p) => {
                  return (
                    <div className="row">
                      <div className="col-md-12">
                        <div className="tableCell">
                          <div className="tableBody col">1011</div>
                          <div className="col text-center">28/01/2022</div>
                          <div className="tableBody col justify-content-center">
                            Shipped
                          </div>
                          <div className="col-3 text-center">COD</div>
                          <div className="col text-center">₹1000.00</div>
                          <div className="col-1 text-center">
                            <CheckCircleOutlineOutlinedIcon className="check-icon" />
                          </div>
                          <div className="col-1 text-end">
                            <RemoveRedEyeIcon className="view-icon" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pagination">
              <Pagination
                count={10}
                showFirstButton
                showLastButton
                size="small"
                color="primary"
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
