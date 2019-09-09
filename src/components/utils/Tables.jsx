import React from "react";
import JobItem from "./JobItem";

const Tables = props => {
  return (
    <div className="all-box">
      <table className="table">
        {props.headers.map(header => {
          return <th>{header}</th>;
        })}
        {props.body
          ? props.body.map(item => {
              return (
                <JobItem
                  pickups={true}
                  data={Object.values(item)}
                  custID={props.custID}
                />
              );
            })
          : null}
      </table>
    </div>
  );
};

export default Tables;
