import React, { useEffect, useState } from 'react'

function View() {
    const [favPackage, setFavPackage] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [editReason, setEditReason] = useState('');
    useEffect(() => {
        const storedPackages = localStorage.getItem('favoritePackages');

        if (storedPackages) {
            setFavPackage(JSON.parse(storedPackages));
        }
    }, [])
    const handleDelete = (name) => {
        const updatedPackages = favPackage.filter(pkg => pkg.name !== name);
        setFavPackage(updatedPackages);
        localStorage.setItem('favoritePackages', JSON.stringify(updatedPackages));
    };

    const handleEdit = (pkg) => {
        setIsEditing(pkg.name);
        setEditReason(pkg.reason);
    };

    const handleSave = (name) => {
        const updatedPackages = favPackage.map(pkg =>
            pkg.name === name ? { ...pkg, reason: editReason } : pkg
        );
        setFavPackage(updatedPackages);
        localStorage.setItem('favoritePackages', JSON.stringify(updatedPackages));
        setIsEditing(null);
        setEditReason('');
    };
    return (
        <>
            
            <div className="max-w-md mx-auto my-4 p-4">
                <h1 className='text-center mb-4' >Welcome to Favorite NPM packages.</h1>
                {favPackage.length > 0 ? (
                    <div className='flex flex-col items-center'>
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Package Name</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favPackage.map(pkg => (

                                <tr key={pkg.name}>
                                    <td className="py-2 px-4 border-b">{pkg.name}</td>
                                    <td className="py-2 px-4 border-b">
                                    <div className='flex justify-around'>
                                        <button className='text-blue-500 hover:text-blue-700' onClick={() => alert(`Reason:${pkg.reason}`)}> View Reason</button>
                                        <button className="text-yellow-500 hover:text-yellow-700" onClick={() => handleEdit(pkg)}> Edit </button>
                                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(pkg.name)}> Delete </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isEditing && (
                        <div className="mt-4 w-full">
                            <label htmlFor="editReason" className="block text-gray-700 text-sm font-bold mb-2">
                                Edit Reason
                            </label>
                            <input
                                id="editReason"
                                type="text"
                                value={editReason}
                                onChange={(e) => setEditReason(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <div className="flex justify-end mt-2">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => handleSave(isEditing)}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                        setIsEditing(null);
                                        setEditReason('');
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                ) : (
                <div className="border rounded p-4 text-center">
                    <p className="mb-4">No favorite packages saved.</p>
                </div>

                )
                }

            </div>
        </>
    )
}

export default View
