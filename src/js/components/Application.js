import React from 'react';
import {Button, Modal, Menu, Segment, Icon, Form, TextArea, Checkbox, Radio, Input, Select} from 'semantic-ui-react';
import CoinsTable from './CoinsTable';

export default class Application extends React.Component {
    state = {
        activeItem: 'home',
        open: false,
        items: [],
        options: null,
    }

    componentDidMount() {
        fetch('/api/list')
            .then(r => r.json())
            .then(d => this.setState({items: d}))
            .catch(e => {
                console.error(e);
                alert(e.message);
            })

        fetch('/api/options')
            .then(r => r.json())
            .then(options => this.setState({
                options
            }))
            .catch(e => {
                console.error(e);
                alert(e.message);
            })
    }

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    closeModal = () => this.setState({open: false});
    openModal  = () => this.setState({open: true});
    saveModal  = () => {
        fetch('/api/add', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'foo=bar&lorem=ipsum'
        })
            .then(d => d.json())
            .then(items => {
                console.log('add', {items});
                this.setState({items})
            })
            .catch((error) => {
                console.log('Request failed', error);
            });
        this.setState({open: false});
    }

    get Modal() {
        console.table(this.state);
        return <Modal open={this.state.open} onClose={this.closeModal} closeIcon='close'>
            <Modal.Header>
                Добавление новой валюты
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field
                        control={Select}
                        label='валютная пара'
                        options={this.state.options}
                        placeholder='Валютная пара'/>

                    <Form.Field
                        control={Select}
                        label='биржа'
                        options={this.state.options}
                        placeholder='Биржа'/>


                    <Form.Field
                        control={Input}
                        label='Count'
                        type="number"
                        placeholder='количество битков'/>

                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={this.closeModal}>
                    Отмена
                </Button>
                <Button positive icon='checkmark' labelPosition='right' content='Сохранить'
                        onClick={this.saveModal}/>
            </Modal.Actions>
        </Modal>
    }

    render() {
        return <div>
            {this.Modal}

            <Menu stackable>
                <Menu.Item header>Coins Factory</Menu.Item>
                <Menu.Item name="add" active={this.state.activeItem === 'home'} onClick={this.openModal}>
                    <Icon name='plus'/>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item name='logout' active={this.state.activeItem === 'logout'}
                               onClick={this.handleItemClick}/>
                </Menu.Menu>
            </Menu>


            <Segment style={{margin: 10}}>
                <CoinsTable modalOpen={this.openModal} items={this.state.items}/>
            </Segment>

        </div>
    }
}
