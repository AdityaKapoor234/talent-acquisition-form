import React,{useEffect, useState} from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ProductInfoApi from "../../../../../../services/product-info";


export default function InfoCategoryComponent() {
  const [category, setCategory] = useState([]);

  const handleChangeAll = (event) => {
    
  };

  const handleChange = (event) => {
    // let cat = category;

  };

  const getCategoryDetails =()=>{
    ProductInfoApi.getCategory()
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
              let list =  response.data.data?.categories
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
    getCategoryDetails()
  }, [])
  


  return (
    <div>
      {category?.map((val) => {
        return (
          <div className="cat-check">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#012169" }}
                    size="small"
                    // checked={val?.select_all}
                    // onChange={handleChangeAll}
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
                            // checked={p?.select}
                            // onChange={handleChange}
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
