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
            ?????????? ???????????? , ?????? ???????? ???? ???? ?????????? ?????????? ??????????????
          </MuiAlert>
        ) : (
          <MuiAlert
            variant="filled"
            severity="success"
            sx={{ width: "100%", position: "relative", top: "200px" }}
          >
            ???????????? ???????? ????????????! ?????? ???????????????? ?????????? ???????? ?????????? ????????!
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
        : ???????? ???????????? ??????????
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
                    message: "?????? ???? ????????",
                  },

                  minLength: {
                    value: 2,
                    message: "???????? ?????????? 2 ??????????",
                  },
                }}
                name="firstName"
                render={({
                  field: { firstName, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="outlined-name"
                    label="???? ????????"
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
                    message: "?????? ???? ??????????",
                  },

                  minLength: {
                    value: 2,
                    message: "???????? ?????????? 2 ??????????",
                  },
                }}
                name="lastName"
                render={({
                  field: { lastName, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="outlined-lastname"
                    label="???? ??????????"
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
                    message: "?????? ?????????? ????????",
                  },

                  minLength: {
                    value: 5,
                    message: "???????? ?????????? 5 ??????????",
                  },
                }}
                name="idNumber"
                render={({
                  field: { idNumber, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="outlined-email"
                    label="?????????? ????????"
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
                  required: "?????? ?????????? ????????",
                  pattern: { value: EMAIL_PATTERN, message: "???????? ???? ????????" },
                }}
                name="email"
                render={({
                  field: { email, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="outlined-email"
                    label="?????????? ????????????"
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
                    message: "?????? ??????????",
                  },
                }}
                name="country"
                render={({
                  field: { country, onChange },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <Box sx={{ width: "100%" }}>
                      <InputLabel id="select-label-country">??????????</InputLabel>

                      <Select
                        labelId="select-label-country"
                        id="select-country"
                        value={country}
                        label="??????????"
                        onChange={onChange}
                        sx={{ width: "105px" }}
                        error={error}
                      >
                        {[
                          "??????????",
                          "??????????????",
                          "??????????",
                          "??????????????",
                          "????????????",
                          "??????????????????",
                          "??????????????",
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
                    message: "?????? ??????",
                  },
                }}
                name="gender"
                render={({
                  field: { gender, onChange },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <Box sx={{ width: "100%" }}>
                      <InputLabel id="select-label-gender">??????</InputLabel>

                      <Select
                        labelId="select-label"
                        id="select-gender"
                        value={gender}
                        label="??????"
                        onChange={onChange}
                        sx={{ width: "110px" }}
                        error={error}
                      >
                        <MenuItem value={"??????"}>??????</MenuItem>
                        <MenuItem value={"????????"}>????????</MenuItem>
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
                    message: "?????? ????????",
                  },
                }}
                name="nation"
                render={({
                  field: { nation, onChange },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <Box sx={{ width: "100%" }}>
                      <InputLabel id="select-label-nation">????????</InputLabel>

                      <Select
                        labelId="select-label-nation"
                        id="select-nation"
                        value={nation}
                        label="????????"
                        onChange={onChange}
                        sx={{ width: "105px" }}
                        error={error}
                      >
                        <MenuItem value={"??????????"}>??????????</MenuItem>
                        <MenuItem value={"????????"}>????????</MenuItem>
                        <MenuItem value={"??????????"}>??????????</MenuItem>
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
                    message: "?????? ???????? ????????????",
                  },

                  minLength: {
                    value: 10,
                    message: "????????  10 ??????????",
                  },
                  maxLength: {
                    value: 10,
                    message: "????????  10 ??????????",
                  },
                }}
                name="mobileNumber"
                render={({
                  field: { mobileNumber, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="outlined-mobileNumber"
                    label="???????? ????????????"
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
                    message: "?????? ???????? ????????????",
                  },

                  minLength: {
                    value: 9,
                    message: "????????  9 ??????????",
                  },
                  maxLength: {
                    value: 9,
                    message: "????????  9 ??????????",
                  },
                }}
                name="homeTelNumber"
                render={({
                  field: { homeTelNumber, onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="outlined-homeTelNumber"
                    label="?????????? ????????"
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
                    message: "?????? ?????????? ????????",
                  },
                }}
                name="bornDate"
                render={({
                  field: { onChange, value = null },
                  fieldState: { error },
                }) => (
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                      label="?????????? ????????"
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
                    message: "?????? ?????????? ??????????",
                  },
                }}
                name="aliyahDate"
                render={({
                  field: { onChange, value = null },
                  fieldState: { error },
                }) => (
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                      label="?????????? ??????????"
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
              ??????
            </Button>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Form;
