import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import PageTitle from "../../fragements/PageTitle";
import AuthorList from "./AuthorList";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPageAuthors } from '../../../actions/authorsAction';
import AuthorModal from "./AuthorModal";

class AuthorManagement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authorPrm : {
        page: '',
        records_no: 10,
        modalVisible: false,
        modalMode:0,
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: false
    });
  }

  componentDidMount() {
    this.handleInitList();
  }

  handleInitList = () => {
    this.setState({
      modalVisible: false
    });
    const {authorPrm} = this.state;
    authorPrm.page = 1;
    this.props.getPageAuthors(authorPrm);
  }

  handleCreateAuthor() {
    this.setState({
      modalVisible: true,
      modalMode:0,
      authorId:''
    });
  }

  handleEditAuthor(authorId) {
    this.setState({
      modalVisible: true,
      modalMode:1,
      authorId:authorId
    });
  }

  render() {
    return (<Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" subtitle="Author Management" className="text-sm-left" />
      </Row>
      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Row form>
                <Col md="3" className="form-group">
                  <Button size="sm" theme="primary" className="mb-2 mr-1" onClick={this.handleCreateAuthor.bind(this)}>
                    Create New Author
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <AuthorList authorPrm={this.state.authorPrm} handleEditAuthor={this.handleEditAuthor.bind(this)}/>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <AuthorModal modalVisible={this.state.modalVisible} mode={this.state.modalMode} authorId={this.state.authorId} handleInitList={this.handleInitList}>
      </AuthorModal>
    </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPageAuthors: getPageAuthors }, dispatch);
}

export default connect(null, mapDispatchToProps)(AuthorManagement);