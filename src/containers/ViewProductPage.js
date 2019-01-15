import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatNL2BR, formatPrice, stringToDate} from "../utils/string-formatters";


class ViewProductPage extends Component {

    state = {
        id: null,
        name: '',
        description: '',
        price: 0,
        creationDate: ''
    };


    goBack = () => {
        if (this.props.history.length > 2) {
            this.props.history.goBack();
        } else {
            this.props.history.push("/");
        }
    };

    componentDidMount() {

        const product = this.props.products.find(product => product.id === parseInt(this.props.match.params.id));

        this.setState({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            creationDate: product.creation_date
        });
    }

    render() {

        const {
            id,
            name,
            description,
            price,
            creationDate,
        } = this.state;

        return (
            <div className="card product-item">
                <h3 className="card-header">{name} <span className="small">(#{id})</span></h3>

                <div className="card-body">
                    <p dangerouslySetInnerHTML={{__html: formatNL2BR(description)}}/>

                    <div className="price-tag mb-2">
                        <span>Price:</span> <span className="price">${formatPrice(price)}</span>
                    </div>

                    <div className="created-at mb-3">Created on : {stringToDate(creationDate).toLocaleDateString()}</div>

                    <button className="btn btn-secondary" type="button"
                            onClick={this.goBack}>{this.props.history.length > 2 ? 'Go back' : 'Go to Product List'}</button>
                </div>


            </div>
        )
    }
}

//map states to props
const mapStateToProps = state => {
    return ({
        products: state
    })
};

export default connect(mapStateToProps)(ViewProductPage);