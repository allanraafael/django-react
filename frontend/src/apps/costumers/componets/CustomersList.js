import React, { Component } from 'react';
import CustomersService from '../services/CustomersService';


const customersService = new CustomersService();


class CustomersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            nextPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        let self = this;
        customersService.getCustomers().then(function (result) {
            self.setState({ customers:  result.data, nextPageURL:  result.nextlink})
        });
    }

    handleDelete(e, pk) {
        let self = this;
        customersService.deleteCustomer({pk : pk}).then(()=> {
            let newArr = self.state.customers.filter(function(obj) {
                return obj.pk !== pk;
            });
            self.setState({customers:  newArr})
        });
    }

    nextPage() {
        let self = this;
        customersService.getCustomersByURL(this.state.nextPageURL).then((result) => {
            self.setState({ customers: result.data, nextPageURL: result.nextlink})
        });
    }

    render() {
        return (
            <div className="customers--list">
                <table className="table">
                    <thead key="thead">
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.customers.map( c =>
                            <tr key={c.pk}>
                                <td>{c.pk}  </td>
                                <td>{c.first_name}</td>
                                <td>{c.last_name}</td>
                                <td>{c.phone}</td>
                                <td>{c.email}</td>
                                <td>{c.address}</td>
                                <td>{c.description}</td>
                                <td>
                                    <button onClick={(e)=> this.handleDelete(e,c.pk) }>
                                        Delete
                                    </button>
                                    <a  href={"/customer/" + c.pk}> Update</a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button  className="btn btn-primary" onClick= { this.nextPage }>Next</button>
            </div>
        );
    }
}

export  default  CustomersList;
