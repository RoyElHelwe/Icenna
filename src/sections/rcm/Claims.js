import { TabContext, TabList } from "@mui/lab";
import { Box, Container, Tab as MuiTab, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getClaims } from "../../api/rcm";
import { PageSizes } from "../../components/DataTable";
import ApprovalsTable from "./ApprovalsTable";

const Tab = styled(MuiTab)(({ theme }) => ({
  textTransform: "none",
}));

const ClaimStatus = [
  { code: '0', name: 'Errors' },
  { code: '2', name: 'Pending' },
  { code: '1', name: 'All Claims' },
];

const Claims = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [qParams, setQParams] = useState({
    page: 1,
    pageSize: 25,
    status: ClaimStatus[0].code,
  });

  const { data } = useQuery({
    queryKey: ['get_claims', qParams.page, qParams.pageSize, qParams.status],
    queryFn: (ctx) => getClaims(ctx),
  });

  const rowCount = (data?.data?.total_pages * qParams.pageSize) || 0;

  useEffect(() => {
    const pageParam = Number(router.query.page, 10);
    let pageSizeParam = Number(router.query.pageSize, 10);
    const statusParam = router.query.status;

    if (!PageSizes.includes(pageSizeParam)) {
      pageSizeParam = PageSizes[0];
    }

    if (!isNaN(pageParam) || !isNaN(pageSizeParam) || !!statusParam) {
      setQParams({
        page: !isNaN(pageParam)
          ? pageParam :
          qParams.page,
        pageSize: !isNaN(pageSizeParam)
          ? pageSizeParam :
          qParams.pageSize,
        status: !!statusParam
          ? statusParam :
          qParams.status,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.page, router.query.pageSize, router.query.status]);

  useEffect(() => {
    (async () => {
      await router.replace(`${router.pathname?.replace('[tab]', 'claims')}?page=${qParams.page}&pageSize=${qParams.pageSize}&status=${qParams.status}`);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qParams]);

  const handleRowClick = (params) => {
    router.push(`/rcm/claim/${params.row.id}`);
  };

  const claimsTable = (
    <ApprovalsTable
      onRowClick={handleRowClick}
      rows={data?.data?.data.map((a) => ({
        ...a,
        creation: new Date(a.creation),
      })) ?? []}
      rowCount={data?.data?.data?.length ? rowCount : 0}
      paginationModel={{ ...qParams, page: qParams.page - 1 }}
      onPaginationModelChange={(model) => {
        if (model.pageSize !== qParams.pageSize) {
          setQParams({ ...qParams, ...model, page: 1, });
        } else {
          setQParams({ ...qParams, ...model, page: model.page + 1, });
        }
      }}
    />
  );

  return (
    <Box>
      <TabContext value={qParams.status ?? ClaimStatus[0].code}>
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
            <TabList onChange={(e, val) => setQParams({ ...qParams, status: val })}>
              {ClaimStatus.map((cs) => (
                <Tab key={cs.code} label={t(cs.name)} value={cs.code} />
              ))}
            </TabList>
          </Box>
        </Box >
        <Container maxWidth={false} sx={{ my: 2, }}>
          {claimsTable}
        </Container>
      </TabContext>
    </Box>
  );
};

export default Claims;