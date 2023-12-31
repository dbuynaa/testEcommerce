import Button from 'ui/Button';
import Modal from 'ui/Modal';
import ErxesForm from 'ui/ErxesForm';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { mutations, queries } from './graphql';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const OrderEnd = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const [openDirect, setOpenDirect] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const [changeStatus, { loading }] = useMutation(mutations.orderChangeStatus, {
    variables: {
      _id: id,
      status: 'pending',
    },
    refetchQueries: [{ query: queries.lastOrder }, 'LastOrder'],
    onError(error) {
      toast.error(error.message);
    },
    onCompleted() {
      refetch({ variables: { id } });
      setOpenDirect(false);
    },
  });

  const [afterFormSubmit, { loading: loadFormSubmit }] = useMutation(mutations.afterFormSubmit, {
    onCompleted() {
      changeStatus();
      setOpen(false);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onCompleted = (data: any) => {
    if ((data || {}).status === 'SUCCESS') {
      const { conversationId } = (data || {}).response || {};
      if (conversationId) {
        afterFormSubmit({
          variables: {
            conversationId,
            id,
          },
        });
      }
    }
  };

  return (
    <>
      <Modal
        trigger={
          <div className="w-full">
            <Button className="-pay-btn w-full bg-gray-200 p-2" variant="slim" loading={loading || loadFormSubmit}>
              Зээлээр авах
            </Button>
          </div>
        }
        open={open}
        onOpenChange={() => setOpen((prev) => !prev)}
        contentClassName="order-detail-leasing"
      >
        <ErxesForm brandId="3fpXck" formId="2jfJy7" onCompleted={onCompleted} />
      </Modal>
      <Modal
        trigger={
          <div className="w-full">
            <Button variant="slim" className="-pay-btn w-full bg-gray-200 p-2" loading={loading}>
              Шууд захиалах
            </Button>
          </div>
        }
        open={openDirect}
        onOpenChange={() => setOpenDirect((prev) => !prev)}
        contentClassName="order-detail-direct p-5"
      >
        <p>Та шууд захиалга хийхдээ итгэлтэй байна уу? Онлайн ажилтан тантай тун удахгүй холбогдох болно.</p>
        <div className="flex-center order-detail-direct pt-3">
          <Button
            className="-pay-btn me-3"
            onClick={() => {
              changeStatus();
            }}
            loading={loading}
          >
            Тийм
          </Button>
          <Button variant="slim" onClick={() => setOpenDirect(false)}>
            Үгүй
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default OrderEnd;
