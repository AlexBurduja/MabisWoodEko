const Marker = (props) => {
    const { text } = props;
  
    return (
      <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
        <img src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" alt="Marker" />
        <div style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>
          {text}
        </div>
      </div>
    );
  };