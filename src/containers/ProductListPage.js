import React, {Component} from 'react';
import ProductList from '../components/ProductList';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {toggleStorage} from '../actions/storage';
import {compose} from 'redux';
import {saveProductToLocal, updateProduct} from "../actions/product";

class ProductListPage extends Component {

    state = {
        storageSwitchFirebase: true
    }

    componentWillMount() {
        console.log(this.props);
        this.setState({
            storageSwitchFirebase: this.props.storageType === 'firebase'
        });
    }

    toggleStorage = (e) => {
        e.preventDefault();
        this.props.toggleStorageAction();
    };

    render() {
        return (
            <div>
                <div className="mb-2">
                    <button className="btn btn-sm btn-secondary" onClick={this.toggleStorage}>Toggle storage to
                        {this.props.storageType === 'firebase' ? <span> Local</span> : <span> Firebase</span>}
                    </button>
                </div>
                <Link className="btn btn-lg btn-primary mb-4" to="/add">Add Product</Link>
                <ProductList products={this.props.products}/>
            </div>
        );
    }
}

//map states to props
const mapStateToProps = state => {
    console.log(state.storage);

    const productList = state.storage.storageType === 'firebase'
        ? state.firestore.ordered.products || []
        : state.product || [];

    return ({
        storageType: state.storage.storageType,
        products: productList
    })
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleStorageAction: () => dispatch(toggleStorage())
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {
            collection: 'products'
        }
    ])
)(ProductListPage);
