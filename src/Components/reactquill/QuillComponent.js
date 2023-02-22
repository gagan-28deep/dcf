import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function QuillComponent(_props) {
  const [value, setValue] = useState();
  const handleChange = (data) => {
    setValue(data);
    _props.change(data);
  };
  useEffect(() => {
    if (_props && _props.value) {
      setValue(_props.value);
    }
  }, [_props]);

  return <ReactQuill theme="snow" placeholder="Typing..." value={value} onChange={handleChange} />;
}
