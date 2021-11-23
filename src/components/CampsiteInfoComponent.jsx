import React from 'react';
import {
    Card,
    CardImg,
    CardBody,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderComments({ comments }) {
    return (
        <div className="col-md-5 m-1">
            <h4>Comments</h4>
            {comments.map((comment) => {
                return (
                    <div>
                        <h6>{comment.text}</h6>
                        <p>
                            -- {comment.author},{' '}
                            {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                            }).format(new Date(Date.parse(comment.date)))}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function CampsiteInfo(props) {
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
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
}

export default CampsiteInfo;