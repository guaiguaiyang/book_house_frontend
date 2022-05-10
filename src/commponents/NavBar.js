import { Link } from 'react-router-dom'
import App from '../App';


const NavBar = (props) => {

    return (
        <nav>
        {localStorage.getItem('userId')?
        <>
            <span style={{color:'maroon'}}>Hi!, Reader</span>
            <Link to="/home" ><span style={{color:"black"}}>Home</span></Link>
            <Link to="/list" ><span style={{color:"black"}}>Shelf</span></Link>
            <span style={{color:"Highlight"},{textDecoration:"underline"}} onClick={
                ()=>{
                    localStorage.removeItem('userId')
                    // props.setUserProp({}) 
                    alert('See you!')
                    window.location.href="/login"   
                }
            }>Log out</span> 
        </>
        :
        <>
            <Link to="/signup" style={{color:"Highlight"}}>Sign up</Link>
            <Link to="/login" style={{color: "Highlight"}}>Login</Link>
        </>
        }
        </nav>
    )
}


export default NavBar