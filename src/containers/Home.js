import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { regions, places } from "../components/data";
import Chart from "react-google-charts";
import Countries from "../components/Countries";

const newsKey = process.env.REACT_APP_NEWS_API_KEY;
const mapKey = process.env.REACT_APP_MAPS_API_KEY;

function Home() {
  const [newsData, setNewsData] = useState(null);
  const [country, setCountry] = useState("United States");
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `https://api.currentsapi.services/v1/search?apiKey=${newsKey}&category=world&country=${regions[country]}`
      )
      .then(function (response) {
        const d = response.data.news;
        setNewsData(d);
        console.log("response", d);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [country]);

  useEffect(() => {
    const searchParams = history.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const country = urlParams.get("country");
    if (country) {
      setCountry(country);
    }
  }, [history]);

  const data = [["Region"]];
  places.forEach((element) => {
    data.push(new Array(element));
  });
  return (
    <div className="Home">
      <h1>Get world news from different parts of the world.</h1>
      {/* <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              console.log("Selection: ", data[selection[0].row + 1]);
              setCountry(data[selection[0].row + 1]);
            },
          },
        ]}
        height={"100%"}
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
      /> */}
      <h1>Countries</h1>
      <ul>
        {places.map((place, i) => (
          <a href={`/?country=${places[i]}`} key={i}>
            {places[i]}
          </a>
        ))}
      </ul>
    </div>
  );
}

export default Home;
