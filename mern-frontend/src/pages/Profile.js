import React, {useState,useContext,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Message from '../components/Message';
import { AuthContext } from '../Context/AuthContext';
import UserService from '../Services/UserService';
import EditUser from '../components/users/EditUser';
import UserDetails from '../components/users/UserDetails';

const Profile = props =>{
    const [ user, setUser ] = useState({username: "", email: ""});
    const [ editing, setEditing ] = useState(false);
    // const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    const [updateUserData, setUpdateUserData] = useState({
        username: "",
        email: "",
        image: "",
    })

    useEffect(()=>{
        UserService.getUser().then(data =>{
            console.log(data)
            setUser({username: data.username, email: data.email, image: data.image});
        });
    },[]);
    

    // const onSubmit = e =>{
    //     e.preventDefault();
    //     TodoService.postTodo(todo).then(data =>{
    //         const { message } = data;
    //         resetForm();
    //         if(!message.msgError){
    //             TodoService.getTodos().then(getData =>{
    //                 setTodos(getData.todos);
    //                 setMessage(message);
    //             });
    //         }
    //         else if(message.msgBody === "UnAuthorized"){
    //             setMessage(message);
    //             authContext.setUser({username : "", role : ""});
    //             authContext.setIsAuthenticated(false);
    //         }
    //         else{
    //             setMessage(message);
    //         }
    //     });
    // }

    // const onChange = e =>{
    //     setTodo({name : e.target.value});
    // }

    // const resetForm = ()=>{
    //     setTodo({name : ""});
    // }

    const handleEditToggle = (event) => {
        event.preventDefault();

        setEditing(true);

        const formValues = {
            username: user.username,
            email: user.email,
            image: user.image
        }

        setUpdateUserData(formValues);
    };

    return(
        <Container>
        <Row>
          <Col><h1 className="text-center">Welcome to your profile</h1></Col>
        </Row>
        <br/>
        <Row>
            <Col>
                <div className="card" style={{ width: '18rem' }}>
                    <img src={`${user.image}`} alt='profile photo' className="img-fluid img-thumbnail" />
                </div>
            </Col>
            <Col>
                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <Row>
                            <Col sm="8">
                                <p className="card-text" >Username </p>
                            </Col>
                            <Col>
                                <p className="card-text text-muted">{user.username}</p>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col sm="4">
                                <p className="card-text" >Email </p>
                            </Col>
                            <Col>
                                <p className="card-text text-muted">{user.email}</p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Col>

        </Row>
      </Container>
    );
}

export default Profile;