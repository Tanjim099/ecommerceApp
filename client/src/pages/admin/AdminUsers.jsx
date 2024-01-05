import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/Layout/AdminLayout";
import { deleteUser, getStatUsers } from "../../redux/slices/statSlice";
import { useEffect } from "react";
import dateFormater from "../../helper/dateFormater";
import { MdDelete } from "react-icons/md";

function AdminUsers() {
    const dispatch = useDispatch();
    const { usersData } = useSelector((state) => state?.stat);
    async function fetchUsersData() {
        const response = await dispatch(getStatUsers());
    }


    async function onDeleteUSer(uId) {
        const response = await dispatch(deleteUser(uId));
        if (response.payload.success) {
            await dispatch(getStatUsers());
        }
    }

    useEffect(() => {
        fetchUsersData()
    }, []);
    return (
        <AdminLayout>
            <div className="mt-20" style={{ marginTop: "60px" }}>
                <div className="d-flex overflow-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData && usersData?.map((user, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{dateFormater(user.createdAt)}</td>
                                    <td><button onClick={() => onDeleteUSer(user._id)} className="p-1 bg-danger border-0 text-white rounded-1"><MdDelete /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminUsers;