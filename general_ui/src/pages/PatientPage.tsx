import { useState } from 'react';
import { UserIcon, CalendarIcon, FileTextIcon, HeartIcon } from '../icons';
import Footer from '../components/Footer';

export default function PatientPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const patientProfile = {
    name: 'John Doe',
    age: 45,
    bloodType: 'O+',
    allergies: ['Penicillin', 'Latex'],
    medications: ['Lisinopril 10mg', 'Metformin 500mg'],
    lastCheckup: '2026-02-15',
    nextAppointment: '2026-03-20',
  };

  const medicalHistory = [
    {
      date: '2026-02-15',
      condition: 'Hypertension',
      treatment: 'Blood pressure monitoring and medication adjustment',
      specialist: 'Dr. Sarah Johnson',
    },
    {
      date: '2026-01-10',
      condition: 'Type 2 Diabetes',
      treatment: 'Regular glucose monitoring and diet consultation',
      specialist: 'Dr. Michael Chen',
    },
    {
      date: '2025-11-20',
      condition: 'Annual Physical Exam',
      treatment: 'General health checkup and lab tests',
      specialist: 'Dr. Emily Rodriguez',
    },
  ];

  const appointments = [
    {
      id: 1,
      date: '2026-03-20',
      time: '10:00 AM',
      specialist: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      status: 'Scheduled',
    },
    {
      id: 2,
      date: '2026-04-05',
      time: '2:30 PM',
      specialist: 'Dr. Michael Chen',
      specialty: 'Neurology',
      status: 'Pending',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2 mb-4">
            <UserIcon size={20} className="text-blue-400" />
            <span className="text-blue-300 font-semibold">Patient Portal</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">Patient Dashboard</h1>
          <p className="text-gray-400 text-lg">
            Manage your health records and appointments
          </p>
        </div>

        {/* Patient Info Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{patientProfile.name}</h2>
              <p className="text-gray-400">Patient ID: PAT-2026-00451</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-lg">
              <UserIcon size={40} className="text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Age</p>
              <p className="text-white font-bold text-lg">{patientProfile.age} years</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Blood Type</p>
              <p className="text-white font-bold text-lg">{patientProfile.bloodType}</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Last Checkup</p>
              <p className="text-white font-bold text-sm">{patientProfile.lastCheckup}</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Next Appointment</p>
              <p className="text-white font-bold text-sm">{patientProfile.nextAppointment}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex space-x-2 bg-slate-800 p-2 rounded-lg border border-slate-700">
          {[
            { id: 'profile', label: 'Medical Info', icon: HeartIcon },
            { id: 'history', label: 'Medical History', icon: FileTextIcon },
            { id: 'appointments', label: 'Appointments', icon: CalendarIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          {/* Medical Info Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <HeartIcon size={24} className="text-red-400" />
                  <span>Allergies</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {patientProfile.allergies.map((allergy, index) => (
                    <div
                      key={index}
                      className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      ⚠️ {allergy}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Current Medications</h3>
                <div className="space-y-3">
                  {patientProfile.medications.map((med, index) => (
                    <div key={index} className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                      <p className="text-white font-semibold">{med}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Medical History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {medicalHistory.map((record, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6 py-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-bold">{record.condition}</h4>
                      <p className="text-gray-400 text-sm">{record.date}</p>
                    </div>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                      {record.specialist}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{record.treatment}</p>
                </div>
              ))}
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-slate-700 border border-slate-600 rounded-lg p-6 hover:border-blue-500 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <CalendarIcon size={20} className="text-blue-400" />
                        <h4 className="text-white font-bold">{appt.specialist}</h4>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{appt.specialty}</p>
                      <p className="text-gray-300 text-sm">
                        {appt.date} at {appt.time}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        appt.status === 'Scheduled'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                  <button className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-semibold">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Footer */}
      <Footer showNews={false} />
    </div>
  );
}
