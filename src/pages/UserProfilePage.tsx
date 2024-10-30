import { useGetMyUser, useUpdateMyUser } from '@/api/MyUserApi'
import UserProfileForm from '@/forms/user-profile-form/UserProfileForm'
function UserProfilePage() {
    const {updateUser, isLoading: isUpdateLoading} = useUpdateMyUser()
    const {currentUser, isLoading: isGetLoading} = useGetMyUser();


    if(isGetLoading){
        return <div>Loading...</div>
    }
    if(!currentUser){
        return <div>Unable to load user data</div>
    }   
  return (
    <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />
  )
}

export default UserProfilePage
