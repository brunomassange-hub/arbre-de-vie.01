/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Beliefs from './pages/Beliefs';
import Cognitive from './pages/Cognitive';
import Goals from './pages/Goals';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import Roots from './pages/Roots';
import Trunk from './pages/Trunk';
import Garden from './pages/Garden';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Beliefs": Beliefs,
    "Cognitive": Cognitive,
    "Goals": Goals,
    "Home": Home,
    "Journal": Journal,
    "Profile": Profile,
    "Progress": Progress,
    "Roots": Roots,
    "Trunk": Trunk,
    "Garden": Garden,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};