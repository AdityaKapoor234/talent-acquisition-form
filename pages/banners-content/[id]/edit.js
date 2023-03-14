import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import CustomerList from "../../../component/customer/customer-list";
import XLSX from "xlsx";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useRouter } from "next/router";
import EmailSupport from "../../../component/email-support/email-support.component";
import InquiryApi from "../../../services/inquiry";
import BannerContent from "../../../component/banner-content/banner-content";
import Photo from '../../../component/common-component/photo';

export default function Email_Support() {
  const pathArr = useRouter();
  const [emailSupport, setEmailSupport] = useState([]);
  const [Page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEmailSupport, setTotalEmailSupport] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [wordEntered, setWordEntered] = useState(
    pathArr.query?.q ? pathArr.query?.q : ""
  );

  const [content,setContent] = useState("");

  let banners = [
    {
        name : 'Feedback',
        id: 0,
    },
    {
        name : 'Advertise With Us',
        id: 1,
    },
    {
        name : 'Affiliate Marketing',
        id: 2,
    },
    {
        name : 'Marketing and Sponsorships',
        id: 3,
    },
    {
        name : 'Sell on Fitcart',
        id: 4,
    },
    {
        name : 'Bulk Buys',
        id: 5,
    },
    {
        name : 'Email Support',
        id: 6,
    },
]

  const handleKeyPress = (event) => {
    let router_query_object = {};
    if (wordEntered !== "") {
      router_query_object["q"] = wordEntered;
    }
    if (event.key === "Enter") {
      Router.push({
        pathname: "/email-support",
        query: router_query_object,
      });
      setCurrentPage(1);
      getEmailSupport(1, wordEntered);
    }
  };

  const handleClickPress = (event) => {
    let router_query_object = {};
    if (wordEntered !== "") {
      router_query_object["q"] = wordEntered;
    }
    // if (event.key === "Enter") {
    Router.push({
      pathname: "/email-support",
      query: router_query_object,
    });
    setCurrentPage(1);
    getEmailSupport(1, wordEntered);
    // }
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    if (event.target.value === "") {
      Router.push({
        pathname: "/email-support",
        query: "",
      });
      getEmailSupport(1, "");
    }
  };
  let onPageChange = function (e, page) {
    setCurrentPage(page);
    getEmailSupport(page, wordEntered);
  };

  const getEmailSupport = (page, search) => {
    setIsLoader(true);
    InquiryApi.emailSupportList(page, search)
      .then((response) => {
        setEmailSupport(response.data.data.list);
        setTotalEmailSupport(response.data.data.total);
        setTotalPage(
          Math.ceil(response.data.data.total / response.data.data.page_size)
        );
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
  };
  useEffect(() => {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    getEmailSupport(currentPage, "");
  }, []);

  return (
    <div>
      <div>
        <Head>
          <title>{APP_NAME} - Banner & Content</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-8 d-flex">
                <KeyboardBackspaceIcon
                  style={{ color: "#012169", cursor: "pointer" }}
                  className="me-2"
                  onClick={() => {
                    Router.push(`/banners-content`);
                  }}
                />
                <div className="page-name">Edit</div>
              </div>
            </div>
            <div className="row sticky-scroll scroll">
              <div className="col-md-12 ">
                <div className="row ">
                  <div className="col-md-12">
                    <div className="tab">
                      <div
                        className='sub-tab active-tab'
                      >
                        {
                            banners?.find((item) => item?.id == pathArr?.query?.id)?.name
                        }
                      </div>
                    </div>
                  </div>
                </div>
                {isLoader ? (
                  <div className="row justify-content-center">
                    <div className="col-md-12 loader-cart">
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress style={{ color: "#F54A00" }} />
                      </Box>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <div className="login-form ">
                      <div className="mt-4">
                        <Photo
                          mode="edit"
                          label={"Banner"}
                          accept=".jpg,.jpeg,.png"
                          name="banner_sm_url"
                          size="800x250"
                          img=""
                          setUrl=""
                          value="file-input-icon"
                          urlLink=""
                        />
                      </div>
                    </div>
                    <div className="login-form w-50">
                      <label>Content</label>
                      <textarea
                        name="description"
                        cols="100"
                        rows="5"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DashboardLayoutComponent>
        </main>
      </div>
    </div>
  );
}
