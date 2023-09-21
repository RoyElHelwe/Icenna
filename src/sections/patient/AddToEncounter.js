import { TreeItem, TreeView } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, List, ListItem, ListItemButton, ListSubheader, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { search } from '../../api/practitioner';
import SearchBar from '../../components/searchbar';
import MedicationForm from '../../forms/medication';
import ProcedureForm from '../../forms/procedure';

export const sections = [
  { id: 'medical_code', name: 'Medical Codes', i_type: 1, },
  { id: 'procedure', name: 'Procedures', i_type: 2, },
  { id: 'drugs', name: 'Medications', i_type: 3, },
];

export const AddToEncounter = ({
  id,
  onItemClick,
}) => {
  const [value, setValue] = useState('0');
  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const { error, data, } = useQuery({
    queryKey: ['search', id, (searchText.length >= 3 ? searchText : ''), value],
    queryFn: (ctx) => search(ctx),
    enabled: searchText.length >= 3,
  });
  const searchResult = data?.data?.data ?? {};

  const [expanded, setExpanded] = useState([]);

  const getListItems = (sec) => {
    if (searchText.length >= 3 && !!error) {
      return t("Couldn't get search results!");
    }

    return searchResult[sec.id]?.map((item) => (
      sec.i_type === sections[0].i_type
        ? (
          <ListItem key={`item-${item.id}`}>
            <ListItemButton
              sx={{ py: 0.5, px: 0, mx: 6, }}
              onClick={() => {
                onItemClick?.(sec, item);
              }}
            >
              {item.name}
            </ListItemButton>
          </ListItem>
        )
        : (
          <ListItem key={`item-${item.id}`}>
            <ListItemButton disableRipple sx={{ py: 0, px: 0, mx: 6, }}>
              <TreeItem nodeId={item.id} label={item.name} sx={{
                width: '100%',
                '& .MuiTreeItem-content, & .MuiTreeItem-label': {
                  p: 0, m: 0,
                },
                '.MuiTreeItem-iconContainer': {
                  display: 'none',
                },
              }}>
                <Card sx={{ p: 2, my: 1, mx: 2, }}>
                  {sec.i_type === sections[1].i_type ? (
                    <ProcedureForm
                      onSubmit={(data) => {
                        setExpanded((prev) => prev.filter((id) => id !== item.id));
                        onItemClick?.(sec, { ...item, ...data });
                      }}
                    />
                  ) : (
                    <MedicationForm
                      onSubmit={(data) => {
                        setExpanded((prev) => prev.filter((id) => id !== item.id));
                        onItemClick?.(sec, { ...item, ...data });
                      }}
                    />
                  )}
                </Card>
              </TreeItem>
            </ListItemButton>
          </ListItem>
        )
    ));
  };

  return (
    <Stack spacing={1} direction="column" flexWrap="wrap" sx={{ height: '28rem', bgcolor: 'background.paper', p: 3, borderRadius: 3, }}>
      <SearchBar onChange={(e) => setSearchText(e.target.value)} />

      <TreeView expanded={expanded} onNodeToggle={(e, nodeIds) => setExpanded(nodeIds)}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
            <TabList onChange={handleTabChange}>
              <Tab label={t("All")} value="0" />
              <Tab label={t("Medical Codes")} value="1" />
              <Tab label={t("Procedures")} value="2" />
              <Tab label={t("Medications")} value="3" />
            </TabList>
          </Box>
          <TabPanel value="0" sx={{ p: 0, }}>
            <List sx={{ overflow: 'auto', maxHeight: '20rem', '& ul, li': { p: 0, m: 0, }, }} subheader={<li />}>
              {sections.map((sec) => (
                <li key={`section-${sec.id}`}>
                  <ul>
                    <ListSubheader>{t(sec.name)}</ListSubheader>
                    {getListItems(sec)}
                  </ul>
                </li>
              ))}
            </List>
          </TabPanel>
          <TabPanel value="1" sx={{ p: 0, }}>
            <List sx={{ overflow: 'auto', maxHeight: '20rem', '& ul, li': { p: 0, m: 0, }, }}>
              {getListItems(sections[0])}
            </List>
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0, }}>
            <List sx={{ overflow: 'auto', maxHeight: '20rem', '& ul, li': { p: 0, m: 0, }, }}>
              {getListItems(sections[1])}
            </List>
          </TabPanel>
          <TabPanel value="3" sx={{ p: 0, }}>
            <List sx={{ overflow: 'auto', maxHeight: '20rem', '& ul, li': { p: 0, m: 0, }, }}>
              {getListItems(sections[2])}
            </List>
          </TabPanel>
        </TabContext>
      </TreeView>
    </Stack>
  );
};

export default AddToEncounter;
