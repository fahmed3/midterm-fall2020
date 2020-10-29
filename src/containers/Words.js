import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import parse from "react-html-parser";
import { regions } from "../components/data";

const newsKey = process.env.REACT_APP_NEWS_API_KEY;

function Words() {
  let { id } = useParams();
  const [newsData, setNewsData] = useState(null);
  const [wordCloud, setWordCloud] = useState(null);
  const [titles, setTitles] = useState(null);

  let t = "";

  useEffect(() => {
    axios
      .get(
        `https://api.currentsapi.services/v1/search?apiKey=${newsKey}&category=world&country=${regions[id]}`
      )
      .then(function (response) {
        const d = response.data.news;
        if (d) {
          setNewsData(d);
          d.map((article, i) => {
            t += d[i].title + " ";
          });
          setTitles(t);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://quickchart.io/wordcloud?text=${titles}&removeStopwords=true&minWordLength=4&
        rotation=45&scale=sqrt&width=1000&case=upper`
      )
      .then(function (response) {
        let d = response.data;
        setWordCloud(d);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [titles]);

  return (
    <div className="wordcloud">
      <h1> Most Talked About in {id} </h1>
      <div> {parse(wordCloud)} </div>
    </div>
  );
}

export default Words;
