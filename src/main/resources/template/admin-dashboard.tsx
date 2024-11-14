'use client'

import { useState } from 'react'
import { Box, FileText, Settings, Users, BarChart, FolderOpen } from 'lucide-react'

export default function Component() {
    const [storageLocation, setStorageLocation] = useState('/default/storage/path')

    const handleStorageLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStorageLocation(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send this data to your backend
        console.log('Storage location updated:', storageLocation)
        // You might want to show a success message to the user here
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
                    <h1 className="text-2xl font-semibold">Settings</h1>
                    <div className="flex items-center">
                        <span className="mr-2">Last Update: 2024-11-14 20:15</span>
                        <span className="bg-green-500 text-white px-2 py-1 rounded">success</span>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-xl font-semibold mb-6">Storage Location Settings</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storage-location">
                                    Storage Location
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="storage-location"
                                    type="text"
                                    placeholder="Enter storage path"
                                    value={storageLocation}
                                    onChange={handleStorageLocationChange}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* File Listing (similar to previous example) */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                        <h2 className="text-xl font-semibold mb-6">Current Files</h2>
                        <table className="w-full">
                            <thead>
                            <tr className="border-b">
                                <th className="text-left pb-2">File Name</th>
                                <th className="text-left pb-2">File Size</th>
                                <th className="text-left pb-2">Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {[
                                { name: "document.pdf", size: "2.5 MB", date: "2024-11-14 19:30" },
                                { name: "image.jpg", size: "1.8 MB", date: "2024-11-14 18:45" },
                                { name: "data.csv", size: "500 KB", date: "2024-11-14 17:20" },
                            ].map((file, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 text-blue-600">
                                        <div className="flex items-center">
                                            <FileText className="mr-2 w-4 h-4" />
                                            {file.name}
                                        </div>
                                    </td>
                                    <td className="py-2">{file.size}</td>
                                    <td className="py-2">{file.date}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    )
}