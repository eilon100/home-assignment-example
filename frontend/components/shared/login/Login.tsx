import React from 'react';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';

type LoginProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};
type InitialValues = { phone: string };

function Login({ closeModal }: LoginProps) {
  const loginUser = (registerValues: InitialValues, resetForm: () => void) => {
    console.log(registerValues);
    resetForm();
  };

  const { values, handleChange, handleBlur, touched, errors, handleSubmit } =
    useFormik({
      initialValues: { phone: '' },

      onSubmit: (newValues, { resetForm }) => {
        loginUser(newValues, resetForm);
      },
    });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-3 gap-3" dir="rtl">
      <h1>היי כדאי להמשיך צריך להתחבר, מה מספר הנייד שלך?</h1>
      <TextField
        dir="rtl"
        type="string"
        label="מספר נייד"
        variant="standard"
        id="phone"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.phone}
        error={touched.phone && Boolean(errors.phone)}
        helperText={touched.phone && errors.phone}
      />
      <button type="submit">המשך</button>
    </form>
  );
}

export default Login;
