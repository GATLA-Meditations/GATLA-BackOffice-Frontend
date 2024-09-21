import {Box, FormControl, MenuItem, Select} from "@mui/material";
import styles from "../activity/styles.module.css";
import Button from "../../components/Button";
import {contentMock} from "../../mocks";
import InputField from "../../components/InputField";
import {useState} from "react";

type attributeType = keyof typeof contentMock;

const UploadContent = () => {

    const [disclaimerText, setDisclaimerText] = useState('PARA FONDOS SUBIR IMAGEN EN 1080x1920');
    const [content, setContent] = useState({label: "", type: "FONDO", url: ""});

    const handleSubmit = async () => {
        console.log(content)
    };
    const handleChange = (attribute: attributeType, newValue: string) => {
        if (attribute === 'type') {
            setDisclaimerText(newValue === "FONDO" ? 'PARA FONDOS SUBIR IMAGEN EN 1080x1920' : 'PARA ICONOS SUBIR IMAGEN EN 512x512');
        }
        setContent((prevState) => ({...prevState, [attribute]: newValue}))
        console.log(attribute, newValue)
    }

    return (
        <Box className={"home-display"}>
            <Box className={styles.activityContainer}>
                <InputField title={'Nombre de contenido'} text={content.label}
                            placeholder={'Nombre de contenido'}
                            name={'UserCode'}
                            handleChange={(e) => handleChange('label', e.target.value)}/>
                <InputField title={'Link del contenido'} text={content.url}
                            placeholder={'Link del contenido'}
                            name={'UserPass'} handleChange={(e) => handleChange('url', e.target.value)}/>
                <h3>Tipo de contenido</h3>
                <FormControl>
                    <Select value={content.type} onChange={(e) => handleChange('type', e.target.value)}>
                        <MenuItem value="FONDO">Fondo</MenuItem>
                        <MenuItem value="ICONO">Icono</MenuItem>
                    </Select>
                </FormControl>
                <h3>{disclaimerText}</h3>
                <Button onClick={() => handleSubmit()} variant={'primary'} size={'medium'}>Crear</Button>
            </Box>
        </Box>
    );
};

export default UploadContent;
