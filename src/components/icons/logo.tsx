import { content } from "lib/Settings";
import Image from "next/image";

const Logo = ({ ...props }) => {
  return (
    <Image src={content.logo} {...props} alt="logo" width={400} height={400} />
  );
};

export default Logo;
