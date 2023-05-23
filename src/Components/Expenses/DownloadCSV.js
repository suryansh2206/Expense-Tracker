import React from "react";
import { useSelector } from "react-redux";

// import { FcDownload } from "react-icons/fc";

const DownloadCSV = (props) => {
  const isActivated = useSelector((state) => state.theme.isActivated);

  function makeCSV(rows) {
    let main = [["Id", "Category", "Description", "Expense"]];
    for (let i = 0; i < rows.length; i++) {
      let arr = [];
      for (let [key, value] of Object.entries(rows[i])) {
        arr.push(value);
      }
      main.push(arr);
    }
    return main.map((row) => row.join(",")).join("\n");
  }

  const downloadCSV = () => {
    const csvData = makeCSV(props.data);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <React.Fragment>
      {isActivated && <button onClick={downloadCSV}>Download</button>}
    </React.Fragment>
  );
};

export default DownloadCSV;
