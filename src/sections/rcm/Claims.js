import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getClaims } from "../../api/rcm";
import ApprovalsTable, { PageSizes } from "./ApprovalsTable";

const Claims = () => {
  const router = useRouter();

  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 25,
  });

  const { isLoading, data } = useQuery({
    queryKey: ['get_claims', paginationModel.page, paginationModel.pageSize],
    queryFn: (ctx) => getClaims(ctx),
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
      await router.replace(`/rcm/claims?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}`);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationModel]);

  const handleRowClick = (params) => {
    router.push(`/claim/${params.row.id}`);
  };

  return (
    <Box>
      <ApprovalsTable
        onRowClick={handleRowClick}
        loading={isLoading}
        rows={data?.data?.data.map((a) => ({
          ...a,
          creation: new Date(a.creation),
        })) ?? []}
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

export default Claims;