import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function Navbar() {
	const auth = useAuth();
	const navigate = useNavigate();
	
	const logout = () => {
		auth.signout(() => navigate("/login"));
	};

	return (
	<div>
		<nav className="navbar navbar-expand-lg navbar-light shadow justify-content-center" style={{background: "#eeeeee"}}>
			<div className="container">
				<div>
					<a className="navbar-brand h1" href="/"><img src="https://cdn-icons.flaticon.com/png/512/3959/premium/3959060.png?token=exp=1637183899~hmac=ad944934feb2fb770d15419cb102b684" width="50" height="50" class="d-inline-block" alt="my closet logo"/>Closet</a>
				</div>
				<div>
					{!auth.isLoggedIn && (
						<Link to="/register" className="me-4 text-dark">
							Register
						</Link>
					)}
					{!auth.isLoggedIn && (
						<Link to="/login" className="text-dark">
							Login
						</Link>
					)}
					{auth.isLoggedIn && (
						<button onClick={logout} className="btn btn-dark-outline">
							Logout
						</button>
					)}
					{auth.isLoggedIn && (
						<button className="btn btn-dark me-4"><Link to="/closet" className="nav-item nav-link text-light">My closet</Link></button>
					)}
					{auth.isLoggedIn && (
						<button className="btn btn-primary"><Link to="/new" className="nav-item nav-link text-light">Add new item</Link></button>
					)}
						{/* <a className="nav-item nav-link p-2 text-dark" href="https://github.com/switcherette/my-wardrobe" target="_blank" rel="noreferrer"><img src="https://cdn-icons.flaticon.com/png/512/3488/premium/3488435.png?token=exp=1636986814~hmac=e93595cbfb46a15218cf790f31bdd332" width="40" alt="github icon"/></a> */}
				</div>
			</div>
		</nav>
	</div>
	)
}


