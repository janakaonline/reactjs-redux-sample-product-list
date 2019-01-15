import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import ProductListPage from './containers/ProductListPage';
import EditProductPage from './containers/EditProductPage';
import PageNotFound from './containers/PageNotFound';
import AddProductPage from "./containers/AddProductPage";
import ViewProductPage from "./containers/ViewProductPage";


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container pt-5 pb-5">

                    <h1 className="mb-3">Product list</h1>

                    <Switch>
                        <Route exact path="/" component={ProductListPage}/>
                        <Route exact path="/add" component={AddProductPage}/>
                        <Route path="/edit/:id" component={EditProductPage}/>
                        <Route path="/view/:id" component={ViewProductPage}/>
                        <Route component={PageNotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
