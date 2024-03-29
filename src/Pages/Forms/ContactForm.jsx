import React from "react";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

import "./Forms.css";
import FormikContainer from "Component/Form/FormikContainer";
import { CONTACT_FORM_DATA } from "utils/Form/formFields/formFields";
import { CONTACT_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import { CONTACT_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { contactAdmin} from "Services/api/userAPI";
import FormControl from "Component/Form/FormControl";

export default function ContactForm(props) {
  return (
    <Box>
      <ToastContainer />
      <FormikContainer
        initialValues={CONTACT_INITIAL_VALUES}
        formData={CONTACT_FORM_DATA}
        validationSchema={CONTACT_VALIDATION_SCHEMA}
        buttonName={"Contact Us"}
        endPoint={"/mail/admin"}
        apiCall={contactAdmin}
        
      >
        {CONTACT_FORM_DATA.map((el, index) => (
          <FormControl
            key={index}
            control={el.control}
            name={el.name}
            id={el.name}
            label={el.label}
            type={el.type}
          />
        ))}
      </FormikContainer>
    </Box>
  );
}
