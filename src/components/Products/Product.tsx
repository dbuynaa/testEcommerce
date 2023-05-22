import Link from 'next/link';
import Image from 'ui/Image';
import { formatCurrency, readFile } from 'utils';
import { IProduct } from 'modules/types';
import dayjs from 'dayjs';

const Product = ({
  _id,
  name,
  unitPrice,
  onClick,
  attachment,
  createdAt,
  wrapped,
  children,
}: IProduct & {
  onClick?: () => void;
  attachment: { url: string };
  createdAt?: string;
  wrapped?: boolean;
  children?: React.ReactNode;
}) => {
  const price = formatCurrency(unitPrice);

  const diffInDays = dayjs().diff(dayjs(createdAt), 'day');

  const render = () => (
    <Link
      className="product text-center"
      href={{ pathname: '/products/[id]', query: { id: _id } }}
      onClick={onClick}
    >
      <div className="img-wrap">
        <Image
          src={readFile((attachment || {}).url || '')}
          alt=""
          sizes="(max-width: 768px) 50vw, (max-width: 1500px) 25vw, 20vw"
          contain
          withLoader
        />
      </div>
      <p className="product-name mb-1 mt-3">{name}</p>
      <div className="product-price">{price}</div>
      {diffInDays < 60 && (
        <small className="product-badge badge sbt">New</small>
      )}
    </Link>
  );

  return wrapped ? (
    <div className={PRODUCT_WRAPPER_CLASS}>
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

export const PRODUCT_WRAPPER_CLASS = 'col-6 col-md-4 col-xl-3 px-1-5 pb-4';

export default Product;
