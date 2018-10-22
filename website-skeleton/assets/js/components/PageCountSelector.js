import React from 'react';
import PropTypes from "prop-types";

class PageCountSelector extends React.Component {

    /**
     * Prop types
     *
     * @type {*}
     */
    static propTypes = {
        defauCount: PropTypes.number,
        countPerPage: PropTypes.number,
        optionsList: PropTypes.array,
        createList: PropTypes.func,
    };

    constructor(props) {
        super();

        this.state = {
            defauCount: props.optionsList[0],
            onChange: props.onChange,
            countPerPage: props.countPerPage,
            optionsList: props.optionsList, //[10, 25, 50]
        };

        this.createList = this.createList.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <div>
                <select className="per-page-filter" defaultValue={this.state.countPerPage} onChange={this.onChange}>
                    {this.createList()}
                </select>
            </div>
        );
    }

    onChange(event){
        this.state.onChange(event.target.value)
    }

    createList(){
        let list = [];

        for (let i = 0; i < this.state.optionsList.length; i++) {
            let val = this.state.optionsList[i];
            list.push(<option key={i} value={val}>{val}</option>);
        }

        return list;
    }
}

export default PageCountSelector;