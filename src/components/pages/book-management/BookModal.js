import React, { Component } from "react";
import { Modal,Form, Input, Button, notification } from 'antd';

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
    };

    render() {
        return (
            <Modal
                title={this.props.mode==0?'Create Book':'Edit Book'}
                visible={this.state.modalVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okButtonProps={{form:'category-editor-form', key: 'submit', htmlType: 'submit'}}
              >
                <Form ref={this.formRef} id='category-editor-form' onFinish={this.onFinish} >
                    <FormItem name="title" rules={[{ required: true, message: 'Please input book title!' }]} >
                        <Input
                            // prefix={<UserOutlined />}
                            size="large"
                            name="title"
                            placeholder="Title" />
                    </FormItem>
                    <FormItem name="description" rules={[{ required: true, message: 'Please input book description!' }]}>
                        <Input
                            // prefix={<LockOutlined />}
                            size="large"
                            name="description"
                            placeholder="Description" />
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
export default BookModal;