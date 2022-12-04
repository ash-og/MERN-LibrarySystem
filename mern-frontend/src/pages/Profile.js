import React, {useState,useContext,useEffect} from 'react';
// import Message from '../components/Message';
import { AuthContext } from '../Context/AuthContext';
import UserService from '../Services/UserService';
import EditUser from '../components/users/EditUser';
import UserDetails from '../components/users/UserDetails';
import Favourites from '../components/users/Favourites';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChangePassword from '../components/users/ChangePassword';

const Profile = props =>{
    const [ user, setUser ] = useState({username: "", email: "", image: ""});
    const [ editing, setEditing ] = useState(false);
    // const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(()=>{
        UserService.getUser().then(data =>{
            console.log(data)
            setUser({username: data.username, email: data.email, image: data.image});
        });
    },[]);


    const handleEditToggle = (event) => {
        event.preventDefault();
        setEditing(true);
    };

    return(      
        <Container className='containerProfile'>
            <Row>
                <Col>
                    <br/>
                    <h1 className="text-center">Welcome to your profile, {`${user.username}`}! </h1>
                    <br/>
                </Col>
            </Row>
            <Row>
                { editing ? (
                    <EditUser
                    user={user} 
                    setUser={setUser}  
                    setEditing={setEditing}                                       
                    /> 
                ) : (
                    <UserDetails 
                    user={user} 
                    handleEditToggle={handleEditToggle}
                    />
                )}   
            </Row>
 
            <br/>
            <br/>
            <Row>
                <h1>Favourites</h1>
            </Row>
            <Row>
                <Col>
                    <Favourites /> 
                </Col>
            </Row>                          
        </Container>
    );
}

export default Profile;