import { PATIENT_STATUS_CLASS_MAP, PATIENT_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, totalPendingPatients, myPendingPatients, totalInProgressPatients, myInProgressPatients, totalCompletedPatients, myCompletedPatients, activePatients }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h1 className='text-amber-500 text-2xl font-semibold'>Pending Patients</h1>
              <p className='text-lg'>
                <span className='mr-2'>{myPendingPatients}</span>
                /
                <span className='ml-2'>{totalPendingPatients}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h1 className='text-blue-500 text-2xl font-semibold'>In Progress Patients</h1>
              <p className='text-lg'>
                <span className='mr-2'>{myInProgressPatients}</span>
                /
                <span className='ml-2'>{totalInProgressPatients}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h1 className='text-green-500 text-2xl font-semibold'>Completed Patients</h1>
              <p className='text-lg'>
                <span className='mr-2'>{myCompletedPatients}</span>
                /
                <span className='ml-2'>{totalCompletedPatients}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h1 className='dark:text-gray-200 text-2xl font-semibold'>My Active Patients</h1>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr>
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Trial Name</th>
                    <th className="px-3 py-3">Patient Name</th>
                    <th className="px-3 py-3">Patient Status</th>
                    <th className="px-3 py-3">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {activePatients.data.map((patient) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={patient.id}>
                      <td className="px-3 py-2">{patient.id}</td>
                      <td className="px-3 py-2 text-white"><Link href={route('trial.show', patient.trial_id)} className='hover:underline'>{patient.trial.name}</Link></td>
                      <td className="px-3 py-2 text-white"><Link href={route('patient.show', patient.id)} className='hover:underline'>{patient.name}</Link></td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "px-2 py-1 rounded text-nowrap text-white " +
                            PATIENT_STATUS_CLASS_MAP[patient.status]
                          }>
                          {PATIENT_STATUS_TEXT_MAP[patient.status]}
                        </span></td>
                      <td className="px-3 py-2">{patient.due_date}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
