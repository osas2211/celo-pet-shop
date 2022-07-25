import React from "react"

export const AddPet = () => {
	return (
		<div id="addPet" className="mb-4" style={{ marginTop: "4em" }}>
			<a
				className="btn btn-dark rounded-pill"
				data-bs-toggle="modal"
				data-bs-target="#addModal"
				href="#add-pet"
			>
				Add pet
			</a>
			{/* <a id="AddData" className="btn btn-dark rounded-pill">
				Add Pet Details
			</a> */}
		</div>
	)
}
