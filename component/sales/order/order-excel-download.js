import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Order(props) {
    const [totalPage, setTotalPage] = useState(props?.totalPage);
    const [limit, setLimit] = useState(props?.limit);
    const [downloadPage, setDownloadPage] = useState(1);
    const [downloadStatus, setDownloadStatus] = useState("select");
    const [downloadPageLimit, setDownloadPageLimit] = useState("select");
    const [remainingDownPage, setRemainingDownPage] = useState([]);

    function downloadRows() {
        for (let i = 1; i <= totalPage; i++) {
            remainingDownPage[i] = i
        }

    }

    const handleDownloadPageChange = (value) => {
        setDownloadPage(value);
        props?.handleDownloadPage(value);
    };
    const handleDownloadStatusChange = (value) => {
        setDownloadStatus(value);
        props?.handleDownloadStatus(value);
    };
    const handleDownloadPageLimitChange = (value) => {
        // console.log(typeof(value))
        // if (value.match(/^[0-9]$/)) {
        // if ( !== "e" && value !== "." && value !== "-" ) {
            let a = value.replace(/[^\d]/, "")
            setDownloadPageLimit(a);
            props?.handleDownloadPageLimit(a);
        // }
    };
    const ValidateNumber = (value) => {
        return /^[0-9\b]+$/.test(
            // '^[0-9]*$'
            value
        );
      };
    

    useEffect(() => {
        setTotalPage(props?.totalPage);
        setLimit(props?.limit);
    }, [props]);
    return (
        <>
            Enter your specifications to download the order's information list in excel sheet

            {/* <div className="row mt-3">
                <div className="col d-flex align-items-center">
                    Page No
                </div>
                <div className="col">
                    <div className="sort w-100">
                        <div className="sort-by-select-wrapper w-100">
                            <Select
                                disableUnderline
                                variant="standard"
                                autoWidth={false}
                                IconComponent={ExpandMoreIcon}
                                name="status"
                                onChange={(event) => handleDownloadPageChange(event.target.value)}
                                className="sort-by-select w-100"
                                value={downloadPage}
                                style={{ height: "2.34rem" }}
                            >
                                <MenuItem
                                    value={"select"}
                                    disabled
                                    className="field_toggle_checked"
                                >
                                    Select Page No
                                </MenuItem>
                                {downloadRows()}
                                {
                                    remainingDownPage?.map(elem => {
                                        return (
                                            <MenuItem value={elem}>{elem}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                </div>
            </div> */}


            <div className="row mt-3">
                <div className="col d-flex align-items-center">
                    Order Status
                </div>
                <div className="col">
                    <div className="sort w-100">
                        <div className="sort-by-select-wrapper w-100">
                            <Select
                                disableUnderline
                                variant="standard"
                                autoWidth={false}
                                IconComponent={ExpandMoreIcon}
                                name="status"
                                onChange={(event) => handleDownloadStatusChange(event.target.value)}
                                className="sort-by-select w-100"
                                value={downloadStatus}
                                style={{ height: "2.34rem" }}
                            >
                                <MenuItem
                                    value={"select"}
                                    disabled
                                    className="field_toggle_checked"
                                >
                                    Select Status
                                </MenuItem>
                                <MenuItem value={"latest"}>All</MenuItem>
                                <MenuItem value={"placed"}>Placed</MenuItem>
                                <MenuItem value={"payment_pending"}>Payment Pending</MenuItem>
                                <MenuItem value={"shipped"}>Shipped</MenuItem>
                                <MenuItem value={"delivered"}>Delivered</MenuItem>
                                <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col d-flex align-items-center">
                    No of Records
                </div>
                <div className="col">
                    <div className="login-form ">
                        {/* <label>
                          Display Order<span className="mandatory-star">*</span>
                        </label> */}
                        <input
                            type="number"
                            min="0"
                            value={downloadPageLimit}
                            onChange={(event) => handleDownloadPageLimitChange(event.target.value)}
                        />
                    </div>

                    {/* <div className="sort w-100">
                        <div className="sort-by-select-wrapper w-100">
                            <input type="number" value={downloadPageLimit} onChange={(event) => handleDownloadPageLimitChange(event.target.value)} />
                            <Select
                                disableUnderline
                                variant="standard"
                                autoWidth={false}
                                IconComponent={ExpandMoreIcon}
                                name="status"
                                onChange={(event) => handleDownloadPageLimitChange(event.target.value)}
                                className="sort-by-select w-100"
                                value={downloadPageLimit}
                                style={{ height: "2.34rem" }}
                            >
                                <MenuItem
                                    value={"select"}
                                    disabled
                                    className="field_toggle_checked"
                                >
                                    Select No of Records
                                </MenuItem>
                                {
                                    limit === 15 ?
                                        <>
                                            <MenuItem value={15}>15</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                            <MenuItem value={100}>100</MenuItem>
                                            <MenuItem value={200}>200</MenuItem>
                                            <MenuItem value={500}>500</MenuItem>
                                            <MenuItem value={1000}>1000</MenuItem>
                                        </>
                                        :
                                        limit === 50 ?
                                            <>
                                                <MenuItem value={50}>50</MenuItem>
                                                <MenuItem value={100}>100</MenuItem>
                                                <MenuItem value={200}>200</MenuItem>
                                                <MenuItem value={500}>500</MenuItem>
                                                <MenuItem value={1000}>1000</MenuItem>
                                            </>
                                            :
                                            limit === 100 ?
                                                <>
                                                    <MenuItem value={100}>100</MenuItem>
                                                    <MenuItem value={200}>200</MenuItem>
                                                    <MenuItem value={500}>500</MenuItem>
                                                    <MenuItem value={1000}>1000</MenuItem>
                                                </>
                                                :
                                                limit === 200 ?
                                                    <>
                                                        <MenuItem value={200}>200</MenuItem>
                                                        <MenuItem value={500}>500</MenuItem>
                                                        <MenuItem value={1000}>1000</MenuItem>
                                                    </>

                                                    :
                                                    limit === 500 ?
                                                        <>
                                                            <MenuItem value={500}>500</MenuItem>
                                                            <MenuItem value={1000}>1000</MenuItem>
                                                        </>
                                                        :
                                                        <>
                                                            <MenuItem value={1000}>1000</MenuItem>
                                                        </>

                                }
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                                <MenuItem value={200}>200</MenuItem>
                                <MenuItem value={500}>500</MenuItem>
                                <MenuItem value={1000}>1000</MenuItem>
                            </Select>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}