import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { SelectField, TextField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

import { cardSpace } from '../../lib/styles'
import { Row, Col } from 'react-flexbox-grid/lib/index'

import { open } from '../../store/screenActions'
import { positive, number, required, address } from '../../lib/validators'
import log from 'loglevel'


const Render = ({fields: {from, to}, account, handleSubmit, resetForm, submitting, cancel}) => {
    log.debug('fields - from', from);

    return (
        <Card style={cardSpace}>
            <CardHeader
                title='Send Transaction'
                actAsExpander={false}
                showExpandableButton={false}
            />

            <CardText expandable={false}>
                <Row>
                    <Col xs={12} md={6}>
                        <Row>
                            <Col xs={12}>
                                <Field name="from"
                                       floatingLabelText="From"
                                       component={SelectField}
                                       fullWidth={true}>
                                    <MenuItem value={account.get('id')} primaryText={account.get('id')} />
                                </Field>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Field name="to"
                                       component={TextField}
                                       floatingLabelText="Target Address"
                                       hintText="0x0000000000000000000000000000000000000000"
                                       fullWidth={true}
                                       validate={[required, address]}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Field name="value"
                                       component={TextField}
                                       floatingLabelText="Amount (Ether)"
                                       hintText="1.0000"
                                       defaultValue={0.0}
                                       validate={[required, number, positive]}
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={12} md={6}>
                        <Row>
                            <Col xs={12}>
                                <Field name="gasPrice"
                                       component={TextField}
                                       floatingLabelText="Gas Price (MGas)"
                                       hintText="10000"
                                       validate={[required, number, positive]}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Field name="gasAmount"
                                       component={TextField}
                                       floatingLabelText="Gas Amount"
                                       hintText="21000"
                                       validate={[required, number, positive]}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </CardText>

            <CardActions>
                <FlatButton label="Send"
                            icon={<FontIcon className="fa fa-check" />}/>
                <FlatButton label="Cancel"
                            onClick={cancel}
                            icon={<FontIcon className="fa fa-ban" />}/>
            </CardActions>
        </Card>
    )
};

const CreateTxForm = reduxForm({
    form: 'createTx',
    fields: ['to', 'from', 'value', 'gasPrice', 'gasAmount']
})(Render);

const CreateTx = connect(
    (state, ownProps) => {
        return {
            initialValues: {
                from: ownProps.account.get('id'),
                gasPrice: 10000,
                gasAmount: 21000
            }
        }
    },
    (dispatch, ownProps) => {
        return {
            cancel: () => {
                dispatch(open('home'))
            }
        }
    }
)(CreateTxForm);



export default CreateTx