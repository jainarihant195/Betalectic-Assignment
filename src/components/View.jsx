import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Modal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="text-lg text-gray-800">
          Are you sure you want to delete {itemName}?
        </p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function View({ favPackage,setFavPackage }) {
  
  const [isEditing, setIsEditing] = useState(null);
  const [editReason, setEditReason] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const storedPackages = localStorage.getItem("favoritePackages");
    if (storedPackages) {
      setFavPackage(JSON.parse(storedPackages));
    }
  }, []);

  const handleDelete = (name) => {
    setDeleteItem(name);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedPackages = favPackage.filter((pkg) => pkg.name !== deleteItem);
    setFavPackage(updatedPackages);
    localStorage.setItem("favoritePackages", JSON.stringify(updatedPackages));
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = (pkg) => {
    setIsEditing(pkg.name);
    setEditReason(pkg.reason);
  };

  const handleSave = (name) => {
    const updatedPackages = favPackage.map((pkg) =>
      pkg.name === name ? { ...pkg, reason: editReason } : pkg
    );
    setFavPackage(updatedPackages);
    localStorage.setItem("favoritePackages", JSON.stringify(updatedPackages));
    setIsEditing(null);
    setEditReason("");
  };

  return (
    <>
      <div className="max-w-md mx-auto my-4 p-4">
        <h1 className="text-center mb-4">Welcome to Favorite NPM packages.</h1>
        {favPackage.length > 0 ? (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-3xl p-6 bg-white border-gray-400 rounded-lg shadow-lg">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300">
                      Package Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 border-l">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {favPackage.map((pkg) => (
                    <tr key={pkg.name}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {pkg.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 border-l">
                        <div className="flex justify-around">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() =>
                              alert(`Reason:  ${pkg.reason}`)
                            }
                          >
                            <svg
                             

fill="#000000"
className="h-5 w-5"
viewBox="0 0 42 42"
xmlns="http://www.w3.org/2000/svg"
xmlnsXlink="http://www.w3.org/1999/xlink"
enableBackground="new 0 0 42 42"
xmlSpace="preserve"
>
<path d="M15.3,20.1c0,3.1,2.6,5.7,5.7,5.7s5.7-2.6,5.7-5.7s-2.6-5.7-5.7-5.7S15.3,17,15.3,20.1z M23.4,32.4 C30.1,30.9,40.5,22,40.5,22s-7.7-12-18-13.3c-0.6-0.1-2.6-0.1-3-0.1c-10,1-18,13.7-18,13.7s8.7,8.6,17,9.9 C19.4,32.6,22.4,32.6,23.4,32.4z M11.1,20.7c0-5.2,4.4-9.4,9.9-9.4s9.9,4.2,9.9,9.4S26.5,30,21,30S11.1,25.8,11.1,20.7z" />
</svg>
</button>
<button
className="text-yellow-500 hover:text-yellow-700"
onClick={() => handleEdit(pkg)}
>
<svg
className="h-5 w-5"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M20.9888 4.28491L19.6405 2.93089C18.4045 1.6897 16.4944 1.6897 15.2584 2.93089L13.0112 5.30042L18.7416 11.055L21.1011 8.68547C21.6629 8.1213 22 7.33145 22 6.54161C22 5.75176 21.5506 4.84908 20.9888 4.28491Z"
  fill="#030D45"
/>
<path
  d="M16.2697 10.9422L11.7753 6.42877L2.89888 15.3427C2.33708 15.9069 2 16.6968 2 17.5994V21.0973C2 21.5487 2.33708 22 2.89888 22H6.49438C7.2809 22 8.06742 21.6615 8.74157 21.0973L17.618 12.1834L16.2697 10.9422Z"
  fill="#030D45"
/>
</svg>
</button>
<button
className="text-red-500 hover:text-red-700"
onClick={() => handleDelete(pkg.name)}
>
<svg
className="h-5 w-5"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z"
  fill="#0D0D0D"
/>
</svg>
</button>
</div>
</td>
</tr>
))}
</tbody>
</table>
{isEditing && (
<div className="mt-4">
<label
htmlFor="editReason"
className="block text-gray-700 text-sm font-bold mb-2"
>
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
setEditReason("");
}}
>
Cancel
</button>
</div>
</div>
)}
</div>
</div>
) : (
<div className="max-w-3xl w-full p-6 bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center h-58">
<p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
You don't have any favs yet.
</p>
<Link
to="/"
className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
Add Fav
</Link>
</div>
)}

{/* Modal for Delete Confirmation */}
<Modal
isOpen={showDeleteModal}
onClose={() => setShowDeleteModal(false)}
onConfirm={confirmDelete}
itemName={deleteItem}
/>
</div>
</>
);
}

export default View;
