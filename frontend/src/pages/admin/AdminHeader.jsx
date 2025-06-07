import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Component = styled(AppBar)`
  background: #222831;
  color: #000;
`;
const CenterContent = styled("div")`
  display: flex;
  align-items: center;
  margin-left: 43%;
`;
const Container = styled(Toolbar)`
display: flex;
justify-content: space-between;
align-items: center;
`;

const Image = styled("img")({
    width: 100,
    height: 100,
  });

const AdminHeader = () => {
  return (
    <Component>
      <Container>
      <CenterContent>

        <Image
          src="/src/images/SafeHaven__3_-removebg-preview.png"
          alt="D:\Github\final-project-team-refugee\frontend\src\images\SafeHaven__2_-removebg-preview.png"
        />
      <Link
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "400",
            }}
            to="/login"
          >
            Logout
          </Link>
          </CenterContent>
          </Container>

    </Component>
  );
};

export default AdminHeader;
