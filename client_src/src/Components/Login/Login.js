import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import './Login.css'

class Login extends Component {
    handleClick() {
        console.log('logged')
    }
    render() {
        return (
            <div className='login-form'>
            <div className='intro'>
                <h1>Geomarketing</h1>
                <h3>An easy interface that helps you to market for your brand more effeciently.</h3>
            </div>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h1'color='teal' textAlign='center'>
                            Login
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
                                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password'/>
                                <Button onClick={this.handleClick.bind(this)} color='teal' fluid size='large'>Login</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Login;
