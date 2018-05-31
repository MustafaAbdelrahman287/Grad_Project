import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'

class BranchesAside extends Component {
    render() {
      
       
         

        return (
           
            <Form>
            
                            <Form.Checkbox label='Adidas' />
                            <Form.Button>Show ServiceArea</Form.Button>
            
                            <Form.Checkbox label='Competitor' />
                            <Form.Button>Show ServiceArea</Form.Button>
                            <label>OverLap Areas</label>
                            <Form.Checkbox label='Adidas' />
                            <Form.Checkbox label='Competitor' />
            
                        </Form>
        
        
                 
               
              





        )
    }
}

export default BranchesAside;