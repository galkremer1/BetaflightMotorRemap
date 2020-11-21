import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import moment from "moment";
import SupportModal from "./supportModal";

import "semantic-ui-css/semantic.min.css";
import { Segment, Grid, Button, Input, Checkbox } from "semantic-ui-react";

export default class OpenTxLogHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: 10,
      value: 0,
      adjustedCsvData: {},
      mappedHeaders: [],
      mappedValues: {},
      timeShift: 0,
      isModalOpen: false,
    };
  }

  handleTimeShift(timeShift) {
    this.setState({
      timeShift,
    });
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
      calculateTotalMs(date1.split(":")) -
      calculateTotalMs(date2.split(":")) +
      parseInt(this.state.timeShift);
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
        arr.push(obj);
      }
    });
    return arr;
  }

  handleFileChange(data) {
    this.setState({
      csvFileData: data,
      adjustedCsvData: this.initAdjustedCsvData(data),
    });
  }

  createSrtRows() {
    const { adjustedCsvData, mappedValues } = this.state;
    let csvArray = adjustedCsvData;
    const newline = "\n";
    let srtSequence = "";

    for (let i = 0; i < csvArray.length - 2; i++) {
      debugger;
      if (csvArray[i].timeCode.startsWith("23")) {
        continue;
      }
      debugger;
      const srt = {};
      srt.nr = i + 1 + newline;
      srt.timeCode =
        csvArray[i].timeCode + " --> " + csvArray[i + 1].timeCode + newline;
      let captions = "";
      Object.keys(csvArray[i]).map((key) => {
        if (key !== "timeCode") {
          captions += `${mappedValues[key] ? mappedValues[key] : key} : ${
            csvArray[i][key]
          } `;
        }
      });
      srt.caption = captions + newline;
      srt.newline = newline;
      srtSequence += srt.nr + srt.timeCode + srt.caption + srt.newline;
    }
    this.exportToCsv(srtSequence, "subtitle.srt");
    this.toggleModal();
  }

  exportToCsv(csvFile, filename) {
    var blob = new Blob([csvFile], { type: "text/srt;charset=utf-8;" });
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
          adjustedCsvData[i - 1][target] = element[mappedHeaders[target]];
        } else {
          delete adjustedCsvData[i - 1][target];
        }
      }
    });
    this.setState({ adjustedCsvData });
  }

  toggleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  handleInputOnChange(text, e) {
    const { mappedValues } = this.state;
    mappedValues[text] = e.target.value;
    this.setState({
      ...mappedValues,
    });
  }
  resetForm() {
    this.setState({
      adjustedCsvData: null,
      csvFileData: null,
      timeShift: 0,
    });
    document.getElementById("react-csv-reader-input").value = "";
  }

  render() {
    const { csvFileData, mappedHeaders, isModalOpen, timeShift } = this.state;

    return (
      <Grid padded style={{ width: "100%" }}>
        <Grid.Column width={100}>
          <Segment>
            <CSVReader onFileLoaded={this.handleFileChange.bind(this)} />
            <Input
              onChange={(e) => this.handleTimeShift(e.target.value)}
              placeholder={"Milliseconds"}
              type="number"
              value={timeShift}
              label="Time Shift"
              disabled={!!csvFileData}
            />
          </Segment>
          {csvFileData && (
            <>
              <Button onClick={this.resetForm.bind(this)}>Reset</Button>
              <Segment>
                <div>Choose Elements</div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {Object.keys(mappedHeaders).map((value, i) => {
                    return (
                      <div key={value}>
                        <Checkbox
                          onChange={(e, { checked }) => {
                            this.handleParamChange(value, checked);
                          }}
                          name={value}
                        />
                        <Input
                          onChange={(e) => this.handleInputOnChange(value, e)}
                          placeholder={value}
                        />
                      </div>
                    );
                  })}
                </div>
              </Segment>
              <Button onClick={this.createSrtRows.bind(this)}>
                Export To SRT
              </Button>
            </>
          )}
        </Grid.Column>
        <SupportModal
          isModalOpen={isModalOpen}
          toggleModal={this.toggleModal}
        />
      </Grid>
    );
  }
}
