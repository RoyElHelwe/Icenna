import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPatientEncounters } from "../../api/rcm";
import DataTable, { PageSizes } from "../../components/DataTable";

const PatientEncounters = () => {
  const router = useRouter();

  const columns = [
    { field: 'patient_name', headerName: 'Patient Name', width: 250, },
    { field: 'practitioner_name', headerName: 'Practitioner Name', width: 250, },
    { field: 'encounter_date', headerName: 'Encounter Date', width: 250, },
  ];

  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 25,
  });

  const { data } = useQuery({
    queryKey: ['get_patient_encounters', paginationModel.page, paginationModel.pageSize],
    queryFn: getPatientEncounters,
  });

  const rowCount = (data?.data?.total_pages * paginationModel.pageSize) || 0;

  useEffect(() => {
    const pageParam = Number(router.query.page, 10);
    let pageSizeParam = Number(router.query.pageSize, 10);

    if (!PageSizes.includes(pageSizeParam)) {
      pageSizeParam = PageSizes[0];
    }

    if (!isNaN(pageParam) || !isNaN(pageSizeParam)) {
      setPaginationModel({
        page: !isNaN(pageParam)
          ? pageParam :
          paginationModel.page,
        pageSize: !isNaN(pageSizeParam)
          ? pageSizeParam :
          paginationModel.pageSize,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.page, router.query.pageSize]);

  useEffect(() => {
    (async () => {
      await router.replace(`/rcm/patient-encounters?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}`);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationModel]);

  const handleRowClick = (params) => {
    router.push(`/encounter/${params.row.id}`);
  };

  return (
    <Box>
      <DataTable
        onRowClick={handleRowClick}
        columns={columns}
        rows={data?.data?.data ?? []}
        rowCount={data?.data?.data?.length ? rowCount : 0}
        paginationModel={{ ...paginationModel, page: paginationModel.page - 1 }}
        onPaginationModelChange={(model) => {
          if (model.pageSize !== paginationModel.pageSize) {
            setPaginationModel({ ...model, page: 1, });
          } else {
            setPaginationModel({ ...model, page: model.page + 1, });
          }
        }}
      />
    </Box>
  );
};

export default PatientEncounters;