import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import AskTheProsCreateComponent from "../../../component/ask-the-pros/ask-the-pros";
import Router from "next/router";
import Cookie from "js-cookie";
import AskTheProsApi from "../../../services/ask-the-pros";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default function AskTheProsViewDetails({ id }) {
  const mode = "view";
  const [askThePros, setAskThePros] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  const [trustTheProsRefferalCode, setTrustTheProsRefferalCode] = useState([]);
  const [totalAskTheProsRefferalCode, setTotalAskTheProsRefferalCode] = useState([]);
  const [totalPageRefferalCode, setTotalPageRefferalCode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [trustTheProsRefferalCodeDropdown, setTrustTheProsRefferalCodeDropdown] = useState([]);
  const [trustTheProsTotalPoints, setTrustTheProsTotalPoints] = useState({});
  const [askTheProsQueryList, setAskTheProsQueryList] = useState([]);
  const [currentPageQueryList, setCurrentPageQueryList] = useState(1);
  const [totalAskTheProsQueryList, setTotalAskTheProsQueryList] = useState([]);
  const [totalPageQueryList, setTotalPageQueryList] = useState(null);




  const AskTheProsDetail = (id) => {
    AskTheProsApi.getAskTheProsDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            name: response.data.data.expert?.name,
            email: response.data.data.expert?.email,
            description: response.data.data.expert?.description,
            coupon_code: response.data.data.expert?.coupon_code,
            coupon_code_id: response.data.data.expert?.coupon_code_id,
            avatar_url: response.data.data.expert?.avatar_url,
            is_active: response.data.data.expert?.is_active,
            experience: response.data.data.expert?.experience,
            expertises: response.data.data?.expertise?.expertise === "deleted" ? [] : response.data.data?.expertise?.map(val => val?.id),

            id: response.data.data.expert?.id,
            education: response.data.data.expert?.education,
            recomended_article_category: response.data.data.expert?.recomended_article_category,
            article_type_id: response.data.data.expert?.article_type_id,
          };
          setAskThePros(details);
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
  const Delete = (id) => {
    let data = {};
    AskTheProsApi.AskTheProsDelete(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          setAskThePros(response.data.data?.expert);
          toast.success(response.data.message);
          Router.push("/ask-the-pros");
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

  const trustTheProsRefferCodeList = (id, page) => {
    setIsLoader(true);
    AskTheProsApi.AskTheProsRefferalCodeList(id, page)
      .then((response) => {
        setTrustTheProsRefferalCode(response.data.data.list);
        setTotalAskTheProsRefferalCode(response.data.data);
        setTotalPageRefferalCode(Math.ceil(response.data.data.total / response.data.data.page_size));
        setIsLoader(false);
      })
      .catch((error) => {
        setIsLoader(false);
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  }

  const trustTheProsRefferCodeDropdownList = () => {
    setIsLoader(true);
    AskTheProsApi.AskTheProsRefferalCodeDropdownList()
      .then((response) => {
        setTrustTheProsRefferalCodeDropdown(response.data.data.list);
        setIsLoader(false);
      })
      .catch((error) => {
        setIsLoader(false);
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  }

  const trustTheProsTotalPoint = (id) => {
    setIsLoader(true);
    AskTheProsApi.AskTheProsRefferalCodeTotalPoints(id)
      .then((response) => {
        setTrustTheProsTotalPoints(response.data.data.total);
        setIsLoader(false);
      })
      .catch((error) => {
        setIsLoader(false);
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  }

  const RefferalCodePagination = (value) => {
    setCurrentPage(value)
    // trustTheProsRefferCodeList(id,currentPage);
  }


  const AskTheProsQueryDetails = (id, page) => {
    setIsLoader(true);
    AskTheProsApi.AskTheProsQueryList(id, page)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          setIsLoader(false);
          setAskTheProsQueryList(response.data.data?.list);
          setTotalAskTheProsQueryList(response.data.data);
          setTotalPageQueryList(Math.ceil(response.data.data.total / response.data.data.page_size));
        }
      })
      .catch((error) => {
        setIsLoader(false);
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  };

  const QueryListPagination = (value) => {
    setCurrentPageQueryList(value)
  }


  useEffect(() => {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    AskTheProsDetail(id);
    trustTheProsRefferCodeList(id, currentPage);
    trustTheProsRefferCodeDropdownList();
    trustTheProsTotalPoint(id);
    AskTheProsQueryDetails(id, currentPageQueryList);

  }, [id]);
  return (
    <div>
      <Head>
        <title>{APP_NAME} - Trust The Pros</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
      </Head>

      <main>
        <DashboardLayoutComponent>
          <div className="row border-box">
            <div className="col-md-5">
              <div className="hamburger">
                <span>Trust The Pros / Trust The Pros / </span>View Trust The Pros
              </div>
              <div className="page-name">
                Trust The Pros Details - {askThePros?.name}
              </div>
            </div>
            <div className="col-md-7 btn-save">
              <div
                className="Cancel-btn custom-btn"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <span>Delete </span>
              </div>
              <div
                className="Cancel-btn custom-btn"
                onClick={() => {
                  Router.push(`/ask-the-pros`);
                }}
              >
                <span>Cancel </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-m-12">
              <AskTheProsCreateComponent
                mode={mode}
                id={id}
                askThePros={askThePros}
                trustTheProsRefferalCode={trustTheProsRefferalCode}
                totalAskTheProsRefferalCode={totalAskTheProsRefferalCode}
                totalPageRefferalCode={totalPageRefferalCode}
                currentPage={currentPage}
                trustTheProsRefferalCodeDropdown={trustTheProsRefferalCodeDropdown}
                trustTheProsTotalPoints={trustTheProsTotalPoints}
                RefferalCodePagination={RefferalCodePagination.bind(this)}
                trustTheProsRefferCodeList={trustTheProsRefferCodeList.bind(this)}
                askTheProsQueryList={askTheProsQueryList}
                currentPageQueryList={currentPageQueryList}
                QueryListPagination={QueryListPagination.bind(this)}
                AskTheProsQueryDetails={AskTheProsQueryDetails.bind(this)}
                totalAskTheProsQueryList={totalAskTheProsQueryList}
                totalPageQueryList={totalPageQueryList}
              />
            </div>
          </div>
        </DashboardLayoutComponent>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{ color: "#012169" }}>
            Confirm the action
          </DialogTitle>
          <Box position="absolute" top={0} right={0}>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent>
            <Typography style={{ color: "#7e8f99" }}>
              Are you sure you want to delete this pro?
            </Typography>
          </DialogContent>
          <DialogActions style={{ marginBottom: "0.5rem" }}>
            <Button
              onClick={() => setOpen(false)}
              style={{
                color: "#012169",
                background: "white",
                borderRadius: "0px",
              }}
              color="primary"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              onClick={() => Delete(id)}
              style={{ background: "#f54a00", borderRadius: "0px" }}
              color="secondary"
              variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
}
