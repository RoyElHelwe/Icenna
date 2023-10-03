import { TreeItem, TreeView } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, List, ListItem, ListItemButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedVirtuoso, Virtuoso } from 'react-virtuoso';
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
  department,
  onItemClick,
}) => {
  const [value, setValue] = useState('0');
  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const { t } = useTranslation();

  const [searchData, setSearchData] = useState({});
  const { data, } = useQuery({
    queryKey: ['search', id, ''],
    queryFn: (ctx) => search(ctx),
    enabled: searchData?.[department]?.length !== 0,
  });

  useEffect(() => {
    setSearchData((prev) => {
      return {
        ...prev,
        [department ?? 'data']: data?.data?.data,
      }
    });
  }, [data, department]);

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState();
  useEffect(() => {
    setFilteredData((prev) => {
      const search = searchText.trim().toLowerCase();
      if (!search.length) {
        return searchData;
      }

      const data = prev?.[department ?? 'data'];

      const medical_code = data?.medical_code?.filter(({ code: c, name: n, description: d }) => (
        c.toLowerCase().includes(search) || n.toLowerCase().includes(search) || d.toLowerCase().includes(search)
      ));

      const procedure = data?.procedure?.filter(({ id: i, name: n, description: d }) => (
        i.toLowerCase().includes(search) || n.toLowerCase().includes(search) || d.toLowerCase().includes(search)
      ));

      const drugs = data?.drugs?.filter(({ id: i, name: n, description: d }) => (
        i.toLowerCase().includes(search) || n.toLowerCase().includes(search) || d.toLowerCase().includes(search)
      ));

      return {
        ...prev,
        [department ?? 'data']: {
          ...data,
          medical_code,
          procedure,
          drugs,
        },
      }
    });
  }, [department, searchText, searchData]);

  const searchResult = filteredData?.[department] ?? {};
  const groupResult = [].concat(...sections.map((sec) => (searchResult?.[sec?.id] ?? [])));

  const [expanded, setExpanded] = useState([]);

  const getListItem = (index, item, ctx, sec) => {
    if (!item) {
      return <></>;
    }

    return sec.i_type === sections[0].i_type || (sec.i_type === sections[1].i_type && (department !== 'Dental' || !item?.body_site_required))
      ? (
        <ListItem key={index}>
          <ListItemButton
            sx={{ py: 0.5, px: 0, mx: 6, }}
            onClick={() => {
              onItemClick?.(sec, item);
            }}
          >
            {item?.name}
          </ListItemButton>
        </ListItem>
      )
      : (
        <ListItem key={index}>
          <ListItemButton disableRipple sx={{ py: 0, px: 0, mx: 6, }}>
            <TreeItem nodeId={item?.id} label={item?.name} sx={{
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
                      setExpanded((prev) => prev.filter((id) => id !== item?.id));
                      onItemClick?.(sec, { ...item, ...data });
                    }}
                  />
                ) : (
                  <MedicationForm
                    onSubmit={(data) => {
                      setExpanded((prev) => prev.filter((id) => id !== item?.id));
                      onItemClick?.(sec, { ...item, ...data });
                    }}
                  />
                )}
              </Card>
            </TreeItem>
          </ListItemButton>
        </ListItem>
      );
  };

  return (
    <Stack spacing={1} direction="column" flexWrap="wrap" sx={{ height: 400, bgcolor: 'background.paper', p: 3, borderRadius: 3, }}>
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
            <List sx={{ overflow: 'auto', maxHeight: 300, '& ul, li': { p: 0, m: 0, }, }} subheader={<li />}>
              <GroupedVirtuoso
                style={{ height: 250 }}
                groupCounts={sections.map((sec) => (searchResult?.[sec?.id]?.length ?? 0)) ?? []}
                groupContent={(i) => (
                  <Box sx={{ bgcolor: 'background.paper', fontWeight: 'bold', }}>{sections[i].name}</Box>
                )}
                itemContent={(index, groupIndex, data, context) => {
                  const sec = sections[groupIndex];
                  const item = groupResult?.[index];

                  return getListItem(index, item, context, sec);
                }}
              />
            </List>
          </TabPanel>
          <TabPanel value="1" sx={{ p: 0, }}>
            <List sx={{ overflow: 'auto', maxHeight: 300, '& ul, li': { p: 0, m: 0, }, }}>
              <Virtuoso
                style={{ height: 250 }}
                data={searchResult?.medical_code ?? []}
                itemContent={(i, data, ctx) => getListItem(i, data, ctx, sections[0])}
              />
            </List>
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0, }}>
            <List sx={{ overflow: 'auto', maxHeight: 300, '& ul, li': { p: 0, m: 0, }, }}>
              <Virtuoso
                style={{ height: 250 }}
                data={searchResult?.procedure ?? []}
                itemContent={(i, data, ctx) => getListItem(i, data, ctx, sections[1])}
              />
            </List>
          </TabPanel>
          <TabPanel value="3" sx={{ p: 0, }}>
            <List sx={{ overflow: 'auto', maxHeight: 300, '& ul, li': { p: 0, m: 0, }, }}>
              <Virtuoso
                style={{ height: 250 }}
                data={searchResult?.drugs ?? []}
                itemContent={(i, data, ctx) => getListItem(i, data, ctx, sections[2])}
              />
            </List>
          </TabPanel>
        </TabContext>
      </TreeView>
    </Stack>
  );
};

export default AddToEncounter;
