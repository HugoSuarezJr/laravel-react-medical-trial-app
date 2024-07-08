import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PATIENT_PRIORITY_CLASS_MAP, PATIENT_PRIORITY_TEXT_MAP, PATIENT_STATUS_CLASS_MAP, PATIENT_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";
import PatientsTable from "../Patient/PatientsTable";

export default function Show({ auth, patient }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Patient "${patient.name}"`}
          </h2>
          <Link href={route("patient.edit", patient.id)} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Edit Patient</Link>
        </div>
      }
    >
      <Head title={`Patient "${patient.name}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={patient.image_path}
                alt={"Image for " + patient.name}
                className="w-full h-64 object-cover"></img>
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">Patient ID</label>
                    <p className="mt-1">{patient.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Patient Name</label>
                    <p className="mt-1">{patient.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Patient Status</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          PATIENT_STATUS_CLASS_MAP[patient.status]
                        }>
                        {PATIENT_STATUS_TEXT_MAP[patient.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1">{patient.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg">Trial Name</label>
                    <p className="mt-1 hover:underline">
                      <Link href={route("trial.show", patient.trial_id)}>
                        {patient.trial.name}
                      </Link>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Due Date</label>
                    <p className="mt-1">{patient.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created Date</label>
                    <p className="mt-1">{patient.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Updated By</label>
                    <p className="mt-1">{patient.updatedBy.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="font-bold text-lg">Description</label>
                <p className="mt-1">{patient.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
