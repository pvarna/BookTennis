// ChatLayout.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Paper,
  CircularProgress,
  Button,
  Box,
  List,
  ListItem,
  Typography,
  TextField,
} from "@mui/material";
import { userService } from "../../../services/user-service";
import { useAsyncAction } from "../../../hooks/use-async-action";
import { Flex } from "../../../components/flex";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { ErrorPage } from "../../../components/error-page/error-page";
import { ErrorType } from "../../../components/error-page/constants";
import SendIcon from "@mui/icons-material/Send";
import { messageService } from "../../../services/message-service";
import { DateTime } from "luxon";
import { ErrorContainer } from "../../../components/error-container";

const ChatLayout = () => {
  const user = useCurrentUser();
  const [users, setUsers] = useState([]);
  const [wasStartChattingClicked, setStartChattingClicked] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const {
    error,
    loading,
    trigger: loadUsers,
  } = useAsyncAction(async (event) => {
    event.preventDefault();

    const users = await userService.loadAllUsers();
    const filteredUsers = users.filter((u) => u.id !== user.id);
    setUsers(filteredUsers);
    setStartChattingClicked(true);
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleUserSelect = async (userId) => {
    setSelectedUser(userId);

    const allMessages = await messageService.loadMessagesBetweenUsers(
      user.id,
      userId
    );

    setMessages(allMessages);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const sentMessage = await messageService.sendMessageBetweenUsers(
      user.id,
      selectedUser,
      newMessage,
      DateTime.now()
    );

    // Trigger socket
    setNewMessage("");
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [selectedUser]);

  if (!user) {
    return <ErrorPage type={ErrorType.AccessDenied} />;
  }
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Flex
      flexDirection="column"
      gap="10px"
      sx={{ padding: "20px", width: "100%" }}
    >
      {!wasStartChattingClicked && (
        <Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#EE7214", width: "200px" }}
            onClick={loadUsers}
          >
            Start chatting
          </Button>
        </Box>
      )}

      <Grid container spacing={2}>
        {/* Users List */}
        {wasStartChattingClicked && (
          <>
            <Grid item xs={3}>
              <Paper>
                <Typography variant="h4">Users</Typography>
                <List>
                  {users.map((u) => (
                    <ListItem
                      key={u.id}
                      onClick={() => handleUserSelect(u.id)}
                      sx={{
                        cursor: "pointer",
                        padding: "10px",
                        backgroundColor:
                          u.id === selectedUser ? "#f0f0f0" : "inherit",
                      }}
                    >
                      {u.email}
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            {/* Chat */}
            <Grid item xs={9}>
              <Paper style={{ position: "relative", height: "600px" }}>
                <div
                  ref={chatContainerRef}
                  style={{
                    padding: "20px",
                    minHeight: "calc(100% - 70px)",
                    maxHeight: "calc(100% - 70px)",
                    overflowY: "scroll", // Enable vertical scrolling
                    display: "flex",
                    flexDirection: "column-reverse",
                  }}
                >
                  <div style={{ marginBottom: "20px" }}>
                    {selectedUser && messages.length > 0 && (
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {messages.map((mes) => (
                          <li
                            key={mes.id}
                            style={{
                              marginBottom: "10px",
                              padding: "10px",
                              borderRadius: "5px",
                              color:
                                mes.user1Id === user.id ? "white" : "black",
                              backgroundColor:
                                mes.user1Id === user.id ? "#EE7214" : "#f0f0f0",
                              alignSelf:
                                mes.user1Id === user.id
                                  ? "flex-end"
                                  : "flex-start",
                              maxWidth: "70%",
                              wordWrap: "break-word",
                              marginLeft:
                                mes.user1Id === user.id ? "auto" : "inherit", // Align right for current user's messages
                              marginRight:
                                mes.user1Id === user.id ? "inherit" : "auto", // Align left for other user's messages
                            }}
                          >
                            <div>{mes.data}</div>
                            <div
                              style={{
                                fontSize: "0.8rem",
                                color:
                                  mes.user1Id === user.id ? "black" : "gray",
                              }}
                            >
                              {new Date(mes.time).toLocaleDateString("en-US") +
                                " " +
                                new Date(mes.time).toLocaleTimeString("en-US")}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    {selectedUser && (!messages || messages.length === 0) && (
                      <Typography variant="body2" color="textSecondary">
                        Send a message to start the conversation
                      </Typography>
                    )}
                    {!selectedUser && (
                      <Typography variant="body2" color="textSecondary">
                        Select a user to start chatting
                      </Typography>
                    )}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      width: "90%",
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <TextField
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      label="Type a message"
                      variant="outlined"
                      fullWidth
                      style={{ marginRight: "10px" }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleSendMessage}
                      disabled={!selectedUser}
                      endIcon={<SendIcon />}
                      style={{
                        backgroundColor: "#EE7214",
                        color: "white",
                        height: "100%",
                      }}
                    />
                  </div>
                </div>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
      {!!error?.message && <ErrorContainer error={error.message} />}
    </Flex>
  );
};

export default ChatLayout;
