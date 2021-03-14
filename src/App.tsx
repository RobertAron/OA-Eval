import React from 'react'
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Search, WbSunny, Help, Person, Dashboard as DashboardIcon, Home } from '@material-ui/icons'
import { Dashboard } from './Dashboard'



const useStyles = makeStyles(theme => ({
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    '& > div': {
      flexGrow: 1
    }
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  drawer: {
    display: 'flex',
    '& > div > div': {
      position: 'sticky',
      minWidth: 'max-content'
    }
  },
  rightContent: {
    display: 'flex',
    flexDirection: 'column',
    gridAutoRows: 'max-content',
    '& > main': {
      padding: `${theme.spacing(2)}px ${theme.spacing(8)}px`,
      flexGrow: 1
    }
  },
  drawerPrimary: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    }
  }
}))

const AppbarActions = [Search, WbSunny, Help, Person].map((Icon, index) => (
  <IconButton key={index}>
    <Icon />
  </IconButton>
))


function App() {
  const classes = useStyles()
  return (
    <div className={classes.appContainer}>
      <nav className={classes.drawer}>
        <Drawer variant="permanent" anchor="left" PaperProps={{ className: classes.drawerPrimary }}>
          <Toolbar>
            <Typography variant='h4' component='h1'>
              OverlayAnalytics
            </Typography>
          </Toolbar>
          <List>
            <ListItem button>
              <ListItemIcon ><Home /></ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
            <ListItem button selected>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary='My Dashboard' />
            </ListItem>
          </List>
        </Drawer>
      </nav>
      <div className={classes.rightContent}>
        <Toolbar component='header' className={classes.header}>
          {AppbarActions}
        </Toolbar>
        <main>
          {/* Probably put some router stuff here in a real app */}
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
