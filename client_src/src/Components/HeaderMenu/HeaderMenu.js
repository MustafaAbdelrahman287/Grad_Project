import React, { Component } from 'react';
import { Header, Icon } from 'semantic-ui-react';
import './HeaderMenu.css';

class HeaderMenu extends Component {
    render() {
        return (
            <ul className='header-items'>
                <li className='header-item'>
                    <Header color='grey' as='h6' icon textAlign='center'>
                        <Icon link = {true} name='users' color='teal' />
                        <Header.Content >
                            Customers
                        </Header.Content>
                    </Header>
                </li>
                <li className='header-item'>
                    <Header color='grey' as='h6' icon textAlign='center'>
                        <Icon link = {true} name='point' color='teal' />
                        <Header.Content>
                            Branches
                        </Header.Content>
                    </Header>
                </li>
                <li className='header-item'>
                    <Header color='grey' as='h6' icon textAlign='center'>
                        <Icon link = {true} name='expand' color='teal' />
                        <Header.Content>
                            Expansion
                        </Header.Content>
                    </Header>
                </li>
                <li className='header-item'>
                    <Header color='grey' as='h6' icon textAlign='center'>
                        <Icon link = {true} color='teal' name='announcement' />
                        <Header.Content>
                            Advertisments
                        </Header.Content>
                    </Header>
                </li>
            </ul>
        )
    }
}

export default HeaderMenu;
