import React from 'react';
import {Label, Card, Divider, Grid, Header, Icon, Table} from 'semantic-ui-react';

const wrap = (data, isGood) => {
    return <div>
        {isGood? <Icon name='angle double up' color="green"/>:<Icon name='angle double up' color="red"/>}
        {data}
    </div>
}

export default class CoinsTable extends React.Component {
    state = {rows: []};

    mapToCard(data, index) {
        return <Card key={index}>
            <Card.Content>
                <Card.Header>
                    {data.name}
                </Card.Header>
                <Card.Meta>
                    <Divider/>

                </Card.Meta>
                    <Grid columns={3}>
                        <Grid.Row>
                            <Grid.Column>
                                {wrap(data.cost, true)}
                            </Grid.Column>
                            <Grid.Column>
                                {wrap(data.profit, false)}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>{data.count}</Grid.Column>
                            <Grid.Column>{data.profitMoney}</Grid.Column>
                        </Grid.Row>
                    </Grid>
            </Card.Content>
            <Card.Content extra>
                <span>
                    <Icon name='dollar'/>
                    {data.curs}
                </span>
                <a>
                    <Icon name='alarm outline' style={{'margin-left':20}}/>
                </a>
                <a>
                    <Icon name='setting' style={{'margin-left':20}}/>
                </a>
            </Card.Content>
        </Card>
    }

    formatData(data, index) {
        return <Table.Row key={index}>1
            <Table.Cell>
                {data.name} (#{data.id || index})
            </Table.Cell>
            <Table.Cell>
                <Header as='h4'>
                    <Header.Content>
                        {data.cost}
                        <Header.Subheader>{data.count} шт</Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>
                <Header as='h4'>
                    <Header.Content>
                        {data.profit} %
                        <Header.Subheader>{data.profitMoney} $</Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>
                {data.curs} $
            </Table.Cell>
        </Table.Row>
    }

    render() {
        return <Card.Group itemsPerRow={4}>
                {this.props.items.map(this.mapToCard)}
        </Card.Group>
    }
}
