import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from '../../../hooks/usePrevious';

import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { FaUndoAlt } from "react-icons/fa";
import { IoDuplicateSharp } from "react-icons/io5";
import { FcDeleteRow } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateWap, removeElement, duplicateElement, undo } from '../../../store/wap.action';
import { updateCurrElementStyle, updateCurrElementAttr, uploadImage } from '../../../store/editor.action';

import { TextStyles } from './TextStyles';
import { ImageStyles } from './ImageStyles';
import { ButtonStyles } from './BtnStyles';
import { SectionStyle } from './SectionStyle';
import { BgcStyles } from './BgcStyles.jsx';
import { VideoStyles } from './VideoStyles';
import { InputStyles } from './InputStyles';



export function EditAccordion() {

    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    let currElement = useSelector(state => state.editorModule.currElement)
    const currHistoryLength = useSelector(state => state.wapModule.wapHistory.length)

    const prevElement = usePrevious(currElement);
    const prevHistoryLength = usePrevious(currHistoryLength);

    useEffect(() => {
        if (currElement?.id === prevElement?.id &&
            prevHistoryLength <= currHistoryLength) {
            dispatch(updateWap(currElement));
        }
        window.addEventListener('keydown', onRemoveElementByKey);

        // Accordions Auto-Open :
        openAccordion();

        return () => window.removeEventListener('keydown', onRemoveElementByKey);
    }, [currElement])


    const openAccordion = () => {
        if (!currElement || !prevElement) return;
        if (currElement.type === prevElement.type) return;

        switch (currElement.type) {
            case 'txt':
                setExpanded('panel1');
                break;
            case 'img':
                setExpanded('panel2');
                break;
            case 'btn':
                setExpanded('panel3');
                break;
            case 'container':
                setExpanded('panel4');
                break;
            case 'video':
                setExpanded('panel6');
                break;
            case 'input':
                setExpanded('panel7');
                break;
            default:
        }
    }

    // Edit functions

    const onChangeStyle = ({ target }) => {
        const style = {
            styleName: target.name,
            styleValue: target.value
        }
        dispatch(updateCurrElementStyle(currElement, style))
    }

    const onChangeColor = (ev, name) => {
        const style = {
            styleName: name,
            styleValue: ev.hex
        }
        if (name === 'backgroundColor') {
            currElement = JSON.parse(JSON.stringify(currElement))
            currElement.style.backgroundImage = '';
        }
        dispatch(updateCurrElementStyle(currElement, style))
    }

    const onChangeAttr = ({ target }) => {
        const attr = {
            attrName: target.name,
            attrValue: target.value
        }
        dispatch(updateCurrElementAttr(currElement, attr))
    }

    const onUploadImg = (ev, isBackground) => {
        dispatch(uploadImage(ev, currElement, isBackground))
    }

    const onRemoveElement = () => {
        if (!currElement) return
        dispatch(removeElement(currElement));
    }

    const onDuplicateElement = () => {
        if (!currElement) return
        dispatch(duplicateElement(currElement));
    }


    const onUndo = () => {
        dispatch(undo());
    }

    const onRemoveElementByKey = ({ key }) => {
        if (key === 'Delete') onRemoveElement();
    }



    return (
        <div className="edit-accordion">
            {(!currElement) && <p style={{ padding: '20px', marginTop: '50px', textAlign: 'center' }}>Choose an Item</p>}

            {currElement && <>
                {(currElement.type === 'txt' || currElement.type === 'btn' || currElement.type === 'input') &&
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <SummaryTypography>Text</SummaryTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextStyles onChangeColor={onChangeColor} elementStyle={currElement.style} onChangeStyle={onChangeStyle} />
                        </AccordionDetails>
                    </Accordion>}

                {currElement.type === 'img' &&
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <SummaryTypography>Image</SummaryTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ImageStyles element={currElement} onChangeStyle={onChangeStyle} onUploadImg={onUploadImg} onChangeAttr={onChangeAttr} />
                        </AccordionDetails>
                    </Accordion>}

                {currElement.type === 'btn' &&
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <SummaryTypography>Button</SummaryTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ButtonStyles element={currElement} onChangeStyle={onChangeStyle} onChangeAttr={onChangeAttr} />
                        </AccordionDetails>
                    </Accordion>}

                {currElement.type === 'container' &&
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <SummaryTypography>Section</SummaryTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SectionStyle element={currElement} onChangeStyle={onChangeStyle} onChangeAttr={onChangeAttr} onUploadImg={onUploadImg} />
                        </AccordionDetails>
                    </Accordion>}

                {(currElement.type === 'container' || currElement.type === 'btn' || currElement.type === 'txt') &&
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <SummaryTypography>Background Color</SummaryTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <BgcStyles element={currElement} onChangeColor={onChangeColor} />
                        </AccordionDetails>
                    </Accordion>}

                {currElement.type === 'video' &&
                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <SummaryTypography>Video</SummaryTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <VideoStyles element={currElement} onChangeAttr={onChangeAttr} />
                        </AccordionDetails>
                    </Accordion>}

                {currElement.type === 'input' &&
                    <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <SummaryTypography>Input</SummaryTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <InputStyles element={currElement} onChangeAttr={onChangeAttr} />
                        </AccordionDetails>
                    </Accordion>}
            </>}

            <div className='other-action-container flex'>
                <button onClick={onRemoveElement}><FcDeleteRow /></button>
                <button onClick={onDuplicateElement}><IoDuplicateSharp /></button>
                <button onClick={onUndo}><FaUndoAlt /></button>
            </div>
        </div >
    );
}


//////////////////////////////////////////////////////////////// STYLES ///////////////////////////////////////////////////////////////////////////


// Accordion Styling

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    borderBottom: '1px solid rgba(120, 120, 120, .7)',
    background: 'transparent',
}));

// Accordion Summary Styling

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.1rem', color: '#eee' }} />}
        expandIcon={<ArrowRightIcon sx={{ fontSize: '1.8rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        margin: '10px',
        padding: '5px 0'
    },
}));

// Accordion Details Styling

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: '20px 8px',
    borderTop: '1px solid rgba(60, 60, 60, .5)',
}));

// Typography Styling

const SummaryTypography = styled(Typography)(({ theme }) => ({
    padding: '5px 0',
    textTransform: 'capitalize',
    fontFamily: 'Montserrat',
    fontSize: '1rem',
    fontWeight: 500
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    padding: `${theme.spacing(1)} 0`,
}));