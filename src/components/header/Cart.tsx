import CartIcon from 'icons/Cart';
import Button from 'ui/Button';
import { useCurrentUser, useCurrentOrder } from 'modules/appContext';
import { useItems, useHandleCart, useItemsTotal, useItemsCount } from 'modules/contextHooks';
import Link from 'next/link';
import { ICartItem } from '../../modules/types';
import { formatCurrency } from 'utils';
import { Dialog, DialogContent, DialogTrigger } from 'components/ui/Dialog';
import Xmark from 'icons/Xmark';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LottieView from 'ui/Lottie';
import CartItem from './CartItem';
import { useDialog } from 'lib/CartContext';

const Cart = () => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const { currentOrder } = useCurrentOrder();
  const cart = useItems();
  const total = useItemsTotal();
  const count = useItemsCount();
  const { removeAllFromCart, loading } = useHandleCart();
  const [show, setShow] = useState(false);
  const { openDialog, closeDialog, showDialog } = useDialog();
  const currentCart: ICartItem[] = currentUser
    ? ((currentOrder || {}).items || []).map(({ productName, ...rest }: any) => ({
        name: productName,
        ...rest,
      }))
    : cart || [];

  useEffect(() => {
    if (showDialog) {
      closeDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const renderContent = () => {
    if (!currentCart.length)
      return (
        <div className="my-5 py-3 cart-empty cart-items">
          <LottieView path="https://assets2.lottiefiles.com/packages/lf20_ry4iluja.json" className="-empty" />
          <b className="my-3 sbt block">Таны сагс хоосон байна</b>
        </div>
      );

    return (
      <>
        <div className="cart-items">
          {currentCart.map((item) => (
            <CartItem {...item} key={item.productId} />
          ))}
        </div>
        <div className="cart-footer pt-3">
          <p className="cart-total block text-mid-gray sbt">
            Нийт дүн: <b className="text-blue">{formatCurrency(total)}</b>
          </p>
          <Link className="mt-3 btn flat" href="/checkout/cart">
            Худалдан авах
          </Link>
        </div>
      </>
    );
  };

  return (
    <Dialog open={showDialog} onOpenChange={() => openDialog()}>
      <DialogTrigger asChild>
        <Button className="cart-btn mx-1" variant="ghost">
          <CartIcon />

          <small className="badge">{count ? <b>{count}</b> : <Xmark />}</small>
        </Button>
      </DialogTrigger>
      <DialogContent className="cart-body p-3">
        <div className="flex items-center justify-between pb-3 cart-header">
          <b>Захиалгын мэдээлэл</b>
          <Button className="cart-clean text-blue" variant="ghost" onClick={removeAllFromCart} loading={loading} disabled={!cart.length}>
            <b>{!loading && 'Хоослох'}</b>
          </Button>
        </div>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
