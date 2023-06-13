import NavLink from './NavLink';

const Nav = () => {
  return (
    <nav className="flex items-center  mx-4 hidden-mobile">
      <NavLink href="/" className="me-2">
        Нүүр
      </NavLink>
      {/* <NavLink href="/trade-in" className="mx-2">
        Trade in
      </NavLink>
      <NavLink href="/wholesale" className="test-text mx-2">
        Бөөндий
      </NavLink> */}
      <NavLink href="/news" className="ms-2">
        Мэдээлэл
      </NavLink>
    </nav>
  );
};

export default Nav;
