import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import BrandList from "../../component/catalog/brand/brand-list";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import BrandsApi from "../../services/brands";
import { useRouter } from "next/router";

export default function Brand() {
    const pathArr = useRouter();
    const [brands, setBrands] = useState([]);
    const [wordEntered, setWordEntered] = useState(
      pathArr.query?.q ? pathArr.query?.q : ""
    );
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const handleKeyPress = (event) => {
        let router_query_object = {};
        if (wordEntered !== "") {
          router_query_object["q"] = wordEntered;
        }
        if (event.key === "Enter") {
          Router.push({
            pathname: "/brand",
            query: router_query_object,
          });
          setCurrentPage(1)
          brandList(1, wordEntered);
        }
      };

      const handleClickPress = (event) => {
        let router_query_object = {};
        if (wordEntered !== "") {
          router_query_object["q"] = wordEntered;
        }
          Router.push({
            pathname: "/brand",
            query: router_query_object,
          });
          setCurrentPage(1)
          brandList(1, wordEntered);
      };

      const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
		if (event.target.value === "") {
			Router.push({
				pathname: "/brand",
				query: "",
			});
			brandList(1, "");
		}
      };
    
      let onPageChange = function (e, page) {
        setCurrentPage(page)
        brandList(page,wordEntered)
      };
    
      const brandList = (page, search) => {
        BrandsApi.BrandsList(page, search)
          .then((response) => {
            setBrands(response.data.data.list);
            setTotalPage(Math.ceil(response.data.data.total/response.data.data.page_size));
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
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        brandList(currentPage, "");
    }, []);
    return (
        <div page-component="category-page">
            <Head>
                <title>{APP_NAME} - Brand</title>
                <meta name="description" content="Trusted Brands. Better Health." />
                <link rel="icon" href="/fitcart.ico" />
            </Head>

            <main>
                <DashboardLayoutComponent>
                    <div className="row border-box">
                        <div className="col-md-6">
                            <div className="hamburger">
                                <span>Catalog / </span>Brand
                            </div>
                            <div className="page-name">Brand</div>
                        </div>
                        <div className="col-md-4">
                            <div className="login-form ">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="search-box"
                                    value={wordEntered}
                                    onChange={handleFilter}
                                    onKeyPress={handleKeyPress}
                                />
                                <SearchIcon className="search-icon point-but" onClick={handleClickPress}/>
                            </div>
                        </div>
                        <div className="col-md-2 btn-save">
                            <div
                                className="custom-btn "
                                onClick={() => {
                                    Router.push(`/brand/create`);
                                }}
                            >
                                <span>Add New </span>
                            </div>
                        </div>
                    </div>
                    <div className="row sticky-scroll scroll">
                        <div className="col-md-12 ">
                            <BrandList brands={brands} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="pagiantion-category">
                                <Pagination
                                    className="pagination"
                                    page={currentPage}
                                    count={totalPage}
                                    onChange={onPageChange}
                                />
                            </div>
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </main>
        </div>
    );
}
