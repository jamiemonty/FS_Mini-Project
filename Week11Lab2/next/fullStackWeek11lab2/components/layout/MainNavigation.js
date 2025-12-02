import classes from './MainNavigation.module.css';
import Link from 'next/link';
import HamMenu from "../generic/HamMenu";
import HamMenuFAB from "../generic/HamMenuFAB";
import { useContext } from 'react';
import GlobalContext from "../../pages/store/globalContext";
import HamMenuContent from "./HamMenuContent";
import { useRouter } from 'next/router';

function MainNavigation() {
  const globalCtx = useContext(GlobalContext);
  const router = useRouter();

  function toggleMenuHide() {
    globalCtx.updateGlobals({ cmd: 'hideHamMenu', newVal: false });
  }

  // Use books instead of meetings
  const contents = [];
  globalCtx.theGlobalObject.books.forEach(element => {
    contents.push({ title: element.title, webAddress: '/' + element.id });
  });

  return (
    <header className={classes.header}>
      <HamMenuContent contents={contents} />
      <HamMenu onToggleMenu={toggleMenuHide} />
      <HamMenuFAB toggleMenuHide={toggleMenuHide} />
      <nav>
        <ul>
          <li>
            <Link href='/'>All Books</Link> ({globalCtx.theGlobalObject.books.length})
          </li>
          <li>
            <Link href='/new-book'>Add New Book</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;