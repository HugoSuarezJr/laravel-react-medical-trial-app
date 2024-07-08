import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, totalPendingTasks, myPendingTasks, totalInProgressTasks, myInProgressTasks, totalCompletedTasks, myCompletedTasks, activeTasks }) {
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
              <h1 className='text-amber-500 text-2xl font-semibold'>Pending Tasks</h1>
              <p className='text-lg'>
                <span className='mr-2'>{myPendingTasks}</span>
                /
                <span className='ml-2'>{totalPendingTasks}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h1 className='text-blue-500 text-2xl font-semibold'>In Progress Tasks</h1>
              <p className='text-lg'>
                <span className='mr-2'>{myInProgressTasks}</span>
                /
                <span className='ml-2'>{totalInProgressTasks}</span>
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h1 className='text-green-500 text-2xl font-semibold'>Completed Tasks</h1>
              <p className='text-lg'>
                <span className='mr-2'>{myCompletedTasks}</span>
                /
                <span className='ml-2'>{totalCompletedTasks}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h1 className='dark:text-gray-200 text-2xl font-semibold'>My Active Tasks</h1>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr>
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Project Name</th>
                    <th className="px-3 py-3">Task Name</th>
                    <th className="px-3 py-3">Task Status</th>
                    <th className="px-3 py-3">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTasks.data.map((task) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                      <td className="px-3 py-2">{task.id}</td>
                      <td className="px-3 py-2 text-white"><Link href={route('project.show', task.project_id)} className='hover:underline'>{task.project.name}</Link></td>
                      <td className="px-3 py-2 text-white"><Link href={route('task.show', task.id)} className='hover:underline'>{task.name}</Link></td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "px-2 py-1 rounded text-nowrap text-white " +
                            TASK_STATUS_CLASS_MAP[task.status]
                          }>
                          {TASK_STATUS_TEXT_MAP[task.status]}
                        </span></td>
                      <td className="px-3 py-2">{task.due_date}</td>
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
