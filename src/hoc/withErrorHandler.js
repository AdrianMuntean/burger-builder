import React, {Component} from 'react';
import Modal from '../components/UI/Modal/Modal';
import Aux from './Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

    constructor() {
        super();
        this.reqInterceptor = axios.interceptors.request.use(req => {
            this.setState({error: null});
            return req;
        });
        this.resInterceptor = axios.interceptors.response.use(res => res, error => {
            this.setState({error: error});
        })
    }
        state = {
            error: null
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        componentWillUpdate() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    };
}

export default withErrorHandler;