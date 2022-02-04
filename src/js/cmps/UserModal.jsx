// React
import { useState } from 'react';
// Cmps
import { Screen } from './Screen';

// EXAMPLE FOR PROPS CAN BE FOUND BELOW THE JSX.
export function UserModal(props) {
    const { mainTxt, subTxt, btnTxtCancel, handleCbCancel, btnTxt_1, handleCb_1, btnTxt_2, handleCb_2,
        type, handleSubmitCb, btnSubmitTxt, inputType_1, inputName_1, inputPlaceholder_1 } = props

    const [inputsValues, setInputsValues] = useState({});

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setInputsValues(prevState => ({ ...prevState, [name]: value }));
    }


    return <Screen cb={handleCbCancel}>

        <div className="user-modal" onClick={ev => ev.stopPropagation()}>

            {mainTxt &&
                <h2 className="main-txt">{mainTxt}</h2>}

            {subTxt &&
                <p className="sub-txt">{subTxt}</p>}

            {type === 'confirm' &&
                <div className="btns-container">
                    {btnTxt_1 && <button className="btn-1" onClick={handleCb_1}>{btnTxt_1}</button>}
                    {btnTxt_2 && <button className="btn-2" onClick={handleCb_2}>{btnTxt_2}</button>}
                    {btnTxtCancel && <button className="btn-cancel" onClick={handleCbCancel}>{btnTxtCancel}</button>}
                    {/* <button className="btn-optional" onClick={ handleOptionalCb}>{ btnOptionalTxt}</button> */}
                </div>}

            {type === 'form' &&
                <form onSubmit={(ev) => handleSubmitCb(ev, inputsValues)}>
                    <input type={inputType_1} name={inputName_1} onChange={handleChange} placeholder={inputPlaceholder_1}></input>
                    <button className="submit">{btnSubmitTxt}</button>
                </form>}

        </div>

    </Screen>
}




// *** EXAMPLE *** //

const propsExample = {
    mainTxt: 'Main',
    subTxt: 'Secondary',

    btnTxtCancel: 'Cancel',
    handleCbCancel: 'CB function to hide the modal',

    type: 'confirm',
    btnTxt_1: 'Yes',
    handleCb_1: 'Function to be emitted on btn-1',
    btnTxt_2: 'Maybe',
    handleCb_2: 'Function to be emitted on btn-2',

    type: 'form',
    handleSubmitCb: 'Function to be emitted on submit',
    btnSubmitTxt: 'Submit',
    inputType_1: 'text',
    inputName_1: 'websiteName',
    inputPlaceholder_1: 'Enter your text here',
}