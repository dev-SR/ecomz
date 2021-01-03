import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// const options = ['Option 1', 'Option 2'];
export const useAutoComplete = () => {
   const [options, setOptions] = useState([]);
   const [selected, setSelected] = useState([0]);
   const [SelectionOnChange, setSelectionOnChange] = React.useState('');

   return {
      options,
      setOptions,
      selected,
      setSelected,
      SelectionOnChange,
      setSelectionOnChange
   };
};
export default function ControllableStates({
   id,
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
            id={id}
            options={options}
            style={{ width: 300 }}
            renderInput={params => (
               <TextField {...params} label={label} variant='outlined' />
            )}
         />
      </div>
   );
}
