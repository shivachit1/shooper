import React, { Component } from 'react';

import graph from '../../images/graph.png'

class About extends Component {



    constructor(props) {
        super(props);
       
    }



    render(){
        const showHideClassName = this.props.showMyAbout ? "vertical-scroll-container display-block" : "vertical-scroll-container display-none";

    return (
        <div className={showHideClassName}>
           
          

           <div className="block">
               <h4>Gross Sales Report</h4>
               <h3>200 €</h3>
            </div> 

            <div className="block">
            <h4>Sales in last 24 Hour</h4>
               <h3>200 €</h3>
            </div> 

            <div>
               <h5>Sales Graph per Month</h5>
               <img className="graph-container" src={graph}/>
            </div> 

        </div>
    );

    }
};


export default About;