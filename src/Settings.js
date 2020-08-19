import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { useAnchorElStateApi } from "use-state-api-hooks";



const styles = {
    root: {
        position: 'absolute',
        top: 60,
        right: 8
    },
    settingsIcon: {
        fill: 'white'
      }
}


export default function Settings() {
    const { anchorEl, setAnchorEl, clearAnchorEl } = useAnchorElStateApi(null);
    return( 
        <div style={styles.root}> 
        <IconButton onClick={setAnchorEl}> <SettingsIcon color='white' fill='white' styles={styles.settingsIcon} /></IconButton>
        <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={clearAnchorEl}
      >
        <MenuItem onClick={clearAnchorEl}>Profile</MenuItem>
        <MenuItem onClick={clearAnchorEl}>My account</MenuItem>
        <MenuItem onClick={clearAnchorEl}>Logout</MenuItem>
      </Menu>
        </div>
    )
    
};
