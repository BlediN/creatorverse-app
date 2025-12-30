import { useRoutes, Link } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ViewCreator from './pages/ViewCreator';

function App() {
  const routes = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/new', element: <AddCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
    { path: '/view/:id', element: <ViewCreator /> }
  ]);

  return (
    <main className="container">
      <nav>
        <ul>
          <li><strong>Creatorverse</strong></li>
        </ul>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/new">Add Creator</Link></li>
        </ul>
      </nav>

      {routes}
    </main>
  );
}

export default App;
