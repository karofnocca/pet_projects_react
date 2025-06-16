import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "./userListSlice";
import { fetchData } from "./userListSlice";
import { selectUsers } from './../userDetails/userDetailsSlice';

function UserList() {
  const users = useSelector((state) => state.userData.users);
  const loading = useSelector((state) => state.userData.loading);
  const error = useSelector((state) => state.userData .error);
  const dispatch = useDispatch()

  return (
    <div className="user-list">
      <h2>User List</h2>

      <button className="load-btn" onClick={() => dispatch(fetchData())}>Load Users</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error... {error}</p>}

      <ul>
        {users.map((e) => (
          <li key={e.id}>
            <span>
              {e.name} - {e.email}
            </span>

            <div className="btn-group">
              <button className="select-btn" onClick={(() => dispatch(selectUsers(e.id)))}>Select</button>

              <button className="delete-btn" onClick={() => dispatch(deleteUser(e.id))}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
