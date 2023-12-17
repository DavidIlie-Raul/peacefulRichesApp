import React from "react";

const TruncateText = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

export default TruncateText;
