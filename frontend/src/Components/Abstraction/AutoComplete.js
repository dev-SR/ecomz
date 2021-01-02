import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// const options = ['Option 1', 'Option 2'];
export const useAutoComplete = op => {
   const [autoComVal, setAutoComVal] = useState([]);
   const [autoCominputValue, setautoComInputValue] = React.useState('');

   return {
      autoComVal,
      setAutoComVal,
      autoCominputValue,
      setautoComInputValue
   };
};
export default function ControllableStates({
   options,
   value,
   setValue,
   label,
   inputValue,
   setInputValue
}) {
   // console.log(inputValue);
   // console.log(value);
   return (
      <div>
         <Autocomplete
            value={value}
            onChange={(event, newValue) => {
               setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
               setInputValue(newInputValue);
            }}
            id='controllable-states-demo'
            options={options}
            style={{ width: 300 }}
            renderInput={params => (
               <TextField {...params} label={label} variant='outlined' />
            )}
         />
      </div>
   );
}
