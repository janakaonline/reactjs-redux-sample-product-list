import React, {Component} from 'react';
import Product from "./Product";
import {bindActionCreators} from 'redux';
import * as ProductActionCreators from '../actions/product';
import {connect} from "react-redux";



class ProductList extends Component {
    createProductItems = () => {
        return this.props.products.map((product, index) => {
            return (
                <div  key={index} className="col-xs-6 col-md-4 col-lg-3">
                    <Product
                        index={index}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        creationDate={product.creation_date}
                        removeProduct={this.props.actions.removeProduct}
                    />
                </div>)
        })
    };

    render() {
        return (
            <div className="product-list">
                <div className="row">
                    {this.createProductItems()}
                </div>
            </div>
        )
    }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ProductActionCreators, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(ProductList);