import { ErrorPage } from "../../components/error-page/error-page";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Navbar } from "../../components/navbar/navbar";
import { ErrorType } from "../../components/error-page/constants";


export const ApproveClubs = () => {
  const user = useCurrentUser();

  if (!user) {
    // TODO: if the user is not an admin, show the other error page
    return <ErrorPage type={ErrorType.NoSession}/>;
  }

  return (
    <div>
      <Navbar />
      This will be the club approval page
    </div>
  );
};
