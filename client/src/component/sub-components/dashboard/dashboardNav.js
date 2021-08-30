import { Link } from 'react-scroll';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {ArrowBackIcon} from "../../materialUI/icons"


const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

}));


function NavDashboard(props){
  const classes = useStyles();

  
  function filteredTextHolder(e){
    props.dashBoardSortP(e.target.value)
  }
  function  goBack(){
      props.history.goBack()
  }

  function  filler(){
    props.history.push("/home/"+props.id)
  }
    return(
      <nav id="nav__dashboard">
        <h4> number of upload ({props.numberOfItemP})</h4>
         <div className={classes.search} className="nav__dashboard__search">
                        <div className={classes.searchIcon}>
                        <SearchIcon style={{marginLeft: -55 + 'px'}} />
                        </div>
                        <InputBase
                            onChange={filteredTextHolder}
                            placeholder="Search…"
                            classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}/>
          </div>
          <span id="nav__dashboard__back" onClick={goBack}>
                    <ArrowBackIcon style={{fontSize: 34 + 'px'}}/>
          </span>
      </nav>
    )
}
export default NavDashboard;