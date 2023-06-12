import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Exit = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [vehicleNumber, setVehicleNumber] = useState();
  const navigate = useNavigate();
  let storedData = JSON.parse(localStorage.getItem('tehkikat'));
  let dataRAM = JSON.parse(localStorage.getItem("entry"));

  function handleSubmit() {
    let theft = false
    let name = firstName
    if (lastName !== undefined) {
      name += " " + lastName
    }
    let timeDifference; 

    let index = 0; 
    for(index  = 0; index < storedData.length; index++) {
      if(storedData[index].vehicleNumber === vehicleNumber) {
        storedData[index].insideCampus = false;
        let len = storedData[index].history.length; 
        timeDifference = +new Date(storedData[index].history[len-1].exit) - +new Date();
        storedData[index].history[len-1].exit = +new Date();
        break; 
      }
    }
    
    dataRAM?.forEach(function (item, ind) {
      if (item.vehicleNumber === vehicleNumber) {

        if (item.name !== name) {
          theft = true;
        }
        
        // if length is 1
        if (dataRAM.length === 1) {
          dataRAM = []
        }
        else
          dataRAM.splice(ind, 1);
      }
    });
    if(theft === true) {
      alert('Credential Mismatch'); 
    }
    else if(timeDifference < 0) {
      alert(`Pay fine`)
    }
    else{
      alert('Succesfully Exit')
    }
    

     
    localStorage.setItem("tehkikat", JSON.stringify(storedData));
    localStorage.setItem("entry", JSON.stringify(dataRAM));
    navigate('/'); 
  }

  return (
    <div className="mt-2 mx-auto w-full max-w-xl border-2 shadow-md border-slate-400 min-h-[60vh]">
      <header
        className="flex flex-row text-center"
        style={{ backgroundColor: "#61C0BF" }}
      >
        <div className="basis-1/2 text-xl font-mono border-b-2 border-slate-600 p-3">
          <Link to="/entry">Entry</Link>
        </div>
        <div className="basis-1/2 text-xl font-mono border-b-2 border-slate-600 p-3">
          Exit
        </div>
      </header>
      <div className="font-mono">
        <form className="p-3" onSubmit={handleSubmit}>
          <div className="form-row row">
            <div className="col-md-6">
              <label htmlFor="fName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="fName"
                placeholder="First name"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="lName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lName"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="inputRegNo">Vehicle Number</label>
            <input
              type="text"
              className="form-control"
              id="inputRegNo"
              placeholder="BR26AEXXXX"
              pattern="[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}"
              required
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
          </div>
          <div className="grid justify-items-center">
            <input
              type="submit"
              value="EXIT"
              className="hover:-translate-y-0.5 transition motion-reduce:hover:translate-y-0 motion-reduce:transition-none border-spacing-2 border-2 bg-stone-700 text-stone-100 px-3 py-2 mt-4 rounded-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Exit;