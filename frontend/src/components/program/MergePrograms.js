import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Form, Button, Dropdown } from 'semantic-ui-react';
import { mergePrograms } from '../../actions/programActions';
import { setNotification } from '../../reducers/notificationReducer';

const MergePrograms = props => {
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
      <button className="link-btn" onClick={handleOpen}>
        {props.program_id}
      </button>
    );
  } else {
    const onSubmit = () => {
      const mergeParams = {
        type: 'program',
        merge: programToMerge,
        mergeTo: props.program_id
      };
      console.log(mergeParams);
      props.mergePrograms(mergeParams);
      props.setNotification(
        `Ohjelma #${mergeParams.merge} yhdistetty!`,
        'success'
      );
      handleClose();
    };
    const mergeOptions = props.programs.allPrograms.map(program => ({
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
          <button className="link-btn" onClick={handleOpen}>
            {props.program_id}
          </button>
        }
      >
        <Header>
          Yhdistä albumiin {props.program_id} - {props.program_name} tiedot
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
              <Button type="submit">Yhdistä</Button>
            </Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
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
