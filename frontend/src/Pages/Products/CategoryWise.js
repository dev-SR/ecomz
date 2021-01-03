import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Item } from '../../Components/Abstraction/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../Redux/actions/category-action';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
   cardRoot: {
      overflow: 'visible'
   },
   media: {
      height: 140,
      marginTop: '-7px',
      marginLeft: '10px',
      marginRight: '-5px',
      borderRadius: '5px'
   },
   content: {
      padding: '8px'
   },
   heading: {
      position: 'relative'
   },
   title: {
      ...theme.typography.h6,
      position: 'absolute',
      padding: '10px',
      backgroundColor: 'black',
      color: '#fffde7',
      opacity: 0.5,
      left: '-5px',
      top: '14px',
      zIndex: 100
   }
}));
const datas = [
   {
      heading: 'Holiday deals',
      img:
         '   https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/HolidayDeals/Desktop/Fuji_Dash_HolidayDeals_1x._SY304_CB414581989_.jpg',
      imgTtitle: 'Holiday deals'
   },
   {
      heading: 'Holiday deals',
      img:
         '   https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/HolidayDeals/Desktop/Fuji_Dash_HolidayDeals_1x._SY304_CB414581989_.jpg',
      imgTtitle: 'Holiday deals'
   },
   {
      heading: 'Holiday deals',
      img:
         '   https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/HolidayDeals/Desktop/Fuji_Dash_HolidayDeals_1x._SY304_CB414581989_.jpg',
      imgTtitle: 'Holiday deals'
   }
];

export default function CategoryWise({ data = null }) {
   const classes = useStyles();
   const dispatch = useDispatch();
   const s = useSelector(s => s.category);
   const history = useHistory();
   const { cat } = s;
   useEffect(() => {
      if (!cat) {
         dispatch(getCategories());
      }
   }, []);

   const goToCategory = id => {
      history.push({
         pathname: `/shop/cat/${id}`,
         state: { category: id }
      });
   };
   return (
      <Container spacing={2}>
         {cat &&
            cat.map(item => (
               <Item xs={6} sm={6} md={4}>
                  <Card classes={{ root: classes.cardRoot }}>
                     <div className={classes.heading}>
                        <Typography
                           type='headline'
                           component='h2'
                           classes={{ root: classes.title }}>
                           {item.cat_name}
                        </Typography>
                     </div>
                     <CardActionArea onClick={e => goToCategory(item.cat_id)}>
                        <CardMedia
                           className={classes.media}
                           image={item.image}
                           title={item.imgTtitle}
                        />
                     </CardActionArea>
                     <CardActions>
                        <Button
                           size='small'
                           color='primary'
                           onClick={e => goToCategory(item.cat_id)}>
                           Learn More
                        </Button>
                     </CardActions>
                  </Card>
               </Item>
            ))}
      </Container>
   );
}
