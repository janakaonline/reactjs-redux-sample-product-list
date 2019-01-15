import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {formatNL2BR, formatPrice, stringToDate} from '../utils/string-formatters'

class Product extends Component {


    confirmRemove = () => {
        if (window.confirm("Do you want to remove this product?")) {
            this.props.removeProduct(this.props.index)
        }
    };

    render() {
        const {
            id,
            name,
            price,
            description,
            creationDate
        } = this.props;

        return (

            <div className="card product-item">
                <div className="card-body">
                    <Link className="link product-link"  to={`/view/${id}`} >
                        <h5 title={name} className="card-title text-truncate">{name}</h5>
                        <p className="card-text mb-2"
                           dangerouslySetInnerHTML={{__html: formatNL2BR(description)}}/>
                        <div className="text-right mb-1">${formatPrice(price)}</div>
                        <div className="created-at text-right">Created on : {stringToDate(creationDate).toLocaleDateString()}</div>
                    </Link>
                    <hr/>
                    <div className="d-flex justify-content-between ">
                        <button onClick={this.confirmRemove}
                                className="btn btn-sm btn-danger">Remove
                        </button>
                        <Link to={`/edit/${id}`} className="btn btn-sm btn-warning">Edit</Link>
                        <Link to={`/view/${id}`} className="btn btn-sm btn-primary">View</Link>
                    </div>
                </div>
            </div>

        )
    }
}

export default Product;