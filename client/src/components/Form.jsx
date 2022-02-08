import React, { useState,useEffect } from "react";
import { Grid, Typography, FormHelperText } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//import DateAdapter from '@mui/lab/AdapterMoment';
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from 'axios'

const Form = () => {
  const EMAIL_PATTERN =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm();

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const api = axios.create({
    baseURL: 'https://ortsudents.herokuapp.com/api',
})

  const { vertical, horizontal, open } = state;

  //toast message click
  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

    //toast message close
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  //handled only form is valid and no errors!
  const handleRegister = (data) => {
    if(data){

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
       const register = async()=>{
         
          await api.post('/students',data,config)
        }
        register()
      
    }
   
    reset({})
    setTimeout(()=>{window.location.reload()},3000)
    
  };



 
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={5000}
      >
        {Object.keys(errors).length !== 0 ? (
          <MuiAlert
            variant="filled"
            severity="error"
            sx={{ width: "100%", position: "relative", top: "200px" }}
          >
            שגיאה ברישום , אנא וודא כי כל השדות מלאים ותקינים
          </MuiAlert>
        ) : (
          <MuiAlert
            variant="filled"
            severity="success"
            sx={{ width: "100%", position: "relative", top: "200px" }}
          >
            הרישום נוצר בהצלחה! אחד מנציגינו יחזור אליך בהקדם תודה!
          </MuiAlert>
        )}
      </Snackbar>

      <Typography
        variant="h6"
        sx={{
          display: "grid",
          justifyContent: "end",
          direction: "ltr",
          maxWidth: "500px",
        }}
        mt={0}
      >
        : פרטי התלמיד הנרשם
      </Typography>

      <Box
        sx={{
          maxWidth: "500px",
        }}
      >
        <form onSubmit={handleSubmit(handleRegister)} id="myForm">
          <Grid
            container
            rowSpacing={1}
            alignItems="center"
            justify="center"
            direction="column"
            p={5}
            md={12}
            xs={12}
          >
            <Grid xs={10} sx={{ display: "flex", gap: 1 }} mt={1}>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "הזן שם פרטי",
                  },

                  minLength: {
                    value: 2,
                    message: "נדרש לפחות 2 תווים",
                  },
                }}
                name="firstName"
                render={({
                  field: { firstName, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="outlined-name"
                    label="שם פרטי"
                    value={firstName}
                    onChange={onChange}
                    sx={{ order: 1 }}
                    error={error}
                    helperText={error && errors.firstName?.message}
                   
                  />
                )}
              />

              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "הזן שם משפחה",
                  },

                  minLength: {
                    value: 2,
                    message: "נדרש לפחות 2 תווים",
                  },
                }}
                name="lastName"
                render={({
                  field: { lastName, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="outlined-lastname"
                    label="שם משפחה"
                    value={lastName}
                    onChange={onChange}
                    error={error}
                    helperText={error && errors.lastName?.message}
                  />
                )}
              />
            </Grid>

            <Grid xs={10} sx={{ display: "flex", gap: 1 }} mt={1}>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "הזן תעודת זהות",
                  },

                  minLength: {
                    value: 5,
                    message: "נדרש לפחות 5 ספרות",
                  },
                }}
                name="idNumber"
                render={({
                  field: { idNumber, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="outlined-email"
                    label="תעדות זהות"
                    onChange={onChange}
                    value={idNumber}
                    type="number"
                    error={error}
                    helperText={error && errors.idNumber?.message}
                  />
                )}
              />

              <Controller
                control={control}
                rules={{
                  required: "הזן כתובת מייל",
                  pattern: { value: EMAIL_PATTERN, message: "מייל לא תקין" },
                }}
                name="email"
                render={({
                  field: { email, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="outlined-email"
                    label="כתובת אימייל"
                    onChange={onChange}
                    value={email}
                    error={error}
                    helperText={error && errors.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid
              xs={10}
              md={10}
              sx={{ display: "flex", gap: 1, width: "100%" }}
              mt={1}
            >
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "בחר מדינה",
                  },
                }}
                name="country"
                render={({
                  field: { country, onChange },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <Box sx={{ width: "100%" }}>
                      <InputLabel id="select-label-country">מדינה</InputLabel>

                      <Select
                        labelId="select-label-country"
                        id="select-country"
                        value={country}
                        label="מדינה"
                        onChange={onChange}
                        sx={{ width: "105px" }}
                        error={error}
                      >
                        {[
                          "ישראל",
                          "אתיופיה",
                          "רוסיה",
                          "בריטניה",
                          "רומניה",
                          "אזרבייג׳ן",
                          "מולדובה",
                        ].map((countryName, idx) => {
                          return (
                            <MenuItem key={idx} value={countryName}>
                              {countryName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        {error && errors.country?.message}
                      </FormHelperText>
                    </Box>
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "בחר מין",
                  },
                }}
                name="gender"
                render={({
                  field: { gender, onChange },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <Box sx={{ width: "100%" }}>
                      <InputLabel id="select-label-gender">מין</InputLabel>

                      <Select
                        labelId="select-label"
                        id="select-gender"
                        value={gender}
                        label="מיו"
                        onChange={onChange}
                        sx={{ width: "110px" }}
                        error={error}
                      >
                        <MenuItem value={"זכר"}>זכר</MenuItem>
                        <MenuItem value={"נקבה"}>נקבה</MenuItem>
                      </Select>
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        {error && errors.gender?.message}
                      </FormHelperText>
                    </Box>
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "בחר לאום",
                  },
                }}
                name="nation"
                render={({
                  field: { nation, onChange },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <Box sx={{ width: "100%" }}>
                      <InputLabel id="select-label-nation">לאום</InputLabel>

                      <Select
                        labelId="select-label-nation"
                        id="select-nation"
                        value={nation}
                        label="לאום"
                        onChange={onChange}
                        sx={{ width: "105px" }}
                        error={error}
                      >
                        <MenuItem value={"יהודי"}>יהודי</MenuItem>
                        <MenuItem value={"ערבי"}>ערבי</MenuItem>
                        <MenuItem value={"נוצרי"}>נוצרי</MenuItem>
                      </Select>
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        {error && errors.nation?.message}
                      </FormHelperText>
                    </Box>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid xs={10} sx={{ display: "flex", gap: 1 }} mt={1}>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "הזן מספר פלאפון",
                  },

                  minLength: {
                    value: 10,
                    message: "נדרש  10 ספרות",
                  },
                  maxLength: {
                    value: 10,
                    message: "נדרש  10 ספרות",
                  },
                }}
                name="mobileNumber"
                render={({
                  field: { mobileNumber, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="outlined-mobileNumber"
                    label="מספר פלאפון"
                    onChange={onChange}
                    value={mobileNumber}
                    type="number"
                    error={error}
                    helperText={error && errors.mobileNumber?.message}
                  />
                )}
              />

              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "הזן מספר פלאפון",
                  },

                  minLength: {
                    value: 9,
                    message: "נדרש  9 ספרות",
                  },
                  maxLength: {
                    value: 9,
                    message: "נדרש  9 ספרות",
                  },
                }}
                name="homeTelNumber"
                render={({
                  field: { homeTelNumber, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="outlined-homeTelNumber"
                    label="טלפון בבית"
                    onChange={onChange}
                    value={homeTelNumber}
                    type="number"
                    error={error}
                    helperText={error && errors.homeTelNumber?.message}
                  />
                )}
              />
            </Grid>

            <Grid
              xs={10}
              sx={{ display: "flex", gap: 1, width: "396px" }}
              mt={1}
            >
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "הזן תאריך לידה",
                  },
                }}
                name="bornDate"
                render={({
                  field: { onChange, value = null },
                  fieldState: { error },
                }) => (
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                      label="תאריך לידה"
                      value={value}
                      onChange={(value) => {
                        onChange(new Date(value).toLocaleDateString());
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={error}
                          helperText={error && errors.bornDate?.message}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "הזן תאריך עלייה",
                  },
                }}
                name="aliyahDate"
                render={({
                  field: { onChange, value = null },
                  fieldState: { error },
                }) => (
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                      label="תאריך עלייה"
                      onChange={(value) => {
                        onChange(new Date(value).toLocaleDateString());
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={error}
                          helperText={error && errors.aliyahDate?.message}
                        />
                      )}
                      value={value}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>

            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ marginTop: 3, width: "200px" }}
              onClick={handleClick({ vertical: "top", horizontal: "center" })}
            >
              שלח
            </Button>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Form;
