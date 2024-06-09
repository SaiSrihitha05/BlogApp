import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function UserProfile() {
  let { currentUser } = useSelector(
    (state) => state.userAuthoruserAuthorLoginReducer
  );
  return (
    <div>
    
    <>
     <NavLink to='articles' className='fs-4 text-primary nav-link mt-4'>Articles</NavLink>
      <Outlet />
    </>
    </div>
  );
}

export default UserProfile;