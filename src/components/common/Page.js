import React, {Component} from 'react';
import HeaderMenu from "./HeaderMenu";
import {DATA_FETCH_METHODS} from "../utils/constants";

const Page = (InnerComponent) => class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fetchMethod: DATA_FETCH_METHODS.MOCKED_API,
		}
	}

	render() {
		return (
			<div className="w-100 h-100">
				<HeaderMenu {...this.props} fetchMethod={this.state.fetchMethod} changeFetchMethod={(fetchMethod) => this.changeFetchMethod(fetchMethod)}/>
				<InnerComponent {...this.props} fetchMethod={this.state.fetchMethod}/>
			</div>
		);
	}

	changeFetchMethod = (fetchMethod) => {
		this.setState({fetchMethod});
	}
};

export default Page;