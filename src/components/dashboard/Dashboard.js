import React, {Component} from 'react';
import {IdeaService} from "../../services/IdeaService";
import ItemArray from "./ItemArray";
import Pagination from "react-js-pagination";
import {DATA_FETCH_METHODS} from "../utils/constants";

const DEFAULT_PAGINATION_STATE = Object.freeze({
	activePage: 1,
	itemsCountPerPage: 8,
	numberOfElements: 0,
	totalPages: 0,
	totalElements: 0
});
class Dashboard extends Component {

	ideaService = null;

	constructor(props) {
		super(props);
		this.state = {
			ideas: [],
			fetchMethod: this.props.fetchMethod || DATA_FETCH_METHODS.MOCKED_API,
			...DEFAULT_PAGINATION_STATE,
		}
	}

	componentDidMount() {
		this.getIdeas(this.state.itemsCountPerPage, this.state.activePage);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.fetchMethod !== this.props.fetchMethod) {
			this.setState({
				fetchMethod: this.props.fetchMethod,
				...DEFAULT_PAGINATION_STATE,
			}, () => {
				this.getIdeas(this.state.itemsCountPerPage, this.state.activePage);
			});
		}
	}

	render() {
		const title = this.state.fetchMethod === DATA_FETCH_METHODS.MY_BACKEND_API ? 'My Backend API' : 'Mocked Api';
		return (
			<div className="main-container">
				<section className="row pb-3">
					<div className="col-12"><h1>Candy cotton - {title}</h1></div>
					<div className="col-sm-12 col-md-6"><span className="small-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
						It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</span>
					</div>
				</section>

				<section className="row">
					<ItemArray {...this.props} ideas={this.state.ideas}/>

					<div className="mt-4 ml-3 d-flex flex-row flex-grow-1">
						<div className="col-8 align-items-center justify-content-center">
							<Pagination
								activePage={this.state.activePage}
								itemsCountPerPage={this.state.itemsCountPerPage}
								totalItemsCount={this.state.totalElements}
								pageRangeDisplayed={this.state.totalPages}
								itemClass="page-item"
								linkClass="page-link"
								onChange={this.handlePageChange.bind(this)}/>
						</div>
						<div className="col-4 pr-4 d-flex align-items-center justify-content-end">
							{this.state.totalElements + " Posts found."}
						</div>
					</div>
				</section>
			</div>
		);
	}

	handlePageChange(pageNumber) {
		this.setState({activePage: pageNumber}, () => this.getIdeas(this.state.itemsCountPerPage, this.state.activePage));
	}

	getIdeas = async (itemsCountPerPage, activePage) => {
		const ideas = this.state.fetchMethod === DATA_FETCH_METHODS.MY_BACKEND_API
			? await this._getIdeaService().getIdeas(itemsCountPerPage, activePage)
			: await this._getIdeaService().getIdeasFromMockApi();

		if (ideas === undefined) { return; }

		this.setState({
			ideas: ideas.content,
			totalPages: ideas.totalPages,
			itemsCountPerPage: ideas.pageable.pageSize,
			numberOfElements: ideas.numberOfElements,
			totalElements: ideas.totalElements,
		});
	}

	_getIdeaService() {
		if (!this.ideaService) {
			this.ideaService = new IdeaService();
		}
		return this.ideaService;
	}
}

export default Dashboard;
