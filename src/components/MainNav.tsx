
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

function MainNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
        <Link to="/order-status" className="font-bold hover:text-orange-500">Order status</Link>
         <UsernameMenu />
        </>
       
      ) : (
        <Button
          onClick={async () => loginWithRedirect()}
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
        >
          Log In
        </Button>
      )}
    </span>
  );
}

export default MainNav;
