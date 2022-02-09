import React, {Component} from 'react';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const customer = [
  {
    id:1,
    name:"Yogesh Sandhankoti",
    type:"General",
    email:"yogeshsandhankoti@fitcart.com",
    phone_number:"88890765432",
    date:"17/12/2021",
    active:true
  },
  {
    id:2,
    name:"Rohit",
    type:"General",
    email:"yogeshRohiyt@gamil.com",
    phone_number:"8098076532",
    date:"01/2/2022",
    active:true
  },
  {
    id:3,
    name:"Yogesh Sandhankoti",
    type:"General",
    email:"yogeshsandhankoti@fitcart.com",
    phone_number:"88890765432",
    date:"17/12/2021",
    active:false
  },
  {
    id:4,
    name:"Ritu",
    type:"General",
    email:"ritu@fitcart.com",
    phone_number:"78890765432",
    date:"18/11/2021",
    active:true
  },
  {
    id:5,
    name:"Yogesh ",
    type:"General",
    email:"yogesh@gmail.com",
    phone_number:"88090765432",
    date:"17/01/2022",
    active:false
  },
  {
    id:1,
    name:"Yogesh Sandhankoti",
    type:"General",
    email:"yogeshsandhankoti@fitcart.com",
    phone_number:"88890765432",
    date:"17/12/2021",
    active:true
  },
  {
    id:2,
    name:"Rohit",
    type:"General",
    email:"yogeshRohiyt@gamil.com",
    phone_number:"8098076532",
    date:"01/2/2022",
    active:true
  },
  {
    id:3,
    name:"Yogesh Sandhankoti",
    type:"General",
    email:"yogeshsandhankoti@fitcart.com",
    phone_number:"88890765432",
    date:"17/12/2021",
    active:false
  },
  {
    id:4,
    name:"Ritu",
    type:"General",
    email:"ritu@fitcart.com",
    phone_number:"78890765432",
    date:"18/11/2021",
    active:true
  },
  {
    id:5,
    name:"Yogesh ",
    type:"General",
    email:"yogesh@gmail.com",
    phone_number:"88090765432",
    date:"17/01/2022",
    active:false
  },
  {
    id:1,
    name:"Yogesh Sandhankoti",
    type:"General",
    email:"yogeshsandhankoti@fitcart.com",
    phone_number:"88890765432",
    date:"17/12/2021",
    active:true
  },
  {
    id:2,
    name:"Rohit",
    type:"General",
    email:"yogeshRohiyt@gamil.com",
    phone_number:"8098076532",
    date:"01/2/2022",
    active:true
  },
  {
    id:3,
    name:"Yogesh Sandhankoti",
    type:"General",
    email:"yogeshsandhankoti@fitcart.com",
    phone_number:"88890765432",
    date:"17/12/2021",
    active:false
  },
  {
    id:4,
    name:"Ritu",
    type:"General",
    email:"ritu@fitcart.com",
    phone_number:"78890765432",
    date:"18/11/2021",
    active:true
  },
  {
    id:5,
    name:"Yogesh ",
    type:"General",
    email:"yogesh@gmail.com",
    phone_number:"88090765432",
    date:"17/01/2022",
    active:false
  }
]

export default class CustomerComponent extends Component {

  render() {
    return(
      <div data-component="CustomerComponent">
          <div className='row'>
            <div className='col-md-12'>
                <div className='tableRow'>
                    <div className='col-2'>Name</div>
                    <div className='col text-center'>Type</div>
                    <div className='col-3 text-center'>Email</div>
                    <div className='col text-center'>Mobile No.</div>
                    <div className='col text-center'>Reg. Date</div>
                    <div className='col-1 text-center'>Active</div>
                    <div className='col-1 text-end'>Edit</div>
                </div>
            </div>
          </div>
          {customer?.map(p=>{return(
            <div className='row'>
              <div className='col-md-12'>
                  <div className='tableCell'>
                      <div className='tableBody col-2'>{p?.name}</div>
                      <div className='col text-center'>{p?.type}</div>
                      <div className='tableBody col-3 justify-content-center'>{p?.email}</div>
                      <div className='col text-center'>{p?.phone_number}</div>
                      <div className='col text-center'>{p?.date}</div>
                      <div className='col-1 text-center'>{p?.active ===true ?<CheckCircleOutlineOutlinedIcon className='check-icon'/>:<CancelOutlinedIcon className='cancel-icon'/>}</div>
                      <div className='col-1 text-end'><EditOutlinedIcon className='edit-icon'/></div>
                  </div>
              </div>
            </div>
            )}
          )}
      </div>
    )
  }
}