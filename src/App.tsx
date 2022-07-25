import "./App.css"
import React, { useEffect, useCallback, useState } from "react"
import { Navigation } from "./components/pet-shop/Nav"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { login, logout as destroy, accountBalance } from "./utils/near";
import { Notification } from "./components/ui/Notifications";
import Cover from "./components/ui/Cover";
import { AddPet } from "./components/pet-shop/AddPet"
function App() {
	return (
		<div>
			<div className="container mt-2" style={{ maxWidth: "72em" }}></div>
			<Navigation />
			<div className="text-start container">
				<div id="adoptionNotice" className="mb-4" style={{ marginTop: "1em" }}>
					<span>
						<i className="bi bi-bell-fill"></i> Adoption Fee is 5 cUSD
					</span>
				</div>
				<div className="alert alert-warning sticky-top mt-2" role="alert">
					<span id="notification">⌛ Loading...</span>
				</div>
				{/* <AddPet /> */}
			</div>
		</div>
	)
}

export default App
