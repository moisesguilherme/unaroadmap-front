import React from 'react';
import _ from 'lodash';

import {
    Container,
    Wizard,
    Card,
    Nav,
    NavItem,
    NavLink,
    CardFooter,
    CardBody,
    Button,
    Row,
    Col,
    Table,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from './../../../components';

import { HeaderMain } from "../../components/HeaderMain";

const sequence = ['nome', 'endereco'];


// candidate: Nome, birthday, sexo, schooling, nationality, mother_name, telephone, cell_phone, user_id
// address: cep, logradouro, complement, number, district_id, user_id
// district: nome, city_id 

const items = [
    {
        name: 'aaIncredible Metal Keyboard',
        quantity: 22,
        price: '$578.00'
    },
    {
        name: 'Incredible Soft Cheese',
        quantity: 3,
        price: '$278.00'
    },
    {
        name: 'Handcrafted Granite Sausages',
        quantity: 29,
        price: '$465.00'
    },
    {
        name: 'Awesome Metal Gloves',
        quantity: 15,
        price: '$501.00'
    }
];

const WizardStep1 = () => (
    <Row>
        <Col md={12}>
            <Form>
                <h6 className="pb-3">
                    Name and Email Address
                </h6>
                <Row className="pb-4">
                    <Col sm={6}>
                        <FormGroup>
                            <Label for="firstName">
                                First Name <span className="text-danger">*</span>
                            </Label>
                            <Input
                                id="firstName" 
                                placeholder='First Name...'
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <Label for="lastName">
                                Last Name <span className="text-danger">*</span>
                            </Label>
                            <Input
                                id="lastName" 
                                placeholder='Last Name...'
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={12}>
                        <FormGroup>
                            <Label for="email">
                                Email <span className="text-danger">*</span>
                            </Label>
                            <Input id="email" placeholder='Email address...'/>
                        </FormGroup>
                    </Col>
                </Row>

                <h6 className="pb-3">
                    Billing Address
                </h6>
                <Row>
                    <Col sm={12}>
                        <FormGroup>
                            <Label for="address">
                                Address <span className="text-danger">*</span>
                            </Label>
                            <Input id="address" placeholder='Current address...'/>
                        </FormGroup>
                    </Col>
                    <Col sm={3}>
                        <FormGroup>
                            <Label for="country">
                                Country <span className="text-danger">*</span>
                            </Label>
                            <UncontrolledDropdown className="d-block">
                                <DropdownToggle color="secondary" outline id="country">
                                    PL (+48) <i className="fa fa-fw fa-angle-down"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem active>PL (+48)</DropdownItem>
                                    <DropdownItem>UK (+44)</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </FormGroup>
                    </Col>
                    <Col sm={9}>
                        <FormGroup>
                            <Label for="city">
                                City <span className="text-danger">*</span>
                            </Label>
                            <Input id="city" placeholder='Enter City...'/>
                        </FormGroup>
                    </Col>

                    <Col sm={9}>
                        <FormGroup>
                            <Label for="state">
                                State/Province <span className="text-danger">*</span>
                            </Label>
                            <Input id="state" placeholder='Outside US/Canada...'/>
                        </FormGroup>
                    </Col>
                    <Col sm={3}>
                        <FormGroup>
                            <Label for="zipCode">
                                ZIP Code <span className="text-danger">*</span>
                            </Label>
                            <Input id="zipCode" placeholder='Email...'/>
                        </FormGroup>
                    </Col>

                    <Col sm={12}>
                        <FormGroup>
                            <Label for="phoneNumber">
                                Phone Number
                            </Label>
                            <InputGroup>
                                <InputGroupAddon
                                    addonType="prepend"
                                    tag={UncontrolledDropdown}
                                >
                                    <DropdownToggle outline>
                                        PL (+48) <i className="fa fa-fw fa-angle-down"></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem active>PL (+48)</DropdownItem>
                                        <DropdownItem>UK (+44)</DropdownItem>
                                    </DropdownMenu>
                                </InputGroupAddon>
                                <Input id="phoneNumber" type="text" placeholder='For Verification Purpose...' />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </Col>
    </Row>
);
const WizardStep2 = () => (
    <Row>
        <Col md={6}>
            <div>
                <h3 className="mb-4">
                    We Secured Your Line
                </h3>
                <p className="pb-3">
                    Below is a sample page for your cart , Created using pages design UI Elementes.
                </p>
                <Table className='my-2'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th className="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(items, (item, index) => (
                                <tr key={index}>
                                    <td>
                                        <i className="fa fa-close text-danger"></i>
                                    </td>
                                    <td>
                                        { item.name }
                                    </td>
                                    <td>
                                        { item.quantity }
                                    </td>
                                    <td className="text-right">
                                        { item.price }
                                    </td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td colSpan={4} className='text-right'>
                                <strong>$986.78</strong>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <small>
                    Invoice are issued on the date of despatch. 
                    Payment terms: Pre-orders: within 10 days of invoice date with 4% discount, 
                    from the 11th to the 30th day net. Re-orders: non-reduced stock items are payable net after 20 days.
                </small>
            </div>
        </Col>
        <Col md={6}>
            <Nav pills className="pb-3">
                <NavItem>
                    <NavLink href="#" active>
                        Credit Card
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        PayPal
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        Skrill
                    </NavLink>
                </NavItem>
            </Nav>

            <Card>
                <CardBody>
                    <div className="d-flex justify-content-between align-items-center pb-3">
                        <h5>Credit Card</h5>
                        <div className="d-flex align-items-start">
                            <i className="fa fa-lg fa-cc-visa text-primary mr-1"></i>
                            <i className="fa fa-lg fa-cc-mastercard text-muted mr-1"></i>
                            <i className="fa fa-lg fa-cc-jcb text-muted mr-1"></i>
                        </div>
                    </div>
                    <Form>
                        <FormGroup>
                            <Label for="cardHolder">
                                Card Holder&apos;s Name <span className="text-danger">*</span>
                            </Label>
                            <Input id="cardHolder" placeholder='Name on the card...'/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="cardNumber">
                                Card Number <span className="text-danger">*</span>
                            </Label>
                            <Input id="cardNumber" placeholder='8888-8888-8888-8888'/>
                        </FormGroup>

                        <div className="d-flex justify-content-between align-items-center">
                            <FormGroup>
                                <Label>
                                    Expiriation <span className="text-danger">*</span>
                                </Label>
                                <div className="d-flex">
                                    <UncontrolledDropdown className="d-block">
                                        <DropdownToggle outline>
                                            Jun (06) <i className="fa fa-fw fa-angle-down"></i>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem active>Jun (06)</DropdownItem>
                                            <DropdownItem>Jul (07))</DropdownItem>
                                            <DropdownItem>Aug (08)</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    &nbsp;
                                    <UncontrolledDropdown className="d-block">
                                        <DropdownToggle outline>
                                            2018 <i className="fa fa-fw fa-angle-down"></i>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem active>2018</DropdownItem>
                                            <DropdownItem>2019</DropdownItem>
                                            <DropdownItem>2020</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </FormGroup>
                            <FormGroup className='text-right'>
                                <Label for="cvcCode">
                                    CVC Code <span className="text-danger">*</span>
                                </Label>
                                <Input id="cvcCode" placeholder='000'/>
                            </FormGroup>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    </Row>
);

export class WizardExample extends React.Component {
    state = {
        currentStep: _.first(sequence)
    }

    render() {
        const { currentStep } = this.state;

        return (
            <Container>
                <HeaderMain 
                    title="Cadastro"
                    className="my-4"
                />
                <Card>
                    <CardBody className="d-flex justify-content-center pt-5">
                        <Wizard
                            activeStep={ currentStep }
                            onStepChanged={ this._changeStep }
                        >
                            <Wizard.Step
                                id={ sequence[0] }
                                icon={ <i className="fa fa-shopping-basket fa-fw"></i> }
                                complete={ this._isComplete(sequence[0]) }
                            >
                                Usuário
                            </Wizard.Step>
                            <Wizard.Step
                                id={ sequence[1] }
                                icon={ <i className="fa fa-cube fa-fw"></i> }
                                complete={ this._isComplete(sequence[1]) }
                            >
                                Endereço
                            </Wizard.Step>
                        </Wizard>
                    </CardBody>

                    <CardBody className="p-5">
                    {
                        (() => {
                            switch(this.state.currentStep) {
                                case sequence[0]:
                                    return <WizardStep1 />
                                case sequence[1]:
                                    return <WizardStep2 />
                            }
                        })()
                    }
                    </CardBody>

                    <CardFooter className="p-4 bt-0">
                        <div className="d-flex">
                            {
                                currentStep !== sequence[0] && (
                                    <Button onClick={() => {this._prevStep()}} color="link" className='mr-3'>
                                        <i className='fa fa-angle-left mr-2'></i>
                                        Previous
                                    </Button>
                                )
                            }
                            {
                                currentStep !== sequence[sequence.length - 1] && (
                                    <Button color='primary' onClick={() => {this._nextStep()}} className="ml-auto px-4">
                                        Next
                                        <i className='fa fa-angle-right ml-2'></i>
                                    </Button>
                                )
                            }
                        </div>
                    </CardFooter>
                </Card>
            </Container>
        );
    }

    _changeStep = (stepId) => {
        this.setState({
            currentStep: stepId
        });
    }

    _prevStep = () => {
        const index = sequence.indexOf(this.state.currentStep);
        this.setState({
            currentStep: sequence[index - 1]
        });
    }

    _nextStep = () => {
        const index = sequence.indexOf(this.state.currentStep);
        this.setState({
            currentStep: sequence[index + 1]
        });
    }

    _isComplete = (stepId) =>
        sequence.indexOf(stepId) < sequence.indexOf(this.state.currentStep)
}
