import React from 'react';
import { TextField } from '@material-ui/core';
import { MenuItem } from '@material-ui/core/MenuItem';

export default function Input({
   name,
   label,
   value,
   onChange,
   variant,
   multiline = false,
   error = null,
   password = null,
   helperText = null,
   ...other
}) {
   return (
      <TextField
         margin='normal'
         variant={variant || 'outlined'}
         required
         fullWidth
         multiline={multiline}
         rowsMax={multiline && 4}
         autoFocus
         onFocus={onChange}
         onBlur={onChange}
         type={password || 'text'}
         label={label}
         name={name}
         value={value}
         onChange={onChange}
         error={error}
         helperText={error && helperText}
         {...other}
      />
   );
}
