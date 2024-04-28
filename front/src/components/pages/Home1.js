import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import fond from './../../images/background.png';
import robot from './../../images/imageRobot.png';

export default function Home(){
    let container = {
        width: '100%',
        height: '100%',
        position: "relative",
        backgroundColor: 'rebeccapurple'
    }
    let styleFond = {
        width: '100%',
        height: '100%',
        position: "absolute",
        objectFit: 'cover'
    }
    let styleRobot = {
        width: '300px',
        height: '300px',
        objectFit: 'cover'

    }
    let mainDiv = {
        position: 'absolute',
        bottom: 0,
        width :'100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '80px',
        alignItems: 'center'
    }
    let button1 = {
        width:'max-content',
        marginTop: '100px',
        backgroundColor: 'green',
    }
    let button2 = {
        width:'max-content',
        marginTop: '20px'
    }
    
    return (
        <div style = {container}>
            <img style = {styleFond} src={fond} alt="fond d'écran"/>
            <div style = {mainDiv}>
                <div>
                    <img style = {styleRobot} src={robot} alt="image d'un robot" />
                </div>
                <Button style = {button1} variant="contained">Start Conversation</Button>
                <Link to ='/expert/base de connaissances'>
                    <Button style = {button2} variant="contained">Expert Mode </Button>
                </Link>

            </div>
        </div>
    )
}