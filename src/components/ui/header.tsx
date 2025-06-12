import ImageRenderer from "./image-renderer";
import { ModeToggle } from "./toggle-theme";

interface IPropsAuthHeader {}

const AuthHeader = ({}: IPropsAuthHeader) => {
  return (
    <div className="px-60 py-4 flex items-center justify-between">
      <ImageRenderer src="/assets/images/logoApp.webp" width={50} height={40} />
      <ModeToggle />
    </div>
  );
};

export default AuthHeader;
