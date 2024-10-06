import {Box, FormControl, MenuItem, Select} from "@mui/material";
import styles from "../activity/styles.module.css";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import {useState} from "react";
import {uploadContent} from "../../service/api.ts";
import {parseShopItemsName} from "../../util";
import withToast, {WithToastProps} from "../../hoc/withToast.tsx";


const UploadContent = ({showToast}: WithToastProps) => {

    const [disclaimerText, setDisclaimerText] = useState('PARA FONDOS SUBIR IMAGEN EN 1080x1920');
    const [content, setContent] = useState({price: 1, type: "FONDO", content_url: ""});

    const handleSubmit = async () => {
        try {
            await uploadContent({...content, type: parseShopItemsName[content.type]})
        } catch (error) {
            showToast('No se ha podido crear el contenido', 'error')
            console.error(error)
        } finally {
            showToast('El contenido ha sido creado correctamente', 'success')
        }
    };
    const handleChange = (attribute: 'price' | 'type' | 'content_url', newValue: string) => {
        if (attribute === 'type') {
            setDisclaimerText(newValue === "FONDO" ? 'PARA FONDOS SUBIR IMAGEN EN 1080x1920' : 'PARA ICONOS SUBIR IMAGEN EN 512x512');
        }
        setContent((prevState) => ({...prevState, [attribute]: newValue}))
        console.log(attribute, newValue)
    }

    return (
        <Box className={"home-display"}>
            <h3>Tipo de contenido</h3>
            <FormControl>
                <Select value={content.type} onChange={(e) => handleChange('type', e.target.value)}>
                    <MenuItem value="FONDO">Fondo</MenuItem>
                    <MenuItem value="ICONO">Icono</MenuItem>
                </Select>
            </FormControl>
            <h4>{disclaimerText}</h4>
            <Box className={styles.activityContainer}>
                <InputField title={'Precio del contenido'} text={content.price}
                            placeholder={'Precio del contenido'}
                            name={'UserCode'}
                            handleChange={(e) => handleChange('price', e.target.value)}/>
                <InputField title={'Link del contenido'} text={content.content_url}
                            placeholder={'Link del contenido'}
                            name={'UserPass'} handleChange={(e) => handleChange('content_url', e.target.value)}/>
                <Button onClick={() => handleSubmit()} variant={'primary'} size={'medium'}>Crear</Button>
            </Box>
        </Box>
    );
};

export default withToast(UploadContent);
