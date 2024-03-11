
const Container = ({
    children
  }) => {
    return ( 
      <div className="container min-h-screen">
        {children}
      </div>
     );
  };
  
  export default Container;