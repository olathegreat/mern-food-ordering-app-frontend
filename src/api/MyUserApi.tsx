import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { error } from "console";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 


type CreateUserRequest = {
    auth0Id: string;    
    email: string;  
};

export const useCreateMyUser = ( ) => {

  const {getAccessTokenSilently} = useAuth0() 


    const createMyUserRequest = async(user: CreateUserRequest) =>{
        const accessToken = await getAccessTokenSilently()  ;
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json" , 
                Authorization: `Bearer ${accessToken}`  
            },
            body: JSON.stringify(user), 
        })


        if(!response.ok){
            throw new Error("Failed to create user")
        }
    }

    const  {mutateAsync: createUser , isLoading, isError, isSuccess} = useMutation(createMyUserRequest)   

    return {createUser, isLoading, isError, isSuccess}
}

type UpdateMyUserRequest ={
    name: string;   
    addressLine1: string;
    country: string;    
    city: string;   
}

export const useUpdateMyUser = () =>{
    const {getAccessTokenSilently} = useAuth0()

    const updateMyUserRequest = async( formData:UpdateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently()

            const response = await fetch(`${API_BASE_URL}/api/my/user/`, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json" ,
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(formData),
            })

            if(!response.ok){
                throw new Error("Failed to update user")    
            }
    }


    const {mutateAsync: updateUser, isLoading, isError,error, isSuccess, reset} = useMutation(updateMyUserRequest)   ;
    if(isSuccess){
        toast.success("user profile updated!")
    }
    if(error){
        toast.error(error.toString());
        reset();
    }
    return {updateUser, isLoading, isError, error, isSuccess, reset}    

}


export const useGetMyUser = () =>{
    const {getAccessTokenSilently} = useAuth0();

    const getMyUserRequest = async():Promise<User> =>{
        const accessToken = await getAccessTokenSilently() 
        
        const response = await fetch(`${API_BASE_URL}/api/my/user/`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json" ,
                Authorization: `Bearer ${accessToken}`
            },
        })

        if(!response.ok){
            throw new Error("Failed to get user")
        }   

        return response.json();
    }


     const {data:currentUser, isLoading,  error} = useQuery("fetchCurrentUser", getMyUserRequest)  ;


     if(error){
        toast.error(error.toString());
     }
     return {currentUser, isLoading} 
}