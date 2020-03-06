import React, { Component } from "react";
import config from "../../config";
import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition
} from "griddle-react";

export default class Jobs extends Component {
  state = {
    body: [],
    loading: true
  };
  componentDidMount() {
    fetch(`${config.serverHost}/backend/admin/all-jobs`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          body: data
        });
      });
  }

  render() {
    console.log(this.state.body);
    return (
      <div className="all-jobs containers">
        <div className="head-title">
          <h1>All Jobs</h1>
          {this.state.body.length == 0 ? <div className="loader" /> : null}
        </div>
        <hr className="admin-hr" />
        <div className="all-box">
          <Griddle
            data={this.state.body}
            plugins={[plugins.LocalPlugin]}
            pageProperties={{ pageSize: 30 }}
          >
            <RowDefinition>
              <ColumnDefinition id="id" title="id" order={1}></ColumnDefinition>
              <ColumnDefinition
                id="jobid"
                title="JobID"
                order={2}
              ></ColumnDefinition>
              <ColumnDefinition
                id="custID"
                title="custID"
                order={3}
              ></ColumnDefinition>
              <ColumnDefinition
                id="manufacturer"
                title="Manufacturer"
                order={4}
              ></ColumnDefinition>
              <ColumnDefinition
                id="itemDesc"
                title="Item"
                order={5}
              ></ColumnDefinition>
              <ColumnDefinition
                id="modelNo"
                title="Model"
                order={6}
              ></ColumnDefinition>
              <ColumnDefinition
                id="serialNo"
                title="Serial"
                order={7}
              ></ColumnDefinition>
              <ColumnDefinition
                id="faultDesc"
                title="Fault"
                order={8}
                width={200}
              ></ColumnDefinition>
              <ColumnDefinition
                id="jobType"
                title="Type"
                order={9}
              ></ColumnDefinition>
              <ColumnDefinition
                id="jobStatus"
                title="Status"
                order={10}
              ></ColumnDefinition>
              <ColumnDefinition
                id="quote"
                title="Quote"
                order={11}
              ></ColumnDefinition>
            </RowDefinition>
          </Griddle>
        </div>
      </div>
    );
  }
}
