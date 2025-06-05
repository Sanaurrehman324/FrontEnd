import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import "./Contact.css"; // Import CSS file

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ur2j2aj", "template_det3grg", form.current, {
        publicKey: "KPdjUKUVaAY_3EAtT",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setIsSent(true);
          setTimeout(() => setIsSent(false), 5000);
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <Box className="contact-container">
      <Typography variant="h4" fontWeight="bold">
        CONTACT
      </Typography>
      <Typography variant="body1">GET IN TOUCH WITH OUR TEAM</Typography>

      {isSent && <Alert severity="success">Message Sent Successfully!</Alert>}

      <form className="form-container" ref={form} onSubmit={sendEmail}>
        <TextField
          className="styled-input"
          label="First Name"
          name="name"
          variant="outlined"
          required
        />
        <TextField
          className="styled-input"
          label="Last Name"
          name="last_name"
          variant="outlined"
          required
        />
        <TextField
          className="styled-input"
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          required
        />
        <TextField
          className="styled-input"
          label="Message"
          name="message"
          multiline
          rows={4}
          variant="outlined"
          required
        />

        <Button type="submit" variant="contained" sx={{ backgroundColor: "#000", color: "white" }}>
          Send
        </Button>
      </form>
    </Box>
  );
};

export default Contact;
