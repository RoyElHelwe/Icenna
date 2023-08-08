import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Alert, List, ListItem, ListItemButton, ListItemText, ListSubheader, Skeleton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { search } from '../../api/practitioner';
import CustomDialog, { DefaultOptions } from '../../components/custom-dialog';
import SearchBar from '../../components/searchbar';
import AddMedicationForm from '../../forms/add-medication';
import AddProcedureForm from '../../forms/add-procedure';

export const AddToEncounter = ({
  id,
  onItemClick,
}) => {
  const [value, setValue] = useState('0');
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const [searchText, setSearchText] = useState('');
  const { isLoading, error, data, } = useQuery({
    queryKey: ['search', id, (searchText.length >= 3 ? searchText : ''), value],
    queryFn: (ctx) => search(ctx),
    enabled: searchText.length >= 3,
  });
  const searchResult = data?.data?.data ?? {};

  const [dialogOptions, setDialogOptions] = useState(DefaultOptions);
  const onClose = () => setDialogOptions({ ...dialogOptions, open: false, });

  const sections = [
    { id: 'medical_code', name: 'Diagnosis', code: 1, },
    { id: 'procedure', name: 'Procedures', code: 2, },
    { id: 'drugs', name: 'Medications', code: 3, },
  ];

  const getListItems = (sec) => {
    if (searchText.length >= 3 && isLoading) {
      return Array(2).fill(0).map((_, i) => (
        <ListItem key={`item-${i}`}>
          <Skeleton width="100%" height={50} />
        </ListItem>
      ));
    }

    if (searchText.length >= 3 && !!error) {
      return (
        <Alert
          elevation={3}
          variant='filled'
          sx={{ width: '100%' }}
          severity='error'>
          Couldn't get search results!
        </Alert>
      );
    }

    return searchResult[sec.id]?.map((item) => (
      <ListItem key={`item-${item.id}`}>
        <ListItemButton sx={{ py: 0.5, }}
          onClick={(e) => {
            if (sec.code === sections[0].code) {
              onItemClick?.({
                i_type: sec.code,
                code: item.id,
              });
            } else if (sec.code === sections[1].code) {
              setDialogOptions({
                open: true, title: 'Add Procedure', children: (
                  <AddProcedureForm
                    onSubmit={({ body_site, ...rest }) => {
                      onClose?.();
                      onItemClick?.({
                        i_type: sec.code,
                        code: item.code,
                        body_site: body_site?.code,
                        ...rest,
                      });
                    }}
                  />
                )
              });
            } else if (sec.code === sections[2].code) {
              setDialogOptions({
                open: true, title: 'Add Medication', children: (
                  <AddMedicationForm
                    onSubmit={(data) => {
                      onClose?.();
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
                )
              });
            } else {
              onClose?.();
            }
          }}>
          <ListItemText primary={item.name} />
        </ListItemButton>
      </ListItem>
    ));
  };

  return (
    <Stack spacing={1} direction="column" flexWrap="wrap" sx={{ height: '20rem', bgcolor: 'background.paper', p: 3, borderRadius: 3, }}>
      <CustomDialog {...dialogOptions} onClose={onClose} />

      <SearchBar onChange={(e) => setSearchText(e.target.value)} />

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
          <List sx={{ overflow: 'auto', maxHeight: '12rem', '& ul, li': { p: 0, m: 0, }, }} subheader={<li />}>
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
    </Stack>
  );
};

export default AddToEncounter;
