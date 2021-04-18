import React from "react";
import {useState} from "react";
import { Typography } from "@material-ui/core";
import tableData from "../../../../src/data/commands.json";
import CommandsTable from "./CommandsTable.js";

function Commands(props) {
    return (
        <React.Fragment>
            <Typography align="center" variant="h3">
                Varia Commands List
            </Typography>

            {tableData.catagories.map((ctg, index) => {
                
                return (
                    <React.Fragment>
                        <Typography align="left" variant="h4">
                            {ctg.name.charAt(0).toUpperCase() + ctg.name.slice(1)}
                        </Typography>
                        <CommandsTable commands={ctg.commands}>
                        </CommandsTable>
                    </React.Fragment>
                )
            })}
        </React.Fragment>
    );
};

export { Commands };
