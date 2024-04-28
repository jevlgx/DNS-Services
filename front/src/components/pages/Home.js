
import axios from "axios"
import { useEffect, useState } from "react"
export default function Home() {
	let serverURL = "http://localhost:8080"
	const [hasServer, setHasServer] = useState(false) //passer à false pour la production
	const [server, setServer] = useState({})
	const [error, setError] = useState("")

	const [onlineServers, setonlineServers] = useState([
		{ name: 'google.com', destination: "https://www.google.com", description: 'Serveur DNS principal' },
		{ name: 'coursera.org', destination: "https://coursera.org", description: 'Serveur DNS secondaire' },
	])

	useEffect(()=>{
		axios.get(serverURL+"/hasServer")
		.then(response =>{
			if(response.hasServer == "yes"){
				// l'utilisateur a un serveur actif
				setHasServer(true)
				setServer({
					name: response.name,
					description: response.description
				})
			}
			setonlineServers(response.onlineServers)
		}).catch(error =>{
			console.error(error)
		})
		
	},[])

	const handleCreateServer= (serverName, serverDescription)=>{
		axios.get(serverURL+"/createServer?name="+serverName+"&description="+serverDescription)
		.then(response =>{
			if(response.status == "ok"){
				setHasServer(true)
				setServer({
					name: serverName,
					description: serverDescription
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
			if(response.status == "ok"){
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

	return (
		<div className="mainContainer">
			<div className="left">
				<h1>Bienvenue</h1>
				<p>Services disponibles</p>
				<div>{
					onlineServers.map(server =>{
						return(
							<details>
								<summary>{server.name}</summary>
								<div>{server.description}</div>
								<div>
									<a href={server.destination} target="_blank" rel="noopener noreferrer">
										Se connecter
									</a>
								</div>
								
							</details>
						)
					})}
				</div>
			</div>
			<div className="right">
				{hasServer &&
					<div className="isAServer">
						{error &&
							<p>{error}</p>
						}
						<h1>Serveur en cours : {server.name}</h1>
						<form
							onSubmit={(e) => {
							e.preventDefault()
							const newDescription = e.target.elements.description.value
							handleModifyServer(newDescription)
							}}
						>
							<label htmlFor="description">Description:</label>
							<input type = "text" id="description" placeholder={server.description}/>
							<button type="submit" className="bouton-submit">Modifier la description</button>
						</form>
					</div>
				}
				{!hasServer &&
					<div className="isNotAServer">
						{error &&
							<p>{error}</p>
						}
						<h1>Creer un serveur</h1>
						<form
							onSubmit={(e) => {
							e.preventDefault()
							const serverName = e.target.elements.serverName.value
							const serverDescription = e.target.elements.serverDescription.value
							handleCreateServer(serverName, serverDescription)
							}}
						>
							<div>
								<label htmlFor="serverName">Nom de domaine:</label>
								<input type = "text" id="serverName" placeholder="Nom du serveur"/>
							</div>
							<div>
								<label htmlFor="serverDescription">Description :</label>
							</div>
							<div>
								<textarea type = "text" id="serverDescription" placeholder="Description du serveur"/>
							</div>
							<button type="submit" className="bouton-submit">Créer un serveur</button>
						</form>
					</div>
				}
			</div>
		</div>
	)
}
