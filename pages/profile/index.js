import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useReducer, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Leftbar from "../../components/Layout/Leftbar";
import { getError } from "../../utils/error/error";
import { Store } from "../../utils/store/Store";
import {
  Grid,
  TextField,
  Typography,
  Link,
  Button,
  Card,
  List,
  ListItem,
  CircularProgress,
  Modal,
  Backdrop,
  Fade,
  Box,
} from "@material-ui/core";

import {
  Save,
  Cancel,
  CancelPresentation,
  CameraAlt,
} from "@material-ui/icons";



import useStyles from "../../utils/styles/styles";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";

import { useForm, Controller } from "react-hook-form";
import EditFiled from "../../components/Layout/EditFiled";
import Preloader from "../../components/Layout/Preloader";

function Profile() {
  const { state, dispatch } = useContext(Store);
  const [closeEditForm, setCloseEditForm] = useState(false);
  const [openItem, setOpenItem] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [imageFiled, setImageFiled] = useState(null);
  const [imageFiledName, setImageFiledName] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(null);
  const [openSaveImageModal, setOpenSaveImageModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCloseSaveImage = () => setOpenSaveImageModal(false);

  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const handleClose = () => setOpenPasswordModal(false);

  const router = useRouter();

  const { userInfo } = state;

  // const [{  loadingUpload }, dispatch] = useReducer(reducer, {
  //     loading: true,

  // });

  const classN = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    // getFieldState
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const restValues = () => {
    setValue("name", userInfo.name);
    setValue("email", userInfo.email);
    setValue("phone", userInfo.phone);
    setCurrentPassword("");
    setValue("currentpassword", "");
    setValue("password", "");
    setValue("confirmPassword", "");
  };

  const closeAllItemsAndOpenTitle = (title) => {
    setOpenItem(title);
  };

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }

    setValue("name", userInfo.name);
    setValue("email", userInfo.email);
    setValue("phone", userInfo.phone);

    // console.log(getValues('email'))
  }, []);

  const later = async () => {};
  const updateImageFun = async (e) => {
    // if null imageFiled = image
    setImageFiledName("");

    const file = e.target.files[0];
    if (file) {
      setImageFiled(file);
    }

    const bodyFomData = new FormData();
    bodyFomData.append("file", file);

    try {
      setLoadingUpload(true);
      const { data } = await axios.post("/api/users/upload", bodyFomData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });

      setImageFiledName(data.secure_url);
      console.log("data.secure_url", data.secure_url);
      // enqueueSnackbar("Image Profile upload successfully. Please Press Save Icone to complete the process ", { variant: "success" });
      setOpenSaveImageModal(true);
      setLoadingUpload(false);
      // setImageFiled(null)
    } catch (err) {
      setLoadingUpload(false);
      setImageFiled(null);
      handleCloseSaveImage();
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const saveProfileImage = async () => {
    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          email: userInfo.email,
          profileImage: imageFiledName,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log("data", data);
      dispatch({ type: "USER_LOGIN", payload: data });
      // Cookies.set('userInfo', data);
      Cookies.set("userInfo", JSON.stringify(data));

      enqueueSnackbar("Image Profile Updated successfully", {
        variant: "success",
      });
      setCloseEditForm(!closeEditForm);
      closeAllItemsAndOpenTitle("");
      setLoadingUpload(false);
      setImageFiled(null);
      handleCloseSaveImage();
    } catch (err) {
      //alert(err.response.data ? err.response.data.message : err.message);
      setLoadingUpload(false);
      handleCloseSaveImage();
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const loginFun = async ({
    name,
    email,
    phone,
    password,
    confirmPassword,
  }) => {
    //e.preventDefault();

    closeSnackbar();

    if (!openPasswordModal) {
      setOpenPasswordModal(true);
      return;
    }

    if (!currentPassword) {
      enqueueSnackbar("please instert Password", { variant: "error" });
      return;
    }

    if (currentPassword) {
      try {
        const { data } = await axios.post("/api/users/passwoardCondittion", {
          email: userInfo.email,
          password: currentPassword,
        });

        if (data) {
          setOpenPasswordModal(false);
        }
      } catch (err) {
        enqueueSnackbar(`password is incorrect`, { variant: "error" });
        return;
      }
    }
    if (password !== confirmPassword) {
      //alert('passwords dont match')
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }

    if (password !== confirmPassword) {
      //alert('passwords dont match')
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }

    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
          phone,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "USER_LOGIN", payload: data });
      // Cookies.set('userInfo', data);
      Cookies.set("userInfo", JSON.stringify(data));

      enqueueSnackbar("Profile Updated successfully", { variant: "success" });
      setCloseEditForm(!closeEditForm);
      closeAllItemsAndOpenTitle("");
    } catch (err) {
      //alert(err.response.data ? err.response.data.message : err.message);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  return (
    <Layout title="Profile Details" withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          {userInfo && <Leftbar filedSelect="profile" userDashboard />}
        </Grid>

        <Grid className={classN.adminMainGrid}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openPasswordModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            style={{}}
          >
            <Fade in={openPasswordModal}>
              <Box className={classN.modalBox}>
                <Typography className={classN.modelTitle}>
                  Please enter your password to continue
                </Typography>

                <TextField
                  style={{ margin: "12px 0" }}
                  variant="outlined"
                  fullWidth
                  // id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                ></TextField>

                {/* <div>
                            {currentPassword}
                          </div> */}

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    className={classN.firstEditBtn}
                    variant="contained"
                    color="primary"
                    // startIcon={<Save />}
                    onClick={handleSubmit(loginFun)}
                  >
                    Save
                  </Button>

                  <Button
                    className={classN.lastEditBtn}
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </div>
              </Box>
            </Fade>
          </Modal>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openSaveImageModal}
            onClose={handleCloseSaveImage}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            style={{}}
          >
            <Fade in={openSaveImageModal}>
              <Box className={classN.modalBox}>
                <Typography className={classN.modelTitle}>
                  Please Press save to ontinue
                </Typography>

                <div className={classN.modalActions}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => {
                      setImageFiled(null);
                      handleCloseSaveImage();
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    style={{ marginLeft: "8px" }}
                    color="primary"
                    onClick={saveProfileImage}
                    endIcon={<Save />}
                  >
                    Save
                  </Button>
                </div>

                <div className={classN.modalActionsSm}>
                  <Cancel
                    // variant="contained"
                    color="error"
                    onClick={(e) => {
                      setImageFiled(null);
                      handleCloseSaveImage();
                    }}
                  />
                   

                  <Save
                    // variant="contained"
                    style={{ marginLeft: "8px" }}
                    color="primary"
                    onClick={saveProfileImage}
                    // endIcon={<Save />}
                  />
                   
                </div>
              </Box>
            </Fade>
          </Modal>

          {loadingUpload && (
                   <div className={classN.loadingContainerAllPage}>
                   <Preloader />
                   {/* <CircularProgress /> */}
                 </div>
          )}

          <div className={classN.coverProfile}>
            {userInfo && userInfo.profileImage && (
              <div className={classN.profileImageFlotingContainer}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    className={classN.profileImageFloting}
                    src={userInfo.profileImage}
                  />
                </div>
                <div className={classN.coverProfileUpdateBtn}>
                  <label
                    style={{
                      background: "transparent",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CameraAlt color="primary" className={classN.camerabtnRe} />
                    <input
                      type="file"
                      onClick={(e) => {
                        e.target.value = null;
                      }}
                      onChange={updateImageFun}
                      hidden
                      accept=".png, .jpg, .jpeg"
                    />
                  </label>
                </div>
              </div>
            )}

            {userInfo && !userInfo.profileImage && (
              <div className={classN.profileImageFlotingContainer}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "50%",
                  }}
                >
                 
                <Typography className={classN.profileImageFloting}>
                  {
                    // userInfo.name.substring(0,2)
                    userInfo.name
                      .split(/\s/)
                      .reduce(
                        (response, word) => (response += word.slice(0, 1)),
                        ""
                      )
                  }
                </Typography>
                </div>
                <div className={classN.coverProfileUpdateBtn}>
                  <label
                    style={{
                      background: "transparent",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CameraAlt color="primary" className={classN.camerabtnRe} />
                    <input
                      type="file"
                      onClick={(e) => {
                        e.target.value = null;
                      }}
                      onChange={updateImageFun}
                      hidden
                      accept=".png, .jpg, .jpeg"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className={classN.section}>
            <List className={classN.list0}>
              <ListItem className={classN.list0}>
                <Typography className={classN.profileAccountTitle}>
                  General Account Settings
                </Typography>
              </ListItem>

              <div className={classN.profileAccountDetails}>
                <form className={classN.profileDetailsContainer} onSubmit={handleSubmit(loginFun)}>
                  <EditFiled
                    title="name"
                    description={userInfo && userInfo.name}
                    action="edit"
                    restValues={restValues}
                    closeEditForm={closeEditForm}
                    closeAllItemsAndOpenTitle={closeAllItemsAndOpenTitle}
                    openItem={openItem}
                    editComponent={
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          minLength: 3,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="name"
                            // label="Name"
                            inputProps={{ type: "name" }}
                            error={Boolean(errors.name)}
                            helperText={
                              errors.name
                                ? errors.name.type === "minLength"
                                  ? "Name is longer than 3 characters"
                                  : "Name is required"
                                : ""
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    }
                  />

                  <EditFiled
                    title="phone"
                    description={userInfo && userInfo.phone}
                    action="edit"
                    restValues={restValues}
                    closeEditForm={closeEditForm}
                    closeAllItemsAndOpenTitle={closeAllItemsAndOpenTitle}
                    openItem={openItem}
                    editComponent={
                      <Controller
                        name="phone"
                        control={control}
                        rules={{
                          required: true,
                          pattern: /^(00213|\+213|0)(5|6|7)[0-9]{8}$/, // pattern:"[0-9]{3}-[0-9]{3}-[0-9]{4}" // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="phone"
                            // label="Phone Number"
                            placeholder="07 77 77 77 77"
                            inputProps={{ type: "number" }}
                            className={classN.textFiledNumberArrowNone}
                            error={Boolean(errors.phone)}
                            helperText={
                              errors.phone
                                ? errors.phone.type === "pattern"
                                  ? "Phone Number  is not valid"
                                  : "Phone Number  is required"
                                : ""
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    }
                  />

                  <EditFiled
                    readOnly
                    title="email"
                    description={userInfo && userInfo.email}
                    action="edit"
                    restValues={restValues}
                    closeEditForm={closeEditForm}
                    width = '100%'
                  />

                  <EditFiled
                    title="password"
                    description="Change password"
                    action="edit"
                    restValues={restValues}
                    closeEditForm={closeEditForm}
                    closeAllItemsAndOpenTitle={closeAllItemsAndOpenTitle}
                    openItem={openItem}
                    width = '100%'
                    editComponent={
                      <>
                        <Controller
                          name="password"
                          className={classN.textFiledProfile}
                          control={control}
                          defaultValue=""
                          rules={{
                            // required: true,
                            // minLength: 6,
                            validate: (value) =>
                              value === "" ||
                              value.length > 5 ||
                              "Password lenght is more than 5 characters",
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="password"
                              label="New"
                              inputProps={{ type: "password" }}
                              error={Boolean(errors.password)}
                              helperText={
                                errors.password
                                  ? "Password length is more than 5"
                                  : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>

                        <div style={{ height: "7px" }} />
                        <Controller
                          name="confirmPassword"
                          className={classN.textFiledProfile}
                          control={control}
                          defaultValue=""
                          rules={{
                            // required: true,
                            // minLength: 6,
                            validate: (value) =>
                              value === "" ||
                              value.length > 5 ||
                              "confirm Password length is more than 5",
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="confirmPassword"
                              label="Re-type"
                              inputProps={{ type: "password" }}
                              error={Boolean(errors.confirmPassword)}
                              helperText={
                                errors.password
                                  ? "confirm Password length is more than 5"
                                  : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </>
                    }
                  />
                </form>

                {/* <form>
                  <ListItem className={classN.profileAccountDetailsItem}>
                    <div className={classN.titleDetails}>
                      <Typography className={classN.titleDetailsfirst}>
                        profile Image
                      </Typography>

                      <Button
                        variant="contained"
                        component="label"
                        style={{ padding: "0 7px", fontSize: "0.7rem" }}
                      >
                        {imageFiled
                          ? `${imageFiled.name.slice(0, 12)} ${
                              imageFiled.name.length > 12 ? ".." : ""
                            }`
                          : "UPLOAD IMAGE"}
                        <input
                          type="file"
                          onClick={(e) => {
                            e.target.value = null;
                          }}
                          onChange={updateImageFun}
                          hidden
                          accept=".png, .jpg, .jpeg"
                        />
                      </Button>
                    </div>
                    {imageFiled ? (
                      loadingUpload ? (
                        <CircularProgress size={25} color="primary" />
                      ) : (
                        <div>
                          <div className={classN.editPrfileBtnLg}>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={(e) => setImageFiled(null)}
                            >
                              Cancel
                            </Button>

                            <Button
                              variant="contained"
                              style={{ marginLeft: "8px" }}
                              color="primary"
                              onClick={saveProfileImage}
                              endIcon={<Save />}
                            >
                              Save
                            </Button>
                          </div>

                          <div className={classN.editPrfileBtnSm}>
                            <Cancel
                              color="error"
                              onClick={(e) => setImageFiled(null)}
                            />

                            <Save
                              style={{ marginLeft: "8px" }}
                              color="primary"
                              onClick={saveProfileImage}
                            />
                          </div>
                        </div>
                      )
                    ) : null}
                  </ListItem>
                </form> */}
              </div>

            
            </List>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
}

// for rende OrderHistory only in front end
export default dynamic(() => Promise.resolve(Profile), { ssr: false });
