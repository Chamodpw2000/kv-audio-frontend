import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setUsers(res.data);
                setLoading(false);


            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
        };


        if (loading) {
            fetchUsers();
        }


    }, [loading]);


    function handleBlockUser(email) {
        const token = localStorage.getItem('token');
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {

            setLoading(true);
        }).catch((err) => {
            console.error(err);
        })
    }
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Users Management</h2>
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Profile</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Phone</th>
                                <th className="border border-gray-300 px-4 py-2">Role</th>
                                <th className="border border-gray-300 px-4 py-2">Address</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <img src={user.profilePicture} alt="Profile" className="w-10 h-10 rounded-full mx-auto" />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{user.firstName} {user.lastName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                                    <td className="border border-gray-300 px-4 py-2 capitalize">{user.role}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.address}</td>
                                    <td onClick={()=>{handleBlockUser(user.email)}} className='border border-gray-300 px-4 py-2 cursor-pointer'>{user.isBlocked ? "BLOCKED" : "ACTIVE"}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Users;
