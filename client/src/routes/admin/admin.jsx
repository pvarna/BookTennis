import { useNavigate } from "react-router-dom";
import { Page } from "../../components/page/page";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { landingPagePath } from "../constants";
import { useEffect, useState } from "react";
import { clubCreationRequestService } from "../../services/club-creation-request-service";
import { useAsync } from "../../hooks/use-async";
import {
  CircularProgress,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { PaginatedTable } from "../../components/paginated-table/paginated-table";
import { ErrorContainer } from "../../components/error-container";
import { EmptyTable } from "../../components/empty-table/empty-table";
import { Flex } from "../../components/flex";
import { AdminActionsCell } from "./admin-actions-cell";

export const Admin = () => {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, loading, error, reload } = useAsync(
    async () => await clubCreationRequestService.loadRequests(pagination),
    [pagination]
  );

  useEffect(() => {
    if (!user.isAdmin) {
      navigate(`${landingPagePath}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!data && !loading) {
    return <EmptyTable title="No requests found" />;
  }

  return (
    <Page>
      <Typography variant="h4" sx={{padding: "20px", color:"#EE7214"}}>Club creation requests</Typography>
      <Flex flexDirection="column" sx={{ padding: "20px", width: "100%" }}>
        <PaginatedTable
          headers={["Request ID", "Name", "City", "Status", "Actions"]}
          total={data.total}
          pagination={pagination}
          setPagination={setPagination}
        >
          {data.requests.map((request) => (
            <TableRow
              key={request.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{request.id}</TableCell>
              <TableCell align="center">{request.name}</TableCell>
              <TableCell align="center">{request.city}</TableCell>
              <TableCell align="center">{request.status}</TableCell>
              <AdminActionsCell request={request} onAction={reload} />
            </TableRow>
          ))}
        </PaginatedTable>
        {!!error?.message && (
          <ErrorContainer error={"Error loading requests"} />
        )}
      </Flex>
    </Page>
  );
};
