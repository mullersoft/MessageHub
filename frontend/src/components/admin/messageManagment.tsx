import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  fetchMessagesForAdminRequest,
  deleteMessageRequest,
  postMessageRequest,
  updateMessageRequest,
} from "../../store/slices/messageSlice";
import { fetchCategoriesRequest } from "../../store/slices/categorySlice";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { IMessage } from "../../types";

// Type to represent possible shapes of adminMessages state
type AdminMessagesType = IMessage[] | { data: IMessage[] };

const MessageManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { adminMessages, loading, error } = useSelector((state: RootState) => ({
    adminMessages: state.messages.adminMessages as AdminMessagesType,
    loading: state.messages.loading,
    error: state.messages.error,
  }));
  const { categories } = useSelector((state: RootState) => state.categories);
  const [messageText, setMessageText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [editMessageId, setEditMessageId] = useState<string | null>(null);

  // Notification state
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
    dispatch(fetchMessagesForAdminRequest());
  }, [dispatch]);

  const handleCreateMessage = () => {
    if (messageText && selectedCategory) {
      dispatch(
        postMessageRequest({ text: messageText, category: selectedCategory })
      );
      setMessageText("");
      setSelectedCategory("");
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    console.log(`Attempting to delete message with ID: ${messageId}`);
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteMessageRequest(messageId));
    }
  };

  // Use useEffect to handle loading or error states
  useEffect(() => {
    if (!loading && !error) {
      // Check if the delete operation was successful and show notification
      if (notificationMessage) {
        setNotificationMessage("Message deleted successfully");
        setNotificationOpen(true);
      }
    }
  }, [loading, error, notificationMessage]);

  const handleEditMessage = (message: IMessage) => {
    setEditMessageId(message._id);
    setMessageText(message.text);
    setSelectedCategory(message.category._id);
  };

  const handleUpdateMessage = () => {
    if (editMessageId && messageText && selectedCategory) {
      dispatch(
        updateMessageRequest({
          id: editMessageId,
          text: messageText,
          category: selectedCategory,
        })
      );
      setMessageText("");
      setSelectedCategory("");
      setEditMessageId(null);
    }
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  const messages = Array.isArray(adminMessages)
    ? adminMessages
    : (adminMessages as { data: IMessage[] }).data || [];

  return (
    <div>
      <h2>Manage Messages</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <TextField
        label="Message Text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        variant="outlined"
        style={{ marginRight: "10px", width: "300px" }}
      />

      <TextField
        select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        variant="outlined"
        SelectProps={{
          native: true,
        }}
        style={{ marginRight: "10px", width: "300px" }}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </TextField>

      {editMessageId ? (
        <Button
          variant="contained"
          onClick={handleUpdateMessage}
          disabled={loading}
        >
          {loading ? "Loading..." : "Update Message"}
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleCreateMessage}
          disabled={loading}
        >
          {loading ? "Loading..." : "Create Message"}
        </Button>
      )}

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Message Text</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.length > 0 ? (
              messages.map((message: IMessage) => (
                <TableRow key={message._id}>
                  <TableCell>{message.text}</TableCell>
                  <TableCell>{message.category.name}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleEditMessage(message)}
                      sx={{ color: 'blue' }} // Blue color for Edit icon
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteMessage(message._id)}
                      sx={{ color: 'red' }} // Red color for Delete icon
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No messages available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity="success">
          {notificationMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MessageManagement;
