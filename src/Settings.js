import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { useAnchorElStateApi } from "use-state-api-hooks";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';



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
    const [checked, setChecked] = React.useState(false);

    const toggleChecked = () => {
      setChecked((prev) => !prev);
    };

    return( 
        <div style={styles.root}> 
        <IconButton onClick={setAnchorEl}> <SettingsIcon color='white' fill='white' styles={styles.settingsIcon} /></IconButton>
        <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={clearAnchorEl}
      >
        <MenuItem onClick={clearAnchorEl}><FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="# of Projects"
              control={<Switch color="primary" checked={checked} onChange={toggleChecked} />} 
              label="# of Projects"
              labelPlacement="end"
            />
            </FormGroup>
          </FormControl>
        </MenuItem>
        <MenuItem onClick={clearAnchorEl}><FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="rev"
              control={<Switch color="primary" />}
              label="Avg Monthly Revenue Impact"
              labelPlacement="end"
            />
            </FormGroup>
          </FormControl>
        </MenuItem>
        <MenuItem onClick={clearAnchorEl}><FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="success"
              control={<Switch color="primary" />}
              label="Success Rate"
              labelPlacement="end"
            />
            </FormGroup>
          </FormControl>
        </MenuItem>
        <MenuItem onClick={clearAnchorEl}><FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="slip"
              control={<Switch color="primary" />}
              label="Avg Slip Rate"
              labelPlacement="end"
            />
            </FormGroup>
          </FormControl>
        </MenuItem>

      </Menu>
        </div>
    )
    
};
