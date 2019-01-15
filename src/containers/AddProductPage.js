import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ProductActionCreators from '../actions/product';
import DatePicker from 'react-datepicker';
import {formatPrice} from "../utils/string-formatters";

import "react-datepicker/dist/react-datepicker.css";


class AddProductPage extends Component {

    state = {
        name: '',
        description: '',
        price: 0,
        creationDate: new Date()
    };


    addNewProduct = () => {
        this.props.actions.addProduct(
            this.state.name,
            this.state.description,
            this.state.price,
            this.state.creationDate.toLocaleDateString('si-LK')
        );

        this.props.history.push("/");
    };


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
        if (this.props.history.length > 2) {
            this.props.history.goBack();
        } else {
            this.props.history.push("/");
        }
    };

    render() {

        const {
            name,
            description,
            price,
            creationDate,
        } = this.state;

        return (
            <form onSubmit={this.addNewProduct}>
                <h3>Add new product</h3>

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
                        <DatePicker className="form-control " selected={creationDate} dateFormat="dd/MM/yyyy"
                                    onChange={this.handleDateChange} onSelect={this.handleDateChange}/>
                    </div>
                </div>

                <div className="clearfix">
                    <button className="btn btn-secondary" type="button"
                            onClick={this.goBack}>{this.props.history.length > 2 ? 'Go back' : 'Go to Product List'}</button>

                    <button className="btn btn-primary float-right" type="submit">Add</button>
                </div>
            </form>
        )
    }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ProductActionCreators, dispatch)
    };
};


export default connect(null, mapDispatchToProps)(AddProductPage);