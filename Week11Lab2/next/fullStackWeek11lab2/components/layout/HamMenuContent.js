import classes from './HamMenuContent.module.css';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import GlobalContext from "../../pages/store/globalContext";

export default function HamMenuContent(props) {
    const globalCtx = useContext(GlobalContext);
    const router = useRouter();

    // Hide menu if global state says so
    if (globalCtx.theGlobalObject.hideHamMenu) {
        return null;
    }

    // Navigate to the selected address and close menu
    function handleMenuClick(webAddress) {
        globalCtx.updateGlobals({ cmd: 'hideHamMenu', newVal: true });
        router.push(webAddress);
    }

    // Close menu when background is clicked
    function handleBackgroundClick(e) {
        // Prevent closing if clicking inside the menu
        if (e.target === e.currentTarget) {
            globalCtx.updateGlobals({ cmd: 'hideHamMenu', newVal: true });
        }
    }

    // Render menu items
    const contentJsx = props.contents.map((item, index) => (
        <div
            className={classes.menuItem}
            key={index}
            onClick={() => handleMenuClick(item.webAddress)}
            tabIndex={0}
            role="button"
            aria-label={`Go to ${item.title}`}
            onKeyPress={e => {
                if (e.key === 'Enter' || e.key === ' ') handleMenuClick(item.webAddress);
            }}
        >
            {item.title}
        </div>
    ));

    return (
        <div className={classes.background} onClick={handleBackgroundClick}>
            <nav className={classes.mainContent}>
                {contentJsx}
            </nav>
        </div>
    );
}