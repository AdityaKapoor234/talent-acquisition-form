import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import ProductInfoApi from "../../../../../../services/product-info";
import { Details } from "@mui/icons-material";

export default function InfoCertificationComponent(props) {
  const [certification, setCertification] = useState([]);

  const handleChange = (event,id) => {
    let list = certification
    let objIndex = list.findIndex((obj => obj.id === parseInt(event?.target?.value)));
    list[objIndex]["selected"] = event?.target?.checked;
    setCertification([...list])
    let data = list?.filter(val=>val?.selected === true)?.map(p=>p?.id)
    props?.handle(data)
  };

  const getCertifictionDetails = (model) => {
    ProductInfoApi.getCertification()
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let list = response.data.data?.list;
          for(let i in list){
            if (model?.indexOf(list[i].id) >= 0)
                list[i].selected = true;
            else{
                list[i].selected =false;
            }
          }
          setCertification(list);
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

  useEffect(() => {
    getCertifictionDetails(props?.details);
  }, [props?.details]);

  return (
    <div className="certification">
      <div className="row">
        {certification?.map((val) => {
          return (
            <div className="col-md-3">
              <div
                className={val?.selected?`bck-img active`:`bck-img`}                
                style={{ background: `url(${val?.path})` }}
              >
                <Checkbox
                    style={{ color: "#012169" }}
                    size="small"
                    checked={val?.selected}
                    value={val?.id}
                    onChange={handleChange}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
