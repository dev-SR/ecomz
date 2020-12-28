import { useState } from 'react';

export function useForm(initialValue) {
   const [inputs, setInputs] = useState(initialValue);
   const [errorExist, setErrorExits] = useState(true);

   const onChangeValidate = ({
      target: { name, value, type, checked = null }
   }) => {
      const newValue = type === 'checkbox' ? checked : value;
      const newInputs = [...inputs];
      const index = inputs.findIndex(input => input.name === name);
      const input = inputs[index];

      const isValid = type !== 'checkbox' ? input.validate(newValue) : ' ';
      newInputs[index] =
         type === 'checkbox'
            ? {
                 ...input,
                 checked: newValue
              }
            : {
                 ...input,
                 value: newValue,
                 error: !isValid
              };
      setInputs(newInputs);
      //Implicitly set Error status
      const foundErr = inputs.filter(
         input => (input.type === 'text' && input.value === '') || input.error
      );
      if (!foundErr.length) {
         setErrorExits(false);
      } else {
         setErrorExits(true);
      }
   };

   const onChange = ({ target: { name, value, type, checked = null } }) => {
      const newValue = type === 'checkbox' ? checked : value;
      const newInputs = [...inputs];
      const index = inputs.findIndex(input => input.name === name);
      const input = inputs[index];

      newInputs[index] =
         type === 'checkbox'
            ? {
                 ...input,
                 checked: newValue
              }
            : {
                 ...input,
                 value: newValue
              };
      setInputs(newInputs);
   };

   const resetForm = () => {
      setInputs(initialValue);
   };

   return {
      inputs,
      setInputs,
      onChangeValidate,
      errorExist,
      setErrorExits,
      onChange,
      resetForm
   };
}
