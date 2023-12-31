import Button from 'ui/Button';
import Dropdown, { DropdownItem } from 'ui/Dropdown';
import { useCurrentUser } from 'modules/appContext';
import ProfileContent from './ProfileContent';
import Link from 'next/link';
import Image from 'ui/Image';

const Profile = () => {
  const { currentUser, loadingCurrentUser } = useCurrentUser();

  if (loadingCurrentUser) return <div className="w-10"></div>;

  if (!currentUser)
    return (
      <Button href="/auth/login" variant="slim" className="profile-login  mx-2" Component={Link}>
        Нэвтрэх
      </Button>
    );

  return (
    <Dropdown
      trigger={
        <Button className="profile-btn mx-2 h-10 w-10" variant="ghost">
          <Image height={36} width={36} src={currentUser?.avatar || '/images/user.png'} alt="" className="h-full w-full" />
        </Button>
      }
    >
      <ProfileContent ItemComponent={DropdownItem} />
    </Dropdown>
  );
};

export default Profile;
