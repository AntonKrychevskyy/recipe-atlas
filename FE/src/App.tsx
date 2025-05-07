import { Outlet, Link } from 'react-router';
import { PopupContainer, Toaster } from './components';

function App() {
  return (
    <>
      <header className="frame-grid header">
        <div className="breakout">
          <h1>
            <Link to="/">Recipe Atlas</Link>
          </h1>
        </div>
      </header>
      <div className="content">
        <Outlet />
      </div>
      <footer className="frame-grid footer">
        <div className="breakout">ⓒ 2025</div>
      </footer>
      <Toaster />
      <PopupContainer />
    </>
  );
}

export default App;
