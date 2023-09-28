import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab as MuiTab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Claims from './Claims';

const Tab = styled(MuiTab)(({ theme }) => ({
  textTransform: "none",
}));

const RCM = ({ tab }) => {
  const [activeTab, setActiveTab] = useState(tab);

  const router = useRouter();
  const { t } = useTranslation();

  const handleChange = (event, value) => {
    setActiveTab(value);
    router.push({
      pathname: `/rcm/${value.toLowerCase()}`
    });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', }}>
      <TabContext value={activeTab}>
        <Box
          variant="elevation"
          position="sticky"
          elevation={2}
          sx={{ bgcolor: 'background.paper', width: `100%`, pt: 1, }}>
          <Box sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            pl: 4,
            pr: 4,
          }}>
            <TabList onChange={handleChange}>
              <Tab label={t("Claims")} value="claims" />
              <Tab label={t("Payment")} value="payment" />
            </TabList>
          </Box>
        </Box >
        <TabPanel value="claims" sx={{ m: 0, p: 0, }}>
          <Claims />
        </TabPanel>
        <TabPanel value="payment">
          Payment
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default RCM;
