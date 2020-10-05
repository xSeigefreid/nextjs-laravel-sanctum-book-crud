import axios from 'axios'
import Layout from "../../components/Layout"
import $ from 'jquery';

class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            authors: [],
            id: '',
            author_id: 1,
            title: '',
            isbn: '',
            publisher: '',
            error: ''
        }
    }

    componentDidMount() {
        const foundation = require('foundation-sites');
        $(document).foundation();

        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangeisbn = this.onChangeisbn.bind(this);
        this.onChangepublisher = this.onChangepublisher.bind(this);
        this.onChangeauthor = this.onChangeauthor.bind(this);

        this.submitAddForm = this.submitAddForm.bind(this);
        this.submitUpdateForm = this.submitUpdateForm.bind(this);

        this.showAddForm = this.showAddForm.bind(this);
        this.showUpdateForm = this.showUpdateForm.bind(this);

        this.getBooks();
    }

    async getBooks() {
        axios.get('/books').then((response) => {
            this.setState({ books: response.data.data })
        });
    }

    async getAuthors() {
        axios.get('/authors').then((response) => {
            this.setState({ authors: response.data.data })
        });
    }

    submitAddForm() {
        const book = {
            author_id: this.state.author_id,
            title: this.state.title,
            isbn: this.state.isbn,
            publisher: this.state.publisher
        };

        axios.post('/books', book).then((response) => { 
            this.getBooks() 
            this.hideAddForm();
        }).catch(error => {
            this.setState({ error: JSON.stringify(error.response.data.data) + '' })
        });
    }

    submitUpdateForm() {
        const book = {
            id: this.state.id,
            author_id: this.state.author_id,
            title: this.state.title,
            isbn: this.state.isbn,
            publisher: this.state.publisher
        };

        axios.patch('/books/' + this.state.id, book).then((response) => { 
            this.getBooks() 
            this.hideUpdateForm();
        }).catch(error => {
            this.setState({ error: JSON.stringify(error.response.data.data) + '' })
        });        
    }

    deleteBook(id) {
        axios.delete('/books/' + id).then((response) => { this.getBooks() })     
    }

    showUpdateForm(index) {
        this.getAuthors();
        this.setState({
            id: this.state.books[index].id,
            author_id: this.state.books[index].author_id,
            title: this.state.books[index].title,
            isbn: this.state.books[index].isbn,
            publisher: this.state.books[index].publisher,
            error: '',
        })

        $('#updateBookModal').show();
    }

    showAddForm() {
        this.clearFields();
        this.getAuthors();
        $('#addBookModal').show();
    }

    hideAddForm() {
        $('#addBookModal').hide();
    }

    hideUpdateForm() {
        $('#updateBookModal').hide();
    }

    onChangetitle(e) {
        this.setState({ title: e.target.value })
    }
    
    onChangeisbn(e) {
        this.setState({ isbn: e.target.value })
    }

    onChangepublisher(e) {
        this.setState({ publisher: e.target.value })
    }

    onChangeauthor(e) {
        this.setState({ author_id: e.target.value })
    }

    clearFields() {
        this.setState({author_id: '', title: '', isbn: '', publisher: '', error: ''})
    }

    render() {
        return (
            <Layout> <br/>
                <div className="container">
                    <span className="float-lg-left">
                        <h3> Book Management </h3>
                    </span>
                    <button className="btn btn-outline-success float-lg-right" onClick={ this.showAddForm } >Add New Book</button><br/><br/><br/>
                    <div className="table">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>ISBN</th>
                                    <th>Publisher</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.books.map((book, index) =>
                                    <tr id={book.id} key={book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author_full_name}</td>
                                        <td>{book.isbn}</td>
                                        <td>{book.publisher}</td>
                                        <td>
                                            <button onClick={this.showUpdateForm.bind(this, index)} className="btn btn-sm btn-outline-info">Edit Info</button>&nbsp;
                                            <button onClick={this.deleteBook.bind(this, book.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Book Modal */}
                <div id="addBookModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enter Book Details</h5>
                                <button type="button" onClick={this.hideAddForm} className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                { this.state.error != '' ? (
                                    <div className="alert alert-danger" role="alert">
                                        { this.state.error }
                                    </div>
                                ) : '' }
                                <form>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" value={ this.state.title } onChange={this.onChangetitle} className="form-control" placeholder="Enter Book Title" />
                                    </div>
                                    <div className="form-group">
                                        <label>ISBN</label>
                                        <input type="text" value={ this.state.isbn } onChange={this.onChangeisbn} className="form-control" placeholder="Enter Book ISBN" />
                                    </div>
                                    <div className="form-group">
                                        <label>Publisher</label>
                                        <input type="text" value={ this.state.publisher } onChange={this.onChangepublisher} className="form-control" placeholder="Enter Book Publisher" />
                                    </div>
                                    <div className="">
                                        <label>Select Author</label>
                                        <select value={ this.state.author_id } onChange={this.onChangeauthor} className="form-control">
                                            { this.state.authors != '' ? (
                                                this.state.authors.map((author, index) =>
                                                    <option id={author.id} key={author.id} value={author.id}> 
                                                        { author.fname } { author.lname } 
                                                    </option>
                                                )
                                            ) : '' }
                                        </select>
                                    </div>                                    
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={ this.submitAddForm } className="btn btn-success">Save changes</button>
                                <button onClick={ this.hideAddForm } className="btn btn-secondary">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of Add Book Modal */}

                {/* Update Book Modal */}
                <div id="updateBookModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Book Details</h5>
                                <button type="button" onClick={ this.hideUpdateForm } className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                { this.state.error != '' ? (
                                    <div className="alert alert-danger" role="alert">
                                        { this.state.error }
                                    </div>
                                    ) : '' }
                                <form>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" value={ this.state.title } onChange={this.onChangetitle} className="form-control" placeholder="Enter Book Title" />
                                    </div>
                                    <div className="form-group">
                                        <label>ISBN</label>
                                        <input type="text" value={ this.state.isbn } onChange={this.onChangeisbn} className="form-control" placeholder="Enter Book ISBN" />
                                    </div>
                                    <div className="form-group">
                                        <label>Publisher</label>
                                        <input type="text" value={ this.state.publisher } onChange={this.onChangepublisher} className="form-control" placeholder="Enter Book Publisher" />
                                    </div>
                                    <div className="">
                                        <label>Select Author</label>
                                        <select value={ this.state.author_id } onChange={this.onChangeauthor} className="form-control">
                                            { this.state.authors != '' ? (
                                                this.state.authors.map((author, index) =>
                                                    <option id={author.id} key={author.id} value={author.id}> 
                                                        { author.fname } { author.lname } 
                                                    </option>
                                                )
                                            ) : '' }
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={ this.submitUpdateForm } className="btn btn-success">Save changes</button>
                                <button onClick={ this.hideUpdateForm } className="btn btn-secondary">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of Update Book Modal */}

            </Layout>
        );
    }
}

export default Books;
