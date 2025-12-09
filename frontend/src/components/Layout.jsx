import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

