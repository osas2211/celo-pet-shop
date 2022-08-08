import React, { useEffect, useState, useCallback } from "react"
import { toast } from "react-toastify"
import Pet from "./PetCard"
import AddPet from "./AddPet"
import { utils } from "near-api-js"
import Loader from "../ui/Loader"
import { Row } from "react-bootstrap"
import { petDetails } from "./PetCard"
import { NotificationSuccess, NotificationError } from "../ui/Notifications"
import { getPetsList, getFee, adoptPet, listPet } from "../../utils/petshop"

const Pets = () => {
	const [pets, setPets] = useState([])
	const [loading, setLoading] = useState(false)
	const [fee, setFee] = useState("0")

	// function to get the list of products
	const getPets = useCallback(async () => {
		try {
			setLoading(true)
			setPets(await getPetsList())
		} catch (error) {
			console.log({ error })
		} finally {
			setLoading(false)
		}
	}, [])

	const getAdoptionFee = useCallback(async () => {
		try {
			setFee(await getFee())
		} catch (error) {
			console.log({ error })
		}
	}, [])

	const addPet = async (data: petDetails) => {
		setLoading(true)
		try {
			await listPet(data).then((resp: any) => {
				toast(<NotificationSuccess text="Pet added successfully." />);
				getPets()
			})
		} catch (error) {
			console.log({ error })
			toast(<NotificationError text="Failed to list pet." />)
		} finally {
			setLoading(false)
		}
	}

	//  function to initiate transaction
	const adopt = async (id: string) => {
		try {
			await adoptPet({
				id,
				fee,
			}).then((resp: any) => {
				toast(<NotificationSuccess text="Pet adopted successfully" />);
				getPets()
			})
		} catch (error) {
			toast(<NotificationError text="Failed to adopt pet." />)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getPets()
		getAdoptionFee()
	}, [getPets, getAdoptionFee])

	return (
		<>
			{!loading ? (
				<>
					<div className="text-start container">
						<div
							id="adoptionNotice"
							className="mb-4"
							style={{ marginTop: "1em" }}
						>
							<span>
								<i className="bi bi-bell-fill"></i> Adoption Fee is{" "}
								{utils.format.formatNearAmount(fee)} Near
							</span>
						</div>
					</div>

					<div className="d-flex justify-content-between align-items-center mb-4">
						<AddPet save={addPet} />
					</div>
					<Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
						{pets.map((_pet:petDetails) => (
							<Pet pet={_pet} key={_pet.id} adopt={adopt} fee={fee} />
						))}
					</Row>
				</>
			) : (
				<Loader />
			)}
		</>
	)
}

export default Pets
