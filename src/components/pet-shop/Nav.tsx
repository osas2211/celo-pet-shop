import React from "react"
import {
	Navbar,
	Container,
	Nav,
	Button,
	ButtonGroup,
	Dropdown,
} from "react-bootstrap"
import DropdownMenu from "react-bootstrap/esm/DropdownMenu"

export const Navigation = () => {
	return (
		<Navbar bg="white" expand="lg">
			<Container className="container-fluid">
				<Navbar.Brand href="index.html" className=" m-0 h4 fw-bold">
					Pet Adoption Shop
				</Navbar.Brand>

				<div id="normalUser" className="hide">
					<Nav.Link className="border rounded-pill bg-light">
						<span id="balance">0</span>
						cUSD
					</Nav.Link>
				</div>
				<ButtonGroup id="shopOwner" className="btn-group hide">
					<a className="navbar-brand m-1 h6" href="#shop-balance">
						Shop Balance
					</a>
					<Button variant="outlined" className="mx-2 bg-light">
						<span id="petShopBalance">0</span>
						cUSD
					</Button>
					<Dropdown>
						<Dropdown.Toggle id="bs-dropdown" variant="success">
							Toggle Dropdown
						</Dropdown.Toggle>
						<DropdownMenu className="dropdown-menu">
							<Dropdown.Item href="#withdraw">Withdraw</Dropdown.Item>
						</DropdownMenu>
					</Dropdown>
				</ButtonGroup>
			</Container>
		</Navbar>
	)
}
