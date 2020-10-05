import axios from 'axios'
import Layout from "../../components/Layout"
import $ from 'jquery';

class Authors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            id: '',
            fname: '',
            lname: '',
            description: '',
            error: ''
        }
    }

    componentDidMount() {
        const foundation = require('foundation-sites');
        $(document).foundation();

        this.onChangefname = this.onChangefname.bind(this);
        this.onChangelname = this.onChangelname.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);

        this.submitAddForm = this.submitAddForm.bind(this);
        this.submitUpdateForm = this.submitUpdateForm.bind(this);

        this.showAddForm = this.showAddForm.bind(this);
        this.showUpdateForm = this.showUpdateForm.bind(this);

        this.getAuthors();
    }

    async getAuthors() {
        axios.get('/authors').then((response) => {
            this.setState({ authors: response.data.data })
        });
    }

    submitAddForm() {
        const author = {
            fname: this.state.fname,
            lname: this.state.lname,
            description: this.state.description
        };

        axios.post('/authors', author).then((response) => { 
            this.getAuthors() 
            this.hideAddForm();
        }).catch(error => {
            this.setState({ error: JSON.stringify(error.response.data.data) + '' })
        });
    }

    submitUpdateForm() {
        const author = {
            id: this.state.id,
            fname: this.state.fname,
            lname: this.state.lname,
            description: this.state.description
        };

        axios.patch('/authors/' + this.state.id, author).then((response) => { 
            this.getAuthors() 
            this.hideUpdateForm();
        }).catch(error => {
            this.setState({ error: JSON.stringify(error.response.data.data) + '' })
        });        
    }

    deleteAuthor(id) {
        axios.delete('/authors/' + id).then((response) => { this.getAuthors() })     
    }

    showUpdateForm(index) {
        this.setState({
            id: this.state.authors[index].id,
            fname: this.state.authors[index].fname,
            lname: this.state.authors[index].lname,
            description: this.state.authors[index].description,
            error: '',
        })

        $('#updateAuthorModal').show();
    }

    showAddForm() {
        this.clearFields();
        $('#addAuthorModal').show();
    }

    hideAddForm() {
        $('#addAuthorModal').hide();
    }

    hideUpdateForm() {
        $('#updateAuthorModal').hide();
    }

    onChangefname(e) {
        this.setState({ fname: e.target.value })
    }
    
    onChangelname(e) {
        this.setState({ lname: e.target.value })
    }

    onChangedescription(e) {
        this.setState({ description: e.target.value })
    }

    clearFields() {
        this.setState({fname: '', lname: '', description: '', error: ''})
    }

    render() {
        return (
            <Layout> <br/>
                <div className="container">
                    <span className="float-lg-left">
                        <h3> Author Management </h3>
                    </span>
                    <button className="btn btn-outline-success float-lg-right" onClick={ this.showAddForm } >Add New Author</button><br/><br/><br/>
                    <div className="table">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Description</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.authors.map((author, index) =>
                                    <tr id={author.id} key={author.id}>
                                        <td>{author.id}</td>
                                        <td>{author.fname}</td>
                                        <td>{author.lname}</td>
                                        <td>{author.description}</td>
                                        <td>
                                            <button onClick={this.showUpdateForm.bind(this, index)} className="btn btn-sm btn-outline-info">Edit Info</button>&nbsp;
                                            <button onClick={this.deleteAuthor.bind(this, author.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Author Modal */}
                <div id="addAuthorModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enter Author Details</h5>
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
                                        <label>First Name</label>
                                        <input type="text" value={ this.state.fname } onChange={this.onChangefname} className="form-control" placeholder="Enter Author First Name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" value={ this.state.lname } onChange={this.onChangelname} className="form-control" placeholder="Enter Author Last Name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input type="text" value={ this.state.description } onChange={this.onChangedescription} className="form-control" placeholder="Enter Author Description" />
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
                {/* End of Add Author Modal */}

                {/* Update Author Modal */}
                <div id="updateAuthorModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Author Details</h5>
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
                                        <label>First Name</label>
                                        <input type="text" value={ this.state.fname } onChange={this.onChangefname} className="form-control" placeholder="Enter Author First Name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" value={ this.state.lname } onChange={this.onChangelname} className="form-control" placeholder="Enter Author Last Name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input type="text" value={ this.state.description } onChange={this.onChangedescription} className="form-control" placeholder="Enter Author Description" />
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
                {/* End of Update Author Modal */}

            </Layout>
        );
    }
}

export default Authors;
