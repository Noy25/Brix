import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';


export function ButtonStyles({ element, onChangeStyle, onChangeAttr }) {
    return <div className="flex column style-inputs">
        <label>Border Radius
            <Box>
                <Box sx={{ m: 3 }} sx={{ width: 100 }} />
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    onChange={onChangeStyle} name='borderRadius' value={+element.style.borderRadius} min={0} max={100}
                />
            </Box>
        </label>
        <label>Link to
            <input className="url-input" type="url" onChange={onChangeAttr} name='url' value={element.url} />
        </label>
    </div>
}


const PrettoSlider = styled(Slider)({
    color: '#1d375a',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 18,
        width: 18,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 28,
        height: 28,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#1d375a',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -80%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});