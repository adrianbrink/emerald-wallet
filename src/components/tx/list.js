import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid/lib/index';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import log from 'electron-log';
import { cardSpace, tables, noShadow, grayBackground } from 'lib/styles';
import Immutable from 'immutable';
import Transaction from './transaction';
import { gotoScreen } from 'store/screenActions';
import { align } from 'lib/styles';

const Render = ({ transactions, sendTx, accounts, createAccount }) => {
    const styles = {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        },
        titleStyle: {
            fontSize: '20px',
        },
        table: {
        },
        card: {
            marginTop: '20px',
            ...noShadow,
        }
    };

    const table = <Table style={{...styles.table}} selectable={false} fixedHeader={true}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
                <TableHeaderColumn style={tables.mediumStyle}>Amount</TableHeaderColumn>
                <TableHeaderColumn style={tables.mediumStyle}>Status</TableHeaderColumn>
                <TableHeaderColumn >From</TableHeaderColumn>
                <TableHeaderColumn style={tables.shortestStyle}>&nbsp;</TableHeaderColumn>
                <TableHeaderColumn >To</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            {transactions.map((tx) => <Transaction key={tx.get('hash')} tx={tx}/>)}
        </TableBody>
    </Table>;

    const titleAvatar = <Avatar icon={<FontIcon className="fa fa-dot-circle-o fa-2x" />} />;

    return (
            <Card style={styles.card}>
                <CardHeader
                    title="History"
                    titleStyle={styles.titleStyle}
                    actAsExpander={false}
                    showExpandableButton={false}
                />
                <CardText style={styles.root} expandable={false}>
                    {table}
                </CardText>
            </Card>
    );
};

Render.propTypes = {
    transactions: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    createAccount: PropTypes.func.isRequired,
    sendTx: PropTypes.func.isRequired,
};

const TransactionsList = connect(
    (state, ownProps) => {
        const transactionsAccounts = state.accounts.get('trackedTransactions', Immutable.List());
        const txs = ownProps.transactions || transactionsAccounts;
        const accounts = state.accounts.get('accounts');
        return {
            transactions: txs.reverse(),
            accounts,
        };
    },
    (dispatch, ownProps) => ({
        sendTx: (acc) => {
            dispatch(gotoScreen('create-tx', acc));
        },
        createAccount: () => {
            dispatch(gotoScreen('generate'));
        },
    })
)(Render);

export default TransactionsList;
