import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { places } from "../components/data";
import Chart from "react-google-charts";
import Countries from "../components/Countries";

const mapKey = process.env.REACT_APP_MAPS_API_KEY;

function Home() {
  const [country, setCountry] = useState("United States");
  const history = useHistory();

  //Formatting to make countries show up on map
  const data = [["Region"]];
  places.forEach((element) => {
    data.push(new Array(element));
  });

  return (
    <div className="Home">
      <h1>Get world news from different parts of the world.</h1>
      <div className="worldmap">
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                history.push(`/wordcloud/${data[selection[0].row + 1]}`);
              },
            },
          ]}
          width={"100%"}
          chartType="GeoChart"
          data={data}
          var
          options={{
            displayMode: "marker",
            backgroundColor: "#7B6B43", //20A4F3
            defaultColor: "#C16200",
            datalessRegionColor: "#E6E8E6",
            legend: "none",
            tooltip: { textStyle: { color: "#A30B37" } },
          }}
          mapsApiKey={`${mapKey}`}
        />
      </div>
      <Countries />
    </div>
  );
}

export default Home;
