import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./ui/loadingButton";
import { useAuth0 } from "@auth0/auth0-react";

function CheckoutButton() {
    const {isAuthenticated, isLoading: isAuthLoading, loginWithRedirect} = useAuth0();

    const {pathname} = useLocation();

    const onLogin = async ()=>{
        await loginWithRedirect({
            appState:{
                returnTo: pathname
            }
        })
    }

    if(!isAuthenticated){
        return (
            <Button onClick={onLogin} className="bg-orange-500 flex-1">
                Login to check out 
            </Button>
        )
    }
    if(isAuthLoading){
        return <LoadingButton/>
    }
 
}

export default CheckoutButton
