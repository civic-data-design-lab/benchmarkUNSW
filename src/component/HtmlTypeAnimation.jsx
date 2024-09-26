import React from "react";
import { TypeAnimation } from "react-type-animation";

const HtmlTypeAnimation = ({ sequence, ...props }) => {
  const renderSequence = sequence.map((item) => {
    if (typeof item === "string") {
      return <span dangerouslySetInnerHTML={{ __html: item }} />;
    }
    return item;
  });

  return <TypeAnimation sequence={renderSequence} {...props} />;
};

export default HtmlTypeAnimation;
