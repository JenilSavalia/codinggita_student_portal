import React, { useEffect, useState } from 'react';
import { useStudentStore } from '../../Stores/store.js';
import {
    Search,
    MoreVertical,
    Smile,
    Paperclip,
    Mic,
    Send,
    Phone,
    Video,
    ChevronLeft,
    Check,
    Image
} from 'lucide-react';


const StudentGroups = () => {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const [activeChat, setActiveChat] = useState('contact1');
    const [messageInput, setMessageInput] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const { StudentGroups, getGroupsByIds } = useStudentStore();
    console.log(StudentGroups)


    const user = JSON.parse(localStorage.getItem("user")) || null
    const user_id = user._id

    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true);
            setError('');

            try {
                await getGroupsByIds(user_id);
            } catch (error) {
                setError("Failed to fetch groups. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (user_id) {
            fetchGroups();
        }
    }, []);

    if (loading) {
        return <div>Loading groups...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    console.log(useStudentStore.getState().StudentGroups)



    const contacts = [
        { id: 'contact1', name: 'John Smith', lastMessage: 'Hey, how are you?', time: '9:43 AM', unread: 2, isOnline: true, avatar: '🧑‍💼' },
        { id: 'contact2', name: 'Sarah Johnson', lastMessage: 'Meeting at 3pm tomorrow', time: 'Yesterday', unread: 0, isOnline: false, avatar: '👩‍💼' },
        { id: 'contact3', name: 'Family Group', lastMessage: 'Mom: When are you coming?', time: 'Yesterday', unread: 5, isOnline: true, avatar: '👨‍👩‍👧‍👦' },
        { id: 'contact4', name: 'Alex Williams', lastMessage: 'Thanks for the help!', time: '2/24/25', unread: 0, isOnline: false, avatar: '👨‍🦱' },
        { id: 'contact5', name: 'Work Buddies', lastMessage: 'Tom: Let\'s grab lunch', time: '2/23/25', unread: 0, isOnline: true, avatar: '👥' }
    ];

    const filteredContacts = StudentGroups?.filter(item =>
        item.group_name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const activeContactData = StudentGroups?.find(item => item._id === activeChat);

    const messages = [
        { id: 1, sender: 'contact1', text: 'Hey there!', time: '9:30 AM', status: 'read' },
        { id: 2, sender: 'me', text: 'Hi! How are you doing?', time: '9:31 AM', status: 'read' },
        { id: 3, sender: 'contact1', text: 'I\'m good, just working on that project we discussed.', time: '9:35 AM', status: 'read' },
        { id: 4, sender: 'me', text: 'Great! How\'s it coming along?', time: '9:36 AM', status: 'read' },
        { id: 5, sender: 'contact1', text: 'Making progress! Should be done by Friday.', time: '9:40 AM', status: 'read' },
        { id: 6, sender: 'contact1', text: 'Do you have time to review it tomorrow?', time: '9:42 AM', status: 'read' },
        { id: 7, sender: 'contact1', text: 'Hey, how are you?', time: '9:43 AM', status: 'delivered' }
    ];

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            console.log('Sending message:', messageInput);
            setMessageInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };




    return (




        // <div>
        //     <h2 className="text-xl font-semibold mb-4">Groups</h2>
        //     {StudentGroups?.length === 0 ? (
        //         <div>No groups found.</div>
        //     ) : (
        //         <ul>
        //             {StudentGroups?.map((group) => (
        //                 <li key={group._id} className="mb-2 p-2 border rounded">
        //                     <h3 className="font-medium">{group?.group_name}</h3>
        //                     <p>{group?.description}</p>
        //                 </li>
        //             ))}
        //         </ul>
        //     )}
        // </div>


        <div className="flex h-screen bg-gray-100">
            {/* Contacts panel */}
            <div className="w-[350px] border-r bg-white flex flex-col">
                {/* Header */}
                <div className="p-3 bg-gray-100 flex items-center justify-between">
                    <div className="font-bold text-lg"> #Groups</div>
                    <div className="flex space-x-4 text-gray-600">
                        <Search size={20} className="cursor-pointer" />
                        <MoreVertical size={20} className="cursor-pointer" />
                    </div>
                </div>

                {/* Search */}
                <div className="p-2 bg-gray-100">
                    <div className="bg-white rounded-full flex items-center px-3 py-1">
                        <Search size={16} className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search or start new chat"
                            className="w-full py-1 outline-none text-sm"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </div>

                {/* Contacts list */}
                <div className="flex-1 overflow-y-auto">
                    {filteredContacts?.map(contact => (
                        <div
                            key={contact._id}
                            className={`flex items-center p-3 border-b cursor-pointer hover:bg-gray-50 ${activeChat === contact.id ? 'bg-gray-100' : ''}`}
                            onClick={() => setActiveChat(contact._id)}
                        >
                            <div className="relative mr-3 flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                                    {contact?.avatar}
                                </div>
                                {contact?.isOnline && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between">
                                    <span className="font-medium">{contact.group_name}</span>
                                    <span className="text-xs text-gray-500">{contact?.time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-gray-600 truncate">{contact?.lastMessage}</p>
                                    {/* {contact.unread > 0 && (
                                        <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                            {contact.unread}
                                        </span>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat panel */}
            <div className="w-[1300px] flex flex-col bg-gray-100">
                {/* Chat header */}
                <div className="p-3 bg-gray-200 flex items-center justify-between">
                    <div className="flex items-center">
                        <ChevronLeft size={24} className="md:hidden mr-2 cursor-pointer" />
                        <div className="relative mr-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
                                {activeContactData?.avatar}
                            </div>
                            {activeContactData?.isOnline && (
                                <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border-2 border-gray-200"></div>
                            )}
                        </div>
                        <div>
                            <div className="font-medium">{activeContactData?.group_name}</div>
                            <div className="text-xs text-gray-600">
                                {(activeContactData?.description)?.substring(0, 35) + "..."}
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex space-x-4 text-gray-600">
                        <Phone size={20} className="cursor-pointer" />
                        <Video size={20} className="cursor-pointer" />
                        <Search size={20} className="cursor-pointer" />
                        <MoreVertical size={20} className="cursor-pointer" />
                    </div> */}
                </div>

                {/* Messages area */}
                <div
                    className="flex-1 p-4 overflow-y-auto"
                    style={{
                        backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2RkZGRkZCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')",
                        backgroundSize: "300px"
                    }}
                >
                    <div className="flex flex-col space-y-2">

                        {/* {messages.map(message => (
                            <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-xs md:max-w-md py-2 px-3 rounded-lg ${message.sender === 'me'
                                        ? 'bg-green-100 rounded-tr-none'
                                        : 'bg-white rounded-tl-none'
                                        }`}
                                >
                                    <div className="text-sm">{message.text}</div>
                                    <div className="flex justify-end items-center mt-1">
                                        <span className="text-xs text-gray-500 mr-1">{message.time}</span>
                                        {message.sender === 'me' && (
                                            <div className="text-blue-500">
                                                {message.status === 'read' ? (
                                                    <div className="flex"><Check size={14} /><Check size={14} className="-ml-1" /></div>
                                                ) : (
                                                    <Check size={14} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))} */}


                        {
                            (activeContactData?.tasks)?.map((item) => {
                                console.log(item)

                                return (
                                    <div className='bg-[#DCFCE7] p-3 w-[300px]'>
                                        <div className='flex justify-between'>
                                            <h1>#Task</h1>
                                            <h1 className=
                                                {
                                                    item.Priority === "High" ? "bg-red-200 p-1 rounded-md" : ""
                                                }>
                                                {item.Priority}</h1>
                                        </div>
                                        <div className='font-bold'>
                                            {item.task_title}
                                        </div>
                                    </div>
                                )

                            })
                        }

                    </div>
                </div>

                {/* Message input */}
                {/* <div className="p-3 bg-gray-200 flex items-center">
                    <div className="flex space-x-2 text-gray-600 mr-2">
                        <Smile size={24} className="cursor-pointer" />
                        <Paperclip size={24} className="cursor-pointer" />
                        <Image size={24} className="cursor-pointer" />
                    </div>
                    <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2">
                        <input
                            type="text"
                            placeholder="Type a message"
                            className="w-full outline-none"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <button className="ml-2 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                        {messageInput.trim() ? <Send size={20} /> : <Mic size={20} />}
                    </button>
                </div> */}


            </div>
        </div >


    );
};

export default StudentGroups;