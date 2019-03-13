routes = [
  {
    path: '/',
    url: './index.html',
    name: 'home',
    on: {
      pageInit: closePanelLeft
    }
  },
  {
    path: '/cis/',
    componentUrl: './pages/cis.html',
  },
  {
    path: '/noten/',
    componentUrl: './pages/noten.html',
  },
  {
    path: '/login/',
    name: 'login',
    componentUrl: './pages/login-screen-page.html',
  },
  {
    path: '/wegfindere/',
    name: 'wegfindere',
    url: './pages/wegfindere.html',
    on: {
      pageInit: initPathfinder
    }
  },
  {
    path: '/wegfinderp/',
    name: 'wegfinderp',
    url: './pages/wegfinderp.html',
    on: {
      pageInit: closePanelLeft
    }
  },
  {
    path: '/personen/',
    name: 'personen',
    url: './pages/personen.html',
    on: {
      pageInit: closePanelLeft
    }
  },
  {
    path: '/infos/',
    name: 'infos',
    url: './pages/infos.html',
    on: {
      pageInit: closePanelLeft
    }
  },
  {
    path: '/umgebungsplan/',
    name: 'umgebungsplan',
    url: './pages/umgebungsplan.html',
    on: {
      pageInit: closePanelLeft
    }
  },
  {
    path: '/mensa/',
    name: 'mensa',
    url: './pages/mensa.html',
    on: {
      pageInit: closePanelLeft
    }
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];

/**
 * Closes Left Panel
 * @param Event e
 * @param string page
 */
function closePanelLeft(e, page) {
  app.panel.close('left');
}

/**
 * Initializes Pathfinder
 */
function initPathfinder() {
  closePanelLeft();
  var pfe = new mapSearchEisenstadt();
}

function checkLogin() {
  console.log('jipie');
  return false;
}