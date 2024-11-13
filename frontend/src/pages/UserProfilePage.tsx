import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi"
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"

const UserProfilePage = () => {
    const {currentUser, isLoading: isGetLoading} = useGetMyUser();
    const {updateUser, isLoading: isUpdateLoading} = useUpdateMyUser();

    if(isGetLoading) {
        return <span>Loading....</span>
    }

    if(!currentUser) {
        return <span>Khong the load dc thong tin ca nhan</span>
    }
  
    return <UserProfileForm currentUser = {currentUser} onSave={updateUser} isLoading = {isUpdateLoading}/>
}

export default UserProfilePage