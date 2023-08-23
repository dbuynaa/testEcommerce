import Link from 'next/link';
import Image from 'ui/Image';
import { formatCurrency, readFile } from 'utils';
import { IProduct } from 'modules/types';
import dayjs from 'dayjs';

const SaleProduct = ({
  _id,
  name,
  unitPrice,
  onClick,
  attachment,
  createdAt,
  wrapped,
  children,
  countDown,
  isFinished,
  salePercentage,
}: IProduct & {
  onClick?: () => void;
  attachment: { url: string };
  createdAt?: string;
  wrapped?: boolean;
  children?: React.ReactNode;
  isFinished: boolean;
  countDown: any;
  salePercentage: number;
}) => {
  const price = formatCurrency(unitPrice);

  const diffInDays = dayjs().diff(dayjs(createdAt), 'day');

  const render = () => (
    <Link className="product sale-product wholesale-product text-center " href={{ pathname: '/products/[id]', query: { id: _id } }} onClick={onClick}>
      {countDown && <div className="countdown">{countDown}</div>}
      <div className="img-wrapper">
        <Image className="" src={readFile((attachment || {}).url || '')} width={250} height={200} alt="img" />
      </div>
      <p className="product-name mb-1 mt-3">{name}</p>
      <div className="product-price">
        <span className="price">{price}</span>
        <span className="sale-price">{price}</span>
      </div>
      {<small className="product-badge badge sbt product-sale-badge">sale {salePercentage || 30}%</small>}
    </Link>
  );

  return wrapped ? (
    <div className={PRODUCT_WRAPPER_WHOLESALE_CLASS}>
      {render()}
      {children}
    </div>
  ) : (
    <>
      {render()}
      {children}
    </>
  );
};

export const PRODUCT_WRAPPER_WHOLESALE_CLASS = 'col-6 col-md-4 col-xl-3 px-1-5 pb-3'; //col-6 col-md-4 col-xl-3 px-1-5 pb-4

export { SaleProduct };
