import React, { Component } from 'react';
import { Form, Accordion, Icon, Label } from 'semantic-ui-react'

class BranchesAside extends Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state


        return (
            <div>
                <Form className='Branches'>

                    <Form.Checkbox label='Adidas' />
                    <Form.Button>Show ServiceArea</Form.Button>

                    <Form.Checkbox label='Competitor' />
                    <Form.Button>Show ServiceArea</Form.Button>
                    <br/>
                    <label>OverLap Areas</label>
                    <Form.Checkbox label='Adidas' />
                    <Form.Checkbox label='Competitor' />

                </Form>
                <br/>
                <br/>
                <Accordion styled>
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        WeakPointAnalysis
                  </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <div>
                        <Label circular  size='large'as='a' >
                            <Icon name='users'/>
                            Target segment
                            </Label>
                            <Label circular  size='large'as='a' >
                            <Icon name='star'/>
                                Rating
                            </Label>
                            <Label circular size='large' as='a' >
                            <Icon name='window restore'/> 
                                Overlap with my branches
                            </Label>
                            <br/>
                            <br/>
                            <Label circular  size='large'as='a' >
                            <Icon name='window restore'/>  
                                Overlap with my competitor
                            </Label>
                            <Label circular size='large' as='a' >
                            <Icon name='shopping bag'/>
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