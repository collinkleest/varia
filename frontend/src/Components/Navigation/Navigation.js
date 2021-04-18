import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import VariaLogo from "../../../../assets/varialogo.png";
import { Link } from "react-router-dom";

const imgStyle = {
    borderRadius: '50%'
};

const linkStyle = {
    textDecoration: 'none',
    margin: '5px',
    fontSize: '20px',
    color: 'black'
}

const pullRight = {
    marginLeft: 'auto'
}

class Navigation extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Toolbar color="inherit" position="sticky">
                <Link to="/">
                    <img style={imgStyle} width="75px" height="75px" src={VariaLogo}></img>
                </Link>

                <div style={pullRight}>    
                    {this.props.navLinks.map((item) => {
                        return (
                            <Typography variant="button" gutterBottom>
                                <Link style={linkStyle} to={item.path}>
                                    {item.name}
                                </Link>
                            </Typography>
                        );
                    })}
                </div>
            </Toolbar>
        );
    }

}

export default Navigation;