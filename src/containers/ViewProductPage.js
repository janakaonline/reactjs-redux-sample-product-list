import React, {Component} from 'react';
import {connect} from 'react-redux';
import {capilatizeFirstLetter, formatNL2BR, formatPrice, stringToDate} from "../utils/string-formatters";
import {Link} from 'react-router-dom';
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";


class ViewProductPage extends Component {

    state = {
        versionType: this.props.storageType,
        pageNotFound: false,
        loading: true,
        product: {
            id: null,
            name: '',
            description: '',
            price: 0,
            creationDate: new Date()
        },
        productLocal: null,
        productFirebase: null,
    };


    goBack = () => {
        if (this.props.history.length > 2) {
            this.props.history.goBack();
        } else {
            this.props.history.push("/");
        }
    };

    componentWillMount() {
        const id = this.props.match.params.id;

        this.setState((oldState) => {
            return (
                {
                    ...oldState,
                    productLocal: this.props.localProduct
                }
            )
        });

        this.props.firestore.collection('products').doc(id).get().then(product => {
            if (product.exists) {
                this.setState((oldState) => {
                    return (
                        {
                            ...oldState,
                            productFirebase: {
                                ...product.data(),
                                id
                            },

                        }
                    )
                });

            }

            const productToShow = this.state.versionType === 'firebase' ? this.state.productFirebase : this.state.productLocal;

            this.setState((oldState) => {
                return (
                    {
                        ...oldState,
                        product: productToShow,
                        loading: false,
                        pageNotFound: !productToShow
                    }
                )
            });
        });
    }

    toggleVersion = (e) => {
        e.preventDefault();
        this.setState((oldState) => {
           return(
               {
                   ...oldState,
                   product: this.state.versionType === "firebase" ? oldState.productLocal : oldState.productFirebase,
                   versionType: this.state.versionType === "firebase" ? "local" : "firebase"
               }
           )
        });
    };

    render() {


        console.log(this.state.productLocal, this.state.productFirebase);
        if (this.state.loading) {
            return (
                <div className="alert alert-info">Loading... Please wait.</div>
            )
        } else if (this.state.pageNotFound) {
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

            let versionBtn = null;

            if(this.state.productLocal && this.state.productFirebase){
                const versionBtnText = this.state.versionType === "firebase" ? "local" : "firebase";
                versionBtn = <button type="button" className="float-right btn btn-sm btn-outline-info"
                    onClick={this.toggleVersion}>
                    View {versionBtnText} version
                    </button>;
            }

            return (
                <div className="card product-item">
                    <h3 className="card-header">
                        <div>{name} <span className="small">(#{id})</span> {versionBtn}</div>


                    </h3>

                    <div className="card-body">
                        <p dangerouslySetInnerHTML={{__html: formatNL2BR(description)}}/>

                        <div className="price-tag mb-2">
                            <span>Price:</span> <span className="price">${formatPrice(price)}</span>
                        </div>

                        <div className="created-at mb-3">Created on
                            : {stringToDate(creationDate).toLocaleDateString()}</div>

                        <button className="btn btn-secondary" type="button"
                                onClick={this.goBack}>{this.props.history.length > 2 ? 'Go back' : 'Go to Product List'}</button>
                    </div>


                </div>
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
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'products'
        }
    ])
)(ViewProductPage);