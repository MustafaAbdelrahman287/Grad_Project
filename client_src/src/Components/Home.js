import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import CustomersAside from './CustomersAside/CustomersAside';
import BranchesAside from './BranchesAside/BranchesAside';
import ExpansionAside from './ExpansionAside/ExpansionAside';
import AdvertismentAside from './AdvertismentAside/AdvertismentAside';

class Home extends Component {

    render() {
        const panes = [
            {
                menuItem: { key: 'customers', icon: 'users', content: 'Customers' },
                render: () => <Tab.Pane><CustomersAside /></Tab.Pane>,
            },
            {
                menuItem: { key: 'branches', icon: 'point', content: 'Branches' },
                render: () => <Tab.Pane><BranchesAside /></Tab.Pane>,
            },
            {
                menuItem: { color: 'teal', key: 'expansion', icon: 'expand', content: 'Expansion' },
                render: () => <Tab.Pane><ExpansionAside/></Tab.Pane>,
            },
            {
                menuItem: { key: 'advertisments', icon: 'announcement', content: 'Advertisments' },
                render: () => <Tab.Pane><AdvertismentAside/></Tab.Pane>,
            },
        ]
        return (
            <div>
                <Tab menu={{ color: 'teal', inverted: true, attached: false, tabular: false }} panes={panes} />
            </div>
        )
    }

}


export default Home

