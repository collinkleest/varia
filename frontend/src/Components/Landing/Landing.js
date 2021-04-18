import React from "react"; 
import {Typography, Container, Button, AppBar} from "@material-ui/core";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import GitHubIcon from "@material-ui/icons/GitHub";

const btnStyle = {
    margin: '5px'
}

const btnTextStyle = {
    textDecoration: 'none',
    color: 'black'
}

const btnText2Style = {
    textDecoration: 'none',
    color: 'white'
}

const Landing = (props) => {
    return (
        <Container>
            <Typography variant="h1">
                Varia Music Bot
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<MusicNoteIcon />}
                style={btnStyle}
            >
                <a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    href="https://discord.com/api/oauth2/authorize?client_id=781394297387614228&permissions=8&scope=bot"
                    style={btnText2Style}
                >
                    Add to Discord Server
                </a>
            </Button>
            <Button
                variant="contained"
                startIcon={<GitHubIcon />}
                style={btnStyle}
            >
                <a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    href="https://github.com/collinkleest/varia"
                    style={btnTextStyle}
                >
                    View Source Code
                </a>
            </Button>
        </Container>
    );
}

export default Landing;


