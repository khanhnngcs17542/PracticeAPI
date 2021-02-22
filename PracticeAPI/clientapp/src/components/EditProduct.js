import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';

/*Import api */
import { GET_PRODUCT_ID, PUT_EDIT_PRODUCT } from '../api/apiService';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 600,
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    },
    link: {
        padding: 10,
        display: 'inline-block'
    },
    txtInput: {
        width: '98%',
        margin: '1%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function EditProduct({ match, location }) {
    const classes = useStyles();
    /* SET ATTRIBUTE FORM EDIT ADD PRODUCT */
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [id, setIdProduct] = useState(0);
    const [name, setTitle] = useState(null)
    const [description, setBody] = useState(null)


    /* BEFORE RUN */
    useEffect(() => {
        console.log(location)
        console.log(match.params.id)
        /* GET PRODUCT ID */
        GET_PRODUCT_ID(`products`, match.params.id).then(product => {
            setIdProduct(product.data.id);
            setTitle(product.data.name);
            setBody(product.data.description);

        })
        /* GET API CATEGORIES */
        /*GET_ALL_CATEGORIES('categories').then(item => {
            setCategories(item.data);
        });*/

    }, [])

    /* EVENT CHANGE TEXTFIELD IN FORM */
    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleChangeBody = (event) => {
        setBody(event.target.value)
    }


    /* EVENT BUTTON SUBMIT FORM ADD PRODUCT */
    const EditProduct = (event) => {
        event.preventDefault();
        if (name !== "" && description !== "") {
            let product = {
                Name: name,
                Description: description
            }
            PUT_EDIT_PRODUCT(`products/${id}`, product).then(item => {
                if (item.data === 1) {
                    setCheckUpdate(true);
                }
            })
        }
        else {
            alert("Bạn chưa nhập đủ thông tin!");
        }
    }

    /* CHECK setAdd, if true redirect to Home component */
    if (checkUpdate) {
        return <Redirect to="/" />
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.name} variant="h4">
                            Edit Product
                    </Typography>
                        <Grid item xs={12} sm container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Name
                            </Typography>
                                <TextField id="name" onChange={handleChangeTitle} value={name} name="name" variant="outlined" className={classes.txtInput} size="small" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Description
                            </Typography>
                                <TextField id="outlined-multiline-static" onChange={handleChangeBody} defaultValue={description} name="Description" className={classes.txtInput} multiline rows={4} variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="button" onClick={EditProduct} fullWidth variant="contained" color="primary" className={classes.submit} >
                                    Update product
                            </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
