import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Fragment } from "react";

export const AsyncAutocomplete = ({ label, loading, inputProps, ...props }) => {
  return (
    <Autocomplete
      loading={loading}
      clearOnEscape={false}
      renderInput={(params) => (
        <TextField
          {...inputProps}
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color="primary" size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
      {...props}
    />
  );
};

export default AsyncAutocomplete;
