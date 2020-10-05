import React from 'react';
import {DATA_FETCH_METHODS} from "../utils/constants";

class HeaderMenu extends React.Component {

	render() {
		return (
			<header className="d-flex align-items-center justify-content-end ">
				<nav className="menu-items flex-grow-0">
					<ul className="p-4">
						<li>
							<button className="btn btn-dark api-button" onClick={() => this.useMyBackendApi()}>Use My Backend</button>
						</li>
						<li>
							<button className="btn btn-dark api-button" onClick={() => this.useMockedApi()}>Use Mock API</button>
						</li>
					</ul>
				</nav>
			</header>
		);
	}

	useMyBackendApi = () => {
		this.props.changeFetchMethod(DATA_FETCH_METHODS.MY_BACKEND_API)
	}

	useMockedApi = () => {
		this.props.changeFetchMethod(DATA_FETCH_METHODS.MOCKED_API)
	}
}

export default HeaderMenu;