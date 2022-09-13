import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Order(props) {
    const [totalPage, setTotalPage] = useState(props?.totalPage);
    const [downloadPage, setDownloadPage] = useState("select");
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
        setDownloadPageLimit(value);
        props?.handleDownloadPageLimit(value);
    };


    useEffect(() => {
        setTotalPage(props?.totalPage);
    }, [props]);
    return (
        <>
            Enter your specifications to download the order's information list in excel sheet

            <div className="row mt-3">
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
            </div>


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
                    Items Per Page
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
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                                <MenuItem value={200}>200</MenuItem>
                                <MenuItem value={500}>500</MenuItem>
                                <MenuItem value={1000}>1000</MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}