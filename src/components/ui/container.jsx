
const Container = ({
    children
  }) => {
    return ( 
      <div className="container px-4 md:px-8 min-h-screen">
        {children}
      </div>
     );
  };
  
  export default Container;