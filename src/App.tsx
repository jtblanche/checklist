import * as React from 'react';
import date from 'date-and-time';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import CleaningCard, { CardInputs, CardSchedule } from './CleaningCard';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LocalStorageList from './LocalStorage';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function RecipeReviewCard() {
  const [currentDateViewStr, setCurrentDateViewStr] = React.useState(date.format(new Date(), 'YYYY/MM/DD'));

  const [open, setOpen] = React.useState(false)

  const [showAllDays, setShowAllDays] = React.useState(false)

  const dailyTasks: CardInputs = {
    title: 'Daily tasks',
    subtitle: 'Try to complete these every day!',
    localStorageTasks: new LocalStorageList('DailyList', [
      'One load of laundry',
      'Dishes',
      'Make beds',
      'Spray countertops',
      'Pick up clutter',
      'Sort mail',
      'Trash'
    ], CardSchedule.Daily),
    schedule: CardSchedule.Daily
  };

  const monthlyTasks: CardInputs = {
    title: 'Monthly tasks',
    subtitle: 'Try to complete these within the month!',
    localStorageTasks: new LocalStorageList('MonthlyList', [
      'Dust ceiling fans',
      'Clean oven',
      'Clean inside of fridge',
      'Wash windows',
      'Pick up garage',
      'Pick up basement',
      'Dust/clean baseboards',
      'Vacuum inside furniture',
      'Dust air vents',
      'Clean light fixtures'
    ], CardSchedule.Monthly),
    schedule: CardSchedule.Monthly
  };

  const mondayTasks: CardInputs = {
    title: 'Monday tasks - Kitchen',
    subtitle: 'Try to complete these every Monday!',
    localStorageTasks: new LocalStorageList('MondayList', [
      'Clean kitchen table',
      'Wipe down sink and counters',
      'Vacuum and/or mop',
      'Wipe down appliances',
    ], CardSchedule.Monday),
    schedule: CardSchedule.Monday
  };

  const tuesdayTasks: CardInputs = {
    title: 'Tuesday tasks - Living room',
    subtitle: 'Try to complete these every Tuesday!',
    localStorageTasks: new LocalStorageList('TuesdayList', [
      'Pick up clutter',
      'Dust surfaces',
      'Vacuum and/or mop',
      'Wash blankets',
    ], CardSchedule.Tuesday),
    schedule: CardSchedule.Tuesday
  };

  const wednesdayTasks: CardInputs = {
    title: 'Wednesday tasks - Bed room',
    subtitle: 'Try to complete these every Wednesday!',
    localStorageTasks: new LocalStorageList('WednesdayList', [
      'Put away clothes/ Pick up clutter',
      'Dust surfaces',
      'Wash bedding',
      'Vacuum and/or mop',
    ], CardSchedule.Wednesday),
    schedule: CardSchedule.Wednesday
  };

  const thursdayTasks: CardInputs = {
    title: 'Thursday tasks - Bath room',
    subtitle: 'Try to complete these every Thursday!',
    localStorageTasks: new LocalStorageList('ThursdayList', [
      'Sanitize toilet',
      'Vacuum and/or mop',
      'Wash shower, sink and mirrors',
      'Wash towels and mats',
    ], CardSchedule.Thursday),
    schedule: CardSchedule.Thursday
  };

  const fridayTasks: CardInputs = {
    title: 'Friday tasks - Dining',
    subtitle: 'Try to complete these every Friday!',
    localStorageTasks: new LocalStorageList('FridayList', [
      'Clean off table',
      'Vacuum and/or mop',
      'Dust surfaces',
      'Pick up clutter',
    ], CardSchedule.Friday),
    schedule: CardSchedule.Friday
  };

  const saturdayTasks: CardInputs = {
    title: 'Saturday tasks - Entry',
    subtitle: 'Try to complete these every Saturday!',
    localStorageTasks: new LocalStorageList('SaturdayList', [
      'Sanitize door knobs',
      'Dust surfaces',
      'Vacuum and/or mop',
      'Put away shoes/coats/hats',
    ], CardSchedule.Saturday),
    schedule: CardSchedule.Saturday
  };

  const sundayTasks: CardInputs = {
    title: 'Sunday tasks - Grocery',
    subtitle: 'Try to complete these every Sunday!',
    localStorageTasks: new LocalStorageList('SundayList', [
      'Clean out fridge',
      'Meal plan',
      'Grocery shop and fill gas tank',
      'Meal prep',
    ], CardSchedule.Sunday),
    schedule: CardSchedule.Sunday
  };

  let weekdays = [
    mondayTasks,
    tuesdayTasks,
    wednesdayTasks,
    thursdayTasks,
    fridayTasks,
    saturdayTasks,
    sundayTasks,
  ];

  const getTaskLists = (dateView: Date, showAllDays: boolean): Array<CardInputs> => {
    dailyTasks.localStorageTasks.moveDate(dateView);
    monthlyTasks.localStorageTasks.moveDate(dateView);
    weekdays.forEach(weekday => weekday.localStorageTasks.moveDate(dateView));
    let tasks = [
      dailyTasks,
      monthlyTasks
    ]
    if (showAllDays) {
      tasks = [...weekdays, ...tasks];
    } else {
      tasks = [weekdays[(dateView.getDay() - 1 + weekdays.length) % weekdays.length], ...tasks];
    }
    return tasks;
  };

  const handleToggleShowAllDays = () => {
    const newShowAllDays = !showAllDays;
    setShowAllDays(newShowAllDays);
    setTaskLists(getTaskLists(date.parse(currentDateViewStr, 'YYYY/MM/DD'), newShowAllDays));
  }

  const [taskLists, setTaskLists] = React.useState(getTaskLists(new Date(), false));

  const moveToPreviousDay = () => {
    const previousDay = date.addDays(date.parse(currentDateViewStr, 'YYYY/MM/DD'), -1);
    setCurrentDateViewStr(date.format(previousDay, 'YYYY/MM/DD'));
    setTaskLists(getTaskLists(previousDay, showAllDays));
  };

  const moveToNextDay = () => {
    const nextDay = date.addDays(date.parse(currentDateViewStr, 'YYYY/MM/DD'), 1);
    setCurrentDateViewStr(date.format(nextDay, 'YYYY/MM/DD'));
    setTaskLists(getTaskLists(nextDay, showAllDays));
  };

  const navigateToToday = () => {
    const today = new Date();
    setCurrentDateViewStr(date.format(today, 'YYYY/MM/DD'));
    setTaskLists(getTaskLists(today, showAllDays));
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            Cleaning Checklist
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            Checklist
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={moveToPreviousDay}
              color="inherit"
            >
              <NavigateBeforeIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: 'flex',
                flexGrow: 1,
              }}>
              {currentDateViewStr}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={moveToNextDay}
              color="inherit"
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ margin: 3 }}>
        <Grid
          direction="column"
          container
          justifyContent="center"
          alignItems="center"
          spacing={3}>
          {taskLists.map((taskList: CardInputs) =>
            <Grid
              key={`${currentDateViewStr}.${taskList.title}`}
              item
              xs={4}>
              <CleaningCard {...taskList} />
            </Grid>
          )}
        </Grid>
      </Box>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Box
          sx={{ width: 300 }}
          role="presentation"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <Box sx={{ margin: 2 }}>
            <Typography variant="h4" component="h1">
              Options
            </Typography>
          </Box>
          <List>
            <ListItem
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggleShowAllDays}
                  checked={showAllDays}
                  inputProps={{ 'aria-labelledby': 'showAllDays' }}
                />
              }
            >
              <ListItemButton role={undefined} onClick={handleToggleShowAllDays} dense>
                <ListItemText id={'showAllDays'} primary={'Show all weekdays'} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton role={'button'} onClick={navigateToToday} dense>
                <ListItemText id={'navigateToToday'} primary={'Navigate to today'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}