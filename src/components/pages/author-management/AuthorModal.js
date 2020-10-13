import React, { Component } from "react";
import { Modal,Form, Input, notification } from 'antd';
import { Row, Col, Button } from "shards-react";
import AuthorAvatar from "./AuthorAvatar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createAuthor } from '../../../actions/authorsAction';
const FormItem = Form.Item;
class AuthorModal extends Component {
    
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: this.props.modalVisible,
            avatar:''
        }
        this.onFinish = this.onFinish.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {modalVisible} = nextProps;
        this.setState({
          modalVisible: modalVisible
        });
        let nameList = ["fullName","description"];
        this.formRef.current&&this.formRef.current.resetFields(nameList)
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

    handleGetAvatar = (avatar) => {
        debugger
        this.setState({
            avatar:avatar
        })
    }

    onFinish = ({ errorFields }) => {
        if(this.props.mode===0) {
            let authorPrm = this.formRef.current.getFieldValue();
            authorPrm['avatar'] = this.state.avatar;
            this.props.createAuthor(authorPrm).then((result) => {
                notification.success({
                  message: 'Book Management',
                  description: result.data.message
                });
              }).catch(function (error) {
                notification.warning({
                    message: 'Book Management',
                    description: error.response.data.message
                  })
              });
              this.props.handleInitList();
            //   this.setState({
            //     modalVisible: false,
            //   });
        } else {

        }
    };

    render() {
        return (
            <Modal
                title={this.props.mode===0?'Create Author':'Edit Author'}
                visible={this.state.modalVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <Form ref={this.formRef} onFinish={this.onFinish} >
                    <FormItem name="fullName" rules={[{ required: true, message: 'Please input author name!' }]} >
                        <Input
                            size="large"
                            name="fullName"
                            placeholder="Full Name" />
                    </FormItem>
                    <FormItem name="description" rules={[{ required: true, message: 'Please input author description!' }]}>
                        <Input
                            size="large"
                            name="description"
                            placeholder="Description" />
                    </FormItem>
                    <FormItem>
                        <AuthorAvatar handleGetAvatar={this.handleGetAvatar}></AuthorAvatar>
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
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createAuthor: createAuthor}, dispatch);
  }
  
export default connect(null, mapDispatchToProps)(AuthorModal);