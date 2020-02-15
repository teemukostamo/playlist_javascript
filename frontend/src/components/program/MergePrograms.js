import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import { mergePrograms } from '../../actions/programActions';
import { setNotification } from '../../reducers/notificationReducer';

const MergePrograms = ({
  program_id,
  program_name,
  programs,
  setNotification
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [programToMerge, setProgramToMerge] = useState(null);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  if (!modalOpen) {
    return (
      <button type='button' className='link-btn' onClick={handleOpen}>
        {program_id}
      </button>
    );
  }
  const onSubmit = () => {
    const mergeParams = {
      type: 'program',
      merge: programToMerge,
      mergeTo: program_id
    };
    mergePrograms(mergeParams);
    setNotification(`Ohjelma #${mergeParams.merge} yhdistetty!`, 'success');
    handleClose();
  };
  const mergeOptions = programs.allPrograms.map(program => ({
    id: program.id,
    text: `${program.id} - ${program.name}`,
    value: program.id
  }));
  const getProgramToMerge = (e, { value }) => {
    e.preventDefault();
    setProgramToMerge(value);
  };
  return (
    <Modal
      open={modalOpen}
      closeIcon
      onClose={handleClose}
      trigger={
        <button type='button' className='link-btn' onClick={handleOpen}>
          {program_id}
        </button>
      }
    >
      <Header>
        Yhdistä albumiin {program_id} - {program_name} tiedot
      </Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <Dropdown
              onChange={getProgramToMerge}
              selection
              search
              options={mergeOptions}
            />
          </Form.Field>
          <Form.Field>
            <Button type='submit'>Yhdistä</Button>
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

MergePrograms.propTypes = {
  program_id: PropTypes.number.isRequired,
  program_name: PropTypes.string.isRequired,
  programs: PropTypes.shape({
    activePrograms: PropTypes.arrayOf(
      PropTypes.shape({
        created_at: PropTypes.string,
        display: PropTypes.number,
        id: PropTypes.number,
        identifier: PropTypes.string,
        name: PropTypes.string,
        site: PropTypes.number,
        updated_at: PropTypes.string,
        user_id: PropTypes.number
      })
    ),
    allPrograms: PropTypes.arrayOf(
      PropTypes.shape({
        created_at: PropTypes.string,
        display: PropTypes.number,
        id: PropTypes.number,
        identifier: PropTypes.string,
        name: PropTypes.string,
        site: PropTypes.number,
        updated_at: PropTypes.string,
        user_id: PropTypes.number
      })
    ),
    loading: PropTypes.bool
  }),
  setNotification: PropTypes.func
};

const mapStateToProps = state => {
  // console.log('MergeAlbums state', state);
  return {
    programs: state.programs
  };
};

const connectedMergePrograms = connect(mapStateToProps, {
  mergePrograms,
  setNotification
})(MergePrograms);

export default connectedMergePrograms;
