import React, {useState} from "react";
import "./styles.css";
import {Box} from "@mui/material";
import {RightArrowIcon} from "../../assets/Icons/RightArrowIcon";
import {LeftArrowIcon} from "../../assets/Icons/LeftArrowIcon";
import {userMock} from "../../mocks";
import styles from "../activity/styles.module.css";
import EditableInput from "../../components/EditableInput";
import Button from "../../components/Button";

type attributeType = keyof typeof userMock;

const Home = () => {
    const options = [
        {
            name: "Usuarios",
        },
        {
            name: "Tratamientos",
        },
    ];

    const [mockUser, setMockUser] = useState(userMock);
    const [route, setRoute] = React.useState("");

    const handleChange = (attribute:attributeType, newValue:string) => {
        setMockUser({...mockUser, [attribute]: newValue })
    }

    const handleSubmit = () => {
        // First would be the post to the backend then the dispatch
        console.log(mockUser)
    }

    //orden: tratamientos, modulo, actividades

    const handleClick = (option: string) => {
        setRoute(option);
    };

    const handleBackClick = () => {
        setRoute("");
    };

    return (
        <Box className={"home-display"}>
            <Box className={"home-menu"}>
                {options.map((option, index) => (
                    <Box
                        key={index}
                        className={"menu-option"}
                        onClick={() => handleClick(option.name)}
                    >
                        <h5>{option.name}</h5>
                        <RightArrowIcon width="16" height="16"/>
                    </Box>
                ))}
            </Box>
            <Box className={"module"}>
                <Box className={"route"}>
                    <LeftArrowIcon width="16" height="16" onClick={handleBackClick}/>
                    <h6>{route}</h6>
                </Box>
            </Box>

            <Box className={styles.activityContainer}>
                <EditableInput title={'Código de usuario'} text={mockUser.code} placeholder={'afeaf'} type={'text'} name={'UserCode'} handleChange={(e) => handleChange('code', e.target.value)}/>
                <EditableInput title={'Contraseña de usuario'} text={mockUser.password} placeholder={'anfeanef'} type={'text'} name={'UserPassword'} handleChange={(e) => handleChange('password', e.target.value)}/>
                <Button onClick={() => handleSubmit()} variant={'primary'} size={'medium'}>Guardar</Button>
            </Box>
        </Box>
    );
};

export default Home;
