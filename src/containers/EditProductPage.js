import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateProduct, saveProductToLocal, syncLocalToFirebase} from '../actions/product';
import DatePicker from 'react-datepicker';
import {stringToDate, formatPrice} from "../utils/string-formatters";
import "react-datepicker/dist/react-datepicker.css";
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import moment from 'moment';
import {capilatizeFirstLetter} from '../utils/string-formatters';
import {Link} from 'react-router-dom';


class EditProductPage extends Component {

    state = {
        loading: true,
        pageNotFound: false,
        product: {
            id: null,
            name: '',
            description: '',
            price: 0,
            creationDate: new Date()
        }
    };


    componentWillMount() {
        const id = this.props.match.params.id;

        console.log(this.props);

        if (this.props.storageType === 'firebase') {
            this.props.firestore.collection('products').doc(id).get().then(product => {
                if (product.exists) {
                    this.setState({
                        product: {
                            ...product.data(),
                            id: this.props.match.params.id
                        },
                        loading: false
                    });

                }else{
                    this.setState({
                        loading: false,
                        pageNotFound: true
                    });
                }
                //console.log(product);
            });
        } else {
            if(this.props.localProduct) {
                this.setState({
                    product: {
                        ...this.props.localProduct
                    },
                    loading: false
                });
            }else{
                this.setState({
                    loading: false,
                    pageNotFound: true
                });
            }
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((oldState) => {
            return ({
                ...oldState,
                product: {
                    ...oldState.product,
                    [name]: value
                }
            })
        });
    };

    handleDateChange = (date) => {
        this.setState((oldState) => {
            return ({
                ...oldState,
                product: {
                    ...oldState.product,
                    creationDate: date
                }
            })
        });
    };

    formatPriceInput = (e) => {
        const newValue = formatPrice(e.target.value);
        this.setState((oldState) => {
            console.log(e);
            return ({
                ...oldState,
                product: {
                    ...oldState.product,
                    price: newValue
                }
            })
        });
    };

    goBack = () => {
        if (this.props.history.length > 2) {
            this.props.history.goBack();
        } else {
            this.props.history.push("/");
        }
    };

    updateCurrentProduct = (e) => {
        e.preventDefault();
        //console.log(this.state.creationDate.toLocaleDateString('si-LK'));


        if(this.props.storageType === 'local'){
            this.props.syncLocalToFirebaseAction(
                this.state.product.id,
                this.state.product.name,
                this.state.product.description,
                this.state.product.price,
                moment(this.state.creationDate).format('YYYY-MM-DD HH:mm:ss')
            )
        }else{
            this.props.updateProductAction(
                this.state.product.id,
                this.state.product.name,
                this.state.product.description,
                this.state.product.price,
                moment(this.state.product.creationDate).format('YYYY-MM-DD HH:mm:ss')
            );
        }

        this.props.history.push("/");
    };

    saveToLocal = (e) => {
        e.preventDefault();
        this.props.saveProductToLocalAction(
            this.state.product.id,
            this.state.product.name,
            this.state.product.description,
            this.state.product.price,
            moment(this.state.creationDate).format('YYYY-MM-DD HH:mm:ss'),
            this.state.fromFirebase !== false
        );

        alert('product saved to local');
    };

    render() {

        if (this.state.loading) {
            return (
                <div className="alert alert-info">Loading... Please wait.</div>
            )
        }else if(this.state.pageNotFound){
            return (
                <div>
                    <div className="alert alert-danger">
                        <div>
                        Sorry! we cannot find a product with the ID of ({this.props.match.params.id})
                        in {capilatizeFirstLetter(this.props.storageType)} storage
                        </div>

                        <Link to="/" className="btn btn-link">Back to Product list</Link>
                    </div>

                </div>
            )
        } else {

            const {
                id,
                name,
                description,
                price,
                creationDate,
            } = this.state.product;

            return (
                <form onSubmit={this.updateCurrentProduct}>
                    <h3>{name} ({id})</h3>

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" className="form-control"
                               value={name || ''} onChange={this.handleInputChange}/>
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
                            <DatePicker className="form-control " selected={stringToDate(creationDate)}
                                        dateFormat="dd-MM-yyyy"
                                        onChange={this.handleDateChange} onSelect={this.handleDateChange}/>
                        </div>
                    </div>

                    <div className="clearfix">
                        <button className="btn btn-secondary" type="button"
                                onClick={this.goBack}>{this.props.history.length > 2 ? 'Go back' : 'Go to Product List'}</button>

                        <div className="float-right">
                            <button className="btn btn-outline-primary mr-2 " type="button"
                                    onClick={this.saveToLocal}>Save to
                                Local
                            </button>

                            {this.props.storageType === 'firebase' ?
                                (<button className="btn btn-primary float-right" type="submit">Update</button>)
                                :
                                (<button className="btn btn-primary float-right" type="submit">Upload to firebase</button>)
                            }
                        </div>
                    </div>
                </form>
            )
        }
    }
}

//map states to props
const mapStateToProps = (state, thisProps) => {
    const productId = thisProps.match.params.id;
    return ({
        storageType: state.storage.storageType,
        localProduct: state.product.find(product => {
            return product.id === productId;
        })
    })
};

// map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        updateProductAction: (id, name, description, price, createdAt) => dispatch(updateProduct(id, name, description, price, createdAt)),
        saveProductToLocalAction: (id, name, description, price, createdAt, fromFirebase) => dispatch(saveProductToLocal(id, name, description, price, createdAt, fromFirebase)),
        syncLocalToFirebaseAction: (id, name, description, price, createdAt, fromFirebase) => dispatch(syncLocalToFirebase(id, name, description, price, createdAt, fromFirebase))
    };
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {
            collection: 'products'
        }
    ])
)(EditProductPage);