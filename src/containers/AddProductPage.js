import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addProduct, saveProductToLocal} from '../actions/product';
import DatePicker from 'react-datepicker';
import {dateToString, formatPrice} from "../utils/string-formatters";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { firebaseConnect } from 'react-redux-firebase'
import {compose} from "redux";

class AddProductPage extends Component {

    state = {
        name: '',
        description: '',
        price: 0,
        creationDate: new Date()
    };


    addNewProduct = (e) => {
        e.preventDefault();
        this.props.addProductAction(
            this.state.name,
            this.state.description,
            this.state.price,
            moment(this.state.creationDate).format('YYYY-MM-DD HH:mm:ss')
        );
        /*this.props.firebase.push('products', {
            ...this.state,
            creationDate: moment(this.state.creationDate).format('YYYY-MM-DD HH:mm:ss'),
            lastUpdated: dateToString()
        });*/

        //this.props.history.push("/");
    };

    saveToLocal = (e) => {
        e.preventDefault();
        this.props.saveProductToLocal(
            null,
            this.state.name,
            this.state.description,
            this.state.price,
            moment(this.state.creationDate).format('YYYY-MM-DD HH:mm:ss'),
        );

        alert('Product is added to your local storage.');
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

                    <div className="float-right">
                        <button className="btn btn-outline-primary mr-2 " type="button" onClick={this.saveToLocal}>Save to
                            Local
                        </button>
                        <button className="btn btn-primary float-right" type="submit">Add</button>
                    </div>
                </div>
            </form>
        )
    }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        addProductAction: (name, description, price, createdAt) => dispatch(addProduct(name, description, price, createdAt)),
        saveProductToLocal: (id, name, description, price, createdAt) => dispatch(saveProductToLocal(id, name, description, price, createdAt))
    };
};

export default compose(
    connect(null, mapDispatchToProps),
    firebaseConnect()
)(AddProductPage);
//export default connect(null, mapDispatchToProps)(AddProductPage);