import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cell: {
    fontSize: "1.20rem",
    width: "50%",
    border: "1px solid rgba(224, 224, 224, 1)",
  },
  header: {
    fontWeight: "bold",
  },
});

export default function VerticalTable(props) {
  const classes = useStyles();

  const renderTableRows = (headersAndKeys, tableData) => {
    if (tableData) {
      return headersAndKeys.map((row) => {
        return (
          <TableRow key={row.header}>
            <TableCell
              className={`${classes.cell} ${classes.header}`}
              align="right"
            >
              {row.header}
            </TableCell>
            {row.type === "number" && (
              <TableCell className={classes.cell}>
                {tableData[row.key] ? tableData[row.key].toLocaleString() : "0"}
              </TableCell>
            )}
            {row.type === "money" && (
              <TableCell className={classes.cell}>
                {tableData[row.key] ? `$${tableData[row.key].toLocaleString()}` : "0"}
              </TableCell>
            )}
            {!row.type && (
              <TableCell className={classes.cell}>
                {tableData[row.key] ? tableData[row.key] : "N/A"}
              </TableCell>
            )}
          </TableRow>
        );
      });
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {props.tableData
            ? renderTableRows(props.headersAndKeys, props.tableData)
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
