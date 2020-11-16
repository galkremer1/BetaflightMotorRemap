import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import moment from "moment";
import "semantic-ui-css/semantic.min.css";
import {
  Segment,
  Grid,
  Label,
  Input,
  Icon,
  Menu,
  Table,
  Checkbox,
} from "semantic-ui-react";
import styled from "styled-components";

const MaterialInput = styled(Input)`
  border: unset;
`;

export default class OpenTxLogHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: 10,
      value: 0,
      adjustedCsvData: {},
      mappedHeaders: [],
    };
  }

  calculateTimeCode(date1, date2) {
    if (!date1 || !date2) {
      return;
    }

    function calculateTotalMs(time) {
      const timeObj = {
        hour: parseInt(time[0]),
        minute: parseInt(time[1]),
        second: Math.floor(parseFloat(time[2])),
        millisecond: parseFloat(time[2]) - Math.floor(parseFloat(time[2])),
      };
      return (
        (timeObj.hour * 60 * 60 + timeObj.minute * 60 + timeObj.second) * 1000 +
        timeObj.millisecond
      );
    }

    const diff =
      calculateTotalMs(date1.split(":")) - calculateTotalMs(date2.split(":"));
    return moment.utc(Math.round(diff)).format("HH:mm:ss,SSS");
  }

  initAdjustedCsvData(data) {
    const arr = [];
    const mappedHeaders = {};
    let initialTime;
    data.forEach((element, i) => {
      if (i === 0) {
        element.forEach((header, i) => {
          mappedHeaders[header] = i;
        });
        this.setState({
          mappedHeaders,
        });
      } else {
        if (i === 1) {
          initialTime = element[mappedHeaders["Time"]];
        }
        const obj = {
          timeCode: this.calculateTimeCode(
            element[mappedHeaders["Time"]],
            initialTime
          ),
        };
        Object.keys(mappedHeaders).forEach((value) => {
          obj[value] = element[mappedHeaders[value]];
        });
        arr.push(obj);
      }
    });
    return arr;
  }

  handleFileChange(data, fileInfo) {
    this.setState({
      csvFileData: data,
      adjustedCsvData: this.initAdjustedCsvData(data),
    });
  }

  createSrtRows() {
    const { adjustedCsvData, mappedHeaders } = this.state;
    let csvArray = adjustedCsvData;
    const newline = "\n";
    let srtSequence = "";

    for (let i = 0; i < csvArray.length - 1; i++) {
      const srt = {};
      srt.nr = i + 1 + newline;
      srt.timeCode =
        csvArray[i].timeCode + " --> " + csvArray[i + 1].timeCode + newline;
      let captions = "";
      Object.keys(csvArray[i]).map((key) => {
        captions += `${key} : ${csvArray[i][key]} `;
      });
      srt.caption = captions + newline;
      srt.newline = newline;
      srtSequence += srt.nr + srt.timeCode + srt.caption + srt.newline;
    }
    this.exportToCsv(srtSequence, "test.srt");
    return srtSequence;
  }

  exportToCsv(csvFile, filename) {
    var blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  handleParamChange(target, isChecked) {
    const { csvFileData, adjustedCsvData, mappedHeaders } = this.state;
    csvFileData.forEach((element, i) => {
      if (i > 0 && i < csvFileData.length - 1) {
        if (isChecked) {
          adjustedCsvData[i][target] = element[mappedHeaders[target]];
        } else {
          delete adjustedCsvData[i][target];
        }
      }
    });
    this.setState({ adjustedCsvData });
  }

  render() {
    const { csvFileData, mappedHeaders } = this.state;

    return (
      <Grid padded style={{ width: "100%" }}>
        <Grid.Column width={100}>
          <Segment>
            <CSVReader onFileLoaded={this.handleFileChange.bind(this)} />
          </Segment>
          {csvFileData && (
            <>
              {" "}
              <Segment>
                <div>Choose Elements</div>
                {Object.keys(mappedHeaders).map((value) => {
                  return (
                    <Checkbox
                      key={value}
                      onChange={(e, { checked }) => {
                        this.handleParamChange(value, checked);
                      }}
                      name={value}
                      label={value}
                      defaultChecked
                    />
                  );
                })}
              </Segment>
              <button onClick={this.createSrtRows.bind(this)}>SRT</button>
            </>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
