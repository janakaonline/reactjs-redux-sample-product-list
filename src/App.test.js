import React from 'react';
import ReactDOM from 'react-dom';
import ProductListPage from './containers/ProductListPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductListPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
