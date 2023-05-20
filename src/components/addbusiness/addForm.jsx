import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import SvgIcon from '@material-ui/core/SvgIcon';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';


import './addbusiness.css'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            hintColor: '#5ce1e6',

        },

    },

    btn: {
        width: '40px',
        height: '40px',

        margin: '0px!important',
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        color: '#5ce1e6',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        color: '#5ce1e6',
    },


}));



const AddForm = (props) => {

    const classes = useStyles();

    const [alert, setAlert] = useState({ display: false, msg: "" })
    const [formStage, setFormStage] = useState('basic')
    const [doneLoading, setDoneLoading] = useState(false)

    const handleFormClick = (stage) => {
        setFormStage(stage)
    }


    const isStoreValid = props.store.name && props.store.type && props.store.items.every(i => Object.values(i).every(v => v)) && props.store.items.length > 0;

    const handleStoreCreate = () => {
        setAlert({ display: false, msg: "" })
        if (isStoreValid) {
            const newStore = props.store;
            setDoneLoading(true)
            fetch('https://covid-19-shopping.herokuapp.com/newstore', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStore)
            })
                .then(response => response.json())
                .then(res => {
                    if (res.id) {
                        setDoneLoading(false)
                        props.handleAddStore(res)
                    } else {
                        setAlert({ display: true, msg: res })
                        setDoneLoading(false)
                    }
                })
                .catch(() => {
                    setAlert({ display: true, msg: "An error has occured while trying to fetch" })
                    setDoneLoading(false)
                })

        } else {
            setAlert({ display: true, msg: "Please fill all the inputs before clicking Done" })
        }
    }



    if (formStage === 'basic') {
        return (
            <div className="form-wrapper">
                <main className="form pa4 black-80 dott"  style={{backgroundColor: 'rgba(0,0,0,0.7)', border: '2px solid #5ce1e6'}}>
                    <form className="measure-basic center" noValidate autoComplete="off" style={{color: '#5ce1e6'}}>
                        <fieldset id="basic-add-form" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0" style={{textAlign: 'center'}}>Add Business</legend>

                            {alert.display && <div style={{ margin: 0, textAlign: 'center' }} className="alert alert-danger" role="alert">{alert.msg}</div>}

                            <div className={`mt3 ${classes.root}`} style={{color:'#5ce1e6'}} >
                                {/*<h5>Business Name</h5>*/}
                                {/*<TextField name="name" onChange={props.handleInputChange} value={props.store.name} style={{backgroundColor:'rgba(92,225,230,0.5)' }}  />*/}
                                {/*<input type="text" name="name" onChange={props.handleInputChange} value={props.store.name} style={{backgroundColor:'rgba(92,225,230,0.5)', margin: '0'}}/>*/}

                                <InputLabel style={{ color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}} >Business Name</InputLabel>

                                <input onChange={props.handleInputChange} value={props.store.name}  name="name" id="inputBiz" className="form-control" placeholder="" style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', border: '1px solid #5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}} required />
                                {/*<label htmlFor="inputBiz" style={{color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Business Name</label>*/}
                            </div>
                            <div className={`mt3 ${classes.root}`} >
                                <FormControl className={classes.formControl}  style={{background: 'rgba(0,0,0,0.8)',border: '1px solid #5ce1e6',  color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>
                                    <InputLabel style={{ color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}} >Business type</InputLabel>
                                    <Select
                                        onChange={props.handleInputChange}
                                        value={props.store.type}
                                        name="type"
                                        style={{paddingLeft: '5px', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}
                                    >

                                        <MenuItem value={"Chemist"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Pharmacy / Chemist</MenuItem>
                                        <MenuItem value={"Bakery shop"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Bakery shop</MenuItem>
                                        <MenuItem value={"Butcher"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Butcher</MenuItem>
                                        <MenuItem value={"Books"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Books</MenuItem>
                                        <MenuItem value={"Fishmonger"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Fishmonger</MenuItem>
                                        <MenuItem value={"Grocery"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Grocery</MenuItem>
                                        <MenuItem value={"Clothing"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Clothing</MenuItem>
                                        <MenuItem value={"Medicine"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Medicine</MenuItem>
                                        <MenuItem value={"Super Market"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Super Market</MenuItem>
                                        <MenuItem value={"Tobacconist"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Tobacconist</MenuItem>
                                        <MenuItem value={"Florist"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Florist</MenuItem>
                                        <MenuItem value={"Hardware"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Hardware</MenuItem>
                                        <MenuItem value={"Optician"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Optician</MenuItem>
                                        <MenuItem value={"Jewellery"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Jewellery</MenuItem>
                                        <MenuItem value={"Oil station"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Oil station</MenuItem>
                                        <MenuItem value={"Library"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Library</MenuItem>
                                        <MenuItem value={"Other"} style={{background: 'rgba(0,0,0,0.8)', color: '#5ce1e6', fontFamily: 'Rajdhani', fontWeight: '500', fontSize: '1em',}}>Other</MenuItem>

                                    </Select>
                                </FormControl>

                            </div>
                            <div className={`mt3 ${classes.root}`} style={{visibility: 'hidden'}}>
                                <TextField
                                    label="Geometric location"
                                    defaultValue={`lat: ${props.lat}, lng: ${props.lng}`}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"

                                />


                            </div>
                        </fieldset>


                        {/* ////////////////////////////// */}



                    </form>

                    <div className="form-btn-wrapper">
                        <Button style={{ margin: '0px 10px', backgroundColor: 'rgba(0,0,0,0.8)', color:'#5ce1e6'}} onClick={props.onCancel} >Cancel</Button>
                        <Button className="" onClick={() => handleFormClick('items')} style={{ margin: '0px 10px',  backgroundColor: 'rgba(92,225,230,0.8)', color:'#000000'}} variant="contained" >Next</Button>
                    </div>

                </main>

            </div>

        )
    } else if (formStage === 'items') {
        return (
            <div className="form-wrapper">
                <main className="form pa4 black-80">
                    <legend className="f4 fw6 ph0 mh0 tc">Add Products to your business</legend>

                    {alert.display && <div style={{ textAlign: 'center' }} className="alert alert-danger" role="alert">{alert.msg}</div>}

                    <form className={`measure center`} noValidate autoComplete="off">
                        <fieldset id="basic-add-form" className="ba b--transparent ph0 mh0">

                            {/* // THIS IS THE LINE */}


                            {
                                props.store.items.map((item, i) => {
                                    return (
                                        <div key={i} className={`mt3 item-input-wrapper`}>
                                            <TextField onChange={(e) => props.handleItemChange('name', e, i)} value={item.name} style={{ width: '40%' }} label="Item name" />
                                            <TextField onChange={(e) => props.handleItemChange('quantity', e, i)} value={item.quantity} style={{ width: '30%' }} label="quantity" />
                                            <TextField onChange={(e) => props.handleItemChange('price', e, i)} value={item.price} style={{ width: '20%' }} label="Price" />
                                            <span className={classes.btn}>
                                                <IconButton onClick={(e) => props.deleteItem(i, e)} aria-label="delete">
                                                    <SvgIcon style={{ color: 'red' }} >
                                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                                    </SvgIcon>
                                                </IconButton>
                                            </span>

                                        </div>
                                    )
                                })
                            }


                        </fieldset>

                    </form>
                    <div style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <Button style={{ backgroundColor: '#388e3c', color: 'white' }} onClick={props.addItem} variant="contained"> + Add more</Button>
                    </div>
                    <div className="form-btn-wrapper">
                        <Button style={{ margin: '0px 10px' }} onClick={props.onCancel} color="primary">Cancel</Button>
                        <Button style={{ margin: '0px 10px' }} onClick={() => handleFormClick('basic')} color="secondary">Back</Button>

                        <Button disabled={doneLoading} onClick={() => handleStoreCreate()} variant="contained" color="primary">
                            {doneLoading && <CircularProgress size={24} />}
                            {!doneLoading && "Done"}
                        </Button>
                        {/*  <Button disabled={props.btnLoading} onClick={() => props.handleFormClick('finish')} variant="contained" color="primary">
                            {props.btnLoading && <CircularProgress size={24} />}
                            {!props.btnLoading && "Done"}
                        </Button> */}
                    </div>
                </main>
            </div>


        )
    }


}

export default AddForm;
