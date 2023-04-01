import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    flexGrow: 1,
  },
  username: {
    marginRight: theme.spacing(2),
    fontWeight: "bold"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  login: {
    marginRight: theme.spacing(1),
  },
  password: {
    marginRight: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(1),
  }
}));