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
      },
    paddingStyles : {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
    }
}


export default function Settings({show, setShow}) {
    const { anchorEl, setAnchorEl, clearAnchorEl } = useAnchorElStateApi(null);

    

    const handleCheck = (name) => (_, checked) => {
      setShow({
        ...show,
        [name]: checked
      });
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
      <MenuItem>
        <FormControl component="fieldset" style={styles.paddingStyles}>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="# of Projects"
              control={<Switch color="primary" checked={show.projects} onChange={handleCheck('projects')} />} 
              label="# of Projects"
              labelPlacement="end"
            />
            </FormGroup>
          </FormControl>
      </MenuItem>
      <MenuItem>
        <FormControl component="fieldset" style={styles.paddingStyles}>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="rev"
              control={<Switch color="primary" checked={show.revenue} onChange={handleCheck('revenue')} />}
              label="Avg Monthly Revenue Impact"
              labelPlacement="end"
            />
            </FormGroup>
          </FormControl>
        </MenuItem>
        <MenuItem>
        <FormControl component="fieldset" style={styles.paddingStyles}>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="success"
              control={<Switch color="primary" checked={show.successRate} onChange={handleCheck('successRate')} />}
              label="Success Rate"
              labelPlacement="end"
            />
            </FormGroup>
          </FormControl>
        </MenuItem>
        <MenuItem>
       <FormControl component="fieldset" style={styles.paddingStyles}>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="slip"
              control={<Switch color="primary" checked={show.slipRate} onChange={handleCheck('slipRate')} />}
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
