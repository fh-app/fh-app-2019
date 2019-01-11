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

function closePanelLeft(e, page) {
  app.panel.close('left');
}

function initPathfinder() {
  closePanelLeft();
  var pfe = new mapSearchEisenstadt();
  console.log(pfe);


}