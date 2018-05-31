import React,{ Component } from 'react';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import CustomersAside from './CustomersAside/CustomersAside';
import BranchesAside from './BranchesAside/BranchesAside';

class Home extends Component {
    render(){
        return(
            <div>
                <HeaderMenu/>
                <CustomersAside/>
                <BranchesAside/>
            </div>
        )
    }
        
}



export default Home

