'use client'

import { useState } from 'react'
import { Box, Users, BarChart, Settings, FolderOpen, Search, Edit, Trash2, Plus, X } from 'lucide-react'

type User = {
    id: number
    name: string
    email: string
    password: string
    role: string
    lastLogin: string
}

export default function Component() {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'John Doe', email: 'john@example.com', password: '********', role: 'Admin', lastLogin: '2024-11-14 10:30' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: '********', role: 'Editor', lastLogin: '2024-11-13 15:45' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', password: '********', role: 'Viewer', lastLogin: '2024-11-12 09:20' },
    ])

    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAddUser = () => {
        setCurrentUser(null)
        setIsModalOpen(true)
    }

    const handleEditUser = (id: number) => {
        const userToEdit = users.find(user => user.id === id)
        if (userToEdit) {
            setCurrentUser(userToEdit)
            setIsModalOpen(true)
        }
    }

    const handleDeleteUser = (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.id !== id))
        }
    }

    const handleSubmitUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const newUser: User = {
            id: currentUser ? currentUser.id : users.length + 1,
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            role: formData.get('role') as string,
            lastLogin: currentUser ? currentUser.lastLogin : 'Never'
        }

        if (currentUser) {
            setUsers(users.map(user => user.id === currentUser.id ? newUser : user))
        } else {
            setUsers([...users, newUser])
        }
        setIsModalOpen(false)
    }

    return (
        <div className="flex h-screen bg-gray-100 font-mono">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="flex items-center justify-center h-16 border-b">
                    <Box className="mr-2" />
                    <span className="text-xl font-semibold">Admin Panel</span>
                </div>
                <nav className="mt-6">
                    {[
                        { icon: FolderOpen, text: 'Files' },
                        { icon: Users, text: 'Users' },
                        { icon: BarChart, text: 'Analytics' },
                        { icon: Settings, text: 'Settings' },
                    ].map((item, index) => (
                        <a
                            key={index}
                            href="#"
                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
                        >
                            <item.icon className="mr-3 w-5 h-5" />
                            {item.text}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
                    <h1 className="text-2xl font-semibold">Users</h1>
                    <div className="flex items-center">
                        <span className="mr-2">Total Users: {users.length}</span>
                        <span className="bg-blue-500 text-white px-2 py-1 rounded">Active</span>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="flex justify-between items-center mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    className="pl-10 pr-4 py-2 border rounded-lg"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            </div>
                            <button
                                onClick={handleAddUser}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                            >
                                <Plus size={20} className="mr-2" />
                                Add User
                            </button>
                        </div>
                        <table className="w-full">
                            <thead>
                            <tr className="border-b">
                                <th className="text-left pb-2">Name</th>
                                <th className="text-left pb-2">Email</th>
                                <th className="text-left pb-2">Password</th>
                                <th className="text-left pb-2">Role</th>
                                <th className="text-left pb-2">Last Login</th>
                                <th className="text-left pb-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="py-2">{user.name}</td>
                                    <td className="py-2">{user.email}</td>
                                    <td className="py-2">{user.password}</td>
                                    <td className="py-2">{user.role}</td>
                                    <td className="py-2">{user.lastLogin}</td>
                                    <td className="py-2">
                                        <button
                                            onClick={() => handleEditUser(user.id)}
                                            className="text-blue-600 hover:text-blue-800 mr-2"
                                            aria-label={`Edit ${user.name}`}
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="text-red-600 hover:text-red-800"
                                            aria-label={`Delete ${user.name}`}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Modal for Add/Edit User */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{currentUser ? 'Edit User' : 'Add New User'}</h3>
                            <form onSubmit={handleSubmitUser} className="mt-2 text-left">
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                    <input type="text" id="name" name="name" required
                                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           defaultValue={currentUser?.name} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                    <input type="email" id="email" name="email" required
                                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           defaultValue={currentUser?.email} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                    <input type="password" id="password" name="password" required
                                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           defaultValue={currentUser?.password} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                                    <select id="role" name="role" required
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            defaultValue={currentUser?.role}>
                                        <option value="Admin">Admin</option>
                                        <option value="Editor">Editor</option>
                                        <option value="Viewer">Viewer</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        {currentUser ? 'Update User' : 'Add User'}
                                    </button>
                                    <button type="button" onClick={() => setIsModalOpen(false)}
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}