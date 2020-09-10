
/**
 * MenuBar component
 *
 * <MenuBar active={0} setActive={...} />
 *  (active is index of current screen)
 *
 */

import React from 'react';
import { AppBar, Toolbar, IconButton, Tabs, Tab } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import NotesIcon from '@material-ui/icons/Notes';
import PopoverMenu from './popovermenu';
import { downloadData } from '../common/utils';
import { AboutDialog } from './dialogs';

export default ({ active, setActive }) => {
  const [aboutOpen, setAboutOpen] = React.useState(false);
  return (
    <React.Fragment>
      <AppBar color="primary" style={{ top: 'auto', bottom: 0 }}>
        <Toolbar style={{ minHeight: 0 }}>
          <IconButton edge="start" color="inherit" onClick={() => console.log("open menu")}>
            <MenuIcon />
          </IconButton>
          <Tabs
            value={active} onChange={(e, val) => setActive(val)}
            TabIndicatorProps={{ style: { backgroundColor: 'white' } }}
          >
            <Tab label={<div><DeveloperBoardIcon style={{verticalAlign: 'middle'}} /> Board</div>}  />
            <Tab label={<div><NotesIcon style={{verticalAlign: 'middle'}} /> Notes</div>}  />
          </Tabs>
          <div style={{ flexGrow: 1 }} />
          <PopoverMenu map={{
            "Submit feedback": () => window.open('mailto'+':oliver.'+'leo.balfour+mirrorsupport'+'@googlemail'+'.com', '_blank'),
            "About": () => setAboutOpen(true),
            "Clear saved state": () => window.prompt("Delete all saved state? Pressing undo will fix this. Type YES to confirm", "NO") === "YES" && localStorage.clear(),
            "Import state": () => { localStorage.kanban = window.prompt("Paste your exported state here. Press cancel (or the undo button after pressing OK) to revert. Refresh the page to confirm and reload state.") },
            "Export state": () => downloadData(localStorage.kanban, "mirror-backup.json", "application/json"),
          }}>
            <IconButton edge="end" color="inherit">
              <MoreIcon />
            </IconButton>
          </PopoverMenu>
        </Toolbar>
      </AppBar>
      <AboutDialog open={aboutOpen} respond={() => setAboutOpen(false)} />
    </React.Fragment>
  );
}
