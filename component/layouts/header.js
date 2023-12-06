import React from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CloseIcon from "@mui/icons-material/Close";

const steps = [
  'Form Selection',
  'Set up',
  'Form Creation',
  'Review',
];

export default function Header(props) {
  return (
    <div data-component="header">
      <div className='w-100 header-box'>
        <div className='py-4 w-100'>
          <Box sx={{ width: '70%', margin: 'auto' }}>
            <Stepper activeStep={props?.activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <CloseIcon className='closeIcon' />
        </div>
      </div>
    </div>
  );
}