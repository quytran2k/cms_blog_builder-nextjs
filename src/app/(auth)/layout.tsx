import AuthHeader from "@/components/ui/header";
import ImageRenderer from "@/components/ui/image-renderer";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full flex flex-col overflow-auto">
      <AuthHeader />
      <div className="flex items-center flex-col gap-4">
        <ImageRenderer
          src="/assets/images/logoApp.webp"
          height={40}
          width={50}
        />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
