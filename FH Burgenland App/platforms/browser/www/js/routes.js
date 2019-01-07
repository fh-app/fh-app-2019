routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/wegfinder/',
    name: 'wegfinder',
    url: './pages/wegfinder.html',
    on: {
      pageInit: function (e, page) {
        app.panel.close('left');

      }
    }
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
