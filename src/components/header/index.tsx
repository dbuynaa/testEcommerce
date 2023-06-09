import Logo from 'icons/logo';
import Link from 'next/link';
import Cart from './Cart';
import ScrollWrapper from './Wrapper';
import Nav from './Nav';
import Search from './Search';
import MainCategories from 'modules/Products/MainCategories';
import Profile from './Profile';
import Top from './top';
import useScrollDirection from 'lib/useScrollDirection';
import { AnimatePresence } from 'framer-motion';

const Header = ({ mainCategories }: any) => {
  const direction = useScrollDirection();
  return (
    <>
      <ScrollWrapper className="header scroll">
        <header>
          <AnimatePresence>{direction !== 'down' && <Top />}</AnimatePresence>
          <div className="flex py-2 py-md-3 justify-between items-center container">
            <div className="col-md-9">
              <div className="flex items-center">
                <Link href="/">
                  <Logo className="logo" />
                </Link>
                <Search desktop />
                <Nav />
              </div>
            </div>
            <div className="flex items-center">
              <Search />
              <Cart />
              <Profile />
            </div>
          </div>
          <MainCategories mainCategories={mainCategories} />
        </header>
      </ScrollWrapper>
    </>
  );
};

export default Header;
