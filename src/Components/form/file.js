import {
  CircularProgress,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import { FormControl } from "./index";
import { apiAdminConfig } from "../../utils/api";
import { green } from "@mui/material/colors";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const FileBox = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  const {
    name,
    label,
    accept,
    value,
    required,
    inputAdornmentPosition,
    fullWidth,
    helperText,
    disabled,
  } = props;

  const fileUpload = async (e) => {
    setMessage("");
    setError("");
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append("files", file);
    setLoading(true);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await apiAdminConfig
      .post(`/${props.url}`, formData, config)
      .then((response) => {
        const { data } = response;
        console.log("datadtat", data);
        if (response?.data?.code === 200) {
          setLoading(false);
          setMessage(data.message);
          props.onChange(data.data);
        } else {
          setLoading(false);
          setError(data.message);
        }
      })
      .catch((error) => {
        const { response } = error;
        setLoading(false);
        setError(response.data.message);
      });
  };

  return (
    <React.Fragment>
      <input
        style={{ display: "none" }}
        id="document-file"
        type="file"
        accept={accept}
        onChange={(e) => {
          fileUpload(e);
          e.target.value = null;
        }}
      />

      <FormControl
        key={`key${name}`}
        error={helperText ? true : false}
        fullWidth={fullWidth}
        required={required}
      >
        <TextField
          error={helperText || error ? true : false}
          success={error ? false : true}
          name={name}
          label={label}
          type="url"
          readOnly={disabled}
          required={required}
          disabled={disabled}
          value={value}
          onChange={(e) => props.onChange(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position={inputAdornmentPosition}>
                {loading && <CircularProgress size={25} />}
                <label htmlFor="document-file">
                  {!loading && <FileUploadIcon />}
                </label>
              </InputAdornment>
            ),
          }}
        />

        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {error && <FormHelperText>{error}</FormHelperText>}
        {message && (
          <FormHelperText style={{ color: green[500] }}>
            {message}
          </FormHelperText>
        )}
      </FormControl>
    </React.Fragment>
  );
};

export default FileBox;
