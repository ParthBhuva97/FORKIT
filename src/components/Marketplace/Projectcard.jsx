import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {LuShoppingCart} from "react-icons/lu"

import * as cheerio from "cheerio";

const Projectcard = ({ project }) => {
  const html = atob(project.readme);
  const [title, setTitle] = useState("");
  const [languages, setLanguages] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(html, "text/html");

    // Extract the title (from the first h1 element)
    const titleElement = parsedHtml.querySelector("h1");
    if (titleElement) {
      setTitle(titleElement.textContent);
    }

    // Extract the languages (from the text of the second h2 element)
    const languagesElement = parsedHtml.querySelector("h2");
    if (languagesElement) {
      const languagesText = languagesElement.textContent.replace(
        "Languages: ",
        ""
      );
      
      setLanguages(languagesText);
    }

    // Extract the description (from the text of the third h3 element)
    const descriptionElement = parsedHtml.querySelector("h3");
    if (descriptionElement) {
      setDescription(descriptionElement.textContent);
    }
  }, [html]);

  return (
    <div className="shadow-md rounded-lg p-5 flex flex-col items-start justify-start gap-3">
      <h1 className="font-bold text-indigo-500 text-xl">{title}</h1>
      <div>
        <h2 className="font-bold">Languages: </h2>
        <p className="font-bold text-gray-500">{languages}</p>
      </div>
      <div>
        <h2 className="font-bold">Description: </h2>
        <p className="font-bold text-gray-500">{description}</p>
      </div>
      <div className="flex items-end justify-end w-full">
        <div className="flex items-center justify-center gap-3 p-3 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer">
          <LuShoppingCart />

          <h1>Buy Project</h1>
        </div>
      </div>
      {/* <ReactMarkdown>
        {title}
        
      </ReactMarkdown> */}
    </div>
  );
};

export default Projectcard;
