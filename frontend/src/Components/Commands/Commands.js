import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";


const Commands = (props) => {
    return(
        <React.Fragment>
            <h1>
                Commands!
            </h1>
            <TableContainer>
                <Table>
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
                </Table>
            </TableContainer>
        </React.Fragment>
    );
};

export default Commands;