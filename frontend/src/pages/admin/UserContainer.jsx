import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import MaleFemalePieChart from "./Gender";
import AgeDistribution from "./AgeDistribution";
import { API } from "../../../service/api";

const UserContainer = ({ users, setUsers, setEditedUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [key, setKey] = useState(0); // Initialize key state

  useEffect(() => {
    if (!selectedUser) {
      setEditedUser(null);
    }
  }, [selectedUser]);

  const handleUserClick = (user) => {
    setSelectedUser((prevUserId) =>
      prevUserId === user._id ? null : user._id
    );
    setEditedUser(user);
  };

  const deleteUser = async (userId) => {
    try {
      console.log("Deleting user with ID:", userId);
      const response = await API.deleteUsersDetails(userId);
      console.log("Delete user response:", response);
      if (response.data.isSuccess) {
        // User deletion was successful
        // Trigger rerender by updating key prop
        setKey((prevKey) => prevKey + 1);
        setEditedUser(null);
      } else {
        // User deletion failed
        throw new Error(response.data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div style={{ display: "flex", padding: "20px", textAlign: "center" }}>
      <div style={{ padding: "50px", textAlign: "center" }}>
        <TableContainer component={Paper}>
          <Table aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Nationality</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(users) ? (
                users.map((user) => (
                  <TableRow
                    key={user._id}
                    className={`user ${
                      selectedUser === user._id ? "selected" : ""
                    }`}
                    onClick={() => handleUserClick(user)}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.city}</TableCell>
                    <TableCell>{user.nationality}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => deleteUser(user._id)} 
                        sx={{
                          backgroundColor: "#76ABAE",
                          "&:hover": { backgroundColor: "#222831" },
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>No users found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ padding: "50px", margin: "20px", textAlign: "center" }}>
        <MaleFemalePieChart users={users} /> 
        <AgeDistribution users={users} />
      </div>
    </div>
  );
};

export default UserContainer;