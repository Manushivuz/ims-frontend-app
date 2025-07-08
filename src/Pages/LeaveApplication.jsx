import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
  Calendar,
  Clock,
  FileText,
  Loader2,
  CheckCircle,
  XCircle,
  Clock3,
} from "lucide-react";
import { Navbar, SideNav, Footer, useTitle } from "@/Components/compIndex";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const LeaveApplication = () => {
  useTitle("Leave Application");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const leaveTypes = [
    { value: "Sick Leave", label: "Sick Leave" },
    { value: "Personal Leave", label: "Personal Leave" },
    { value: "Vacation", label: "Vacation" },
    { value: "Other", label: "Other" },
  ];

  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  const fetchLeaveHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/leave/mine`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLeaveHistory(response.data.leaves || []);
    } catch (error) {
      console.error("Error fetching leave history:", error);
    }
  };

  const validateForm = () => {
    if (!formData.leaveType) {
      toast.error("Please select a leave type");
      return false;
    }
    if (!formData.startDate) {
      toast.error("Please select a start date");
      return false;
    }
    if (!formData.endDate) {
      toast.error("Please select an end date");
      return false;
    }
    if (!formData.reason) {
      toast.error("Please provide a reason for leave");
      return false;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (end < start) {
      toast.error("End date cannot be before start date");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const loadingToast = toast.loading("Submitting leave application...");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_BASE_URL}/leave`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.dismiss(loadingToast);
      toast.success("Leave application submitted successfully!");
      setFormData({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
      fetchLeaveHistory();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        error.response?.data?.message || "Error submitting application"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Approved: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Rejected: "bg-red-100 text-red-800",
    };

    const icons = {
      Approved: <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />,
      Pending: <Clock3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />,
      Rejected: <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />,
    };

    return (
      <div
        className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium ${styles[status]}`}
      >
        {icons[status]}
        {status}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <SideNav />
      <Toaster position="top-center" />

      <div className="relative min-h-screen ml-0 bg-gray-50 md:ml-32">
        <div className="p-3 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Leave Application Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardHeader className="border-b bg-white">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl font-bold">
                        Leave Application
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-medium text-gray-700">
                            Leave Type *
                          </label>
                          <Select
                            value={formData.leaveType}
                            onValueChange={(value) =>
                              setFormData({ ...formData, leaveType: value })
                            }
                          >
                            <SelectTrigger className="text-xs sm:text-sm">
                              <SelectValue placeholder="Select leave type" />
                            </SelectTrigger>
                            <SelectContent>
                              {leaveTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-medium text-gray-700">
                            Duration *
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                              <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    startDate: e.target.value,
                                  })
                                }
                                className="w-full pl-9 sm:pl-10 border rounded-md h-10 sm:h-11 text-xs sm:text-sm"
                              />
                            </div>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                              <input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    endDate: e.target.value,
                                  })
                                }
                                className="w-full pl-9 sm:pl-10 border rounded-md h-10 sm:h-11 text-xs sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium text-gray-700">
                          Reason for Leave *
                        </label>
                        <Textarea
                          value={formData.reason}
                          onChange={(e) =>
                            setFormData({ ...formData, reason: e.target.value })
                          }
                          placeholder="Please provide a detailed reason for your leave request..."
                          className="min-h-[100px] sm:min-h-[120px] text-xs sm:text-sm"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => navigate(-1)}
                          className="text-xs sm:text-sm"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Leave Status Section */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg">
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg sm:text-xl font-semibold">
                      Leave Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    {leaveHistory.length === 0 ? (
                      <p className="text-gray-500 text-xs sm:text-sm">No leave records found.</p>
                    ) : (
                      <div className="space-y-4 sm:space-y-6">
                        {leaveHistory.map((leave) => (
                          <div
                            key={leave._id}
                            className="p-3 sm:p-4 border rounded-lg space-y-2 sm:space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                              <div className="space-y-1">
                                <h3 className="font-medium text-sm sm:text-base">
                                  {leave.leaveType}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500">
                                  {new Date(
                                    leave.startDate
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(
                                    leave.endDate
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              {getStatusBadge(leave.status)}
                            </div>

                            {leave.updatedBy && (
                              <div className="pt-2 border-t">
                                <p className="text-xs sm:text-sm text-gray-600">
                                  Updated by{" "}
                                  <span className="font-medium">
                                    {leave.updatedBy}
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="mt-4 sm:mt-6 shadow-lg bg-blue-50 border-blue-200">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex gap-2 sm:gap-3">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-blue-900 text-sm sm:text-base">
                          Processing Time
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-blue-700">
                          Leave applications are typically processed within
                          24–48 hours.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LeaveApplication;
