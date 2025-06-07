import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  styled,
  Typography,
  MenuItem,
} from "@mui/material";
import { useContext } from "react";
import { API } from "../../service/api";
import { DataContext } from "../context/DataProvider";
import { useNavigate } from "react-router-dom";
import SelectNationality from "./account/Nationality";
import SelectCity from "../../src/components/account/city";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { message } from "antd";
import { useTranslation } from "react-i18next";

const Component = styled(Box)`
  width: 400px;
  height: auto;
  margin: auto;
  box-shadow: 3px 3px 3px 3px #ffffff;
  border-radius: 11px;
  background-color: #eeeeee;
`;

const Image = styled("img")({
  width: 297,
  height: 315,
  margin: "auto",
  display: "flex",
  marginBottom: "-72px",
});

const Wrapper = styled(Box)`
  padding-left: 23px;
  padding-right: 23px;
  padding-bottom: 35px;
  margin-top: 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background-color: #31363f;
  margin-right: "20px";
  font-size: inherit;
  margin-right: 10px;
  font-weight: 600;
  &:hover {
    background-color: #222831;
  }
  border-radius: 6px;
  height: 48px;
`;

const GenderDropdown = styled(TextField)``;

const SignupButton = styled(Button)`
  text-transform: none;
  background-color: white;
  border-radius: 6px;
  height: 48px;
  color: black;
  font-size: 15px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
  age: null,
  gender: "", // Initialize gender as empty string
  city: "",
  nationality: "",
};

const Login = ({ isUserAuthenticated }) => {
  const [account, toggleAccount] = useState("login");
  const [error, setError] = useState("");
  const [login, setLogin] = useState({ username: "", password: "" });
  const [signup, setSignup] = useState(signupInitialValues);
  const [nationality, setNationality] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [t, i18n] = useTranslation("global");

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignup = () => {
    // Reset the signup form data when toggling between login and signup
    setSignup(signupInitialValues);
    // Toggle the account state
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setSignup((prevSignup) => ({
      ...prevSignup,
      [name]: value,
    }));
  };

  const signupUser = async () => {
    try {
      // Check if any required fields are missing
      if (
        !signup.name ||
        !signup.username ||
        !signup.password ||
        !city ||
        !nationality ||
        !gender
      ) {
        throw "Please fill in all required fields.";
      }

      const signupData = { ...signup, city, nationality, gender };
      let response = await API.userSignup(signupData);
      if (response.isSuccess) {
        setError("");
        setSignup(signupInitialValues);
        toggleAccount("login");
        message.success("Signup Successfully");
      } else {
        message.error("Signup Unsuccessfully");
      }
    } catch (error) {
      console.error("Error in signupUser:", error);
      message.error(error);
    }
  };

  const loginUser = async () => {
    try {
      let response = await API.userLogin(login);
      if (response.isSuccess) {
        setError("");
        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );
        setAccount({
          username: response.data.username,
          name: response.data.name,
        });

        if (response.data.username === "admin") {
          // Navigate to admin dashboard if username and password are 'admin'
          navigate("/admin");
          isUserAuthenticated(true);
          message.success("Login Successfully", 1);
        } else {
          navigate("/");
          isUserAuthenticated(true);
          message.success("Login Successfully", 1);
        }
      } else {
        if (response.error === "Username does not exist") {
          setError("Username is incorrect");
          message.error("Username is incorrect", 1);
        } else if (response.error === "Incorrect password") {
          setError("Password is incorrect");
          message.error("Password is incorrect", 1);
        } else {
          message.error("Login Unsuccessfully", 1);
        }
      }
    } catch (error) {
      console.error("Error in loginUser:", error);
      message.error("Login Unsuccessfully", 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#222831",
      }}
    >
      <Component>
        <Box>
          <Link
            to="/home?reload=true"
            style={{
              paddingLeft: "15px",
              marginBottom: "-48px",
              display: "flex",
              paddingTop: "3%",
              cursor: "pointer",
              color: "black",
              textDecoration: "none",
            }}
          >
            <ArrowBackIcon /> {t("login.backtohome")}
          </Link>
          <Image
            src="/src/images/SafeHaven__2_-removebg-preview.png"
            alt="Safe Haven Image"
          />
          {account === "login" ? (
            <Wrapper>
              <TextField
                variant="outlined"
                value={login.username}
                onChange={(e) =>
                  setLogin({ ...login, username: e.target.value })
                }
                name="username"
                label="Enter Username"
                InputLabelProps={{ style: { color: "#31363F" } }}
              />
              <TextField
                variant="outlined"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                name="password"
                label="Enter Password"
                type="password" 
                InputLabelProps={{ style: { color: "#31363F" } }}
              />
              {error && <Error>{error}</Error>}{" "}
              {/* Render error message if error state is not empty */}
              <LoginButton variant="contained" onClick={loginUser}>
                {t("login.login")}
              </LoginButton>
              <Typography
                style={{ color: "black", fontSize: "16px", marginLeft: "46%" }}
              >
                {t("login.or")}
              </Typography>
              <SignupButton onClick={toggleSignup} style={{ marginBottom: 50 }}>
                {t("login.create")}
              </SignupButton>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                required
                variant="outlined"
                onChange={onInputChange}
                id="outlined-basic"
                name="name"
                label="Enter Name"
                value={signup.name} // Set value to the current value if available
                InputLabelProps={{
                  style: { color: "#31363F" },
                  shrink: Boolean(signup.name), // Shrink label if there's a value
                }}
                size="small" // Set the size to small
              />
              <TextField
                required
                variant="outlined"
                onChange={onInputChange}
                name="username"
                label="Enter Username"
                value={signup.username} // Set value to the current value if available
                InputLabelProps={{
                  style: { color: "#31363F" },
                  shrink: Boolean(signup.username), // Shrink label if there's a value
                }}
                size="small" // Set the size to small
              />
              <TextField
                required
                variant="outlined"
                onChange={onInputChange}
                name="password"
                label="Enter Password"
                type="password"
                InputLabelProps={{ style: { color: "#31363F" } }}
                size="small" // Set the size to small
              />
              <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" marginBottom="20px">
                  <TextField
                    id="standard-number"
                    label="Age"
                    type="number"
                    onChange={onInputChange}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ min: 1 }} // Set the minimum value to 1
                    variant="outlined"
                    style={{ width: "80px", marginRight: "10px" }}
                    name="age"
                    size="small"
                  />
                  <GenderDropdown
                    select
                    label="Gender"
                    value={gender}
                    onChange={handleGenderChange}
                    variant="outlined"
                    InputLabelProps={{
                      style: { color: "#31363F", fontSize: "15px" },
                    }}
                    size="small"
                    style={{ width: "120px" }} // Adjusted width
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </GenderDropdown>
                  <SelectCity onChange={setCity} style={{ flex: 1 }} />{" "}
                  {/* Utilize flex to fill remaining space */}
                </Box>
                <Box display="flex" alignItems="center">
                  <SelectNationality onChange={setNationality} />
                </Box>
              </Box>
              {error && <Error>{error}</Error>}{" "}
              {/* Render error message if error state is not empty */}
              <SignupButton onClick={signupUser}>
                {t("login.signup")}
              </SignupButton>
              <Typography
                style={{ color: "black", fontSize: "15px", marginLeft: "46%" }}
              >
                {t("login.or")}
              </Typography>
              <LoginButton variant="contained" onClick={toggleSignup}>
                {t("login.already")}
              </LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </div>
  );
};

export default Login;
