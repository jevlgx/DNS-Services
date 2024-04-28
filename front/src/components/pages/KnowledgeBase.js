import axios from 'axios';
import { useEffect, useState } from "react";

const rulesURL = "http://"
const setRulesURL = "http://192.168.116.156:8000/api/solve_computer_problem/"


export default function ExpertHome(){
    let [data, setData] = useState(
        [
            {
                "organ": "valeur",
                "mode_defaillance": "valeur",
                "cause" : "cause1/ cause2",
                "effets": ["valeur1", "valeur2", "valeur3"],
                "mots_cles": {
                    "description":["mot_cle1", 'mot_cle2', 'mot_cle3', 'mot_cle4'],
                    "description2":["mot_cle1", 'mot_cle2', 'mot_cle3', 'mot_cle4'],
                },
                "detection": "audio/visuel",
                "solution": "solution",
                "prevention": "prevention"
            },
            {
                "organ": "valeur",
                "mode_defaillance": "valeur",
                "cause" : "cause1/ cause2",
                "effets": ["valeur1", "valeur2", "valeur3"],
                "mots_cles": {
                    "description":["mot_cle1", 'mot_cle2', 'mot_cle3', 'mot_cle4'],
                    "description2":["mot_cle1", 'mot_cle2', 'mot_cle3', 'mot_cle4'],
                },
                "detection": "audio/visuel",
                "solution": "solution",
                "prevention": "prevention"
            },
            {
                "organ": "valeur",
                "mode_defaillance": "valeur",
                "cause" : "cause1/ cause2",
                "effets": ["valeur1", "valeur2", "valeur3"],
                "mots_cles": {
                    "description":["mot_cle1", 'mot_cle2', 'mot_cle3', 'mot_cle4'],
                    "description2":["mot_cle1", 'mot_cle2', 'mot_cle3', 'mot_cle4'],
                },
                "detection": "audio/visuel",
                "solution": "solution",
                "prevention": "prevention"
            },
            {
                "organ": "valeur",
                "mode_defaillance": "valeur",
                "cause" : "cause1/ cause2",
                "effets": ["valeur1", "valeur2", "valeur3"],
                "mots_cles": {
                    "description":["mot_cle1", 'mot_cle2', 'mot_cle3', 'mot_cle4'],
                    "description2":["mot_cle1", 'mot_cle2', 'mot_cle3', 'mot_cle4'],
                },
                "detection": "audio/visuel",
                "solution": "solution",
                "prevention": "prevention"
            },
        ]
    );
    const [formData, setFormData] = useState({
        organe: "nom de l'organe",
        mode_defaillance: 'mode de defaillance',
        cause: "cause1 / cause2",
        effets: "effet1 / effet2",
        mots_cle: "description : mot_cle1, mot_cle2 / description2 : mot_cle1, mot_cle2 ",
        detection: "description de la méthode de détection",
        solution: "solution1 / solution2",
        prevention: "prevention1 / prévention2"
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const setKnowledgeBase = (event)=>{
        event.preventDefault();

        const formData = new FormData(event.target);

        // Créez un objet vide pour stocker les données du formulaire
        let data = {};

        // Parcourez chaque paire clé-valeur dans FormData
        for (let [name, value] of formData.entries()) {
            data[name] = value;
        }

        // Utilisez la variable "data" pour effectuer des opérations supplémentaires avec les données du formulaire
        data.effets = data.effets.split('/');
        let table_mots_cles = data.mots_cles.split('/');
        let finalMotcle = {}
        table_mots_cles.map((value)=>{
            let initial = value.split(":")
            console.log(initial)
            finalMotcle[initial[0]] = initial[1].split(",")
        })
        data.mots_cles = finalMotcle


        console.log(data)
        axios.post(setRulesURL, data)
        .then(response => {
            console.log("Réponse reçue :", response.data);
            // Traitez la réponse ici
        })
        .catch(error => {
            console.error("Erreur lors de la requête :", error);
            // Traitez l'erreur ici
        });
        /* axios.post(setRulesURL, data)
            .then(response=>{
                data = setData(response)
                console.log("yoyo")
                console.log(response)
            })
            .catch(error=>{
                console.log("yoyo")
                console.log(error)
            }) */
    }

    useEffect(() => {
        axios.get(rulesURL)
            .then(response =>{
                data = setData(response)
            })
            .catch(error =>{
                console.error("00000000000000")
                console.error(error)
            });
    }, []);

    return (
        <div>
            <form onSubmit={setKnowledgeBase}>
                <label>Nom de l'organe:
                    <input type="text" name="organe" placeholder={formData.organe} onChange={handleChange} />
                </label><br />

                <label>Mode de Défaillance:
                    <input type="text" name="mode_defaillance" placeholder={formData.mode_defaillance} onChange={handleChange} />
                </label><br />

                <label>Cause(s):
                    <input type="text" name="cause" placeholder={formData.cause} onChange={handleChange} />
                </label><br />
                
                <label>Effets(s):
                    <input type="text" name="effets" placeholder={formData.effets} onChange={handleChange} />
                </label><br />

                <label>Mots cle(s):
                    <input type="text" name="mots_cles" placeholder={formData.mots_cle} onChange={handleChange} />
                </label><br />

                <label>Détection:
                    <input type="text" name="detection" placeholder={formData.detection} onChange={handleChange} />
                </label><br />

                <label>Solution:
                    <input type="text" name="solution" placeholder={formData.solution} onChange={handleChange} />
                </label><br />

                <label>Prévention:
                    <input type="text" name="prevention" placeholder={formData.prevention} onChange={handleChange} />
                </label><br />

                <button type="submit">ajouter</button>
            </form>
            <div className="divButton">
                <button className = "ajouterExpert"> + ajouter connaissance</button>
            </div>
            <table className="expertTable">
                <thead>
                    <tr>
                    <th>Organe</th>
                    <th>Mode de défaillance</th>
                    <th>Cause(s) de la défaillance</th>
                    <th>Effet(s) de la défaillance</th>
                    <th>Mots clés(s)</th>
                    <th>Detection</th>
                    <th>Solution</th>
                    <th>Prévention</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <>
                            <tr key={index}>
                                <td>{item.organ}</td>
                                <td>{item.mode_defaillance}</td>
                                <td className="coloneMultiple">
                                    {item.cause.split("/").map((value, idx) => (
                                        <div key={idx}>{value}</div>
                                    ))}
                                </td>
                                <td className="coloneMultiple">
                                    {item.effets.map((value, idx) => (
                                        <div key={idx}>{value}</div>
                                    ))}
                                </td>
                                <td className="coloneMultiple">
                                    <div style = {{height: "100%", display: "block"}}>
                                        {Object.keys(item.mots_cles).map(key => (
                                            <>
                                                <p style = {{textAlign: "initial", padingLeft: "10px"}}>
                                                    <b>{key} : </b> {item.mots_cles[key].join(", ")}
                                                </p>
                                                <br />
                                            </>
                                        ))}
                                    </div>
                                </td>
                                <td className="coloneMultiple">
                                    {item.detection}
                                </td>
                                <td className="coloneMultiple">
                                    {item.solution}
                                </td>
                                <td className="coloneMultiple">
                                    {item.prevention}
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )
}