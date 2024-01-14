import { ErrorPage } from "../../components/error-page/error-page";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Navbar } from "../../components/navbar/navbar";
import { ErrorType } from "../../components/error-page/constants";

export const Chat = () => {
  const user = useCurrentUser();

  if (!user) {
    return <ErrorPage type={ErrorType.NoSession} />;
  }

  return (
    <div>
      <Navbar />
      This will be the chat page
    </div>
  );
};
