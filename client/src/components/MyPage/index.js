import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import NavigationBar from "../AppBar/index";

//Dev mode
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3086"; //enable for dev mode
//http://localhost:5000
// http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3086

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#000000"
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

});

// React Components
const MovieSelection = (props) => {
  const classes = styles;
  const [movie, setMovie] = React.useState('');
  const [apiMovies, setApiMovies] = React.useState([]);

  const loadMovies = () => {
    callApiGetMovies()
      .then(res => {
        console.log("callApiGetMovies returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiGetMovies parsed: ", parsed);
        setApiMovies(parsed);
      })
  }
  
  const callApiGetMovies = async () => {
  
    const url = serverURL + "/api/getMovies";
    console.log(url);
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("getMovies : ", body);
    return body;
  }

  const handleChange = (event) => {
    props.movie(event.target.value.name);
    props.movieId(event.target.value.id);
    setMovie(event.target.value.name);
  };

  React.useEffect(() => {
    loadMovies();
    console.log(apiMovies);
  }, []);

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="MovieSelectionLabel">Select a Movie</InputLabel>
        <Select
          labelId="MovieSelectionLabel"
          id="MovieSelectionForm"
          value={movie}
          onChange={handleChange}
        >
          {apiMovies.map((movie) => {
            return (
              <MenuItem value={movie}>{movie.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </>
  );
}

const TrailerURL = (props) => {
  const handleChange = (event) => {
    props.setter(event.target.value);
  };

  return (
    <>
      <form>
        <TextField
          id="TrailerURLTextField"
          label="Trailer URL"
          multiline
          rows={4}
          defaultValue=""
          onChange={handleChange}
        />
      </form>
    </>
  );
}

const MyPageComponent = () => {
  const [trailer, setTrailer] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(0);
  const [movieName, setMovieName] = useState("");

  const insertTrailer = (review) => {
    callApiAddTrailer(review)
      .then(res => {
        console.log("callApiAddTrailer returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiAddTrailer parsed: ", parsed);
      })
  }
  
  const callApiAddTrailer = async (trailer) => {
  
    const url = serverURL + "/api/addTrailer";
    console.log(url);
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie: trailer.movie,
        url: trailer.url
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Inserted Trailer: ", body);
    return body;
  }

  const onClick = () => {
    let insertValue = {
      trailer: trailer, 
      movie: selectedMovieId
    };
    console.log(insertValue);
    insertTrailer(insertValue);
  }

  return (
    <>
      <h2>Contribute by adding a Trailer link!</h2>
      <Grid container>
        <Grid item>
          <MovieSelection movie={setMovieName} movieId={setSelectedMovieId} />
        </Grid>
        <Grid item>
          <TrailerURL setter={setTrailer} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={onClick}>Submit</Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <div>
            <h3>Trailer: </h3>
            <p>{TrailerURL}</p>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  render() {
    const { classes } = this.props;



    const mainMessage = (
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.mainMessageContainer}
      >
        <Grid item>
          <MyPageComponent />
        </Grid>
      </Grid>
    )


    return (
      <MuiThemeProvider theme={theme}>
        <NavigationBar></NavigationBar>
        <div className={classes.root}>
          <CssBaseline />
          <Paper
            className={classes.paper}
          >
            {mainMessage}
          </Paper>

        </div>
      </MuiThemeProvider>
    );
  }
}

MyPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyPage);
