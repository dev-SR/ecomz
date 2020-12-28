import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles(theme => ({
   arrow: {
      color: '#fff',
      filter: 'drop-shadow(1px 0px 2px #ccc)'
   },
   tooltip: {
      backgroundColor: '#fff',
      color: '#000',
      padding: 0,
      pointerEvents: 'all',
      boxShadow: theme.shadows[1]
   }
}))(Tooltip);

export default function CustomizedTooltips({ children, component, ...rest }) {
   return (
      <div>
         <LightTooltip arrow interactive title={component} {...rest}>
            {children}
         </LightTooltip>
      </div>
   );
}
