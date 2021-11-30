/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import {
    Card,
    CardImg,
    CardBody,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    FormGroup,
} from 'reactstrap';

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            author: false,
        };

        this.ToggleModal = this.ToggleModal.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);
    }

    ToggleModal() {
        this.setState({ modalIsOpen: !this.state.modalIsOpen });
    }

    HandleSubmit(values) {
        this.ToggleModal();
        this.props.postComment(
            this.props.campsiteId,
            values.rating,
            values.author,
            values.text
        );
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.ToggleModal}>
                    <i class="fa fa-lg fa-pencil"></i> Submit Comment
                </Button>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    toggle={this.ToggleModal}
                >
                    <ModalHeader toggle={this.ToggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm
                            onSubmit={(values) => this.HandleSubmit(values)}
                        >
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select
                                    model=".rating"
                                    id="rating"
                                    name="rating"
                                    className="form-control"
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text
                                    model=".author"
                                    id="author"
                                    name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15),
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength:
                                            'Must be at least 2 characters',
                                        maxLength:
                                            'Must be 15 characters or less',
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea
                                    model=".text"
                                    id="text"
                                    name="text"
                                    className="form-control"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary">Submit</Button>
                            </FormGroup>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderComments({ comments, postComment, campsiteId }) {
    return (
        <div className="col-md-5 m-1">
            <h4>Comments</h4>
            <Stagger in>
                {comments.map((comment) => {
                    return (
                        <Fade in key={comment.id}>
                            <div>
                                <h6>{comment.text}</h6>
                                <p>
                                    -- {comment.author},{' '}
                                    {new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit',
                                    }).format(
                                        new Date(Date.parse(comment.date))
                                    )}
                                </p>
                            </div>
                        </Fade>
                    );
                })}
            </Stagger>

            <CommentForm campsiteId={campsiteId} postComment={postComment} />
        </div>
    );
}

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{ exitTransform: 'scale(0.5) translateY(50%)' }}
            >
                <Card>
                    <CardImg
                        top
                        src={baseUrl + campsite.image}
                        alt={campsite.name}
                    />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/directory">Directory</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {props.campsite.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
}

export default CampsiteInfo;
