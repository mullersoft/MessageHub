import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import CategoryList from "./components/CategoryList";
import MessageList from "./components/MessageList";
import PostMessage from "./components/PostMessage";
import Header from "./components/Header";
import AdminHome from "./components/admin/AdminHome";
import CategoryManagement from "./components/admin/categoryManagment";
import MessageManagement from "./components/admin/messageManagment";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<CategoryList />} />
            <Route
              path="/categories/:categoryId/messages"
              element={<MessageList />}
            />
            <Route path="/post-message" element={<PostMessage />} />
            {/* Admin Panel Routes */}
            <Route path="/admin" element={<AdminHome />}>
              <Route path="categories" element={<CategoryManagement />} />
              <Route path="messages" element={<MessageManagement />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
