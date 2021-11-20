import React from 'react';
import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
	<div>
		<nav className="navbar navbar-expand-lg navbar-light shadow justify-content-center" style={{background: "#eeeeee"}}>
			<div className="container">
				<a className="navbar-brand h1" href="/"><img src="https://cdn-icons.flaticon.com/png/512/3959/premium/3959060.png?token=exp=1637183899~hmac=ad944934feb2fb770d15419cb102b684" width="50" height="50" class="d-inline-block" alt="my closet logo"/>My closet</a>
				{/* <NavLink to="/new" className="nav-item nav-link text-dark p-2">Add new item</NavLink>
				<NavLink to="/" className="nav-item nav-link text-dark  p-2">See all items</NavLink> */}
			    <div>
				    <button className="btn btn-primary"><NavLink to="/new" className="nav-item nav-link text-light">Add new item</NavLink></button>
					{/* <a className="nav-item nav-link p-2 text-dark" href="https://github.com/switcherette/my-wardrobe" target="_blank" rel="noreferrer"><img src="https://cdn-icons.flaticon.com/png/512/3488/premium/3488435.png?token=exp=1636986814~hmac=e93595cbfb46a15218cf790f31bdd332" width="40" alt="github icon"/></a> */}
				</div>
			</div>
		</nav>

	</div>
	)
}
