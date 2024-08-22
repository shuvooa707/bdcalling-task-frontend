import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import RootLayout from "../layouts/RootLayout.jsx";
import RequiredAuth from "../components/RequiredAuth.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import TaskPage from "../pages/TaskPage.jsx";
import AdminRootLayout from "../layouts/admin/AdminRootLayout.jsx";
import AdminLoginPage from "../pages/admin/AdminLoginPage.jsx";
import RequiredAdminAuth from "../components/RequiredAdminAuth.jsx";
import AdminProfilePage from "../pages/admin/AdminProfilePage.jsx";
import AdminTaskPage from "../pages/admin/task/IndexPage.jsx";
import ShowPage from "../pages/admin/task/ShowPage.jsx";
import CreatePage from "../pages/admin/task/CreatePage.jsx";
import IndexPage from "../pages/admin/user/IndexPage.jsx";
import UserShowPage from "../pages/admin/user/ShowPage.jsx";
import UpdateProfilePage from "../pages/UpdateProfilePage.jsx";

const router = createBrowserRouter([
	/** Client Routes **/
	{
		path: "/",
		element: <RootLayout/>,
		children: [
			{
				path: "/login",
				element: <LoginPage/>
			},
			{
				path: "/register",
				element: <RegisterPage/>
			},
			{
				path: "/",
				element:
					<RequiredAuth>
						<App/>
					</RequiredAuth>
			},
			{
				path: "/profile",
				element:
					<RequiredAuth>
						<ProfilePage/>
					</RequiredAuth>
			},
			{
				path: "/profile/edit",
				element:
					<RequiredAuth>
						<UpdateProfilePage />
					</RequiredAuth>
			},
			{
				path: "/tasks",
				element:
					<RequiredAuth>
						<TaskPage />
					</RequiredAuth>
			},

		]
	},

	/** Admin Routes **/
	{
		path: "/admin",
		element: <AdminRootLayout/>,
		children: [
			{
				path: "login",
				element: <AdminLoginPage />
			},
			{
				path: "profile",
				element:
					<RequiredAdminAuth>
						<AdminProfilePage />
					</RequiredAdminAuth>
			},
			{
				path: "tasks",
				element:
					<RequiredAdminAuth>
						<AdminTaskPage />
					</RequiredAdminAuth>
			},
			{
				path: "tasks/create",
				element:
					<RequiredAdminAuth>
						<CreatePage />
					</RequiredAdminAuth>
			},
			{
				path: "tasks/:id",
				element:
					<RequiredAdminAuth>
						<ShowPage />
					</RequiredAdminAuth>
			},
			{
				path: "users",
				element:
					<RequiredAdminAuth>
						<IndexPage />
					</RequiredAdminAuth>
			},
			{
				path: "users/:id",
				element:
					<RequiredAdminAuth>
						<UserShowPage />
					</RequiredAdminAuth>
			},
		]
	}
]);


export default router;