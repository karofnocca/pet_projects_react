import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "./userListSlice";

function UserList() {
  const users = useSelector((state) => state.userList.users);
  const dispatch = useDispatch();
  return (
    <div className="user-list">
      <h2>User List</h2>

      {/* Кнопка загрузки */}
      <button className="load-btn" onClick={() => dispatch(fetchUsers())}>
        Load Users
      </button>

      <ul>
        {users.map((e) => (
          <li key={e.id}>
            <span>
              {e.name} - {e.email}
            </span>

            <div className="btn-group">
              <button
                className="select-btn"
                // onClick={() => dispatch(selectUsers(e.id))}
              >
                Select
              </button>

              <button
                className="delete-btn"
                onClick={() => dispatch(deleteUser(e.id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
