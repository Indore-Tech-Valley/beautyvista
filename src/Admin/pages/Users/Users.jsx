import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, ShieldCheck } from 'lucide-react';
import AddButton from '../../components/AddButton/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, updateUser } from '../../../redux/features/usersSlice/usersSlice';

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.usersReducer);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    const hr = date.getHours();
    const min = String(date.getMinutes()).padStart(2, '0');
    const ampm = hr >= 12 ? 'PM' : 'AM';
    const hour12 = hr % 12 || 12;
    return `${mm}-${dd}-${yy} at ${hour12}:${min} ${ampm}`;
  };

  

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Admins</h2>
        <AddButton label="Add Admin" isOpen={false} onClick={() => console.log("Add Admin clicked")} />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm table-fixed">
          <thead className="bg-gray-100 text-gray-600 text-left uppercase">
            <tr>
              <th className="px-4 sm:px-6 py-3 w-[15%]">ID</th>
              <th className="px-4 sm:px-6 py-3 w-[20%]">User</th>
              <th className="px-4 sm:px-6 py-3 w-[20%]">Email</th>
              <th className="px-4 sm:px-6 py-3 w-[15%]">Role</th>
              <th className="px-4 sm:px-6 py-3 w-[10%]">Active</th>
              <th className="px-4 sm:px-6 py-3 w-[15%]">Created At</th>
              <th className="px-4 sm:px-6 py-3 w-[15%]">Updated At</th>
              <th className="px-4 sm:px-6 py-3 text-right w-[10%]">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="8" className="px-6 py-4">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="8" className="px-6 py-4 text-red-500">{error}</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="8" className="px-6 py-4 text-gray-500">No users found.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 sm:px-6 py-4 text-xs text-gray-600 whitespace-nowrap max-w-[140px] truncate">
                    <span title={user.id}>{user.id}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3 max-w-[180px]">
                      <img src={user.profile_image || `https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      <span className="font-medium truncate block" title={user.name}>{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                    <span className="truncate block" title={user.email}>{user.email}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${user.is_superuser ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                      {user.is_superuser && <ShieldCheck size={14} />}
                      {user.is_superuser ? 'Superadmin' : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{user.is_active ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{formatDateTime(user.created_at)}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{formatDateTime(user.updated_at)}</td>
                  <td className="px-4 sm:px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600" disabled={user.is_superuser} onClick={() => setEditUser(user)}>
                        <Pencil size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600" disabled={user.is_superuser}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {editUser && (
          <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
              <h2 className="text-lg font-semibold mb-4">Edit Admin</h2>
              <form
  onSubmit={(e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      id: editUser.id,
      name: form.name.value?.trim() || '',
      email: form.email.value?.trim() || '',
      role: form.role.value?.trim() || '',
      is_active: form.status.checked,
      profile_image: form.profile_image.files[0] || editUser.profile_image,
    };
    dispatch(updateUser(updatedData));
    setEditUser(null);
  }}
  className="space-y-4"
>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input name="name" defaultValue={editUser.name} className="w-full border px-3 py-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input name="email" defaultValue={editUser.email} className="w-full border px-3 py-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select name="role" defaultValue={editUser.role} className="w-full border px-3 py-2 rounded">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="status" defaultChecked={editUser.is_active} />
                  <label className="text-sm">Active</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                 <input type="file" name="profile_image" accept="image/*" className="w-full border px-3 py-2 rounded" />

                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setEditUser(null)} className="px-4 py-2 bg-gray-300 rounded">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Users;
