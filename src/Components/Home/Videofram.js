import React from "react";

const Videofram = (value) => {
    console.log("Videofram---->",value);
  var url = `https://www.youtube.com/embed/${value.id}`;
  return (
    <div className="ratio ratio-16x9">
      <iframe src={url} title="YouTube video" allowfullscreen></iframe>
    </div>
  );
};
export default Videofram;
