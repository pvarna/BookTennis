
import {
    Typography,
  } from "@mui/material";
  
  export const  Copyright = (props) => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        Book Tennis {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  