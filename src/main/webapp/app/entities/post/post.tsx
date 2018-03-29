import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';

import {
  getEntities
} from './post.reducer';
 // tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IPostProps {
  getEntities: ICrudGetAction;
  posts: any[];
  match: any;
}

export class Post extends React.Component<IPostProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { posts, match } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="reacthipApp.post.home.title">Posts</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FaPlus /> <Translate contentKey="reacthipApp.post.home.createLabel" />
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th><Translate contentKey="reacthipApp.post.title">Title</Translate></th>
                <th><Translate contentKey="reacthipApp.post.description">Description</Translate></th>
                <th><Translate contentKey="reacthipApp.post.published">Published</Translate></th>
                <th><Translate contentKey="reacthipApp.post.datecreated">Datecreated</Translate></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                posts.map((post, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${post.id}`} color="link" size="sm">
                      {post.id}
                    </Button>
                  </td>
                  <td>
                    {post.title}
                  </td>
                  <td>
                    {post.description}
                  </td>
                  <td>
                    {post.published ? 'true' : 'false'}
                  </td>
                  <td>
                    <TextFormat type="date" value={post.datecreated} format={APP_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${post.id}`} color="info" size="sm">
                        <FaEye/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${post.id}/edit`} color="primary" size="sm">
                        <FaPencil/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${post.id}/delete`} color="danger" size="sm">
                        <FaTrash/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.delete" /></span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  posts: storeState.post.entities
});

const mapDispatchToProps = { getEntities };

export default connect(mapStateToProps, mapDispatchToProps)(Post);
