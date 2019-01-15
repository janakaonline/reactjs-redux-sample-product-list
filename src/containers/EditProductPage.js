import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ProductActionCreators from '../actions/product';
import DatePicker from 'react-datepicker';
import {stringToDate, formatPrice} from "../utils/string-formatters";

import "react-datepicker/dist/react-datepicker.css";


class EditProductPage extends Component {

    state = {
        id: null,
        name: '',
        description: '',
        price: 0,
        creationDate: null
    };

    componentDidMount() {

        const product = this.props.products.find(product => product.id === parseInt(this.props.match.params.id));

        this.setState({
            id: product.id,
            name: product.name,
            description: product.description,
            price: formatPrice(product.price),
            creationDate: stringToDate(product.creation_date)
        });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleDateChange = (date) => {
        this.setState({
            creationDate: date
        });
    };

    formatPriceInput = (e) => {
        this.setState({
            price: formatPrice(e.target.value)
        });
    };

    goBack = () => {
        if(this.props.history.length > 2){
            this.props.history.goBack();
        }else{
            this.props.history.push("/");
        }
    };

    updateCurrentProduct = (e) => {
        e.preventDefault();
        //console.log(this.state.creationDate.toLocaleDateString('si-LK'));
        this.props.actions.updateProduct(
            this.state.id,
            this.state.name,
            this.state.description,
            this.state.price,
            this.state.creationDate.toLocaleDateString('si-LK')
        )

        this.props.history.push("/");
    };

    render() {

        const {
            id,
            name,
            description,
            price,
            creationDate,
        } = this.state;

        return (
            <form onSubmit={this.updateCurrentProduct}>
                <h3>{name} ({id})</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" value={name || ''}
                           onChange={this.handleInputChange}/>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="10" name="description" className="form-control" value={description || ''}
                              onChange={this.handleInputChange}/>
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input type="text" name="price" className="form-control" value={price || ''}
                           onBlur={this.formatPriceInput} onChange={this.handleInputChange}/>
                </div>

                <div className="form-group">
                    <label>Created date</label>

                    <div>
                        <DatePicker className="form-control " selected={creationDate}
                                    dateFormat="dd-MM-yyyy"
                                    onChange={this.handleDateChange} onSelect={this.handleDateChange}/>
                    </div>
                </div>

                <div className="clearfix">
                    <button className="btn btn-secondary" type="button"
                            onClick={this.goBack}>{this.props.history.length > 2 ? 'Go back' : 'Go to Product List'}</button>
                    <button className="btn btn-primary float-right" type="submit">Update</button>
                </div>
            </form>
        )
    }
}

//map states to props
const mapStateToProps = state => {
    return ({
        products: state
    })
};

// map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ProductActionCreators, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EditProductPage);