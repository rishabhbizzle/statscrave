
const Container = ({
    children
  }) => {
    return ( 
      <div className="mx-auto w-full max-w-7xl px-4">
        {children}
      </div>
     );
  };
  
  export default Container;