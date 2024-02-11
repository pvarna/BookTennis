import { ErrorType } from "../../components/error-page/constants";
import { ErrorPage } from "../../components/error-page/error-page";
import { Page } from "../../components/page/page";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import ChatLayout from "./components/chat-layout";
import { Box, Grid, Paper, Typography } from "@mui/material";

export const Chat = () => {
  const user = useCurrentUser()

  if(!user){
    return <ErrorPage type={ErrorType.AccessDenied}/>
  }
  return (
    <Page>
      <Grid item xs={12} component={Paper} elevation={3} square>
        <Box
          sx={{
            my: 6,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3" color="#EE7214">
            Chat with other users
          </Typography>
        </Box>
      </Grid>
      <ChatLayout />
    </Page>
  );
};
