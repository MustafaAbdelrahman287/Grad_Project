import React, { Component } from 'react';
import { Form,Accordion,Icon,Label } from 'semantic-ui-react'

class BranchesAside extends Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
    }
   /*  state = { activeIndex: 0,
        targetSegment: []}

        handleClick = (e, titleProps) => {
            const { index } = titleProps
            const { activeIndex } = this.state
            const newIndex = activeIndex === index ? -1 : index
        
            this.setState({ activeIndex: newIndex })
          } */
    render() {
        const { activeIndex } = this.state
         

        return (
           <div>
            <Form ClassName='Branches'>
            
                            <Form.Checkbox label='Adidas' />
                            <Form.Button>Show ServiceArea</Form.Button>
            
                            <Form.Checkbox label='Competitor' />
                            <Form.Button>Show ServiceArea</Form.Button>
                            <label>OverLap Areas</label>
                            <Form.Checkbox label='Adidas' />
                            <Form.Checkbox label='Competitor' />
            
                        </Form>
                        <Accordion styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          WeakPointAnalysis
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
        <div>
        <Icon name='users' size="small" />
         Target segment
     
   
    <Label as='a' image>
      <img src='/assets/images/avatar/small/elliot.jpg' />
      Rating
    </Label>
    <Label as='a' image>
      <img src='/assets/images/avatar/small/stevie.jpg' />
      Overlap with my branches
    </Label>
    <Label as='a' image>
      <img src='/assets/images/avatar/small/stevie.jpg' />
      Overlap with my competitor
    </Label>
    <Label as='a' image>
      <img src='/assets/images/avatar/small/stevie.jpg' />
      Complemntray service
    </Label>
  </div>
        </Accordion.Content>
        </Accordion>
                        
                         </div>
        
        
                 
               
              





        )
    }
}

export default BranchesAside;