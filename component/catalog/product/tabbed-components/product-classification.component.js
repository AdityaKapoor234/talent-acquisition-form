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
      classifiction: {},
      sport: [],
      goal: [],
      diet: [],
      isLoader: false,
    };
  }

  handleChangeSport = (event) => {
    let list = this.state.sport;
    let objIndex = list?.findIndex((obj => obj.id === parseInt(event?.target?.value)));
    if(list[objIndex]){
      list[objIndex]["select_all"] = event?.target?.checked;
    }
    this.setState({
        sport:list
    })
  }

  handleChangeGoal = (event) => {
    let list = this.state.goal;
    let objIndex = list?.findIndex((obj => obj.id === parseInt(event?.target?.value)));
    if(list[objIndex]){
      list[objIndex]["select_all"] = event?.target?.checked;
    }
    this.setState({
        goal:list
    })
  }

  handleChangeDiet = (event) => {
    let list = this.state.diet;
    let objIndex = list?.findIndex((obj => obj.id === parseInt(event?.target?.value)));
    if(list[objIndex]){
      list[objIndex]["select_all"] = event?.target?.checked;
    }
    this.setState({
        diet:list
    })
  }

  updateClassifiction = (id,button)=>{
    let data={
            "data": {
            "goal" : this.state.goal?.filter(val=>val?.select_all=== true)?.map((val) => val?.id),
            "diet" : this.state.diet?.filter(val=>val?.select_all=== true)?.map((val) => val?.id),
            "sport" : this.state.sport?.filter(val=>val?.select_all=== true)?.map((val) => val?.id)
            }
    }
    ProductApi.addClassifiction(id,data)
  .then((response) => {
    if (response.data.httpStatusCode === 200) {
        toast.success("Update Classification successfully")
        if(button === "continue"){
            this.props?.tab("content")
        }else if(button === "save"){
            Router.push("/product")
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
}

  onSave = () => {
    this.updateClassifiction(this.state.id, "save");
  };

  onSaveAndContinue = () => {
    this.updateClassifiction(this.state.id, "continue");
  };

  getList = (model) => {
      this.setState({isLoader:true})
    ProductApi.classifictionList()
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let listDiet = response.data.data?.diet;
          let listGoal = response.data.data?.goal;
          let listSport = response.data.data?.sport;

          let diet = model?.diet?.map((val) => val?.id);
          let sport = model?.sport?.map((val) => val?.id);
          let goal = model?.goal?.map((val) => val?.id);

          for (let i in listDiet) {
            if (diet.indexOf(listDiet[i].id) >= 0) {
              listDiet[i]["select_all"] = true;
            }
          }
          for (let i in listGoal) {
            if (goal.indexOf(listGoal[i].id) >= 0) {
              listGoal[i]["select_all"] = true;
            }
          }
          for (let i in listSport) {
            if (sport.indexOf(listSport[i].id) >= 0) {
              listSport[i]["select_all"] = true;
            }
          }

          this.setState({
            sport: listSport,
            goal: listGoal,
            diet: listDiet,
            isLoader:false
          });
        }
      })
      .catch((error) => {
        this.setState({isLoader:false})
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
          this.setState({
            classifiction: list,
          });
          this.getList(list);
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
          Classifiction
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
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading ">Sports</div>
              <div className="mt-2 row cat-check">
                {this.state.sport?.map((val) => {
                  return (
                    <div className="col-md-4">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              style={{ color: "#012169" }}
                              size="small"
                              disabled={
                                this.state.mode === "view" ? true : false
                              }
                              checked={val?.select_all}
                              value={val?.id}
                            onChange={this.handleChangeSport}
                            />
                          }
                          label={val?.name}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-12">
              <div className="section-heading ">Goals</div>
              <div className="mt-2 row cat-check">
                {this.state.goal?.map((val) => {
                  return (
                    <div className="col-md-4">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              style={{ color: "#012169" }}
                              size="small"
                              disabled={
                                this.state.mode === "view" ? true : false
                              }
                              checked={val?.select_all}
                              value={val?.id}
                                onChange={this.handleChangeGoal}
                            />
                          }
                          label={val?.name}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-12">
              <div className="section-heading ">Diets</div>
              <div className="mt-2 row cat-check">
                {this.state.diet?.map((val) => {
                  return (
                    <div className="col-md-4">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              style={{ color: "#012169" }}
                              size="small"
                              disabled={
                                this.state.mode === "view" ? true : false
                              }
                              checked={val?.select_all}
                              value={val?.id}
                                onChange={this.handleChangeDiet}
                            />
                          }
                          label={val?.name}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
