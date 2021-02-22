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
import { GET_MAN_ID, PUT_EDIT_MAN } from '../api/apiService';
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
export default function EditMan({ match, location }) {
    const classes = useStyles();
    /* SET ATTRIBUTE FORM EDIT ADD PRODUCT */
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [id, setIdMan] = useState(0);
    const [title, setTitle] = useState(null)
    const [body, setBody] = useState(null)
    const [slug, setSlug] = useState(null)
    //const [category, setCategory] = useState(0);
    //const [categories, setCategories] = useState({});

    /* BEFORE RUN */
    useEffect(() => {
        //console.log(location)
        //console.log(match.params.id)
        /* GET PRODUCT ID */
        GET_MAN_ID(`mans`, match.params.id).then(man => {
            setIdMan(man.data.id)
            setTitle(man.data.title);
            setBody(man.data.body);
            setSlug(man.data.slug);
        })

    }, [])

    /* EVENT CHANGE TEXTFIELD IN FORM */
    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleChangeBody = (event) => {
        setBody(event.target.value)
    }
    const handleChangeSlug = (event) => {
        setSlug(event.target.value)
    }

    /* EVENT BUTTON SUBMIT FORM ADD PRODUCT */
    const EditProduct = (event) => {
        event.preventDefault();
        if (title !== "" && body !== "" && slug !== "" && id > 0) {
            let man = {
                Title: title,
                Body: body,
                Slug: slug,
                id: id
            }
            PUT_EDIT_MAN(`mans/${id}`, man).then(item => {
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
                        <Typography className={classes.title} variant="h4">
                            Edit Product
                    </Typography>
                        <Grid item xs={12} sm container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Title
                            </Typography>
                                <TextField id="Title" onChange={handleChangeTitle} value={title} name="Title" variant="outlined" className={classes.txtInput} size="small" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Body
                            </Typography>
                                <TextField id="outlined-multiline-static" onChange={handleChangeBody} defaultValue={body} name="Body" className={classes.txtInput} multiline rows={4} variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Slug
                            </Typography>
                                <TextField id="Slug" onChange={handleChangeSlug} value={slug} name="Slug" variant="outlined" className={classes.txtInput} size="small" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Choose Category
                            </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="button" onClick={EditMan} fullWidth variant="contained" color="primary" className={classes.submit} >
                                    Update man
                            </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
