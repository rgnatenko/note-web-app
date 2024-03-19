import React from 'react';
import { Provider } from 'react-redux';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import store from './redux/store/store';
import App from './App';
import { HomePage } from './pages/HomePage';
import { CreateForm } from './components/CreateForm/CreateForm';

export const Routing: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={(
        <Provider store={store}>
          <App />
        </Provider>
      )}>
        <Route index element={<HomePage />} />
        <Route path="create" element={<CreateForm />}></Route>
        <Route path="update/:noteId" element={<CreateForm />}></Route>
      </Route>
    </Routes>
  </Router>
);
