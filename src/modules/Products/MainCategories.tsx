import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useState } from 'react';
const MainCategories = ({ mainCategories }: any) => {
  const router = useRouter();
  const { category } = router.query;
  const { product } = router.query;
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="product-cats ">
      <div className="container flex items-center hover-scroll -x">
        <div className="relative inline-block">
          {isOpen && (
            <div className=" top-0 left-0 mt-2 py-2 shadow-lg">
              {(mainCategories || []).map(({ _id, name }: any) => (
                <Link
                  key={_id}
                  href={{ pathname: '/products', query: { category: _id } }}
                  className={clsx('product-cat', {
                    '-active': category === _id
                  })}
                >
                  {name}
                  <button
                    className="hover:opacity-50 cursor-default"
                    onClick={toggleDropdown}
                  >
                    {product}
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainCategories;
