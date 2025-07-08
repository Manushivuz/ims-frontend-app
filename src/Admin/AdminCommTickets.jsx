import { useEffect, useRef, useState } from "react";
import axios from "axios";
import NavBar from "./CustomNavbar";
import { Menu, X, Loader2, Dot } from "lucide-react";
import useTitle from "@/Components/useTitle";

const baseUrl = import.meta.env.VITE_BASE_URL;
const userId = localStorage.getItem("userId");

export default function AdminCommTickets() {
    useTitle("All Tickets - Admin");

    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const fetchTickets = async () => {
        try {
            setLoadingTickets(true);
            const res = await axios.get(`${baseUrl}/ticket/getall`);
            setTickets(res.data);
        } catch (err) {
            console.error("Failed to fetch tickets:", err);
        } finally {
            setLoadingTickets(false);
        }
    };

    const fetchMessages = async (ticketId) => {
        try {
            setLoadingMessages(true);
            const res = await axios.get(`${baseUrl}/ticket/${ticketId}/messages`);
            setMessages(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Failed to fetch messages:", err);
            setMessages([]);
        } finally {
            setLoadingMessages(false);
        }
    };

    const handleSelectTicket = (ticket) => {
        setSelectedTicket(ticket);
        fetchMessages(ticket._id);
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const TicketListItem = ({ ticket }) => (
        <div
            onClick={() => handleSelectTicket(ticket)}
            className={`p-4 rounded-lg shadow-sm border cursor-pointer transition hover:shadow-md ${selectedTicket?._id === ticket._id
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white"
                }`}
        >
            <h3 className="font-semibold text-gray-800 truncate">{ticket.title}</h3>
            <p className="text-xs text-gray-500 truncate">{ticket.description}</p>
            <p className="text-xs text-gray-400 mt-1">
                {ticket.createdBy?.name || "Unknown"} |{" "}
                {new Date(ticket.createdAt).toLocaleString()}
            </p>
        </div>
    );

    const MessageBubble = ({ msg }) => (
        <div
            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl text-sm ${msg.sender._id === userId || msg.sender === userId
                    ? "bg-blue-600 text-white self-end"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
        >
            {msg.content}
        </div>
    );

    const ChatHeader = () => (
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
            <div>
                <h2 className="text-lg font-semibold text-gray-800">
                    {selectedTicket.title}
                </h2>
                <p className="text-sm text-gray-500">
                    Raised by {selectedTicket.createdBy?.name || "Unknown"}
                </p>
            </div>
            <span
                className={`text-xs px-3 py-1 rounded-full ${selectedTicket.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : selectedTicket.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : selectedTicket.status === "Pending Confirmation"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-200 text-gray-700"
                    }`}
            >
                {selectedTicket.status}
            </span>
        </div>
    );

    const MobileSidebar = () => (
        <div className="fixed inset-0 z-40 md:hidden">
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">All Tickets</h2>
                    <button
                        onClick={() => setMobileSidebarOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
                    {loadingTickets ? (
                        <div className="flex justify-center items-center h-20">
                            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                        </div>
                    ) : tickets.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No tickets found</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {tickets.map((ticket) => (
                                <TicketListItem key={ticket._id} ticket={ticket} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <NavBar />

            <div className="md:hidden p-3 border-b border-gray-200 bg-white flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">All Tickets</h2>
                <button
                    onClick={() => setMobileSidebarOpen(true)}
                    className="p-1 rounded-full hover:bg-gray-100"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 bg-white overflow-y-auto">
                    <div className="p-4 md:p-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                            All Tickets
                        </h2>
                        {loadingTickets ? (
                            <div className="flex justify-center items-center h-20">
                                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                            </div>
                        ) : tickets.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-500">No tickets found</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {tickets.map((ticket) => (
                                    <TicketListItem key={ticket._id} ticket={ticket} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Chat */}
                <div className="flex-1 flex flex-col bg-white relative">
                    {selectedTicket ? (
                        <>
                            <ChatHeader />
                            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-gray-50 to-white space-y-3 md:space-y-4">
                                {loadingMessages ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                                    </div>
                                ) : !Array.isArray(messages) || messages.length === 0 ? (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-gray-400">No messages found</p>
                                    </div>
                                ) : (
                                    <>
                                        {messages.map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex ${msg.sender._id === userId || msg.sender === userId
                                                        ? "justify-end"
                                                        : "justify-start"
                                                    }`}
                                            >
                                                <MessageBubble msg={msg} />
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div className="flex items-center space-x-1 text-xs md:text-sm text-gray-500">
                                                <Dot className="animate-bounce" />
                                                <Dot
                                                    className="animate-bounce"
                                                    style={{ animationDelay: "0.1s" }}
                                                />
                                                <Dot
                                                    className="animate-bounce"
                                                    style={{ animationDelay: "0.2s" }}
                                                />
                                                <span>Typing...</span>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-4">
                            <div className="text-center p-4 md:p-6 max-w-md">
                                <div className="mx-auto w-14 h-14 md:w-16 md:h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 md:h-8 md:w-8 text-indigo-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-base md:text-lg font-medium text-gray-800 mb-1">
                                    No ticket selected
                                </h3>
                                <p className="text-sm text-gray-500 mb-3 md:mb-4">
                                    Select a ticket from the left panel to view and read messages
                                </p>
                                <button
                                    onClick={() => setMobileSidebarOpen(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm md:text-base md:hidden"
                                >
                                    View Tickets
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {mobileSidebarOpen && <MobileSidebar />}
        </div>
    );
}
