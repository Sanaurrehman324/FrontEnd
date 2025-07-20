import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { Component } from "react";
import architecture from '../assets/images/architecture.png.jpeg';
import ban_img from '../assets/images/ban_img.jpeg';
import { AuthContext } from "../context/auth";
import { withRouter } from "../utils/withRouter";

class Customer extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      isRegister: true,
      serverError: "", // <-- Added to show backend errors
      inputs: {
        username: "",
        email: "",
        password: "",
        contact: "",
      },
      errors: {
        email: "",
        password: "",
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      inputs: {
        ...prevState.inputs,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: "",
      },
      serverError: "", // Clear server error on input change
    }));
  };

  validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  Register = async (e) => {
    e.preventDefault();
    const { username, email, password, contact } = this.state.inputs;

    if (!this.validatePassword(password)) {
      this.setState({
        errors: {
          ...this.state.errors,
          password:
            "Password must contain at least 8 characters, one uppercase letter, one number, and one special character.",
        },
        serverError: "",
      });
      return;
    }

    try {
      const { data } = await axios.post("https://backend-production-8ea6.up.railway.app/api/auth/register", {
        username,
        email,
        password,
        contact,
      });

      if (data.success) {
        alert("User registered successfully");
        setTimeout(() => {
          this.setState({ isRegister: false });
        }, 2000);
      } else {
        this.setState({ serverError: data.message || "Registration failed" });
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "An error occurred during registration. Please try again.";
      this.setState({ serverError: errorMsg });
    }
  };

  Login = async (e) => {
    e.preventDefault();
    const { email, password } = this.state.inputs;

    try {
      const { data } = await axios.post("https://backend-production-8ea6.up.railway.app/api/auth/login", {
        email,
        password,
      });

      if (data.success) {
        alert("User logged in successfully");

        const [auth, setAuth] = this.context;
        setAuth({ user: data.user, token: data.token });
        localStorage.setItem(
          "auth",
          JSON.stringify({ user: data.user, token: data.token })
        );

        const userRole = data.user.role;
        if (userRole === 1) {
          this.props.navigate("/dashboard/admin"); // Admin
        } else {
          this.props.navigate("/"); // User
        }
      } else {
        this.setState({ serverError: data.message || "Login failed" });
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "An error occurred during login. Please try again.";
      this.setState({ serverError: errorMsg });
    }
  };

  toggleMode = () => {
    this.setState({
      isRegister: !this.state.isRegister,
      inputs: {
        username: "",
        email: "",
        password: "",
        contact: "",
      },
      errors: {
        email: "",
        password: "",
      },
      serverError: "",
    });
  };

  render() {
    const { isRegister, inputs, errors, serverError } = this.state;

    return (
      <form onSubmit={isRegister ? this.Register : this.Login}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "20px",
          }}
        >
          {/* Hero Banner */}
          <Box
            className="login-container"
            sx={{
              width: 1500,
              height: 170,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "54px",
              padding: "81px 65px",
              borderRadius: "24px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              color: "white",
              marginBottom: "40px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${ban_img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.2,
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, #3A4750 13.5%, rgba(58, 71, 80, 0.5) 82.6%, rgba(58, 71, 80, 0.25) 100%)",
                zIndex: 2,
              }}
            />
            <Box sx={{ position: "relative", zIndex: 3, textAlign: "center" }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {isRegister ? "Register" : "Login"}
              </Typography>
            </Box>
          </Box>

          {/* Grid */}
          <Grid
            container
            sx={{
              marginBottom: 10,
              marginLeft: 10,
              marginRight: 10,
              padding: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              borderRadius: "16px",
            }}
          >
            {/* Image */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                backgroundImage: `url(${architecture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "80vh",
                borderRadius: "30px",
              }}
            ></Grid>

            {/* Form */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px",
                minHeight: "100vh",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", maxWidth: 500 }}
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {isRegister ? "Welcome!" : "Welcome Back!"}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  {isRegister
                    ? "Please Enter Your Details"
                    : "Please Enter Your Credentials"}
                </Typography>

                {/* Error Message */}
                {serverError && (
                  <Typography
                    variant="body2"
                    sx={{ color: "red", mb: 2, textAlign: "center" }}
                  >
                    {serverError}
                  </Typography>
                )}

                <Box sx={{ mt: 2 }}>
                  {isRegister && (
                    <>
                      <Typography variant="subtitle1" color="Black" gutterBottom>
                        Username*
                      </Typography>
                      <TextField
                        name="username"
                        value={inputs.username}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="text"
                        required
                      />
                      <Typography variant="subtitle1" color="Black" gutterBottom>
                        Contact*
                      </Typography>
                      <TextField
                        name="contact"
                        value={inputs.contact}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="text"
                        required
                      />
                    </>
                  )}

                  <Typography variant="subtitle1" color="Black" gutterBottom>
                    Email*
                  </Typography>
                  <TextField
                    name="email"
                    value={inputs.email}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                  />

                  <Typography variant="subtitle1" color="Black" gutterBottom>
                    Password*
                  </Typography>
                  <TextField
                    name="password"
                    value={inputs.password}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    required
                    error={!!errors.password}
                    helperText={errors.password}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 2,
                      padding: "12px 120px",
                      backgroundColor: "#3A4750",
                      color: "white",
                      borderRadius: "20px",
                      "&:hover": {
                        backgroundColor: "#666",
                      },
                    }}
                  >
                    {isRegister ? "Register" : "Login"}
                  </Button>

                  <Typography variant="body2" color="textSecondary" textAlign="center">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                    <Button
                      onClick={this.toggleMode}
                      variant="text"
                      sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        padding: 0,
                        minWidth: 0,
                        color: "primary.main",
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: "primary.dark",
                        },
                      }}
                    >
                      {isRegister ? "Login" : "Register"}
                    </Button>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    );
  }
}

export default withRouter(Customer);
