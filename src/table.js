import React from 'react'
import Table from 'react-bootstrap/Table'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';




export default function TableForData() {

  const [slct, setslct] = useState("Credit")
  const [amnt, setamnt] = useState("")
  const [rmrk, setrmrk] = useState("")
  const [dataof, setdata] = useState([])
  const [change, setchange]= useState(1)

  // let dataoftable= 0
  useEffect(() => {
    axios.post("http://localhost:3005/data").then((data) => {
      //  dataoftable= data.data

      //  console.log(dataoftable)
      let datais = data.data
      Array.from(datais)
      setdata(datais)
      console.log("from function", dataof)
    }).catch(e => { console.log(e) })
  },[change])





  const handleClick = () => {
    axios.post("http://localhost:3005/filldata", {
      "amount": amnt,
      "type": slct,
      "remark": rmrk
    }).then(res => { console.log(res,"response aya kya") 
    setchange(change+1)
  }).catch(e => { console.log(e, "error ayi kya") })

  }

 const handledelet= (id)=>{
  
   axios.post("http://localhost:3005/dlt",{"id":id}).then((res)=>{
    console.log(id)
    setchange(change+1)
   }).catch((e)=>{
     console.log(e)
   })
   

 }

 const handleEdit=(amount, type, remark)=>{
   
 }







  return (
    <>


      <div className='d-flex justify-content-around input'>
        <label htmlFor="">Amount:</label>
        <input className='input' type="text" onChange={(e) => { setamnt(e.target.value) }} />
        <label htmlFor="">Type:</label>
        <select className='select' name="" id="" onChange={(e) => { setslct(e.target.value) }}>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
        <label htmlFor="">Ramark:</label>
        <input className='input' type="text" onChange={(e => { setrmrk(e.target.value) })} />
        <button className='btn btn-success' onClick={handleClick}>Save</button>

      </div>
      <div>

      </div>

      <div className='main'>
        <Table striped bordered hover className='tab'>
          <thead>
            <tr>
              <th>Credit</th>
              <th>Debit</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>


            {console.log("is ans is", dataof)}
            {console.log("ans aya kya", typeof(dataof))}



           


            {
              dataof.map(el => {
                return (
                  <tr key={uuidv4()}>
                    <td>{el.amount}</td>
                    <td>{el.type}</td>
                    <td>{el.remark}</td>
                    <td><button className='btn btn-danger'onClick={()=>{handledelet(el._id)}} >Delete</button>
                      <button className='btn btn-info mx-2' onClick={()=>{handleEdit(el.amount, el.type, el.remark)}}>Edit</button></td>

                  </tr>
                )
              })
            }


          </tbody>
        </Table>


      </div>
    </>
  )
}

