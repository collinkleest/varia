import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@material-ui/core";

const CommandsTableHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    Name
                </TableCell>
                <TableCell>
                    Description
                </TableCell>
                <TableCell>
                    Aliases
                </TableCell>
                <TableCell>
                    Usage
                </TableCell>
                <TableCell>
                    Args
                </TableCell>
                <TableCell>
                    Cooldown
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

const CommandsTable = (props) => {
    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table>
                    <CommandsTableHeader>
                    </CommandsTableHeader>
                    <TableBody>
                        {props.commands.map((cmd) => {
                            return(
                                <TableRow key={cmd.name}>
                                    {Object.entries(cmd).map(([key, val]) => {
                                        let content = "";
                                        if (key === "aliases"){
                                            content = val.join(", ");
                                        } else if (key === "args"){
                                            content = val ? "Yes" : "No";
                                        } else {
                                            content = val;
                                        }
                                        return (
                                            <TableCell>
                                                {content}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}


export { CommandsTableHeader };
export default CommandsTable;