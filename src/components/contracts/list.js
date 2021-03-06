import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import LibraryBooks from 'material-ui/svg-icons/av/library-books';
import Avatar from 'material-ui/Avatar';
import { cardSpace, tables } from 'lib/styles';
import Immutable from 'immutable';
import Contract from './contract';

const Render = ({ contracts }) => {
    const table = <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
                <TableHeaderColumn style={tables.shortStyle}>Contract</TableHeaderColumn>
                <TableHeaderColumn style={tables.wideStyle}>Address</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            {contracts.map((contract) => <Contract key={contract.get('address')} contract={contract}/>)}
        </TableBody>
    </Table>;

    const titleStyle = {
        fontSize: '20px',
    };
    const titleAvatar = <Avatar icon={<LibraryBooks />} />;

    return (
        <div id="contracts-list">
            <Card style={cardSpace}>
                <CardHeader
                    title="Contracts List"
                    titleStyle={titleStyle}
                    subtitle="List of installed contracts"
                    avatar={titleAvatar}
                    actAsExpander={false}
                    showExpandableButton={false}
                />
                <CardText expandable={false}>
                    {table}
                </CardText>
            </Card>
        </div>
    );
};

const ContractsList = connect(
    (state, ownProps) => ({
        contracts: state.contracts.get('contracts', Immutable.List()),
    }),
    (dispatch, ownProps) => ({
    })
)(Render);

export default ContractsList;
