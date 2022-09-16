import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import ProductApi from "../../../../services/product";
import cookie from "js-cookie";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default class ProductClassificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: props?.mode,
      details: [],
      classifiction: {},
      classificationList: [],
      sport: [],
      goal: [],
      diet: [],
      isLoader: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.id !== nextProps.id ||
      prevState.mode !== nextProps.mode
    ) {
      return {
        id: nextProps?.id,
        mode: nextProps?.mode,
      };
    }
    return null;
  }

  handleChangeAllDiet = (event) => {
    let list = this.state.diet;
    list["select_all"] = event?.target?.checked;
    if (event?.target?.checked) {
      list["select_minus"] = !event?.target?.checked;
    }
    else{
      list["select_minus"] = event?.target?.checked;
    }

    if (list.select_all && (list.id === parseInt(event?.target?.value))) {
      let sub = list?.sub
      for (let j in sub) {
        sub[j].select_all = event?.target?.checked;
      }
    } else if ((list.id === parseInt(event?.target?.value)) && list.select_all === false) {
      let sub = list?.sub
      for (let j in sub) {
        sub[j].select_all = event?.target?.checked;
      }
    }
    this.setState({ diet: list });
  };
  handleChangeDiet = (event) => {
    let list = this.state.diet;
    let sub = list?.sub;
    let objIndex = sub?.findIndex((obj => obj.id === parseInt(event?.target?.value)));
    if (sub[objIndex]) {
      sub[objIndex]["select_all"] = event?.target?.checked;
    }
    let count = 0
    for (let j in sub) {
      if (sub[j].select_all === true) {
        count = count + 1
      }
    }
    if (count === sub?.length) {
      list["select_all"] = true;
      list.select_minus = false;
    } else {
      list["select_all"] = false;
      if (count > 0){
        list.select_minus = true;
      }
      else{
        list.select_minus = false;
      }
    }
    this.setState({ diet: list })
  };

  handleChangeAllGoal = (event) => {
    let list = this.state.goal;
    list["select_all"] = event?.target?.checked;
    if (event?.target?.checked) {
      list["select_minus"] = !event?.target?.checked;
    }
    else{
      list["select_minus"] = event?.target?.checked;
    }

    if (list.select_all && (list.id === parseInt(event?.target?.value))) {
      let sub = list?.sub
      for (let j in sub) {
        sub[j].select_all = event?.target?.checked;
      }
    } else if ((list.id === parseInt(event?.target?.value)) && list.select_all === false) {
      let sub = list?.sub
      for (let j in sub) {
        sub[j].select_all = event?.target?.checked;
      }
    }
    this.setState({ goal: list });
  };
  handleChangeGoal = (event) => {
    let list = this.state.goal;
    let sub = list?.sub;
    let objIndex = sub?.findIndex((obj => obj.id === parseInt(event?.target?.value)));
    if (sub[objIndex]) {
      sub[objIndex]["select_all"] = event?.target?.checked;
    }
    let count = 0
    for (let j in sub) {
      if (sub[j].select_all === true) {
        count = count + 1
      }
    }
    if (count === sub?.length) {
      list["select_all"] = true;
      list.select_minus = false;
    } else {
      list["select_all"] = false;
      if (count > 0){
        list.select_minus = true;
      }
      else{
        list.select_minus = false;
      }
    }
    this.setState({ goal: list })
  };


  handleChangeAllSport = (event) => {
    let list = this.state.sport;
    list["select_all"] = event?.target?.checked;
    if (event?.target?.checked) {
      list["select_minus"] = !event?.target?.checked;
    }
    else{
      list["select_minus"] = event?.target?.checked;
    }

    if (list.select_all && (list.id === parseInt(event?.target?.value))) {
      let sub = list?.sub
      for (let j in sub) {
        sub[j].select_all = event?.target?.checked;
      }
    } else if ((list.id === parseInt(event?.target?.value)) && list.select_all === false) {
      let sub = list?.sub
      for (let j in sub) {
        sub[j].select_all = event?.target?.checked;
      }
    }
    this.setState({ sport: list });
  };
  handleChangeSport = (event) => {
    let list = this.state.sport;
    let sub = list?.sub;
    let objIndex = sub?.findIndex((obj => obj.id === parseInt(event?.target?.value)));
    if (sub[objIndex]) {
      sub[objIndex]["select_all"] = event?.target?.checked;
    }
    let count = 0
    for (let j in sub) {
      if (sub[j].select_all === true) {
        count = count + 1
      }
    }
    if (count === sub?.length) {
      list["select_all"] = true;
      list.select_minus = false;
    } else {
      list["select_all"] = false;
      if (count > 0){
        list.select_minus = true;
      }
      else{
        list.select_minus = false;
      }
    }
    this.setState({ sport: list })
  };



  updateClassifiction = (id, button) => {
    let data = {
      data: {
        goal: this.state.goal?.sub
          ?.filter((val) => val?.select_all === true)
          ?.map((val) => val?.id),
        diet: this.state.diet?.sub
          ?.filter((val) => val?.select_all === true)
          ?.map((val) => val?.id),
        sport: this.state.sport?.sub
          ?.filter((val) => val?.select_all === true)
          ?.map((val) => val?.id),
      },
    };
    ProductApi.addClassifiction(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          toast.success("Update Classification successfully");
          if (button === "continue") {
            this.props?.tab("content");
          } else if (button === "save") {
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

  onSave = () => {
    this.updateClassifiction(this.state.id, "save");
  };

  onSaveAndContinue = () => {
    this.updateClassifiction(this.state.id, "continue");
  };


  getList = (modelDiet, modelGoal, modelSport) => {
    this.setState({ isLoader: true });
    ProductApi.classifictionList()
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let list = response.data.data.data
          for (let i in list) {
            let sub_diet = list[0]?.sub
            let sub_goal = list[1]?.sub
            let sub_sport = list[2]?.sub
            let count_diet = 0
            let count_goal = 0
            let count_sport = 0
            if (list[i]?.name === "diet") {
              this.setState({ diet: list[i] })
            }
            else if (list[i]?.name === "goal") {
              this.setState({ goal: list[i] })
            }
            else if (list[i]?.name === "sport") {
              this.setState({ sport: list[i] })
            }
            for (let j in sub_diet) {
              if (modelDiet?.indexOf(sub_diet[j].id) >= 0) {
                sub_diet[j].select_all = true;
                count_diet = count_diet + 1
              }
            }
            if (modelDiet?.indexOf(list[0].id) >= 0 && count_diet === sub_diet?.length) {
              list[0].select_all = true;
            }
            if (count_diet > 0) {
              if (sub_diet?.length === count_diet){
                list[0]["select_all"] = true;
                list[0]["select_minus"] = false;
              }
              else {
                list[0]["select_minus"] = true;
              }              
            }

            for (let j in sub_goal) {
              if (modelGoal?.indexOf(sub_goal[j].id) >= 0) {
                sub_goal[j].select_all = true;
                count_goal = count_goal + 1
              }
            }
            if (modelGoal?.indexOf(list[1].id) >= 0 && count_goal === sub_goal?.length) {
              list[1].select_all = true;
            }
            if (count_goal > 0) {
              if (sub_goal?.length === count_goal){
                list[1]["select_all"] = true;
                list[1]["select_minus"] = false;
              }
              else {
                list[1]["select_minus"] = true;
              }
            }

            for (let j in sub_sport) {
              if (modelSport?.indexOf(sub_sport[j].id) >= 0) {
                sub_sport[j].select_all = true;
                count_sport = count_sport + 1
              }
            }
            if (modelSport?.indexOf(list[2].id) >= 0 && count_sport === sub_sport?.length) {
              list[2].select_all = true;
            }
            if (count_sport > 0) {
              if (sub_sport?.length === count_sport){
                list[2]["select_all"] = true;
                list[2]["select_minus"] = false;
              }
              else {
                list[2]["select_minus"] = true;
              }
            }
          }
          this.setState({
            classificationList: list,
            diet: list[0],
            goal: list[1],
            sport: list[2],
            isLoader: false,
          });

        }
      })
      .catch((error) => {
        this.setState({ isLoader: false });
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  };

  getClassifiction = (id) => {
    ProductApi.getClassifiction(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let list = response.data.data;
          let subListDiet = [];
          let subListGoal = [];
          let subListSport = [];
          this.setState({
            classifiction: list,
          });
          response.data.data?.data?.map(elem => {
            elem?.sub?.map(e => {
              if (elem?.name === "diet"){
                subListDiet.push(e?.id)
              }
              else if (elem?.name === "goal"){
                subListGoal.push(e?.id)
              }
              else if (elem?.name === "sport"){
                subListSport.push(e?.id)
              }
            })
          })

          this.getList(subListDiet,subListGoal,subListSport);
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
    this.getClassifiction(this.state.id);
  }

  render() {
    return (
      <div data-component="product-info-edit" className="product-tabbed-editor">
        <ProductTabEditorHeader
          onSave={this.onSave}
          onSaveAndContinue={this.onSaveAndContinue}
          mode={this.state.mode}
          showSaveContinueButton={true}
        >
          Classification
        </ProductTabEditorHeader>
        {this.state.isLoader ? (
          <div className="row justify-content-center">
            <div className="col-md-12 loader-cart">
              <Box sx={{ display: "flex" }}>
                <CircularProgress style={{ color: "#F54A00" }} />
              </Box>
            </div>
          </div>
        ) : (
          <>
            <div className="cat-check">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#012169" }}
                      size="small"
                      disabled={this.state.mode === "view" ? true : false}
                      checked={this.state.diet?.select_all}
                      value={this.state.diet?.id}
                      indeterminate={this.state.diet?.select_minus}
                      onChange={this.handleChangeAllDiet}
                    />
                  }
                  label={<span className="text-capitalize">{this.state.diet?.name}</span>}
                />
              </FormGroup>
              <div className="row margin-check">
                {this.state.diet?.sub?.map((p) => {
                  return (
                    <div className="col-md-4">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              style={{ color: "#012169" }}
                              size="small"
                              disabled={this.state.mode === "view" ? true : false}
                              checked={p?.select_all}
                              value={p?.id}
                              onChange={this.handleChangeDiet}
                            />
                          }
                          label={p?.name}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </div>
            </div>


            <div className="cat-check">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#012169" }}
                      size="small"
                      disabled={this.state.mode === "view" ? true : false}
                      checked={this.state.goal?.select_all}
                      value={this.state.goal?.id}
                      indeterminate={this.state.goal?.select_minus}
                      onChange={this.handleChangeAllGoal}
                    />
                  }
                  label={<span className="text-capitalize">{this.state.goal?.name}</span>}
                />
              </FormGroup>
              <div className="row margin-check">
                {this.state.goal?.sub?.map((p) => {
                  return (
                    <div className="col-md-4">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              style={{ color: "#012169" }}
                              size="small"
                              disabled={this.state.mode === "view" ? true : false}
                              checked={p?.select_all}
                              value={p?.id}
                              onChange={this.handleChangeGoal}
                            />
                          }
                          label={p?.name}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="cat-check">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#012169" }}
                      size="small"
                      disabled={this.state.mode === "view" ? true : false}
                      checked={this.state.sport?.select_all}
                      value={this.state.sport?.id}
                      indeterminate={this.state.sport?.select_minus}
                      onChange={this.handleChangeAllSport}
                    />
                  }
                  label={<span className="text-capitalize">{this.state.sport?.name}</span>}
                />
              </FormGroup>
              <div className="row margin-check">
                {this.state.sport?.sub?.map((p) => {
                  return (
                    <div className="col-md-4">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              style={{ color: "#012169" }}
                              size="small"
                              disabled={this.state.mode === "view" ? true : false}
                              checked={p?.select_all}
                              value={p?.id}
                              onChange={this.handleChangeSport}
                            />
                          }
                          label={p?.name}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </div>
            </div>

          </>

        )}
      </div>
    );
  }
}
