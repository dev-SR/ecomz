import React from 'react';

import { Menu as MuiMenu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const StyledMenuItem = withStyles(theme => ({
   root: {
      '&:focus': {
         backgroundColor: 'pink',
         '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white
         }
      }
   }
}))(MenuItem);

export const Menu = ({
   items,
   onClose,
   handleMenuItemClick,
   selectedIndex,
   anchorEl
}) => (
   <MuiMenu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      MenuListProps={{ onMouseLeave: onClose }}>
      {items.map((item, index) => (
         <StyledMenuItem
            key={index}
            onClick={e => {
               handleMenuItemClick(e, index);
               onClose();
            }}
            component={Link}
            to={item.to}
            selected={index === selectedIndex}
            disabled={item.disabled}>
            {item.name}
         </StyledMenuItem>
      ))}
   </MuiMenu>
);
// function App() {
//    const classes = useStyles();
//    const [items, setItems] = useState([
//       { name: 'First' },
//       { name: 'Second' },
//       { name: 'Third' },
//       { name: 'Fourth', disabled: true }
//    ]);
//    const [anchorEl, setAnchorEl] = useState(null);
//    const [selectedIndex, setSelectedIndex] = useState(0);

//    const onOpen = e => {
//       setAnchorEl(e.currentTarget);
//    };
//    const onClose = () => {
//       setAnchorEl(null);
//    };

//    const handleMenuItemClick = (e, i) => {
//       setSelectedIndex(i);
//    };

//    return (
//       <>
//          {/* <Button onClick={onOpen}>
//             Menu
//             <MenuIcon className={classes.rightIcon} />
//          </Button> */}
//          <MyMenu onClose={onClose}
//                  anchorEl={anchorEl}
//                  handleMenuItemClick={handleMenuItemClick}
//                  selectedIndex={selectedIndex} />
//       </>
//    );
// }
