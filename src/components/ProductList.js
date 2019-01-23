import React, {Component} from 'react';
import Product from "./Product";
import {removeProduct, removeProductFromLocal} from '../actions/product';
import {connect} from "react-redux";


class ProductList extends Component {

    removeProduct = (id) => {
        if (this.props.storageType === 'firebase') {
            this.props.removeProductFromFirebaseAction(id);
        } else {
            this.props.removeProductFromLocalAction(id);
        }
    };

    createProductItems = () => {
        return this.props.products.map((product, index) => {
            return (
                <div key={index} className="col-xs-6 col-md-4 col-lg-3">
                    <Product
                        index={index}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        creationDate={product.creationDate}
                        removeProduct={this.removeProduct}
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

const mapStateToProps = state => {
    return ({
        storageType: state.storage.storageType
    })
};

// map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        removeProductFromFirebaseAction: (id) => dispatch(removeProduct(id)),
        removeProductFromLocalAction: (id) => dispatch(removeProductFromLocal(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);