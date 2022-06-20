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

//Dev mode
const serverURL = ""; //enable for dev mode

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

const MovieSelection = (props) => {
  const classes = styles;
  const [movie, setMovie] = React.useState('');

  const handleChange = (event) => {
    props.movie(event.target.value);
    setMovie(event.target.value);
  };

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
          <MenuItem value={"Star Wars III: Revenge of the Sith"}>Star Wars III: Revenge of the Sith</MenuItem>
          <MenuItem value={"Avengers 4: Endgame"}>Avengers 4: Endgame</MenuItem>
          <MenuItem value={"John Wick"}>John Wick</MenuItem>
          <MenuItem value={"The Gentlemen"}>The Gentlemen</MenuItem>
          <MenuItem value={"The Penguins of Madagascar"}>The Penguins of Madagascar</MenuItem>
        </Select>
      </FormControl>
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

const Review = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredReview, setEnteredReview] = useState("");
  const [selectedRating, setSelectedRating] = useState("0");
  const [error, setError] = useState("");
  const [finalDisplay, setFinalDisplay] = useState("none");

  const onClick = () => {
    if (selectedMovie == "" || enteredTitle == "" || enteredReview == "" || selectedRating == "0") {
      setError("Please fill in all values!");
      setFinalDisplay("none")
    } else {
      if (error != "") {
        setError("");
      }
      setFinalDisplay("block")
    }
  }

  return (
    <>
      <h2>Write a Review</h2>
      <p style={{"color": "red"}}>{error}</p>
      <Grid container>
        <Grid item>
          <MovieSelection movie={setSelectedMovie} />
        </Grid>
        <Grid item>
          <ReviewTitle title={setEnteredTitle} />
        </Grid>
        <Grid item>
          <ReviewBody review={setEnteredReview} />
        </Grid>
        <Grid item>
          <ReviewRating rating={setSelectedRating} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={onClick}>Submit</Button>
        </Grid>
        <Grid item>
          <div style={{"display": finalDisplay}}>
            <h3>Your Review: </h3>
            <p>{selectedMovie}</p>
            <p>{enteredTitle}</p>
            <p>{enteredReview}</p>
            <p>{selectedRating} stars</p>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

class Home extends Component {
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

          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            {this.state.mode === 0 ? (
              <React.Fragment>
                Welcome!
              </React.Fragment>
            ) : (
              <React.Fragment>
                Welcome back!
              </React.Fragment>
            )}
          </Typography>

        </Grid>
        <Grid item>
          <Review />
        </Grid>
      </Grid>
    )


    return (
      <MuiThemeProvider theme={theme}>
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

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
