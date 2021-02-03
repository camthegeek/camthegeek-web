import React, { Component } from "react";
import axios from 'axios';
import config from '../../config.json';
import { Form, Button } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import ImageUploader from 'react-images-upload';

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false,
            displayAdd: '',
            body: '',
            pictures: [],
        }
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: pictureFiles
        });
    }

    handleEditorChange = (content, editor) => {
        //console.log('Content was updated:', content);
        this.setState({
            body: content
        })
    }

    componentDidMount() {
        let disp = this.props.displayAdd;
        this.setState({
            displayAdd: disp
        });
    }

    AddProject = (e) => {
        if (e) e.preventDefault();
        let form = e.target;
        const formData = new FormData();
        formData.append('title', form.elements.title.value);
        formData.append('body', this.state.body);
        for (var x = 0; x < this.state.pictures.length; x++) {
            formData.append('img', this.state.pictures[x])
        }
        const headers = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post('//' + config.api.url + ':' + config.api.port + '/api/admin/add/project', formData, headers, {

        })
            .then((response) => {
                this.setState((currentState) => ({
                    success: !currentState.success,
                }));
                this.hideThis();
            })
            .catch((error) => {
                this.setState({
                    error: true,
                });
            })
    }

    hideThis = () => {
        setTimeout(() => {
            this.setState({ displayAdd: false });
        }, 5000)
    }

    render() {
        return (
            <>
                {this.state.displayAdd &&
                    <div className="card">

                        <div className="card-body">
                            <h3 className="card-title">Add a project</h3>
                            {!this.state.success &&
                                <Form onSubmit={this.AddProject}>
                                    <Form.Group controlId="title">
                                        <Form.Label>title</Form.Label>
                                        <Form.Control type="text" name="title" placeholder="Title of blog" />
                                    </Form.Group>

                                    <Form.Group controlId="body">
                                        <Form.Label>Body</Form.Label>
                                        <Editor
                                            initialValue="<p>This is the initial content of the editor</p>"
                                            init={{
                                                height: 500,
                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar:
                                                    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                                            }}
                                            onEditorChange={this.handleEditorChange}
                                            apiKey={config.tinycloud.key}
                                            name="body"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="image">
                                        <ImageUploader
                                            withIcon={true}
                                            buttonText='Choose image'
                                            onChange={this.onDrop}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                            name="img"
                                            type="file"
                                            withPreview={true}
                                            singleImage={true}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            }

                            {this.state.success &&
                                <div className="text-success">
                                    New project added!
                                </div>
                            }
                            {this.state.error &&
                                <div className="text-danger">
                                    Error, something went wrong.
                                </div>
                            }
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default AddProject;