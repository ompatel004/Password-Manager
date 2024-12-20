import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const getPasswords = async (params) => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords);
    setpasswordArray(passwords)

  }


  useEffect(() => {
    getPasswords();
  }, [])


  const showPassword = () => {
    passwordref.current.type = "text";
    // console.log(ref.current.src)
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png"
      passwordref.current.type = "password";
    }
    else {
      ref.current.src = "icons/hidden.png"
      passwordref.current.type = "text";
    }
    // alert("Show the Password");
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      
      await fetch("http://localhost:3000/", {method: 'DELETE',headers: {'Content-Type': 'application/json'},body: JSON.stringify({id:form.id})})
      
      
      await fetch("http://localhost:3000/", {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({ ...form, id: uuidv4() })})

      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      // console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" })
      toast('Password saved!');
    }
  }

  const deletePassword = async (id) => {
    console.log("Deleting password with id ", id);

    let c = confirm("Do you really want do delete this password?")

    if (c) {
      const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
      setpasswordArray(updatedPasswordArray);
      
      await fetch("http://localhost:3000/", {method: 'DELETE',headers: {'Content-Type': 'application/json'},body: JSON.stringify({id})})
      // localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray))
      toast('Password Deleted!');
    }
  }

  const editPassword = (id) => {
    console.log("Editing password with id ", id);
    setform({...passwordArray.filter(i => i.id === id)[0],id:id});
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce" />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-gray-400 opacity-20 blur-[100px]"></div></div>
      <div className="md:mycontainer md:p-0 min-h-[85.2vh] md:py-3 p-2">
        <h1 className='text-center text font-bold'>
          <div className="logo font-bold text-2xl">
            <span className='text-green-600'>&lt;</span>
            Pass
            <span className='text-green-600'>World/&gt;</span>
          </div>
        </h1>
        <p className='text-green-900 text-center font-bold text-lg'>Your own Password Manager</p>

        <div className="flex flex-col p-4 gap-5 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-950 px-4 py-1 w-full' type="text" name="site" id="site" />
          <div className="flex md:flex-row w-full gap-3">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-950 px-4 py-1 w-full' type="text" name="username" id="username" />
            <div className="relative w-full">
              <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-950 px-4 py-1 w-full' type="password" name="password" id="password" />
              <span className='absolute right-[2px] top-[3px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={28} src="icons/eye.png" alt="" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-gray-300 hover:bg-gray-200 rounded-full px-5 py-1 w-fit border border-black'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              style={{ height: "25px" }}
            >
            </lord-icon>
            Save Password</button>
        </div>
        <div className="passwords">
          <h2 className='text-2xl mb-4 font-bold'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Password to Show.</div>}
          {passwordArray.length !== 0 &&
            // <table className="table-auto w-full text-center rounded-md overflow-hidden">
            //     <thead className='bg-slate-700 text-white'>
            //         <tr>
            //             <th className='p-2 border-b-2 border-white'>Website URL</th>
            //             <th className='p-2 border-b-2 border-x-2 border-white'>Username</th>
            //             <th className='p-2 border-b-2 border-x-2 border-white'>Password</th>
            //             <th className='p-2 border-b-2 border-white'>Actions</th>
            //         </tr>
            //     </thead>
            //     <tbody className='bg-slate-200'>
            //         {passwordArray.map((item, index) => {
            //             return <tr key={index}>
            //                 <td className='overflow-auto p-1 border-2 border-white'>
            //                     <div className='flex items-center px-4 justify-between'>

            //                         <a className="overflow-auto" href={item.site} target='_blank'>{item.site}</a>
            //                         <span className={"cursor-pointer flex"} onClick={() => { copyText(item.site) }}>

            //                             <lord-icon
            //                                 src="https://cdn.lordicon.com/iykgtsbt.json"
            //                                 trigger="hover"
            //                                 style={{ height: "25px" }}
            //                             >
            //                             </lord-icon>
            //                         </span>
            //                     </div>
            //                 </td>
            //                 <td className='overflow-auto p-1 border-2 border-white'>
            //                     <div className='flex items-center px-4 justify-between'>

            //                         <span className='overflow-auto'>{item.username}</span>
            //                         <span className={"cursor-pointer flex"} onClick={() => { copyText(item.username) }}>

            //                             <lord-icon
            //                                 src="https://cdn.lordicon.com/iykgtsbt.json"
            //                                 trigger="hover"
            //                                 style={{ height: "25px" }}
            //                             >
            //                             </lord-icon>
            //                         </span>
            //                     </div>
            //                 </td>
            //                 <td className='overflow-auto p-1 border-2 border-white'>
            //                     <div className='flex items-center px-4 justify-between'>

            //                         <span className='overflow-auto'>{item.password}</span>
            //                         <span className={"cursor-pointer flex"} onClick={() => { copyText(item.password) }}>

            //                             <lord-icon
            //                                 src="https://cdn.lordicon.com/iykgtsbt.json"
            //                                 trigger="hover"
            //                                 style={{ height: "25px" }}
            //                             >
            //                             </lord-icon>
            //                         </span>
            //                     </div>
            //                 </td>
            //                 <td className='overflow-auto p-1 border-2 border-white'>
            //                     <div className='flex items-center justify-center gap-2'>

            //                         <span className={"cursor-pointer flex"} onClick={() => { editPassword(item.id) }}>
            //                             <lord-icon
            //                                 src="https://cdn.lordicon.com/gwlusjdu.json"
            //                                 trigger="hover"
            //                                 style={{ height: "25px" }}
            //                             >
            //                             </lord-icon>
            //                         </span>

            //                         <span className={"cursor-pointer flex "} onClick={() => { deletePassword(item.id) }}>
            //                             <lord-icon
            //                                 src="https://cdn.lordicon.com/skkahier.json"
            //                                 trigger="hover"
            //                                 style={{ height: "25px" }}
            //                             >
            //                             </lord-icon>
            //                         </span>

            //                     </div>
            //                 </td>



            //             </tr>
            //         })}

            //     </tbody>
            // </table>}
            <table className="table-auto w-full text-center rounded-md overflow-hidden">
              <thead className="bg-slate-700 text-white">
                <tr>
                  <th className="p-2 border-b-2 border-white">Website URL</th>
                  <th className="p-2 border-b-2 border-x-2 border-white">Username</th>
                  <th className="p-2 border-b-2 border-x-2 border-white">Password</th>
                  <th className="p-2 border-b-2 border-white">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-slate-200">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="overflow-auto p-1 border-2 border-white">
                      <div className="flex items-center justify-between px-4">
                        <a className="break-all" href={item.site} target="_blank" rel="noopener noreferrer">
                          {item.site}
                        </a>
                        <span className="cursor-pointer flex" onClick={() => copyText(item.site)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{ height: "25px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                    <td className="overflow-auto p-1 border-2 border-white">
                      <div className="flex items-center justify-between px-4">
                        <span className="break-all">{item.username}</span>
                        <span className="cursor-pointer flex" onClick={() => copyText(item.username)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{ height: "25px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                    <td className="overflow-auto p-1 border-2 border-white">
                      <div className="flex items-center justify-between px-4">
                        <span className="break-all">{"*".repeat(item.password.length)}</span>
                        <span className="cursor-pointer flex" onClick={() => copyText(item.password)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{ height: "25px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                    <td className="overflow-auto p-1 border-2 border-white">
                      <div className="flex items-center justify-center gap-2">
                        <span className="cursor-pointer flex" onClick={() => editPassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer flex" onClick={() => deletePassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ height: "25px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}

        </div>
      </div>
    </>
  )
}

export default Manager
