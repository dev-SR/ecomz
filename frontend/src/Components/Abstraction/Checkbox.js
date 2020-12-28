import React from 'react';
import {
   FormControl,
   FormControlLabel,
   Checkbox as MuiCheckbox
} from '@material-ui/core';

export default function Checkbox({ name, label, checked, onChange }) {
   return (
      <FormControl>
         <FormControlLabel
            control={
               <MuiCheckbox
                  name={name}
                  color='primary'
                  checked={checked}
                  onChange={onChange}
               />
            }
            label={label}
         />
      </FormControl>
   );
}
