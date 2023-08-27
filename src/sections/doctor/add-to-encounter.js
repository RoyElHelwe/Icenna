import { TreeItem, TreeView } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, List, ListItem, ListItemButton, ListSubheader, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { search } from '../../api/practitioner';
import SearchBar from '../../components/searchbar';
import AddMedicationForm from '../../forms/add-medication';
import AddProcedureForm from '../../forms/add-procedure';

export const AddToEncounter = ({
  id,
  onItemClick,
}) => {
  const [value, setValue] = useState('0');
  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const [searchText, setSearchText] = useState('');
  const { error, data, } = useQuery({
    queryKey: ['search', id, (searchText.length >= 3 ? searchText : ''), value],
    queryFn: (ctx) => search(ctx),
    enabled: searchText.length >= 3,
  });
  const searchResult = data?.data?.data ?? {};

  const sections = [
    { id: 'medical_code', name: 'Diagnosis', code: 1, },
    { id: 'procedure', name: 'Procedures', code: 2, },
    { id: 'drugs', name: 'Medications', code: 3, },
  ];

  const [expanded, setExpanded] = useState([]);

  const getListItems = (sec) => {
    if (searchText.length >= 3 && !!error) {
      return "Couldn't get search results!";
    }

    return searchResult[sec.id]?.map((item) => (sec.code === sections[0].code ?
      (
        <ListItem key={`item-${item.id}`}>
          <ListItemButton
            sx={{ py: 0.5, px: 0, mx: 6, }}
            onClick={() => onItemClick?.({
              i_type: sec.code,
              code: item.id,
            })}
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
                {sec.code === sections[1].code ? (
                  <AddProcedureForm
                    onSubmit={({ body_site, ...rest }) => {
                      setExpanded((prev) => prev.filter((id) => id !== item.id));
                      onItemClick?.({
                        i_type: sec.code,
                        code: item.code,
                        body_site: body_site?.code,
                        ...rest,
                      });
                    }}
                  />
                ) : (
                  <AddMedicationForm
                    onSubmit={(data) => {
                      setExpanded((prev) => prev.filter((id) => id !== item.id));
                      onItemClick?.({
                        i_type: sec.code,
                        code: item.id,
                        dose: data.dose,
                        dosage: data.repeat?.id,
                        period: data.period?.id,
                        route: 'Oral',
                      });
                    }}
                  />
                )}
              </Card>
            </TreeItem>
          </ListItemButton>
        </ListItem>
      ))
    );
  };

  return (
    <Stack spacing={1} direction="column" flexWrap="wrap" sx={{ height: '28rem', bgcolor: 'background.paper', p: 3, borderRadius: 3, }}>
      <SearchBar onChange={(e) => setSearchText(e.target.value)} />

      <TreeView expanded={expanded} onNodeToggle={(e, nodeIds) => setExpanded(nodeIds)}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
            <TabList onChange={handleTabChange}>
              <Tab label="All" value="0" />
              <Tab label="Diagnosis" value="1" />
              <Tab label="Procedures" value="2" />
              <Tab label="Medications" value="3" />
            </TabList>
          </Box>
          <TabPanel value="0" sx={{ p: 0, }}>
            <List sx={{ overflow: 'auto', maxHeight: '20rem', '& ul, li': { p: 0, m: 0, }, }} subheader={<li />}>
              {sections.map((sec) => (
                <li key={`section-${sec.id}`}>
                  <ul>
                    <ListSubheader>{sec.name}</ListSubheader>
                    {getListItems(sec)}
                  </ul>
                </li>
              ))}
            </List>
          </TabPanel>
          <TabPanel value="1" sx={{ p: 0, }}>
            <List sx={{ overflow: 'auto', maxHeight: '12rem', '& ul, li': { p: 0, m: 0, }, }}>
              {getListItems(sections[0])}
            </List>
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0, }}>
            <List sx={{ overflow: 'auto', maxHeight: '12rem', '& ul, li': { p: 0, m: 0, }, }}>
              {getListItems(sections[1])}
            </List>
          </TabPanel>
          <TabPanel value="3" sx={{ p: 0, }}>
            <List sx={{ overflow: 'auto', maxHeight: '12rem', '& ul, li': { p: 0, m: 0, }, }}>
              {getListItems(sections[2])}
            </List>
          </TabPanel>
        </TabContext>
      </TreeView>
    </Stack>
  );
};

export default AddToEncounter;
