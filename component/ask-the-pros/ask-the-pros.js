import React,{useState,useEffect} from 'react';
import Photo from "../common-component/photo";
import Checkbox from "@mui/material/Checkbox";
import AskTheProsApi from "../../services/ask-the-pros";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function AskTheProps(props) {

    const [tab, setTab] = useState(1);
    const [ask, setAsk] = useState({});
    const [imgIcon, setImgIcon] = useState("file-input");
    const [mode, setMode] = useState();
    const [expert, setExpert] = useState([]);

    const getExpert=(model)=>{
        AskTheProsApi.getExpertise()
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
            let list = response.data.data
            for(let i in list){
                if (model?.indexOf(list[i].id) >= 0){
                  list[i].selected = true;
                }else{
                    list[i].selected = false;
                }
            }
            setExpert(list)
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

    const handleChange = (event) => {
        let input = ask;
        input[event.target.name] = event.target.value;
        setAsk(input)
        props?.handle(input);
      };
    const  handleCheck = (event) => {
        let input = ask;
        input[event.target.name] = event.target.checked;
        setAsk(input)
        props?.handle(input);
      };
    const  handlePhotoUrl = (name, url) => {
        let input = ask;
        input[name] = url;
        setAsk(input)
        props?.handle(input);
      };

    const handleChangeExpert = (event) => {
        let List = expert;
        for (let i in List) {
          if (List[i].id === parseInt(event.target.value)) {
            List[i].selected = event.target.checked;
            break;
          }
        }
        setExpert(List)
        const expertList = List?.filter(p=>p?.selected=== true)?.map(val=>val?.id)
        let input = ask;
        input["expertises"] = expertList ;
        setAsk(input)
        props?.handle(input);
      };

    useEffect(() => {
        setAsk(props?.askThePros)
        setMode(props?.mode)
        getExpert(props?.askThePros?.expertises)
    }, [props])
    

  return (
      <div data-component="edit-customer">
        <div className="row">
          <div className="col-md-12">
            <div className="tab">
              <div
                className={
                  tab === 1 ? `sub-tab active-tab` : "sub-tab"
                }
                onClick={() => {
                  setTab(1)
                }}
              >
                Pro info
              </div>
            </div>
          </div>
        </div>
        {tab === 1 && (
          <>
              <div className="row sticky-scroll scroll">
                <div className="col">
                  <div className="row mt-4">
                    <div className="col-md-4">
                      <div className="login-form ">
                        <label>Name<span className="mandatory-star">*</span></label>
                        <input
                          type="text"
                          name="name"
                          readOnly={mode==="view"?true:false}
                          value={ask?.name}
                          onChange={handleChange.bind(this)}
                        />
                      </div>
                      <div className="login-form ">
                        <label>Email<span className="mandatory-star">*</span></label>
                        <input
                          type="text"
                          name="email"
                          readOnly={mode==="view"?true:false}
                          value={ask?.email}
                          onChange={handleChange.bind(this)}
                        />
                      </div>
                      {mode === "view" ?
                        <div className="mt-4">
                        <Photo
                            mode={mode}
                            label={"Avatar"}
                            accept=".jpg,.jpeg,.png"
                            img={ask?.avatar_url}
                        />
                        </div>
                        :
                      <div className="mt-4">
                        <Photo
                          mode={mode}
                          label={"Avatar"}
                          accept=".jpg,.jpeg,.png"
                          name="avatar_url"
                          img={ask?.avatar_url}
                          setUrl={handlePhotoUrl.bind(this)}
                          value={imgIcon}
                          urlName="avatar"
                        />
                      </div>}
                      
                      <div className="login-form mt-3">
                        <label>Experience<span className="mandatory-star">*</span></label>
                        <input
                          type="text"
                          name="experience"
                          value={ask?.experience}
                          readOnly={mode==="view"?true:false}
                          onChange={handleChange.bind(this)}
                        />
                      </div>
                      <div className="signup-check">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={ask?.is_active?ask?.is_active:false}
                          name="is_active"
                          disabled={mode==="view"?true:false}
                          onChange={handleCheck.bind(this)}
                        />
                        <label>Active</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="expertise">Expertises<span className="mandatory-star">*</span></label>
                      <div className="signup-check">
                        <div className="d-flex flex-wrap">
                          {expert?.map((value) => {
                            return (
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      style={{ color: "#012169" }}
                                      size="small"
                                      className="check"
                                      value={value.id}
                                      disabled={mode==="view"?true:false}
                                      onChange={handleChangeExpert.bind(this)}
                                      checked={value?.selected?value?.selected:false}
                                      name={value?.name}
                                    />
                                  }
                                  label={
                                    <span style={{ fontSize: "0.875rem" }}>
                                      {value?.name}
                                    </span>
                                  }
                                />
                              </FormGroup>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </>
        )}
      </div>
  )
}
