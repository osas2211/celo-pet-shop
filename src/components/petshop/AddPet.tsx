import React, { useState } from "react"
import { Button, Modal, Form, FloatingLabel, Alert } from "react-bootstrap"

interface Props {
	save: Function
}

const AddPet: React.FC<Props> = ({ save }) => {
	const [petName, setPetName] = useState("")
	const [imageURL, setImage] = useState("")
	const [breed, setBreed] = useState("")
	const [age, setAge] = useState("")
	const [location, setLocation] = useState("")
	const isFormFilled = () => petName && imageURL && breed && age && location

	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	return (
		<>
			<Button
				onClick={handleShow}
				variant="dark"
				className="rounded-pill px-0"
				style={{ width: "38px" }}
			>
				<i className="bi bi-plus"></i>
			</Button>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>New Pet</Modal.Title>
				</Modal.Header>
				<Form>
					<Modal.Body>
						<FloatingLabel
							controlId="inputName"
							label="Pet name"
							className="mb-3"
						>
							<Form.Control
								type="text"
								onChange={(e) => {
									setPetName(e.target.value)
								}}
								placeholder="Enter name of pet"
							/>
						</FloatingLabel>
						<FloatingLabel
							controlId="inputUrl"
							label="Image URL"
							className="mb-3"
						>
							<Form.Control
								type="text"
								placeholder="Image URL"
								onChange={(e) => {
									setImage(e.target.value)
								}}
							/>
						</FloatingLabel>
						<FloatingLabel
							controlId="inputBreed"
							label="Breed"
							className="mb-3"
						>
							<Form.Control
								as="textarea"
								placeholder="breed"
								onChange={(e) => {
									setBreed(e.target.value)
								}}
							/>
						</FloatingLabel>
						<FloatingLabel controlId="inputAge" label="Age" className="mb-3">
							<Form.Control
								as="textarea"
								placeholder="age"
								onChange={(e) => {
									setAge(e.target.value)
								}}
							/>
						</FloatingLabel>
						<FloatingLabel
							controlId="inputLocation"
							label="Location"
							className="mb-3"
						>
							<Form.Control
								type="text"
								placeholder="Location"
								onChange={(e) => {
									setLocation(e.target.value)
								}}
							/>
						</FloatingLabel>
					</Modal.Body>
				</Form>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleClose}>
						Close
					</Button>
					<Button
						variant="dark"
						disabled={!isFormFilled()}
						onClick={async () => {
							try {
								await save({
									petName,
									imageURL,
									breed,
									age,
									location,
								})
								handleClose()
							} catch (error) {
								console.log(error)
							}
						}}
					>
						List Pet
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default AddPet
