import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import SocialFormShare from './SocialFormShare';
import { LinkData, LinksServices } from 'core/services';
import SocialForm from 'components/Modal/ModalNetworks';

interface Props {
  user?: any;
}

const SocialBlock: React.FC<Props> = ({ user }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [addedLinks, setAddedLinks] = useState<LinkData[]>([]);

  useEffect(() => {
    LinksServices.linksFetch({ userID: user?.id })
      .then(response => setAddedLinks(response))
      .catch(error => console.log(error));
  }, []);

  const showModal = (): void => setVisible(true);
  const closeModal = (): void => setVisible(false);
  return (
    <div className={'socialBlock'}>
      <SocialFormShare setLinksList={setAddedLinks} linksList={addedLinks} />
      <Modal
        title="Edit social networks"
        visible={visible}
        maskClosable={false}
        onCancel={closeModal}
        footer={null}
        destroyOnClose={true}
      >
        <SocialForm setAddedLinks={setAddedLinks} addedLinks={addedLinks} onCancel={closeModal} />
      </Modal>
      <Button style={{ marginTop: '10px', width: '140px' }} id={'openModal'} onClick={showModal}>
        Edit
      </Button>
    </div>
  );
};

export default SocialBlock;
