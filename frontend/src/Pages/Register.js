import { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MUI from '../Components/Abstraction/Controls';
import { useForm } from '../Components/Reusable/useForm';
import { register } from '../Redux/actions/user-action';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar, { useSnackBar } from '../Components/Reusable/SnackBar';
import Loader, { useLoader } from '../Components/Reusable/Loader';
import { PublicNav } from '../Components/Shared/PublicNav';
import Layout from '../Components/Shared/Layout';
import { DrawerDataPublic } from '../Components/Abstraction/Drawer';

const useStyles = makeStyles(theme => ({
   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
   },
   form: {
      width: '100%', // Fix IE11 issue.
      marginTop: theme.spacing(3)
   },
   submit: {
      margin: theme.spacing(5, 0, 2)
   },
   linktext: {
      textDecoration: 'none'
   }
}));
const initialValue = [
   {
      type: 'text',
      splitInHalf: true,
      name: 'firstName',
      id: 'firstName',
      label: 'First Name',
      placeholder: 'Jhon',
      value: '',
      validate: value => value === '' || value.length > 3,
      error: false,
      helperText: 'First Name length must be greater than 3'
   },
   {
      type: 'text',
      splitInHalf: true,
      name: 'lastName',
      id: 'lastName',
      label: 'Last Name',
      placeholder: 'Smith',
      value: '',
      validate: value => value === '' || value.length > 3,
      error: false,
      helperText: 'Last Name length must be greater than 3'
   },
   {
      type: 'text',
      name: 'Email',
      id: 'this-email',
      label: 'Email',
      placeholder: 'john@gmail.com',
      value: '',
      validate: value => value === '' || /\S+@\S+\.\S+/.test(value),
      error: false,
      helperText: 'Please enter correct email'
   },
   {
      type: 'text',
      name: 'Password',
      id: 'this-pass',
      label: 'password',
      placeholder: 'aA-zZ 1-9',
      value: '',
      validate: value => value === '' || value.length > 6,
      error: false,
      helperText: 'Password length must be greater than 6'
   }
];
export default function SignUp() {
   const classes = useStyles();
   const dispatch = useDispatch();
   const history = useHistory();
   const user = useSelector(s => s.user);
   const { loading, success, error, validation_error } = user;
   // validation_error: [
   //    {
   //       param: 'email',
   //       msg: 'Must be a valid email'
   //    }
   // ];
   const { openSnackBar, handleSnackBarClose, setopenSnackBar } = useSnackBar();
   const { openLoader, handleLoaderClose, setopenLoader } = useLoader();

   const { inputs, onChangeValidate, errorExist } = useForm(initialValue);
   useEffect(() => {
      if (success) {
         history.push('/');
      }
      if (loading) setopenLoader(true);
      else setopenLoader(false);

      if (error) {
         setopenSnackBar(true);
      } else setopenSnackBar(false);
   }, [loading, success, error, validation_error]);

   const submitHandler = async e => {
      e.preventDefault();
      const [fname, lname, email, pass] = inputs;
      console.log(inputs);
      if (!errorExist)
         dispatch(register(fname.value, lname.value, email.value, pass.value));
   };

   return (
      <>
         <Layout
            title='Register'
            drawerData={DrawerDataPublic}
            withNav={<PublicNav />}>
            <Container component='main' maxWidth='xs'>
               <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography component='h1' variant='h5'>
                     Sign up
                  </Typography>
                  <form
                     className={classes.form}
                     noValidate
                     onSubmit={submitHandler}>
                     <Grid container spacing={2}>
                        {inputs
                           .filter(input => input.splitInHalf)
                           .map(input => (
                              <Grid item xs={12} sm={6}>
                                 <MUI.Input
                                    key={input.name}
                                    label={input.label}
                                    id={input.id}
                                    name={input.name}
                                    value={input.value}
                                    onChange={onChangeValidate}
                                    helperText={input.error && input.helperText}
                                    error={input.error}
                                    placeholder={input.placeholder}
                                 />{' '}
                              </Grid>
                           ))}
                     </Grid>

                     {inputs
                        .filter(
                           input => input.type === 'text' && !input.splitInHalf
                        )
                        .map(input => (
                           <MUI.Input
                              key={input.name}
                              label={input.label}
                              id={input.id}
                              name={input.name}
                              value={input.value}
                              password={
                                 input.name === 'Password' ? 'password' : ''
                              }
                              onChange={onChangeValidate}
                              helperText={input.error && input.helperText}
                              error={input.error}
                              placeholder={input.placeholder}
                           />
                        ))}
                     {inputs
                        .filter(input => input.type === 'checkbox')
                        .map(input => (
                           <MUI.Checkbox
                              label={input.label}
                              onChange={onChangeValidate}
                              name={input.name}
                              checked={input.checked}
                           />
                        ))}
                     <MUI.Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        className={classes.submit}
                        text='Sign In'
                     />
                     <Grid container justifyContent='flex-end'>
                        <Grid item>
                           <Typography
                              variant='p'
                              component={Link}
                              to='/signin'
                              className={classes.linktext}>
                              Already have an account? Sign in
                           </Typography>
                        </Grid>
                     </Grid>
                  </form>
                  <Snackbar
                     severity='error'
                     open={openSnackBar}
                     handleClose={handleSnackBarClose}
                     msg={user && user.error ? user.error : 'Error Connecting'}
                  />
                  <Loader open={openLoader} handleClose={handleLoaderClose} />
               </div>
            </Container>
         </Layout>
      </>
   );
}
