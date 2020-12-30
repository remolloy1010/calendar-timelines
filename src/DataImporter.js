import React from "react";
import CSVReader from "react-csv-reader";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_")
};

  

export function DataImporter({ onDataUpload }) {
    return (
    <div className="container">
            <CSVReader
            cssClass="react-csv-input"
            label="Upload CSV of Timelines Data "
            onFileLoaded={onDataUpload}
            parserOptions={papaparseOptions}
            /> 

            
            </div>)
    
}
