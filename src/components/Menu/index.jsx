import "./index.css";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
const MenuLink = (props) => {
    const {label, onClick, icon} = props;
    return (
        <button className={"button-link"} onClick={onClick}>
            {icon} {label}
        </button>
    )
}

const Menu = (props) => {
    const {setSection, menuOpened, setMenuOpened} = props;
    return (
        <div className={"menu"}>
            <button className={"button-switch"} onClick={() => setMenuOpened(!menuOpened)}>
                <div className={`bar ${menuOpened && "bar1-open"}`}/>
                <div className={`bar ${menuOpened && "bar2-open"}`}/>
                <div className={`bar ${menuOpened && "bar3-open"}`}/>
            </button>
            <div className={`content ${menuOpened ? "content-open" : "content-close"}`}>
                <div className={"links"}>
                    <MenuLink label={"About"} icon={<AccountBoxIcon/>} onClick={() => setSection(0)}/>
                    <MenuLink label={"Skills"} icon={<PsychologyIcon/>} onClick={() => setSection(1)}/>
                    <MenuLink label={"Projects"} icon={<AccountTreeIcon/>} onClick={() => setSection(2)}/>
                    <MenuLink label={"Contact"} icon={<AlternateEmailIcon/>} onClick={() => setSection(3)}/>
                </div>
            </div>
        </div>
    )
}

export default Menu;