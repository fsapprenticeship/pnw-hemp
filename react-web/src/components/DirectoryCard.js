import React from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import {icons} from '../utils'

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    flexGrow: 1,
    fontSize: 24,
    marginBottom: "0 !important"
  },
  pos: {
    marginBottom: 12
  },
  titleContainer: {
    testAlign: "center",
    display: "flex",
    justifyContent: "space-between"
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  icon: {
    fontSize: 35
  }
};



const DirectoryCard = props => {
  const { folders } = props;
  const directories = folders.map((val, i) => {
    return (
      <Grid key={i} item xs={6} sm={3}>
        <Card className={styles.card}>
          <CardActionArea component={Link} to={`/tool/${val.type}`}>
            <CardContent>
              <div style={styles.titleContainer}>
                <div style={styles.textContainer}>
                  <Typography
                    className={styles.title}
                    color="textSecondary"
                  >              
                    {val.name}
                  </Typography>
                </div>
                <Icon style={styles.icon}>{icons[val.name]}</Icon>
              </div>
            </CardContent>
            {/* 
            <CardActions>
              <Button component={Link} to={`/tool/${val.type}`} size="small">
                View1 Content
              </Button>
            </CardActions>
            */}
          </CardActionArea>
        </Card>
      </Grid>
    );
  });
  return !folders ? "Loading" : directories;
};

export default withStyles(styles)(DirectoryCard);
