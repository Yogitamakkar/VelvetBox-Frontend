import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Dialog, DialogActions, DialogContent, TextField, Grid } from "@mui/material";
import * as Yup from "yup";

const AddressSchema = Yup.object().shape({
  fullName:   Yup.string().required("Required"),
  phone:      Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required("Required"),
  postalCode: Yup.string().required("Required"),
  street:     Yup.string().required("Required"),
  locality:   Yup.string().required("Required"),
  city:       Yup.string().required("Required"),
  state:      Yup.string().required("Required"),
});

const inputSx = {
  '& label.Mui-focused': { color: '#e8006f' },
  '& .MuiOutlinedInput-root:hover fieldset': { borderColor: '#e8006f' },
  '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#e8006f' },
};

const F = ({ name, label, errors, touched, xs = 12 }) => (
  <Grid item xs={xs}>
    <Field name={name}>
      {({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          size="small"
          sx={inputSx}
          error={touched[name] && !!errors[name]}
          helperText={touched[name] && errors[name]}
        />
      )}
    </Field>
  </Grid>
);

export default function AddressForm({ open, handleClose, handleSubmitAddress }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: '16px', overflow: 'hidden' } }}
    >
      {/* Pink header */}
      <div style={{
        background: 'linear-gradient(135deg, #e8006f, #ff4da6)',
        padding: '18px 24px', color: '#fff',
      }}>
        <div style={{ fontSize: 18, fontWeight: 700, textAlign: 'center' }}>Add New Address</div>
        <div style={{ fontSize: 12, textAlign: 'center', opacity: 0.85, marginTop: 4 }}>
          Fill in your delivery details
        </div>
      </div>

      <Formik
        initialValues={{ fullName: "", phone: "", postalCode: "", street: "", locality: "", city: "", state: "" }}
        validationSchema={AddressSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmitAddress(values);
          resetForm();
          handleClose();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent sx={{ pt: 2.5 }}>
              <Grid container spacing={2}>
                <F name="fullName"   label="Full Name"                              errors={errors} touched={touched} />
                <F name="phone"      label="Mobile"                    xs={6}        errors={errors} touched={touched} />
                <F name="postalCode" label="Pin Code"                  xs={6}        errors={errors} touched={touched} />
                <F name="street"     label="House No, Building, Street"              errors={errors} touched={touched} />
                <F name="locality"   label="Locality / Town"                         errors={errors} touched={touched} />
                <F name="city"       label="City"                      xs={6}        errors={errors} touched={touched} />
                <F name="state"      label="State"                     xs={6}        errors={errors} touched={touched} />
              </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
              <Button onClick={handleClose} variant="outlined" sx={{
                flex: 1, borderColor: '#e8006f', color: '#e8006f',
                borderRadius: '8px', textTransform: 'none', fontWeight: 600,
                '&:hover': { borderColor: '#c4005d', color: '#c4005d', background: 'rgba(232,0,111,0.04)' },
              }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{
                flex: 2, backgroundColor: '#e8006f', borderRadius: '8px',
                textTransform: 'none', fontWeight: 600, fontSize: '14px',
                boxShadow: '0 4px 14px rgba(232,0,111,0.35)',
                '&:hover': { backgroundColor: '#c4005d' },
              }}>
                Save Address
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}