import React, { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // Store users
  const [editUserId, setEditUserId] = useState(null); // Track editing user
  const [editUserData, setEditUserData] = useState({}); // Store edited data

  // 🟢 Fetch users from backend when component mounts
  useEffect(() => {
    fetch("http://localhost:8080/admin/users/getAll",
      {
        method:'GET',
        credentials: 'include'
      }
    )
    .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // ✏ Enable editing mode for a specific user
  const handleEdit = (user) => {
    setEditUserId(user.userId);
    setEditUserData({ ...user }); // Clone user data for editing
  };

  // 📝 Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUserData({ ...editUserData, [name]: value });
  };

  // 💾 Save updated user details (updates table instantly)
  const handleSave = (id) => {
    fetch(`http://localhost:8080/admin/users/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUserData),
      credentials:'include'
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.userId === id ? updatedUser : user))
        );
        setEditUserId(null); // Exit edit mode

        toast.success("User updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Slide,
        });
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Failed to update user.");
      });
  };

  // ❌ Cancel editing (reset edit state)
  const handleCancel = () => {
    setEditUserId(null);
    setEditUserData({});
  };

  // 🗑 Delete user (removes from table instantly)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://localhost:8080/admin/users/delete/${id}`, { method: "DELETE", credentials:'include' })
        .then((response) => {
          if (response.ok) {
            setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== id));

            toast.success("User deleted successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              transition: Slide,
            });
          } else {
            toast.error("Error deleting user.");
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          toast.error("Failed to delete user.");
        });
    }
  };

  return (
    <div className="p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-md shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3 rounded-tl-md">ID</th>
              <th className="border p-3">Username</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Admin</th>
              <th className="border p-3 rounded-tr-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.userId} className={`text-center ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                <td className="border p-3">{user.userId}</td>

                {/* Editable Username */}
                <td className="border p-3">
                  {editUserId === user.userId ? (
                    <input
                      type="text"
                      name="username"
                      value={editUserData.username || ""}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    user.username
                  )}
                </td>

                {/* Editable Email */}
                <td className="border p-3">
                  {editUserId === user.userId ? (
                    <input
                      type="email"
                      name="email"
                      value={editUserData.email || ""}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>

                {/* Editable Admin Status */}
                <td className="border p-3">
                  {editUserId === user.userId ? (
                    <select
                      name="isAdmin"
                      value={editUserData.isAdmin}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  ) : (
                    user.isAdmin ? "✅ Yes" : "❌ No"
                  )}
                </td>

                {/* Action Buttons */}
                <td className="border p-3 space-x-2">
                  {editUserId === user.userId ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600"
                        onClick={() => handleSave(user.userId)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(user.userId)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
