

export const PublicRoutes = ({ children, isLogged }) => {
 
  if (!isLogged) {
  
 return children;
  }
};
