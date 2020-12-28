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
import { login } from '../Redux/actions/user-action';
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
      marginTop: theme.spacing(1)
   },
   submit: {
      margin: theme.spacing(3, 0, 2)
   },
   linktext: {
      textDecoration: 'none'
   }
}));

const initialValue = [
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
   },

   {
      type: 'checkbox',
      name: 'remember',
      label: 'Remember Me',
      checked: false
   }
];
// let s;

export default function SignIn() {
   const classes = useStyles();
   const dispatch = useDispatch();
   const history = useHistory();
   const user = useSelector(s => s.user);
   const { loading, success, error } = user;
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
   }, [loading, success, error]);

   const submitHandler = async e => {
      e.preventDefault();
      const [email, pass] = inputs;
      if (!errorExist) dispatch(login(email.value, pass.value));
   };

   return (
      <>
         <Layout
            title='Signin'
            drawerData={DrawerDataPublic}
            withNav={<PublicNav />}>
            <Container component='main' maxWidth='xs'>
               <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                     <LockOutlinedIcon />
                  </Avatar>
                  <Typography component='h1' variant='h5'>
                     Sign in
                  </Typography>
                  <form
                     className={classes.form}
                     noValidate
                     onSubmit={submitHandler}>
                     {inputs
                        .filter(input => input.type === 'text')
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
                     <Grid container>
                        <Grid item xs>
                           <Typography
                              component={Link}
                              to='/forgot'
                              className={classes.linktext}
                              variant='p'>
                              Forgot Password?
                           </Typography>
                        </Grid>
                        <Grid item>
                           <Typography
                              component={Link}
                              to='/register'
                              variant='p'
                              className={classes.linktext}>
                              "Don't have an account? Sign Up"
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
