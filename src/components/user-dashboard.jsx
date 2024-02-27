import { useState , useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";


export function UserDashBoard(){

    const [cookies, setCookie, removeCookie] = useCookies("userid");
    const [appointments, setAppointments] = useState([{Appointment_id:0, Title:'',Description:'',Date:''}]);
    const [EditTasks, setEditTasks] = useState([{Appointment_Id:0, Title:'', Description:'', Date:''}]);
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:7000/appointments/${cookies['userid']}`)
        .then(response=>{
            setAppointments(response.data);
        })
    },[])

    function handleSignout(){
        removeCookie('userid');
        navigate('/login');
        window.location.reload();
    }

    
    function handleCloseClick(e){
        alert('Appointment Deleted...');
        axios.delete(`http://127.0.0.1:7000/delete-task/${e.target.name}`)
        .then(()=>{
            alert('Appointment Delete');
        });
        // window.location.reload();
    }

    const formik = useFormik({
        initialValues:{
            Appointment_Id:0,
            Title:'',
            Description:'',
            Date:'',
            UserId:cookies['userid']
        },
        onSubmit:(task)=>{
            axios.post('http://127.0.0.1:7000/add-task',task);
            alert('Task Added Successfuly...');
            window.location.reload();
        }
    })

    function handleEditClick(id){
         //alert(id);
        console.log(cookies);
        axios.get(`http://127.0.0.1:7000/get-task/${id}`)
        .then(response=>{
           setEditTasks(response.data);
        })
   }


   const editFormik = useFormik({
    initialValues: {
        Appointment_Id: EditTasks[0].Appointment_Id,
        Title: EditTasks[0].Title,
        Description: EditTasks[0].Description,
        Date: EditTasks[0].Date,
        UserId: EditTasks[0].UserId
    },
    onSubmit: (id) => {
         // axios PUT  http://127.0.0.1:7000/edit-task/1, data
         alert("bye");
         //console.log(`http://127.0.0.1:7000/edit-task/id`,task);
         //console.log(`http://127.0.0.1:7000/add-task${appointments.Appointment_Id}`)
        axios.put(`http://127.0.0.1:7000/edit-task/${id}`);
        //alert(task);
        alert('Task Modified Successfuly...');
        //window.location.reload();
    },
    enableReinitialize:true
})

    // const editFormik = useFormik({
    //     initialValues: {
    //         Appointment_Id: EditTasks[0].Appointment_Id,
    //         Title: EditTasks[0].Title,
    //         Description: EditTasks[0].Description,
    //         Date: EditTasks[0].Date,
    //         UserId: EditTasks[0].UserId
    //     },
    //     // onSubmit: (tasks) => {
    //     //      // axios PUT  http://127.0.0.1:7000/edit-task/1, data
    //     //     //  alert(tasks);
    //     //     axios.put(`http://127.0.0.1:7000/edit-task/${appointments.Appointment_Id}`,tasks);
    //     //     alert(tasks);
            
    //     //     alert('Task Modified Successfuly...');
    //     //     // window.location.reload();
    //     onSubmit: (values) => {
    //         axios.put(`http://127.0.0.1:7000/edit-task/${appointments.Appointment_Id}`, values)
    //             .then(() => {
    //                 // alert('Task Modified Successfully');
    //                 window.location.reload(); // You may want to consider updating state instead of reloading the page
    //             })
    //     },
    //     enableReinitialize:true
    // })

    // function handleUpdateClick(e){
    //     axios.put(`http://127.0.0.1:7000/delete-task/${appointments.Appointment_Id}`,tasks)
    //     .then(()=>{
    //         alert('Appointment Update...');
    //     });
    //     window.location.reload();

    // }
    // function handleUpdateClick(e) {
    //     axios.put(`http://127.0.0.1:7000/edit-task/${appointments.Appointment_Id}`, editFormik.values)
    //         .then(() => {
    //             alert('Task Modified Successfully...');
    //             window.location.reload();
    //         });
    //     }
    


    return(
        <div className="bg-light p-4 " style={{ height:'100vh' , width:'100%'}} >
            <h2>Your Appointments <button onClick={handleSignout} className='btn btn-warning'>SignOut</button></h2>
            <div className="mb-3">
                <button data-bs-target="#addTask" data-bs-toggle="modal" className="btn btn-primary  bi bi-calendar-check">Add Appointment</button>
                <div className="modal fade" id="addTask" >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add Appointment</h2>
                            <button data-bs-dismiss="modal" className="btn btn-close" ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <dl>
                                    <dt>Appointment Id</dt>
                                    <dd><input type="text" name="Appointment_Id" onChange={formik.handleChange} /></dd>
                                    <dt>TItle</dt>
                                    <dd><input type="text" name="Title" onChange={formik.handleChange} /></dd>
                                    <dt>Description</dt>
                                    <dd>
                                        <textarea name="Description"  cols="40" rows="4" onChange={formik.handleChange}></textarea>
                                    </dd>
                                    <dt>Date</dt>
                                    <dd>
                                        <input type="date" name="Date" onChange={formik.handleChange} />
                                    </dd>
                                </dl>
                                <button type="submit" className="btn btn-warning" >Add Task</button>
                            </form>
                        </div>
                        </div>

                    </div>


                </div>
            </div>
            {
                appointments.map(appointment=>
                    <div key={appointment.Appointment_id} className="alert alert-success alert-dismissible">
                        <button className="btn btn-close" data-bs-dismiss="alert" onClick={handleCloseClick} name={appointment.Appointment_Id} ></button>
                        {/* <button  name={appointment.Appointment_Id}  className="btn btn-close" data-bs-dismiss="alert" onClick={handleCloseClick}></button> */}
                        {/* try again <button className="btn btn-close" data-bs-dismiss="alert" onClick={()=>{handleCloseClick(appointment.Appointment_Id)}}  ></button> */}
                        <h2>{appointment.Title}</h2>
                        <p>{appointment.Description}</p>
                        <p>{appointment.Date}</p>
                        <button onClick={()=> handleEditClick(appointment.Appointment_Id)}  className="btn btn-warning bi bi-pen-fill"  data-bs-target="#editTask" data-bs-toggle="modal" >Edit</button>
                    </div>
                    )
            }
            <div className="modal fade" id="editTask">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Edit Task</h2>
                            <button className="btn btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editFormik.handleSubmit}>
                            <dl>
                                <dt>Title</dt>
                                <dd><input type="text" value={editFormik.values.Title} onChange={editFormik.handleChange} name="Title" /></dd>
                                <dt>Description</dt>
                                <dd>
                                    <textarea rows="4" value={editFormik.values.Description} onChange={editFormik.handleChange} name="Description" cols="40"></textarea>
                                </dd>
                                <dt>Date</dt>
                                <dd>
                                    <input type="date" value={editFormik.values.Date} onChange={editFormik.handleChange} name="Date" />
                                </dd>
                            </dl>
                            <button type="submit" className="btn btn-success">Save</button>
                            {/* /onClick={handleUpdateClick}/  */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}