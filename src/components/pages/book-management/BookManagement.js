import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, FormInput,Button } from "shards-react";

import PageTitle from "../../fragements/PageTitle";
import AuthorsFilter from "./AuthorsFilter";
import DateFilter from "../../fragements/DateFilter";
import BookList from "./BookList";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBooks } from '../../../actions/booksAction';
import BookModal from "./BookModal";

class BookManagement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookPrm : {
        page: '',
        records_no: 2,
        title:'',
        created_at: '',
        author_id:'',
        modalVisible: false,
        modalMode:0,
        bookId:''
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: false
    });
  }

  componentDidMount() {
    const {bookPrm} = this.state;
    bookPrm.page = 1;
    this.props.getBooks(bookPrm);
  }

  handleCreateBook() {
    this.setState({
      modalVisible: true,
      modalMode:0,
      bookId:''
    });
  }

  handleEditBook(bookId) {
    this.setState({
      modalVisible: true,
      modalMode:1,
      bookId:bookId
    });
  }

  handleFilterAuthors (authorId) {
    let {bookPrm} = this.state;
    bookPrm.author_id = authorId;
    this.props.getBooks(bookPrm);
    this.setState({
      bookPrm:bookPrm,
      modalVisible: false
    })
  }
  handleFilterTitle(e) {
    const title = e.target.value;
    let {bookPrm} = this.state;
    bookPrm.title = title;
    this.props.getBooks(bookPrm);
    this.setState({
      bookPrm:bookPrm,
      modalVisible: false
    })
  }

  handleFilterDate(date) {
    let {bookPrm} = this.state;
    bookPrm.created_at = date;
    this.props.getBooks(bookPrm);
    this.setState({
      bookPrm:bookPrm,
      modalVisible: false
    })
  }

  render() {
    return (<Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" subtitle="Book Management" className="text-sm-left" />
      </Row>
      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Row form>
                <Col md="3" className="form-group">
                  <Button size="sm" theme="primary" className="mb-2 mr-1" onClick={this.handleCreateBook.bind(this)}>
                    Create New Book
                  </Button>
                </Col>
              </Row>
              <Row form>
                <Col md="2" className="form-group">
                  <strong className="text-muted d-block mb-2">Title</strong>
                  <Row className="pl-3 pr-3">
                    <FormInput size="sm" onChange={this.handleFilterTitle.bind(this)}>
                    </FormInput>
                  </Row>
                </Col>
                <Col md="1" className="form-group">
                  <strong className="text-muted d-block mb-2">Create date</strong>
                  <DateFilter handleFilterDate={this.handleFilterDate.bind(this)}></DateFilter>
                </Col>
                <Col md="1" className="form-group">
                  <strong className="text-muted d-block mb-2">Authors</strong>
                  <AuthorsFilter handleFilterAuthors={this.handleFilterAuthors.bind(this)}></AuthorsFilter>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <BookList bookPrm={this.state.bookPrm} handleEditBook={this.handleEditBook.bind(this)}/>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <BookModal modalVisible={this.state.modalVisible} mode={this.state.modalMode} bookId={this.state.bookId}>
      </BookModal>
    </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getBooks: getBooks }, dispatch);
}

export default connect(null, mapDispatchToProps)(BookManagement);