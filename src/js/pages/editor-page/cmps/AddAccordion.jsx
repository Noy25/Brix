// React
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// Services
import { templateService } from '../../../services/template.service';
// Actions
import { addElement } from '../../../store/wap.action';
// Assets
import { Droppable, Draggable } from 'react-beautiful-dnd';
// Accordion
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


export function AddAccordion() {

    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState('panel1');

    const templateSections = templateService.getTemplateSections();
    const sectionCategories = templateService.getSectionsCategories();

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const onAddElement = (elementToAdd) => {
        dispatch(addElement(elementToAdd));
    }

    return <Droppable
        isDropDisabled={true}
        droppableId='sidebar'>
        {provided => {
            return <div {...provided.droppableProps}
                ref={provided.innerRef}
                className="add-accordion">

                {sectionCategories.map((category, i) => {
                    return <Accordion key={category} expanded={expanded === `panel${i + 1}`} onChange={handleChange(`panel${i + 1}`)}>

                        {/* Accordion title */}
                        <AccordionSummary aria-controls={`panel${i + 1}d-content`} id={`panel${i + 1}d-header`}>
                            <SummaryTypography>{category.substring(4, category.length)}</SummaryTypography>
                        </AccordionSummary>

                        {/* Accordion items */}
                        <AccordionDetails>
                            {templateSections.filter(section => section.category === category).map((section, idx) => {
                                return <Draggable key={section.id} draggableId={section.id} index={idx}>
                                    {(provided, snapshot) => {
                                        return <>
                                            <div key={section.id}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                className='dnd-container'>
                                                <img onClick={() => onAddElement(section)} src={section.thumbnail} alt='thumbnail' className='template-thumbnail' />
                                            </div>
                                            {snapshot.isDragging && <img src={section.thumbnail} alt='thumbnail' style={{ 'zIndex': '0' }} className='template-thumbnail' />}
                                        </>
                                    }}
                                </Draggable>
                            })}
                        </AccordionDetails>

                    </Accordion>
                })}

                <div style={{ 'display': 'none' }}>
                    {provided.placeholder}
                </div>
            </div>
        }}
    </Droppable >
}



// Accordion Styling
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
    borderBottom: '1px solid rgba(120, 120, 120, .7)',
    background: 'transparent'
}));

// Accordion Summary Styling
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowRightIcon sx={{ fontSize: '1.8rem' }} />}
        {...props}
    />
))(() => ({
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        margin: '10px',
        padding: '5px 0'
    },
}));

// Accordion Details Styling
const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: '20px 8px',
    borderTop: '1px solid rgba(60, 60, 60, .5)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
}));

// Typography Styling
const SummaryTypography = styled(Typography)(() => ({
    textTransform: 'capitalize',
    fontFamily: 'Montserrat',
    fontSize: '1rem',
    fontWeight: 500
}));