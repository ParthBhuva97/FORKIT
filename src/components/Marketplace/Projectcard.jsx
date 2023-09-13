import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Projectcard = ({ project }) => {

  return (
    <div className=" shadow-[35px_35px_35px_35px_rgba(255,255,255,1)] p-5">
      <ReactMarkdown remarkPlugins={[gfm]}>
        {atob(project.readme)}
      </ReactMarkdown>
    </div>
  );
};

export default Projectcard;
