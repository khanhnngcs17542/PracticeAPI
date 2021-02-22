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
import { POST_ADD_MAN } from '../api/apiService';
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


export default function Man() {
    const classes = useStyles();
    /* SET ATTRIBUTE FORM ADD MAN */
    const [checkAdd, setCheckAdd] = useState(false);
    const [title, setTitle] = useState(null)


    /* EVENT CHANGE TEXTFIELD IN FORM */
    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }


    /* EVENT BUTTON SUBMIT FORM ADD MAN */
    const addMan = (event) => {
        event.preventDefault();
        if (title !== "") {
            let man = {
                Title: title,
            }
            POST_ADD_MAN(`men`, man).then(item => {
                if (item.data === 1) {
                    setCheckAdd(true);
                }
            })
        }
        else {
            alert("Bạn chưa nhập đủ thông tin!");
        }
    }

    /* CHECK setAdd, if true redirect to Home component */
    if (checkAdd) {
        return <Redirect to="/" />
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h4">
                            Add Product
                    </Typography>
                        <Grid item xs={12} sm container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Title
                            </Typography>
                                <TextField id="Title" onChange={handleChangeTitle} name="Title" label="Title" variant="outlined" className={classes.txtInput} size="small" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="button" onClick={addMan} fullWidth variant="contained" color="primary" className={classes.submit} >
                                    Add man
                            </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
