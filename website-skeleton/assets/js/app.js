require('../css/app.css');

import React from 'react';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";

import Items from './components/Items';
import PageCountSelector from './components/PageCountSelector';


class App extends React.Component {

    /**
     * Prop types
     *
     * @type {*}
     */
    static propTypes = {
        entries: PropTypes.array,
        activePage: PropTypes.number,
        handlePageChange: PropTypes.func,
        loadEntries: PropTypes.func,
        handlePerPageChange: PropTypes.func,
    };


    constructor() {
        super();

        let page = 1;
        let optionsList = [5, 10, 25, 50];
        let perPage = optionsList[0];


        let url = new URL(location.href);

        if(url.searchParams.has('page')){
            page = Number(url.searchParams.get('page'));
        }

        if(url.searchParams.has('perPage')){
            let queryPerPage = Number(url.searchParams.get('perPage'));
            if(optionsList.includes(queryPerPage)){
                perPage = queryPerPage;
            }
        }

        url.searchParams.set('perPage', perPage);
        url.searchParams.set('page', page);

        let modifiedUrl = url.toString();

        window.history.pushState({path:modifiedUrl},'',modifiedUrl);

        this.state = {
            entries: [],
            activePage: page,
            itemsCountPerPage: perPage,
            totalCount: 0,
            optionsList:  optionsList,
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.loadEntries = this.loadEntries.bind(this);
        this.handlePerPageChange = this.handlePerPageChange.bind(this);
    }

    componentDidMount() {
        this.loadEntries(this.state.activePage, this.state.itemsCountPerPage);
    }

    loadEntries(pageNumber = 1, perPage = 10){
        let apiUrl = new URL('http://0.0.0.0:45017/api/posts');

        apiUrl.searchParams.set('page', pageNumber);
        apiUrl.searchParams.set('perPage', perPage);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    entries: data.items,
                    itemsCountPerPage: data.numItemsPerPage,
                    totalCount: data.totalCount,
                    activePage: data.page,
                });
            });
    }

    handlePageChange(pageNumber) {
        if(pageNumber != this.state.activePage){

            let url = new URL(location.href);
            url.searchParams.set('page', pageNumber);
            let modifiedUrl = url.toString();

            let perPage = url.searchParams.get('perPage');

            this.loadEntries(pageNumber, perPage);

            window.history.pushState({path:modifiedUrl},'',modifiedUrl);
        }
    }

    handlePerPageChange(perPage) {
            let url = new URL(location.href);
            url.searchParams.set('perPage', perPage);
            let page = 1;
            url.searchParams.set('page', 1);
            let modifiedUrl = url.toString();

            this.loadEntries(page, perPage);

            window.history.pushState({path:modifiedUrl},'',modifiedUrl);
    }

    render() {
        return (
            <div>
                <div className="filter-panel">
                    <PageCountSelector
                        countPerPage={this.state.itemsCountPerPage}
                        optionsList={this.state.optionsList}
                        onChange={this.handlePerPageChange}
                    />
                </div>
                <div className="row">
                    {this.state.entries.map(
                        ({id, title, content}) => (
                            <Items
                                key={id}
                                title={title}
                                content={content}
                            >
                            </Items>
                        )
                    )}

                </div>
                <div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }


}

ReactDOM.render(<App/>, document.getElementById('root'));
