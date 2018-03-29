import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import Post from './post';
import PostDetail from './post-detail';
import PostDialog from './post-dialog';
import PostDeleteDialog from './post-delete-dialog';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url} component={Post} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/new`} component={PostDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={PostDeleteDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/edit`} component={PostDialog} />
      <Route exact path={`${match.url}/:id`} component={PostDetail} />
    </Switch>
  </div>
);

export default Routes;
