import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DataImporter from "./DataImporter";
import { ExpansionPanel } from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography } from "@material-ui/core";
import slipRate from "./slipRate";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#1a237e",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const styles = {
  summaryHeader: {
    //borderColor: 'green',
    height: 30,
    backgroundColor: "crimson",
    fill: "green",
  },
  root: {
    backgroundColor: "green",
  },
};

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  root: {
    backgroundColor: "#1a237e",
    color: "white",
  },
  detailsRoot: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 20,
  },
  button: {
    color: "white",
  },
});

export default function DataTable({ data }) {
  const classes = useStyles();

  return (
    <>
      <ExpansionPanel classes={{ root: classes.root }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon classes={{ root: classes.button }} />}
        >
          <Typography className={(classes.heading, classes.root)}>
            Data Table
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.detailsRoot }}>
          <Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Priority</StyledTableCell>
                    <StyledTableCell>Project</StyledTableCell>
                    <StyledTableCell align="left">Milestone</StyledTableCell>
                    <StyledTableCell align="center">
                      Revenue Impact
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Target Date
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Commit Date
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Projected Date
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Slip Rate (days)
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((data) => (
                    <StyledTableRow key={data.priority}>
                      <StyledTableCell component="th" scope="row">
                        {data.priority}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {data.project}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {data.milestone}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        ${data.revenue}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.target_date}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.commit_date}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.projected_date}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {slipRate(
                          new Date(data.commit_date),
                          new Date(data.projected_date),
                          data.complete
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
}
