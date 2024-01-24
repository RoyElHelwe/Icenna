import { Box } from "@mui/material";
import Customizer from "../components/customizer";
import { LayoutContainer } from "./components/layout-container";
import { LayoutRoot } from "./components/layout-root";
import { TopNav } from "./components/top-nav";
import { LandingFooter } from "./components/LandingFooter";

export const Layout = (props) => {
  const { children } = props;

  return (
    <>
      <TopNav />
      <Customizer />
      <LayoutRoot>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutRoot>
      <Box sx={{ bgcolor: '#0F4B64' }}>
        <LandingFooter />
      </Box>
    </>
  );
};
