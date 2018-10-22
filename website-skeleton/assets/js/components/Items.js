import React from 'react';
import PropTypes from "prop-types";

class Items extends React.Component {

    /**
     * Prop types
     *
     * @type {*}
     */
    static propTypes = {
        id: PropTypes.number,
        title: PropTypes.string,
        content: PropTypes.string,
    };

    constructor(props) {
        super();

        this.state = {
            id: props.id,
            title: props.title,
            content: props.content,
        };
    }


    render() {
         return (
             <div key={this.state.id} className="card col-md-4" style={{width:200}}>
                 <div className="card-body">
                     <p>{this.state.id}</p>
                     <h4 className="card-title">{this.state.title}</h4>
                     <p className="card-text">{this.state.content}</p>
                 </div>
             </div>
         );
    }
}

export default Items;