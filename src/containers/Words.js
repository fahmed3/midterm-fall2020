import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import parse from "react-html-parser";
import { regions } from "../components/data";

const newsKey = process.env.REACT_APP_NEWS_API_KEY;

function Words() {
  let { id } = useParams();
  const [wordCloud, setWordCloud] = useState(null);
  const [titles, setTitles] = useState("");

  let t = "";

  useEffect(() => {
    axios
      .get(
        `https://api.currentsapi.services/v1/search?apiKey=${newsKey}&category=world&country=${regions[id]}`
      )
      .then(function (response) {
        const d = response.data.news;
        if (d) {
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

  const wordcolors = [];
  useEffect(() => {
    axios
      .get(
        `https://quickchart.io/wordcloud?text=${titles}&removeStopwords=true&minWordLength=4&
        rotation=45&scale=linear&width=1000&case=upper`,
        { params: { colors: wordcolors } }
      )
      .then(function (response) {
        let d = response.data;
        setWordCloud(d);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [titles]);

  if (titles === "") {
    return (
      <div className="wordcloud">
        <h1> Most Talked About in {id} </h1>
        <p> Sorry, looks like there's not enough data for {id} =( </p>
      </div>
    );
  }

  return (
    <div className="wordcloud">
      <h1> Most Talked About in {id} </h1>
      <div> {parse(wordCloud)} </div>
    </div>
  );
}

export default Words;
