import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from "@mui/lab";
import { Popover } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddToEncounter } from './AddToEncounter';

const EncounterAddButton = ({ parentRef, onAdd, ...props }) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const popOpen = Boolean(anchorEl);

  return (
    <>
      <LoadingButton
        variant="contained"
        startIcon={popOpen ? <CloseIcon /> : <AddIcon />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {t(popOpen ? 'Finish' : 'Add')}
      </LoadingButton>
      <Popover
        open={popOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{ sx: { width: parentRef?.current?.clientWidth + 30 ?? '80%', mt: 3, }, }}
      >
        <AddToEncounter
          onItemClick={onAdd}
          {...props}
        />
      </Popover>
    </>
  );
};

export default EncounterAddButton;