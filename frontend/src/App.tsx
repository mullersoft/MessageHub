import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import CategoryList from './components/CategoryList';
import MessageList from './components/MessageList';
import MessageDetail from './components/MessageDetail';
import CategoryDetail from './components/CategoryDetail';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<CategoryList />} />
            <Route path="/messages" element={<MessageList />} />
            <Route path="/messages/:messageId" element={<MessageDetail />} />
            <Route path="/categories/:categoryId" element={<CategoryDetail />} />
            <Route path="/categories/:categoryId/messages" element={<MessageList />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
