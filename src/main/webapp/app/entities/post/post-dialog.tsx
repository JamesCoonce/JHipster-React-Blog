import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';

import { getEntity, updateEntity, createEntity } from './post.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from '../../shared/util/date-utils';

export interface IPostDialogProps {
  getEntity: ICrudGetAction;
  updateEntity: ICrudPutAction;
  createEntity: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  post: any;
  match: any;
  history: any;
}

export interface IPostDialogState {
  showModal: boolean;
  isNew: boolean;
}

export class PostDialog extends React.Component<IPostDialogProps, IPostDialogState> {

  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      showModal: true
    };
  }

  componentDidMount() {
    !this.state.isNew && this.props.getEntity(this.props.match.params.id);
  }

  saveEntity = (event, errors, values) => {
    values.datecreated = new Date(values.datecreated);
    if (this.state.isNew) {
      this.props.createEntity(values);
    } else {
      this.props.updateEntity(values);
    }
    this.handleClose();
  }

  handleClose = () => {
    this.setState({
        showModal: false
    });
    this.props.history.push('/post');
  }

  render() {
    const isInvalid = false;
    const { post, loading, updating } = this.props;
    const { showModal, isNew } = this.state;
    return (
      <Modal isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
        toggle={this.handleClose} size="lg">
      <ModalHeader toggle={this.handleClose}>
        <Translate contentKey="reacthipApp.post.home.createOrEditLabel">Create or edit a Post</Translate>
      </ModalHeader>
      { loading ? <p>Loading...</p>
      : <AvForm model={isNew ? {} : post} onSubmit={this.saveEntity} >
          <ModalBody>
            { post.id ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly/>
              </AvGroup>
              : null
            }
            <AvGroup>
              <Label id="titleLabel" for="title">
                <Translate contentKey="reacthipApp.post.title">
                  title
                </Translate>
              </Label>
              <AvInput type="text" className="form-control" name="title" required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label id="descriptionLabel" for="description">
                <Translate contentKey="reacthipApp.post.description">
                  description
                </Translate>
              </Label>
              <AvInput type="text" className="form-control" name="description" required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label id="publishedLabel" check>
                <AvInput type="checkbox" className="form-control" name="published" />
                <Translate contentKey="reacthipApp.post.published">
                  published
                </Translate>
              </Label>
            </AvGroup>
            <AvGroup>
              <Label id="datecreatedLabel" for="datecreated">
                <Translate contentKey="reacthipApp.post.datecreated">
                  datecreated
                </Translate>
              </Label>
              <AvInput
                type="datetime-local" className="form-control" name="datecreated"
                value={convertDateTimeFromServer(this.props.post.datecreated)} required
              />
              <AvFeedback>This field is required.</AvFeedback>
            </AvGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleClose}>
              <FaBan/>&nbsp;
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>
            <Button color="primary" type="submit" disabled={isInvalid || updating}>
              <FaFloppyO/>&nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </ModalFooter>
        </AvForm>
      }
    </Modal>
    );
  }
}

const mapStateToProps = storeState => ({
  post: storeState.post.entity,
  loading: storeState.post.loading,
  updating: storeState.post.updating
});

const mapDispatchToProps = { getEntity, updateEntity, createEntity };

export default connect(mapStateToProps, mapDispatchToProps)(PostDialog);
