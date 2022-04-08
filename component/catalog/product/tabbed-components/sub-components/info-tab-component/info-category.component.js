import React,{useEffect, useState} from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ProductInfoApi from "../../../../../../services/product-info";
import { toast } from "react-toastify";
import { appendOwnerState } from "@mui/material";


export default function InfoCategoryComponent(props) {
  const [category, setCategory] = useState([]);
  const [mode, setMode] = useState(props?.mode);

  const handleChangeAll = (event) => {
    let list = category
    let subList = [];
    let objIndex = list.findIndex((obj => obj.id === parseInt(event?.target?.value)));
    list[objIndex]["select_all"] = event?.target?.checked;
    for(let i in list){
      if (list[i].select_all && (list[i].id === parseInt(event?.target?.value))){
        let sub = list[i]?.sub
        for(let j in sub){
            sub[j].select = event?.target?.checked;
        }
      }else if((list[i].id === parseInt(event?.target?.value)) && list[i].select_all === false){
        let sub = list[i]?.sub
        for(let j in sub){
            sub[j].select = event?.target?.checked;
        }
      }
    }
    setCategory([...list])
    let data = list?.filter(val=>val?.select_all === true)?.map(p=>p?.id)
    for(let j in list){
      let sub = list[j]?.sub
      for(let i in sub){
        if (sub[i].select){
          subList.push(sub[i].id)
        }
      }
    }
    let sub = [...data,...subList]
    props?.handle([...new Set(sub)])
  };

  const handleChange = (event) => {
    let list = category
    let model= []
    let subList = [];
    for(let i in list){
      let sub = list[i]?.sub
      let objIndex = sub?.findIndex((obj => obj.id === parseInt(event?.target?.value)));
      if(sub[objIndex]){
        sub[objIndex]["select"] = event?.target?.checked;
      }
      let count = 0
      for(let j in sub){
        if (sub[j].select === true){
          count = count+1
        }
      }
      if(count === sub?.length){
        list[i]["select_all"] = true;
      }else{
        list[i]["select_all"] = false;
      }
    }
    setCategory([...list])
    let data = list?.filter(val=>val?.select_all === true)?.map(p=>p?.id)
    for(let j in list){
      let sub = list[j]?.sub
      for(let i in sub){
        if (sub[i].select){
          subList.push(sub[i].id)
        }
        if(subList?.length>0 ){
          if(subList?.indexOf(sub[i].id)>=0){
            subList.push(list[j].id)
          }
        }
      }
    }
    let sub = [...data,...new Set(subList)]
    props?.handle([...new Set(sub)])
  };

  const getCategoryDetails =(model)=>{
    ProductInfoApi.getCategory()
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
              let list =  response.data.data?.categories
              for(let i in list){
                let sub = list[i]?.sub
                let count = 0
                for(let j in sub){
                  if (model?.indexOf(sub[j].id) >= 0){
                    sub[j].select = true;
                    count = count+1
                  }
                }
                if (model?.indexOf(list[i].id) >= 0 && count === sub?.length){
                  list[i].select_all = true;
                }
              }
              setCategory(list);
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

  useEffect(() => {
    getCategoryDetails(props?.details)
    setMode(props?.mode)
  }, [props?.details])
  


  return (
    <div>
      {console.log("test88898",props?.details)}
      {category?.map((val) => {
        return (
          <div className="cat-check">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#012169" }}
                    size="small"
                    disabled={mode === "view"?true:false}
                    checked={val?.select_all}
                    value={val?.id}
                    indeterminate={(props?.details?.indexOf(val?.id) >=0 ) && val?.select_all === false }
                    onChange={handleChangeAll}
                  />
                }
                label={val?.name}
              />
            </FormGroup>
            <div className="row margin-check">
              {val?.sub?.map((p) => {
                return (
                  <div className="col-md-4">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            style={{ color: "#012169" }}
                            size="small"
                            disabled={mode === "view"?true:false}
                            checked={p?.select}
                            value={p?.id}
                            onChange={handleChange}
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
        );
      })}
    </div>
  );
}
