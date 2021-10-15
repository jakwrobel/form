import React,{useState, useRef, useEffect} from 'react'
import axios from 'axios'

const MyForm = ()=>{

const [formState,changeState] = useState({name:"",
                                        preparation_time:"",
                                        type:"",
                                        no_of_slices:0,
                                        diameter:"",
                                        spiciness_scale:"",
                                        slices_of_bread:"",
                                        nameError:"",
                                        preparation_timeError:"",
                                        typeError:"",
                                        no_of_slicesError:"",
                                        diameterError:"",
                                        spiciness_scaleError:"",
                                        slices_of_breadError:""})

const sendData=()=>{
    axios.post("https://frosty-wood-6558.getsandbox.com:443/dishes", formState).then(res=>console.log(res.data)).catch(err=>console.log(err.response, err.response.status))
}

const validateForm = ()=>{
    let initialErrors=
    {nameError:"",
    preparation_timeError:"",
    typeError:"",
    no_of_slicesError:"",
    diameterError:"",
    spiciness_scaleError:"",
    slices_of_breadError:""}

    let {nameError, preparation_timeError, typeError, no_of_slicesError, diameterError, spiciness_scaleError, slices_of_breadError} = initialErrors

    if(!formState.name){
        nameError="Name is empty!"
        changeState(prevState=>({...prevState, ...initialErrors, nameError}))
        return false
    }

    if(!formState.preparation_time){
        preparation_timeError="Set preparation time"
        changeState(prevState=>({...prevState, ...initialErrors, preparation_timeError}))
        return false
    }

    if(!formState.type){
        typeError="Choose type of the dish"
        changeState(prevState=>({...prevState, ...initialErrors, typeError}))
        return false
    }

    if(formState.type=="pizza"){
        if(!formState.no_of_slices){
            no_of_slicesError="Set number of slices"
            changeState(prevState=>({...prevState, ...initialErrors, no_of_slicesError}))
            return false
        }

        if(!formState.diameter){
            diameterError="Set diameter"
            changeState(prevState=>({...prevState, ...initialErrors, diameterError}))
            return false
        }
    }

    if(formState.type=="soup"){
        if(!formState.spiciness_scale){
            spiciness_scaleError="Choose spiciness of the soup"
            changeState(prevState=>({...prevState, ...initialErrors, spiciness_scaleError}))
            return false
        }

        if((formState.spiciness_scale<1) || (formState.spiciness_scale>10)){
            spiciness_scaleError="Spiciness must be a value between 1-10"
            changeState(prevState=>({...prevState, ...initialErrors, spiciness_scaleError}))
            return false
        }
    }

    if(formState.type=="sandwich"){
        if(!formState.slices_of_bread){
            spiciness_scaleError="Set amount of bread slices"
            changeState(prevState=>({...prevState, ...initialErrors, slices_of_breadError}))
            return false
        }
    }

    return true

}

const handleSubmit = event=>{
    const isValid=validateForm()
    if(isValid){
    event.preventDefault()
    sendData()
    }
    else {
        event.preventDefault()
        console.log('niepoprawny')}
}

    return(
        <div>
        <form onSubmit={event=>handleSubmit(event)}>
        <input 
            name="name" 
            type="text" 
            value={formState.name} 
            onChange={event=>{changeState(prevState=>({...prevState, name: event.target.value}))}}
        />
        <div className="input__error-message">{formState.nameError}</div>
        <input 
            name="preparation_time" 
            type="time" step="1" 
            placeholder="HH:MM:SS" 
            value={formState.preparation_time} 
            onChange={event=>{changeState(prevState=>({...prevState, preparation_time: event.target.value}))}}
        />
        <div className="input__error-message">{formState.preparation_timeError}</div>
        <select 
            name="type" 
            value={formState.type} 
            onChange={event=>{changeState(prevState=>({...prevState, type: event.target.value}))}}>
                <option></option>
                <option>pizza</option>
                <option>soup</option>
                <option>sandwich</option>
        </select>
        <div className="input__error-message">{formState.typeError}</div>
        {formState.type=="pizza" ? 
        <>
        <input name="no_of_slices" type="number" value={formState.no_of_slices} onChange={event=>{changeState(prevState=>({...prevState, no_of_slices:event.target.valueAsNumber}))}}/>
        <div className="input__error-message">{formState.no_of_slicesError}</div>
        <input name="diameter" type="number" value={formState.diameter} onChange={event=>{changeState(prevState=>({...prevState, diameter:event.target.valueAsNumber}))}}/>
        <div className="input__error-message">{formState.diameterError}</div>
        </>
        : formState.type=="soup" ?
        <>
        <input name="spiciness_scale" type="number" value={formState.spiciness_scale} onChange={event=>{changeState(prevState=>({...prevState, spiciness_scale:event.target.valueAsNumber}))}}/>
        <div className="input__error-message">{formState.spiciness_scaleError}</div>
        </>
        : 
        <>
        <input name="slices_of_bread" type="number" value={formState.slices_of_bread} onChange={event=>{changeState(prevState=>({...prevState, slices_of_bread:event.target.valueAsNumber}))}}/>
        <div className="input__error-message">{formState.slices_of_breadError}</div>
        </>
    }
    <button type="submit">Submit</button>
    </form>
        </div>
    )
}

export default MyForm