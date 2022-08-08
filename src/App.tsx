import "./App.css"
import React, { useEffect, useCallback, useState } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import Wallet from "./components/ui/Wallet"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { login, logout as destroy, accountBalance } from "./utils/near"
import { Notification } from "./components/ui/Notifications"
import Cover from "./components/ui/Cover"
import coverImg from "./assets/img/petshop.jpg"
import Pets from "./components/petshop/Pets"

const App = function AppWrapper() {
	const account = window.walletConnection.account()
	
	const [balance, setBalance] = useState("0")

	const getBalance = useCallback(async () => {
		if (account.accountId) {
			setBalance(await accountBalance())
		}
	}, [account])

	useEffect(() => {
		getBalance()
	}, [getBalance])

	return (
		<>
			<Notification />
			{account.accountId ? (
				<Container fluid="md">
					<Navbar bg="white" expand="lg">
						<Container className="container-fluid">
							<Navbar.Brand href="index.html" className=" m-0 h4 fw-bold">
								Pet Adoption Shop
							</Navbar.Brand>
							<Nav className="justify-content-end pt-3 pb-5">
								<Nav.Item>
									<Wallet
										address={account.accountId}
										amount={balance}
										symbol="NEAR"
										destroy={destroy}
									/>
								</Nav.Item>
							</Nav>
						</Container>
					</Navbar>
					<main>
						<Pets />
					</main>
				</Container>
			) : (
				<Cover name="Pet Shop" login={login} coverImg={coverImg} />
			)}
		</>
	)
}

export default App
