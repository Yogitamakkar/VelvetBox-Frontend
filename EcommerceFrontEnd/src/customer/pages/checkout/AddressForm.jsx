import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import * as Yup from "yup";

// Validation schema
const AddressSchema = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  phone: Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required("Required"),
  postalCode: Yup.string().required("Required"),
  street: Yup.string().required("Required"),
  locality: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
});

export default function AddressForm({ open, handleClose, handleSubmitAddress }) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>Contact Details</DialogTitle>

      <Formik
        initialValues={{
          fullName: "",
          phone: "",
          postalCode: "",
          street: "",
          locality: "",
          city: "",
          state: "",
        }}
        validationSchema={AddressSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmitAddress(values);
          resetForm();
          handleClose();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="fullName"
                    as={TextField}
                    fullWidth
                    label="Name"
                    error={touched.fullName && !!errors.fullName}
                    helperText={touched.fullName && errors.fullName}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="phone"
                    as={TextField}
                    fullWidth
                    label="Mobile"
                    error={touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="postalCode"
                    as={TextField}
                    fullWidth
                    label="Pin Code"
                    error={touched.postalCode && !!errors.postalCode}
                    helperText={touched.postalCode && errors.postalCode}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="street"
                    as={TextField}
                    fullWidth
                    label="Address (House No, Building, Street)"
                    error={touched.street && !!errors.street}
                    helperText={touched.street && errors.street}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="locality"
                    as={TextField}
                    fullWidth
                    label="Locality/Town"
                    error={touched.locality && !!errors.locality}
                    helperText={touched.locality && errors.locality}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="city"
                    as={TextField}
                    fullWidth
                    label="City"
                    error={touched.city && !!errors.city}
                    helperText={touched.city && errors.city}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="state"
                    as={TextField}
                    fullWidth
                    label="State"
                    error={touched.state && !!errors.state}
                    helperText={touched.state && errors.state}
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Address
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
