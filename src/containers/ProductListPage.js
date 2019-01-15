import React, {Component} from 'react';
import ProductList from '../components/ProductList';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class ProductListPage extends Component {
    render() {
        return (
            <div>
                <Link className="btn btn-lg btn-primary mb-4" to="/add">Add Product</Link>
                <ProductList products={this.props.products}/>
            </div>
        );
    }
}

//map states to props
const mapStateToProps = state => {
    return ({
        products: state
    })
};


export default connect(mapStateToProps)(ProductListPage);
