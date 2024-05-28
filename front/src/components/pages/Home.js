
import axios from "axios"
import { useEffect, useState } from "react"
export default function Home() {

	const serverURL = "http://localhost:8080"
	const [hasServer, setHasServer] = useState(true) //passer à false pour la production
	const [server, setServer] = useState({
		name: "server1",
		description: "description server1"
	})
	const [error, setError] = useState("")
	const [isAdmin, setIsAdmin] = useState(false)
	const [adminWifi, setAdminWifi] = useState(
		{
			name: "default",
			password: "default",
			status: "up"
		}
	)
	const [onlineServers, setOnlineServers] = useState([
		{id: "1",server: "stockageFichiers",ip: "192.168.1.100",description: "Serveur de stockage et de partage de fichiers"},
		{id: "26",server: "serveurWeb",ip: "203.0.113.50",description: "Serveur hébergeant le site web de l'entreprise"},
		{id: "3",server: "serveurBase",ip: "10.0.0.75",description: "Serveur exécutant la base de données de l'entreprise"},
		{id: "43",server: "serveurEmail",ip: "172.16.0.40",description: "Serveur gérant les e-mails de l'entreprise"},
		{id: "52",server: "serveurSauvegarde",ip: "192.168.2.60",description: "Serveur responsable des sauvegardes de données"},
		{id: "61",server: "serveurProxy",ip: "209.85.229.200",description: "Serveur faisant office de proxy pour l'accès à Internet"},
		{id: "77",server: "serveurTransfertFichiers",ip: "10.10.10.20",description: "Serveur utilisé pour les transferts de fichiers sécurisés"},
		{id: "8",server: "serveurAnalyse",ip: "172.20.0.80",description: "Serveur pour l'analyse de données et la création de rapports"},
		{id: "9",server: "serveurSurveillance",ip: "192.168.3.90",description: "Serveur responsable de la surveillance du système"}
	])

	const [serverDemands, setDemandServers] = useState([
		{id: "11",server: "stockageFichiers",ip: "192.168.1.100",description: "Serveur de stockage et de partage de fichiers"},
		{id: "12",server: "serveurWeb",ip: "203.0.113.50",description: "Serveur hébergeant le site web de l'entreprise"},
		{id: "13",server: "serveurBase",ip: "10.0.0.75",description: "Serveur exécutant la base de données de l'entreprise"},
		{id: "14",server: "serveurEmail",ip: "172.16.0.40",description: "Serveur gérant les e-mails de l'entreprise"},
		{id: "15",server: "serveurSauvegarde",ip: "192.168.2.60",description: "Serveur responsable des sauvegardes de données"},
		{id: "16",server: "serveurProxy",ip: "209.85.229.200",description: "Serveur faisant office de proxy pour l'accès à Internet"},
		{id: "17",server: "serveurTransfertFichiers",ip: "10.10.10.20",description: "Serveur utilisé pour les transferts de fichiers sécurisés"},
		{id: "18",server: "serveurAnalyse",ip: "172.20.0.80",description: "Serveur pour l'analyse de données et la création de rapports"},
		{id: "19",server: "serveurSurveillance",ip: "192.168.3.90",description: "Serveur responsable de la surveillance du système"}
	])



	useEffect(()=>{

		axios.get(serverURL+"/getServers")
		.then(response =>{
			setOnlineServers(response.servers)
		})
		.catch(error => {console.error(error)})

		axios.get(serverURL+"/isAdmin")
		.then(response =>{
				if(response == "yes"){
					//C'EST L'ADMIN
					setIsAdmin(true)
					axios.get(serverURL+"/getAdminWifi")
					.then( response =>{
							setAdminWifi(response)
						}
					)
					.catch(error => console.error(error))

					axios.get(serverURL+"/getServersRequests")
					.then(response =>{
						setDemandServers(response)
					})
					.catch(error => {console.error(error)})
				}else{
					//C'EST UN UTILISATEUR LAMBDA
					axios.get(serverURL+"/hasServer")
					.then(response =>{
						if(response.hasServer === "yes"){
							// l'utilisateur a un serveur actif
							setHasServer(true)
							setServer({
								name: response.name,
								description: response.description
							})
						}
					}).catch(error =>{
						console.error(error)
					})
				}
			}
		)
		.catch(error => console.error(error))

	})

	const handleCreateServer= (server, description)=>{
		axios.get(serverURL+"/createServer?name="+server+"&description="+description)
		.then(response =>{
			if(response.status === "ok"){
				setHasServer(true)
				setServer({
					name: server,
					description: description
				})
			}else{
				// en cas d'erreur response.status == "error", response.errorMessage= "message d'erreur"
				setError(response.errorMessage)
			}
		})
		.catch(error =>{
			console.error(error)
		})
	}

	const handleModifyServer= (newDescription)=>{
		axios.get(serverURL+"/setServer?name="+server.name+"&description="+newDescription)
		.then(response =>{
			if(response.status === "ok"){
				setServer({
					name: server.name,
					description: newDescription
				})
			}else{
				setError(response.errorMessage)
			}
		})
		.catch(error =>{console.error(error)})
	}

	const handleChangePassword= (event)=>{
		let password = event.target.parentNode.children[1].value
		axios.get(serverURL+"/setWifiPassword?password="+password)
		.then(response =>{
			//TODO: notifier l'utilisateur que la modification est un succès
		})
		.catch(error => console.error(error))
	}

	const togleWifiStatus =(status)=>{
		axios.get(serverURL+"/togleWifiStatus?status="+status)
		.then(response =>{
			adminWifi.status = response
			setAdminWifi(adminWifi)
		})
		.catch(error => console.error(error))
	}

	const attribuerAdresse= (event,id)=>{
		axios.get(serverURL+"/attribuerAdresse?id="+id)
		.then(response =>{
			let demand = event.target.parentNode.parentNode
			demand.style.display = "none"
			setOnlineServers(response.servers)
		})
		.catch(error => console.error(error))
	}

	const deleteAdress= (event, idAdress)=>{
		axios.get(serverURL+"/deleteAdress?idAdress="+idAdress)
		.then(response =>{
			let server = event.target.parentNode.parentNode
			server.style.display = "none"
		})
		.catch(error => console.error(error))
	}

	const deleteMyServer= ()=>{
		axios.get(serverURL+"/deleteMyServer")
		.then(response =>{
			setHasServer(false)
		})
		.catch(error => console.error(error))
	}

	return (
		<>
		{isAdmin &&
			<>
			<div id="adminHeader" className="py-2 px-4 border-bottom mb-4 bg-dark">
				<div></div>
				<h2 className="fs-4 text-white">Administration pipo DNS</h2>
				<button onClick={()=> togleWifiStatus("down")} className="btn btn-dark">Quitter</button>
			</div>
			<div className="mainContainer mb-5">
				<div className="lef p-4 bg-white">
					<h2>Domaines actifs</h2>
					<div>
						<table class="table table-striped">
							<thead className="table-primary border-bottom">
								<tr>
								<th scope="col" className="col-1">#</th>
								<th scope="col" className="col-2">Nom</th>
								<th scope="col" className="col-2">@IP</th>
								<th scope="col">Description</th>
								<th scope="col" className="col-2">Action</th>
								</tr>
							</thead>
							<tbody>
								{onlineServers.map(server =>{
									return(
										<tr>
											<th scope="row">{server.id}</th>
											<td>{server.server}</td>
											<td>{server.ip}</td>
											<td>{server.description}</td>
											<td><button onClick={event => deleteAdress(event,`${server.id}`)} type="button" class="btn btn-outline-danger">Supprimer</button></td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
				<div className="right p-0">
					<div className="bg-primary-subtle p-4">
						<h2><u>Wifi</u></h2>
						<div className="d-flex justify-content-between">
							<span>Nom : {adminWifi.name}</span>
							<span>Etat
								{function(){
									if(adminWifi.status == "up") return <span class="ms-2 badge text-bg-success rounded-pill">working</span>
									return <span class="ms-2 badge text-bg-danger rounded-pill">Down</span>
								}()
								}
							</span>
							
						</div>
						<div className="d-flex justify-content-between align-items-center mt-4">
							<span>Mot de passe : </span>
							<input type="text" className="p-1" placeholder={adminWifi.password} />
							<button onClick={(event)=> handleChangePassword(event)} className="btn btn-primary">Modifier</button>
						</div>
						<div className="d-flex gap-3 justify-content-evenly mt-4">
							{function(){
								if(adminWifi.status == "up") return <button onClick={()=> togleWifiStatus("down")} type="button" className="btn btn-danger w-100">Eteindre</button>
								return <button onClick={()=> togleWifiStatus("up")} type="button" className="btn btn-primary w-100">Alumer</button>
							}()

							}
						</div>
					</div>
				</div>
				<div className="lef p-4 bg-white">
					<h2>Demandes de domaines</h2>
					<div>
						<table class="table table-striped">
							<thead className="table-primary border-bottom">
								<tr>
								<th scope="col" className="col-1">#</th>
								<th scope="col" className="col-2">Nom</th>
								<th scope="col" className="col-2">@IP</th>
								<th scope="col">Description</th>
								<th scope="col" className="col-2">Action</th>
								</tr>
							</thead>
							<tbody>
								{serverDemands.map(demand =>{
									return(
										<tr>
											<th scope="row">{demand.id}</th>
											<td>{demand.server}</td>
											<td>{demand.ip}</td>
											<td>{demand.description}</td>
											<td><button type="button" class="btn btn-outline-primary" onClick={(event)=> attribuerAdresse(event,`${demand.id}`)}>Attribuer</button></td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			</>
		}



		{!isAdmin &&
			<>
			<div id="adminHeader" className="py-2 px-4 border-bottom mb-4 bg-dark">
				<div></div>
				<h2 className="fs-4 text-white">Bienvenue sur pipo DNS</h2>
				<button className="btn btn-dark">Quitter</button>
				{/* TODO: implémenter l'exit par l'utilisateur */}
			</div>
			<div className="mainContainer mb-5">
				<div className="lef p-4 bg-white">
					<h2>Domaines actifs</h2>
					<div>
						<table class="table table-striped">
							<thead className="table-primary border-bottom">
								<tr>
								<th scope="col" className="col-1">#</th>
								<th scope="col" className="col-2">Nom</th>
								<th scope="col" className="col-2">@IP</th>
								<th scope="col">Description</th>
								<th scope="col" className="col-2">Action</th>
								</tr>
							</thead>
							<tbody>
								{onlineServers.map(server =>{
									return(
										<tr>
											<th scope="row">{server.id}</th>
											<td>{server.server}</td>
											<td>{server.ip}</td>
											<td>{server.description}</td>
											<td><button onClick={event => deleteAdress(event,`${server.id}`)} type="button" class="btn btn-outline-danger">Supprimer</button></td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
				<div className="right p-0">
					{hasServer &&
						<div className="bg-primary-subtle p-4">
							<h2><u>Votre serveur actif</u></h2>
							<div className="d-flex justify-content-between">
								{error && <span>{error}</span>}
								<span>Nom : {server.name}</span>
								<span>Etat
									<span class="ms-2 badge text-bg-success rounded-pill">working</span>
								</span>
							</div>
							<div className="d-flex justify-content-between align-items-center mt-4">
								<span>Description : </span>
								<input type="text" className="p-1" placeholder={server.description} />
								<button className="btn btn-primary" onClick={(event)=> {
									let newDescription = event.target.parentNode.children[1].value
									handleModifyServer(newDescription)
								}}>Modifier</button>
							</div>
							<div className="d-flex gap-3 justify-content-evenly mt-4">
								<button onClick={()=> deleteMyServer("down")} type="button" className="btn btn-danger w-100">Supprimer mon serveur</button>
							</div>
						</div>
					}

					{!hasServer &&
						<div className="bg-primary-subtle p-4">
							<h2><u>Créer un serveur</u></h2>
							{/* <div className="d-flex justify-content-between">
								<span>Nom : {server.name}</span>
							</div> */}
							<div className="d-flex justify-content-between">
								{error && <span>{error}</span>}
							</div>
							<form
								className="mt-4"
								onSubmit={(e) => {
								e.preventDefault()
								const server = e.target.elements.server.value
								const description = e.target.elements.description.value
								handleCreateServer(server, description)
								}}
							>
								<div className="d-grid mt-4">
									<label htmlFor="server" id = "labelserver">Nom de domaine:</label>
									<input className="p-1 mb-2" type = "text" placeholder="Nom du serveur"/>
									<label htmlFor="description">Description :</label>
									<input className="p-1" type = "text" placeholder="Description du serveur"/>
								</div>
								<div className="d-flex gap-3 justify-content-evenly mt-4">
									<button type="submit" className="btn btn-primary w-100">Créer un serveur</button>
								</div>
							</form>
						</div>
					}
				</div>
			</div>
			</>
		}
		</>
	)
}
