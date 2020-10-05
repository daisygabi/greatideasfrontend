import React, {Component} from 'react';
import Page from "../common/Page";
import Dashboard from "./Dashboard";

class DashboardPage extends Component {

    render() {
        const ComponentHoc = Page(Dashboard);
        return (
            <ComponentHoc {...this.props}/>
        );
    }
}

export default DashboardPage;
