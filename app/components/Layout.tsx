import * as React from 'react';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="layout-container">
      <div>{children}</div>
    </div>
  );
};

export default Layout;
