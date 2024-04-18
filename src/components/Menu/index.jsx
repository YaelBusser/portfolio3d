import "./index.css";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {motion} from "framer-motion"

const MenuLink = (props) => {
    const {section, label, onClick, icon} = props;
    return (
        <button
            className={`button-link ${label === "About" && section === 0 && "color-current"} ${label === "Skills" && section === 1 && "color-current"} ${label === "Projects" && section === 2 && "color-current"} ${label === "Contact" && section === 3 && "color-current"}`}
            onClick={onClick}
        >
            {icon} {label}
        </button>
    )
}

const Menu = (props) => {
    const {section, setSection, menuOpened, setMenuOpened, mouseOver, mouseLeave} = props;
    return (
        <div className={"menu"}>
            <button className={"button-switch"} onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={() => setMenuOpened(!menuOpened)}>
                <div className={`bar ${menuOpened && "bar1-open"}`}/>
                <div className={`bar ${menuOpened && "bar2-open"}`}/>
                <div className={`bar ${menuOpened && "bar3-open"}`}/>
            </button>
            <motion.div
                animate={{
                    width: menuOpened ? "20rem" : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 75,
                    duration: 1
                }}
                className={`content`}>
                <div className={"links"}>
                    <MenuLink section={section} label={"About"} icon={<AccountBoxIcon/>} onClick={() => setSection(0)}/>
                    <MenuLink section={section} label={"Skills"} icon={<PsychologyIcon/>}
                              onClick={() => setSection(1)}/>
                    <MenuLink section={section} label={"Projects"} icon={<AccountTreeIcon/>}
                              onClick={() => setSection(2)}/>
                    <MenuLink section={section} label={"Get in touch"} icon={<AlternateEmailIcon/>}
                              onClick={() => setSection(3)}/>
                </div>
            </motion.div>
        </div>
    )
}

export default Menu;