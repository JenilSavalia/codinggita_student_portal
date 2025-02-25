import React, { useState } from 'react'
import AddTask from './AddTaskPopup'
import Loader from '../../components/ui/Loading.jsx';

const AdminDashboard = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [Loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false)
    },500)

    return (
        <>
            {
                Loading ? (<Loader className={"w-full"} />) : (
                    <div className="p-4">
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Add Task
                        </button>
                        {isPopupOpen && <AddTask onClose={() => setIsPopupOpen(false)} />}
                    </div>
                )
            }



        </>
    )
}

export default AdminDashboard