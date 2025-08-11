import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../graphql/users'
import EditUser from '../../dashboard/components/EditUser'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Client {
  id: number,
  fullName: string,
  email: string,
  phone: string,
  role: "CUSTOMER" | "ADMIN",
  isActive: boolean
}

const Users = () => {
  const [editClient, setEditClient] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number>()
  const {loading, error, data} = useQuery(GET_USERS,{
    variables: {
      searchInput: {
        keyword: ""
      }
    }
  })

  const clients = data?.getUsers || []

  const editHandler = (clientId: number) => {
    setSelectedId(clientId);
    setEditClient(true);
  };

  if(error){
    return(
      <p>{error.message}</p>
    )
  }
  return (
    <div className={`${"wrapper "} w-full px-10 sm:px-16 min-h-screen pt-3 bg-slate-50`}>
      {editClient && <EditUser userId={Number(selectedId)} onClose={() => setEditClient(false)}/>}
      <div className=' flex items-center gap-10 text-blue-600'>
        <p className=" text-xl text-red-950 font-semibold mb-1">Clients</p>
        <Link to="/dashboard">Artwork</Link>
      </div>
      {loading && <p>Loading...</p>}
      <table>
        <tbody>
          {clients.map((person: Client, index: number) =>(
            <tr key={person.id} className=" even:bg-gray-50 text-sm text-gray-800">
              <td className="border text-start pl-2 pr-2 whitespace-nowrap">{index + 1}</td>
              <td className="border text-start pl-2 pr-2 whitespace-nowrap">{person.fullName}</td>
              <td className="border text-start pl-2 pr-2 whitespace-nowrap">{person.email}</td>
              <td className="border text-start pl-2 pr-2 whitespace-nowrap">{person.phone}</td>
              <td className="border text-start pl-2 pr-2 whitespace-nowrap capitalize">{person.role.toLowerCase()}</td>
              <td className="border text-start pl-2 pr-2 whitespace-nowrap">
                <p onClick={() => editHandler(Number(person.id))} className=' text-xs text-green-600 cursor-pointer hover:underline'>Edit</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users