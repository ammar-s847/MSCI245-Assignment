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
const serverURL = ""; //enable for dev mode
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
    setMovie(event.target.value);
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

const MovieTitle = (props) => {
  const handleChange = (event) => {
    props.title(event.target.value);
  };

  return (
    <>
      <form>
        <TextField id="standard-basic" label="Movie Title" onChange={handleChange} />
      </form>
    </>
  );
}

const DirectorName = (props) => {
  const handleChange = (event) => {
    props.title(event.target.value);
  };

  return (
    <>
      <form>
        <TextField id="standard-basic" label="Director Name" onChange={handleChange} />
      </form>
    </>
  );
}

const ActorName = (props) => {
  const handleChange = (event) => {
    props.title(event.target.value);
  };
  return (
    <>
      <form>
        <TextField id="standard-basic" label="Actor Name" onChange={handleChange} />
      </form>
    </>
  );
}

const ReviewTitle = (props) => {
  const handleChange = (event) => {
    props.title(event.target.value);
  };

  return (
    <>
      <form>
        <TextField id="standard-basic" label="Review Title" onChange={handleChange} />
      </form>
    </>
  );
}

const ReviewBody = (props) => {
  const handleChange = (event) => {
    props.review(event.target.value);
  };

  return (
    <>
      <form>
        <TextField
          id="ReviewBodyTextField"
          label="Review Body"
          multiline
          rows={4}
          defaultValue=""
          onChange={handleChange}
        />
      </form>
    </>
  );
}

const ReviewRating = (props) => {
  const [selectedValue, setSelectedValue] = React.useState("0");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    props.rating(event.target.value);
  };

  return (
    <>
      <p>Rate the movie (1-5)</p>
      <Radio
        checked={selectedValue === "1"}
        onChange={handleChange}
        value="1"
        name="radio-button-demo"
        inputProps={{ 'aria-label': '1' }}
      />
      <Radio
        checked={selectedValue === "2"}
        onChange={handleChange}
        value="2"
        name="radio-button-demo"
        inputProps={{ 'aria-label': '2' }}
      />
      <Radio
        checked={selectedValue === "3"}
        onChange={handleChange}
        value="3"
        name="radio-button-demo"
        inputProps={{ 'aria-label': '3' }}
      />
      <Radio
        checked={selectedValue === "4"}
        onChange={handleChange}
        value="4"
        name="radio-button-demo"
        inputProps={{ 'aria-label': '4' }}
      />
      <Radio
        checked={selectedValue === "5"}
        onChange={handleChange}
        value="5"
        name="radio-button-demo"
        inputProps={{ 'aria-label': '5' }}
      />
    </>
  );
}

const SearchComponent = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [director, setDirector] = useState("");
  const [actor, setActor] = useState("");
  const [error, setError] = useState("");
  const [finalDisplay, setFinalDisplay] = useState("none");

  const searchCall = (query) => {
    callSearchApi(query)
      .then(res => {
        console.log("callSearchApi returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callSearchApi parsed: ", parsed);
      })
  }
  
  const callSearchApi = async (query) => {
    const url = serverURL + "/api/search";
    console.log(url);
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({query})
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Found recipes: ", body);
    return body;
  }

  const onClick = () => {
    // if (selectedMovie == "" || enteredTitle == "" || enteredReview == "" || selectedRating == "0") {
    //   setFinalDisplay("none")
    // } else {
    //   if (error != "") {
    //     setError("");
    //   }
    //   setFinalDisplay("block")
    //   let insertValue = {
    //     title: enteredTitle,
    //     body: enteredReview, 
    //     score: selectedRating, 
    //     user: 1, 
    //     movie: selectedMovieId
    //   };
    //   console.log(insertValue);
    //   searchCall(insertValue);
    // }
  }

  return (
    <>
      <h2>Search for movies</h2>
      <p style={{"color": "red"}}>{error}</p>
      <Grid container>
        <Grid item>
          <MovieTitle changeState={setEnteredTitle} />
        </Grid>
        <Grid item>
          <DirectorName changeState={setDirector} />
        </Grid>
        <Grid item>
          <ActorName changeState={setActor} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={onClick}>Submit</Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <div style={{"display": finalDisplay}}>
            <h3>Results </h3>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

class Search extends Component {
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
          <SearchComponent />
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

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Search);
