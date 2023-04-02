

import { useState } from 'react';
import Button from 'ui/Button';
import Counter from 'ui/Counter';
import { useHandleCart } from 'modules/contextHooks';
import { IProduct } from 'modules/types';
import useHandleBuy from 'lib/useHandleBuy';

const Actions = (props: IProduct) => {
  const { name, unitPrice, attachment, _id } = props;
  const [count, setCount] = useState<number>(1);
  const { handleBuy } = useHandleBuy();
  const { handleAddToCart, loading } = useHandleCart();

  const handleAdd = () =>
    handleAddToCart({ name, unitPrice, attachment, _id, count });

  return (
    <div className="row items-center -controls pt-5">
      <Counter count={count} setCount={setCount} />
      <Button variant="slim" onClick={handleAdd} loading={loading}>
        Сагсанд нэмэх
      </Button>
      <Button
        onClick={() => {
          handleAdd();
          handleBuy();
        }}
      >
        Худалдан авах
      </Button>
    </div>
  );
};

export default Actions;
