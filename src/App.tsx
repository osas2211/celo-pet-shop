import "./App.css"
import { Navigation } from "./components/Nav"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { AddPet } from "./components/AddPet"
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
