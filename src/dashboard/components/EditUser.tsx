import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { GET_USERS, UPDATE_USER } from '../../graphql/users'

interface EditUserProps{
    userId: number
    onClose: () => void
}

const EditUser: React.FC<EditUserProps> = ({userId, onClose}) => {
    const [generalError, setGeneralError] = useState<string>("");
    const [fieldErrors, setFieldErrors] = useState<string[]>([]);
    const[userData, setUserData] = useState({
        role: ""
    })

    const[updateUser, {loading}] = useMutation(UPDATE_USER, {
        onError: (error) => {
            // 🔹 Extract validation errors from GraphQL if available
            const validationErrors = Array.isArray(
              (error.graphQLErrors[0]?.extensions?.originalError as any)?.message
            )
              ? (error.graphQLErrors[0]?.extensions?.originalError as any).message
              : [
                  (error.graphQLErrors[0]?.extensions?.originalError as any)
                    ?.message || error.message,
                ];
      
            if (Array.isArray(validationErrors)) {
              setFieldErrors(validationErrors);
            } else {
              setGeneralError(error.message || "Please fill in the necessary data");
            }
          },
    })
    const changeHandler =(identifier: string, value: string) =>{
        setUserData((prev) =>({
            ...prev,
            [identifier]: value
        }))
    }
    const editHandler=(e: React.FormEvent)=> {
        e.preventDefault()
        if(!userData.role){
            setGeneralError("Please fill all the fields");
            return;
        }
        updateUser({
            variables: {
                userId: Number(userId),
                updateInput: {
                    role: userData.role.toUpperCase()
                }
            },
            refetchQueries: [GET_USERS]
        })
        setUserData({
            role: ""
        })
    }
  return (
    <div className="absolute top-0 left-0 z-50 w-full h-full flex pt-36 justify-center bg-black bg-opacity-15">
        <form onSubmit={editHandler} className=' bg-white p-4 rounded-sm max-h-40 relative'>
            <p onClick={onClose} className=' absolute right-4 top-0 cursor-pointer'>x</p>
        <div className=" flex-1 flex flex-col mb-3">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                className=" border outline-blue-500 rounded-sm pl-2 py-1 w-72"
                value={userData.role}
                onChange={(e) => changeHandler("role", e.target.value)}
              >
                <option value="">Select</option>
                <option value="CUSTOMER">Customer</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            {generalError && (
            <p className="text-xs text-red-700 bg-red-100 rounded-sm mb-2 p-1">
              {generalError}
            </p>
          )}

          {fieldErrors.length > 0 && (
            <ul className="text-xs text-red-700 bg-red-100 rounded-sm mb-2 p-1">
              {fieldErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}
            <button className=" w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-sm shadow-sm hover:shadow-md">
            {loading ? "Editing user..." : "Edit User"}
          </button>
        </form>
    </div>
  )
}

export default EditUser