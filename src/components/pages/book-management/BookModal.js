import React, { Component } from "react";
import { Modal,Form, Input, notification } from 'antd';
import { Row, Col, Button } from "shards-react";

const FormItem = Form.Item;

class BookModal extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: this.props.modalVisible
        }
        this.onFinish = this.onFinish.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {modalVisible} = nextProps;
        this.setState({
          modalVisible: modalVisible
        })
    }

    handleOk = e => {
        console.log(e);
        this.setState({
        modalVisible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    };

    onFinish = ({ errorFields }) => {
        debugger
    };

    render() {
        return (
            <Modal
                title={this.props.mode==0?'Create Book':'Edit Book'}
                visible={this.state.modalVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <Form ref={this.formRef} onFinish={this.onFinish} >
                    <FormItem name="title" rules={[{ required: true, message: 'Please input book title!' }]} >
                        <Input
                            size="large"
                            name="title"
                            placeholder="Title" />
                    </FormItem>
                    <FormItem name="description" rules={[{ required: true, message: 'Please input book description!' }]}>
                        <Input
                            size="large"
                            name="description"
                            placeholder="Description" />
                    </FormItem>
                    <Row>
                        <Col>
                            <Button outline htmlType="submit" theme="primary" className="mb-2 mr-1 float-right">
                                Save
                            </Button>
                            <Button outline htmlType="" onClick={this.handleCancel} theme="dark" className="mb-2 mr-1 float-right">
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}
export default BookModal;