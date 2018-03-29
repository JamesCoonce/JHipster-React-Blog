import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getEntity } from './post.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IPostDetailProps {
  getEntity: ICrudGetAction;
  post: any;
  match: any;
}

export class PostDetail extends React.Component<IPostDetailProps> {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="reacthipApp.post.detail.title">Post</Translate> [<b>{post.id}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="reacthipApp.post.title">
              title
              </Translate>
            </span>
          </dt>
          <dd>
            {post.title}
          </dd>
          <dt>
            <span id="description">
              <Translate contentKey="reacthipApp.post.description">
              description
              </Translate>
            </span>
          </dt>
          <dd>
            {post.description}
          </dd>
          <dt>
            <span id="published">
              <Translate contentKey="reacthipApp.post.published">
              published
              </Translate>
            </span>
          </dt>
          <dd>
            {post.published ? 'true' : 'false'}
          </dd>
          <dt>
            <span id="datecreated">
              <Translate contentKey="reacthipApp.post.datecreated">
              datecreated
              </Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={post.datecreated} type="date" format={APP_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/post" replace color="info">
          <FaArrowLeft/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
    post: storeState.post.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
