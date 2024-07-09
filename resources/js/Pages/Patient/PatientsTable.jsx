import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { PATIENT_STATUS_CLASS_MAP, PATIENT_STATUS_TEXT_MAP } from "@/constants";
import { Link, router } from "@inertiajs/react";

export default function PatientsTable({ patients, queryParams = null, hideTrialColumn = false, success }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('patient.index'), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc';
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc';
    }
    router.get(route("patient.index"), queryParams);
  };

  const deletePatient = (patient) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) {
      return;
    }
    router.delete(route('patient.destroy', patient.id));
  };

  return (
    <>
      <div className="overflow-auto">
      {hideTrialColumn && (<h2 className="text-2xl text-gray-400 mb-2">Patients</h2>)}
        {success && (
          <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">{success}</div>
        )}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHeading
                name="id"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >ID</TableHeading>
              <th className="px-3 py-3"></th>

              <TableHeading
                name="name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >Name</TableHeading>
              {!hideTrialColumn && <th className="px-3 py-3">Trial Name</th>}
              <TableHeading
                name="status"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >Status</TableHeading>
              <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >Created Date</TableHeading>
              <TableHeading
                name="due_date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >Due Date</TableHeading>
              <th className="px-3 py-3">Created By</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.name}
                  placeholder="Patient Name"
                  onBlur={e => searchFieldChanged('name', e.target.value)}
                  onKeyPress={e => onKeyPress('name', e)}
                />
              </th>
              {!hideTrialColumn && <th className="px-3 py-3"></th>}
              <th className="px-3 py-3">
                <SelectInput
                  className="w-full"
                  defaultValue={queryParams.status}
                  onChange={e => searchFieldChanged("status", e.target.value)}>
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {patients.data.map((patient) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={patient.id}>
                <td className="px-3 py-2">{patient.id}</td>
                <td className="px-3 py-2">
                  <img src={patient.image_path === '' ? ("https://media.muckrack.com/profile/images/1926094/sabrina-cipolletta.png.256x256_q100_crop-smart.png") : (patient.image_path)} alt={`Image for patient ${patient.id}`} style={{ width: 50 }} className="rounded-full"/>
                </td>
                <th className="px-3 py-2 hover:underline text-gray-100">
                  <Link href={route("patient.show", patient.id)}>
                    {patient.name}
                  </Link>
                </th>
                {!hideTrialColumn && <td className="px-3 py-2">{patient.trial.name}</td>}
                <td className="px-3 py-2">
                  <span
                    className={
                      "px-2 py-1 rounded text-nowrap text-white " +
                      PATIENT_STATUS_CLASS_MAP[patient.status]
                    }>
                    {PATIENT_STATUS_TEXT_MAP[patient.status]}
                  </span>
                </td>
                <td className="px-3 py-2">{patient.created_at}</td>
                <td className="px-3 py-2">{patient.due_date}</td>
                <td className="px-3 py-2">{patient.createdBy.name}</td>
                <td className="px-3 py-2 text-nowrap">
                  <Link href={route("patient.edit", patient.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                    Edit
                  </Link>
                  <button
                    onClick={(e) => deletePatient(patient)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={patients.meta.links}></Pagination>
    </>
  );
}
