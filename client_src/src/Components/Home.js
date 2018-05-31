import React,{ Component } from 'react';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import CustomersAside from './CustomersAside/CustomersAside';
class Home extends Component {
    render(){
        return(
            <div>
                <HeaderMenu/>
                <CustomersAside/>
            </div>
        )
    }
        
}



export default Home

