routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    name: 'wegfinder',
    path: '/wegfinder/',
    componentUrl: './pages/wegfinder.html',
  },
  {
    name: 'about',
    path: '/about/',
    url: './pages/about.html',
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
