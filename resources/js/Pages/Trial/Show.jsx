import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TRIAL_PRIORITY_CLASS_MAP, TRIAL_PRIORITY_TEXT_MAP, TRIAL_STATUS_CLASS_MAP, TRIAL_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";
import PatientsTable from "../Patient/PatientsTable";

export default function Show({ auth, trial, patients = null, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Trial "${trial.name}"`}
          </h2>
          <Link href={route("trial.edit", trial.id)} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Edit Trial</Link>
        </div>
      }
    >
      <Head title={`Trial "${trial.name}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={trial.image_path}
                alt={"Image for " + trial.name}
                className="w-full h-64 object-cover"></img>
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">Trial ID</label>
                    <p className="mt-1">{trial.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Trial Name</label>
                    <p className="mt-1">{trial.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Trial Priority</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          TRIAL_PRIORITY_CLASS_MAP[trial.priority]
                        }>
                        {TRIAL_PRIORITY_TEXT_MAP[trial.priority]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Trial Status</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          TRIAL_STATUS_CLASS_MAP[trial.status]
                        }>
                        {TRIAL_STATUS_TEXT_MAP[trial.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1">{trial.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">Assigned User</label>
                    <p className="mt-1">{trial.assignedUser.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Due Date</label>
                    <p className="mt-1">{trial.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created Date</label>
                    <p className="mt-1">{trial.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Updated By</label>
                    <p className="mt-1">{trial.updatedBy.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="font-bold text-lg">Description</label>
                <p className="mt-1">{trial.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {
                patients.data.length ? (<PatientsTable patients={patients} queryParams={queryParams} hideTrialColumn={true}></PatientsTable>) :
                  (<div className="bg-white dark:bg-gray-600 py-2 px-4 text-white rounded text-center">
                    <h2>There are currently no patients for this trial!</h2>
                  </div>)
              }
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}
