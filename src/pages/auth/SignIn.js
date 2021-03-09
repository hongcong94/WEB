import React from "react";
import { Link } from "react-router-dom";
import { Formik, FastField, Form } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from "yup";
import LoginApi from "../../api/LoginApi";
import UserApi from "../../api/UserApi";
import { useState } from "react";
import { Button, Card, CardBody, FormGroup, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import avatar from "../../assets/img/avatars/avatar.jpg";
import storage from "../../Storage/Storage";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { setUserLoginInfo, setTokenInfo } from "../../redux/actions/UserLoginInfoAction";
import { selectRememberMe } from "../../redux/selectors/UserLoginInfoSelector";

const showErrorNotification = (title, message) => {
  const options = {
    timeOut: 3000,
    showCloseButton: false,
    progressBar: false,
    position: "top-right",
  };
  toastr.error(title, message, options);
};

const SignIn = (props) => {
  const [isOpenModal, setOpenModal] = useState(false);

  const [email, setEmail] = useState("");
  const [isDisabledResendEmailButton, setDisabledResendEmailButton] = useState(storage.isRememberMe());

  const resendEmailToActiveAccount = async () => {
    setDisabledResendEmailButton(true);
    // call api
    await UserApi.resendEmailToActiveAccount(email);
    setDisabledResendEmailButton(false);
  };
  // RememberMe
  const [checkedRememberMe, setCheckedRememberMe] = React.useState(storage.isRememberMe());

  return (
    <>
      <div className="text-center mt-4">
        <h2>Welcome back,Duc Manh</h2>
        <p className="lead">Sign in to your account to continue</p>
      </div>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Required").max(50, "Must be between 6 to 50 characters").min(6, "Must be between 6 to 50 characters"),

          password: Yup.string().max(50, "Must be between 6 to 50 characters").min(6, "Must be between 6 to 50 characters").required("Required"),
        })}
        onSubmit={async (values, { setFieldError }) => {
          try {
            //call api
            const result = await LoginApi.login(values.username, values.password);

            if (result.token === null || result.token === undefined) {
              setEmail(result.email);
              setOpenModal(true);
            } else {
              // set RememberMe
              storage.setRememberMe(checkedRememberMe);

              // save token & UserInfo to storage
              storage.setToken(result.token);
              storage.setUserInfo(result.userName, result.email, result.firstName, result.lastName, result.role, result.status);

              //  save token to redux
              props.setTokenInfo(result.token);
              props.setUserLoginInfo(result.userName, result.email, result.firstName, result.lastName, result.role, result.status);
              //go to home
              props.history.push("/dashboard/default");
            }
          } catch (error) {
            if (error.status === 401) {
              showErrorNotification("Login Fail!");
            } else {
              props.history.push("/auth/500");
            }
          }
        }}
        // validateOnChange={false}
        // validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Card>
            <CardBody>
              <div className="m-sm-4">
                <div className="text-center">
                  <img src={avatar} alt="Chris Wood" className="img-fluid rounded-circle" width="132" height="132" />
                </div>
                <Form>
                  <FormGroup>
                    <FastField label="Username" bsSize="lg" type="text" name="username" placeholder="Enter your username" component={ReactstrapInput} />
                  </FormGroup>

                  <FormGroup>
                    <FastField label="Password" bsSize="lg" type="password" name="password" placeholder="Enter password" component={ReactstrapInput} />
                    <small>
                      <Link to="/auth/reset-password">Forgot password?</Link>
                    </small>
                  </FormGroup>
                  <div>
                    <CustomInput type="checkbox" id="rememberMe" label="Remember me next time" defaultChecked={checkedRememberMe} onChange={() => setCheckedRememberMe(!checkedRememberMe)} />
                  </div>
                  <div className="text-center mt-3">
                    <Button type="submit" color="primary" size="lg" disabled={isSubmitting}>
                      Sign in
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        )}
      </Formik>
      <Modal isOpen={isOpenModal}>
        {/* header */}
        <ModalHeader>You need to active your account.</ModalHeader>

        {/* body */}
        <ModalBody className="m-3">
          <p className="mb-0">Your account is not active </p>
          <p className="mb-0">
            Please check your email (<b>{email}</b>) to active account.
          </p>
        </ModalBody>

        {/* footer */}
        <ModalFooter>
          {/* resend */}
          <Button color="primary" onClick={resendEmailToActiveAccount} style={{ marginLeft: 10 }} disabled={isDisabledResendEmailButton}>
            Resend
          </Button>

          {/* login */}
          <Button color="primary" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
const mapGlobalStateToProps = (state) => {
  return {
    isRememberMe: selectRememberMe(state),
  };
};

export default connect(mapGlobalStateToProps, { setUserLoginInfo, setTokenInfo })(SignIn);
