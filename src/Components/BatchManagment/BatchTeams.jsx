import React, { useEffect, useState } from "react";
import { batchService } from "../../services/batchService";
import { Edit3, Trash2, Users, Plus, UserPlus, X } from "lucide-react";

const initialTeamForm = { name: "", members: [] };

const BatchTeams = ({ batchId }) => {
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamForm, setTeamForm] = useState(initialTeamForm);

  useEffect(() => {
    const fetchBatch = async () => {
      setLoading(true);
      try {
        const res = await batchService.getBatchById(batchId);
        const data = await res.json ? await res.json() : res;
        setBatch(data);
      } catch (err) {
        setError("Failed to load batch");
      } finally {
        setLoading(false);
      }
    };
    if (batchId) fetchBatch();
  }, [batchId]);

  const getInternById = (id) => batch?.interns?.find((i) => i._id === id || i.id === id);

  const handleCreateTeam = async () => {
    await batchService.createTeam(batch._id, teamForm);
    setShowCreateModal(false);
    setTeamForm(initialTeamForm);
    reloadBatch();
  };

  const handleEditTeam = async () => {
    await batchService.updateTeam(batch._id, selectedTeam._id, { name: teamForm.name });
    setShowEditModal(false);
    setSelectedTeam(null);
    setTeamForm(initialTeamForm);
    reloadBatch();
  };

  const handleDeleteTeam = async (teamId) => {
    await batchService.deleteTeam(batch._id, teamId);
    reloadBatch();
  };

  const handleAddMembers = async () => {
    await batchService.addMembersToTeam(batch._id, selectedTeam._id, teamForm.members);
    setShowMembersModal(false);
    setSelectedTeam(null);
    setTeamForm(initialTeamForm);
    reloadBatch();
  };

  const handleRemoveMember = async (teamId, memberId) => {
    await batchService.removeMemberFromTeam(batch._id, teamId, memberId);
    reloadBatch();
  };

  const reloadBatch = async () => {
    setLoading(true);
    try {
      const res = await batchService.getBatchById(batchId);
      const data = await res.json ? await res.json() : res;
      setBatch(data);
    } catch (err) {
      setError("Failed to reload batch");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[200px] text-lg text-gray-600">Loading teams...</div>;
  if (error) return <div className="text-red-600 text-center py-4">{error}</div>;
  if (!batch) return <div className="text-center py-4">No batch found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
          <Users className="w-7 h-7 text-blue-500" /> Teams in Batch: <span className="text-gray-800">{batch.name}</span>
        </h2>
        <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
          <Plus className="w-5 h-5" /> Create New Team
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {batch.teams && batch.teams.length > 0 ? (
          batch.teams.map((team) => (
            <div key={team._id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300 relative flex flex-col h-full min-h-[340px] max-w-lg w-full mx-auto">
              {/* Header: Team name and member count */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" /> {team.name}
                  </h3>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border border-blue-200 bg-blue-50 text-blue-700">
                    <UserPlus className="w-4 h-4 mr-1" />
                    {team.members.length} Members
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setSelectedTeam(team); setShowEditModal(true); setTeamForm({ name: team.name, members: team.members }); }}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit Team">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteTeam(team._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Team">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Members grid */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2 font-medium">Members</p>
                <div className="flex flex-wrap gap-2">
                  {team.members.length === 0 && <span className="text-gray-400 text-sm">No members</span>}
                  {team.members.map((memberId) => {
                    const intern = getInternById(memberId);
                    return (
                      <span key={memberId} className="inline-flex items-center px-2 py-1 bg-gray-100 border border-gray-200 rounded-md text-xs text-gray-800">
                        {intern ? `${intern.name} (${intern.email || intern.id || intern._id})` : memberId}
                        <button onClick={() => handleRemoveMember(team._id, memberId)} className="ml-2 text-xs text-red-500 hover:underline" title="Remove">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
              {/* Footer: Add Members button */}
              <div className="flex gap-2 mt-auto">
                <button onClick={() => { setSelectedTeam(team); setShowMembersModal(true); setTeamForm({ ...teamForm, members: [] }); }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium flex items-center gap-2 justify-center">
                  <UserPlus className="w-4 h-4" /> Add Members
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center col-span-full">No teams in this batch.</div>
        )}
      </div>
      {/* Create Team Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2"><Plus className="w-5 h-5" /> Create Team</h3>
            <input
              type="text"
              placeholder="Team Name"
              value={teamForm.name}
              onChange={e => setTeamForm({ ...teamForm, name: e.target.value })}
              className="w-full mb-4 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <div className="mb-4">
              <label className="block mb-1 text-sm text-gray-600">Select Members:</label>
              <select
                multiple
                value={teamForm.members}
                onChange={e => setTeamForm({ ...teamForm, members: Array.from(e.target.selectedOptions, o => o.value) })}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {batch.interns && batch.interns.map(intern => (
                  <option key={intern._id || intern.id} value={intern._id || intern.id}>
                    {intern.name} ({intern.email || intern.id || intern._id})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={handleCreateTeam} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"><Plus className="w-4 h-4" /> Create</button>
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center gap-2"><X className="w-4 h-4" /> Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Team Modal */}
      {showEditModal && selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2"><Edit3 className="w-5 h-5" /> Edit Team</h3>
            <input
              type="text"
              placeholder="Team Name"
              value={teamForm.name}
              onChange={e => setTeamForm({ ...teamForm, name: e.target.value })}
              className="w-full mb-4 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={handleEditTeam} className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-lg font-semibold hover:bg-yellow-300 transition flex items-center gap-2"><Edit3 className="w-4 h-4" /> Save</button>
              <button onClick={() => { setShowEditModal(false); setSelectedTeam(null); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center gap-2"><X className="w-4 h-4" /> Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Add Members Modal */}
      {showMembersModal && selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2"><UserPlus className="w-5 h-5" /> Add Members to {selectedTeam.name}</h3>
            <select
              multiple
              value={teamForm.members}
              onChange={e => setTeamForm({ ...teamForm, members: Array.from(e.target.selectedOptions, o => o.value) })}
              className="w-full mb-4 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {batch.interns && batch.interns
                .filter(intern => !selectedTeam.members.includes(intern._id || intern.id))
                .map(intern => (
                  <option key={intern._id || intern.id} value={intern._id || intern.id}>
                    {intern.name} ({intern.email || intern.id || intern._id})
                  </option>
                ))}
            </select>
            <div className="flex gap-2 justify-end">
              <button onClick={handleAddMembers} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"><UserPlus className="w-4 h-4" /> Add</button>
              <button onClick={() => { setShowMembersModal(false); setSelectedTeam(null); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center gap-2"><X className="w-4 h-4" /> Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchTeams; 