import axios from 'axios';
import React, { Component } from 'react';
import Business from './Business';


class PlacesNearby extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            stores: null,
            store: [],
            isLoading: true,
            markers: []
        }

        this.viewBusiness = this.viewBusiness.bind(this);
        this.saveMarkerPosition = this.saveMarkerPosition.bind(this);

    }



    viewBusiness = (store) => {
        console.log('Business View ID :' + store._id);

        this.setState({
            showModal: true,
            store: store
        })
    }


    hideModal = () => {
        this.setState({
            showModal: false,
            store: ''
        });

    }

    saveMarkerPosition = (position) => {
        this.setState({
            markers: [...this.state.markers, position]
        })
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/business').then((res) => {

            this.setState({
                stores: res.data,
                isLoading: false
            })
        });

        
    }

    render() {


        if (this.state.isLoading) {
            return <div>is loading...</div>
        }

        const storesNearby = this.state.stores;


        return (
            <div className="footerTab">

                <section className="places-nearby-main">

                    {(storesNearby != null) ?
                        storesNearby.map((store) => (

                            <section className="places-content" key={store._id} onClick={() => this.viewBusiness(store)}>
                                <div >
                                    
                                    <h3>{store.businessName}</h3>
                                    <img className="place-image" src={"https://www.pngonly.com/wp-content/uploads/2017/06/Food-Chicken-Salad-PNG.png"} />
                                    <p>{store.businessDescription}</p>
                                </div>
                                <h6 className="greenButton" onClick={() => this.viewBusiness(store)}>View Products</h6>

                            </section>
                        ))
                        :
                        <div></div>
                    }


                </section>

                {this.state.store != '' ?
                    <Business store={this.state.store} showModal={this.state.showModal} handleClose={this.hideModal} />

                    :
                    <div></div>

                }

            </div>
        );
    }

};



export default PlacesNearby;